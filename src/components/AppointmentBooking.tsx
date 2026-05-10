import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Appointment booking system with date blocking and Google Forms submission
// Saves name, mobile, and date to Google Sheet via Google Forms

const AVAILABLE_SLOTS = [
  "09:00", "11:00",
  "13:00", "15:00", "17:00", "19:00"
];

// Backend configuration for appointments
const BACKEND_URL = "https://curamentis-api.onrender.com/api/appointments";
function getToday() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  userName: string;
  userMobile: string;
}

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSyncingAppointments, setIsSyncingAppointments] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<string[]>(AVAILABLE_SLOTS);
  const [timeSlotsByDate, setTimeSlotsByDate] = useState<Record<string, string[]>>({}); // { "2024-04-20": ["09:00", "11:00", ...] }
  const [blockedSlots, setBlockedSlots] = useState<{date: string, time: string}[]>([]);

  // Fetch appointments from Google Sheet to sync deletions
  async function fetchAppointmentsFromGoogle() {
    try {
      console.log("📡 Syncing appointments...");
      const response = await fetch(BACKEND_URL);

    const data = await response.json();
    return data.appointments || [];
    
    } catch (error) {
      console.warn("⚠️ Could not fetch from Google Sheet, using local data:", error instanceof Error ? error.message : error);
      return null;
    }
  }

  // Fetch available time slots by date from Google Sheet
  async function fetchTimeSlotsFromGoogle() {
    try {

      const response = await fetch(`${BACKEND_URL}/time-slots`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data.timeSlots || {}; // Returns { "date": ["time1", "time2", ...] }
    } catch (error) {
      console.warn(
        "⚠️ Could not fetch time slots from Google Sheet:",
        error instanceof Error ? error.message : error
      );
      return {};
    }
  }

  // Get time slots for a specific date (from sheet or default)
  const getTimeSlotsForDate = (date: Date): string[] => {
    const dateStr = format(date, "yyyy-MM-dd");
    // If date has custom slots in sheet, use those
    if (timeSlotsByDate[dateStr] && timeSlotsByDate[dateStr].length > 0) {
      return timeSlotsByDate[dateStr];
    }
    // Otherwise use global availableSlots
    return availableSlots;
  };

  // Fetch blocked slots from backend
  async function fetchBlockedSlotsFromGoogle() {
    try {
      const response = await fetch(`${BACKEND_URL}/blocked-slots`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.warn("⚠️ Could not fetch blocked slots from backend:", error instanceof Error ? error.message : error);
      return null;
    }
  }

  // Load appointments, time slots, and blocked slots from Google Sheet on mount
  useEffect(() => {
    const loadData = async () => {
      setIsSyncingAppointments(true);

      try {
        // Fetch time slots (now organized by date)
        const googleTimeSlots = await fetchTimeSlotsFromGoogle();
        if (googleTimeSlots && Object.keys(googleTimeSlots).length > 0) {
          setTimeSlotsByDate(googleTimeSlots);
        } 
        // Fetch blocked slots
        const googleBlockedSlots = await fetchBlockedSlotsFromGoogle();
        if (googleBlockedSlots) {
          setBlockedSlots(googleBlockedSlots);
        }

        // Fetch appointments
        const googleAppointments = await fetchAppointmentsFromGoogle();
        if (googleAppointments) {
          setAppointments(googleAppointments);
          localStorage.setItem("curamentis-appointments", JSON.stringify(googleAppointments));
        } else {
          // Fallback to localStorage if Google Sheet sync fails
          const stored = localStorage.getItem("curamentis-appointments");
          if (stored) {
            try {
              setAppointments(JSON.parse(stored));
            } catch (e) {
              console.error("Failed to load appointments:", e);
            }
          }
        }
      } finally {
        setIsSyncingAppointments(false);
      }
    };

    loadData();
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("curamentis-appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Refresh appointments from Google Sheet every 1 minute
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const refreshedAppointments = await fetchAppointmentsFromGoogle();
        if (refreshedAppointments) {
          setAppointments(refreshedAppointments);
          localStorage.setItem("curamentis-appointments", JSON.stringify(refreshedAppointments));
        }
      } catch (error) {
        console.warn("⚠️ Failed to auto-refresh appointments:", error);
      }
    }, 60000); // 60 seconds = 1 minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Check if a specific date-time slot is booked or in the past
  const isSlotBooked = (date: Date, time: string): boolean => {
    const dateStr = format(date, "yyyy-MM-dd");
    
    // Check if the slot is in the past
    const isToday = dateStr === format(new Date(), "yyyy-MM-dd");
    if (isToday) {
      const currentTime = new Date();
      const timeParts = time.split(':');
      const slotTime = new Date(date);
      slotTime.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0);
      if (slotTime < currentTime) return true; // Disable past slots
    }

    return appointments.some(a => a.date === dateStr && a.time === time) ||
           blockedSlots.some(b => b.date === dateStr && b.time === time);
  };

  // Dates that are fully booked (all time slots taken or passed for that date)
  const fullyBookedDates = (() => {
    const datesToCheck = new Set<string>();
    // Always check today in case all slots have passed
    datesToCheck.add(format(new Date(), "yyyy-MM-dd"));
    appointments.forEach(a => datesToCheck.add(a.date));
    blockedSlots.forEach(b => datesToCheck.add(b.date));
    
    return Array.from(datesToCheck).filter(dateStr => {
      const slotsForDate = getTimeSlotsForDate(new Date(dateStr));
      // A date is fully booked if there are NO available slots
      const hasAvailableSlot = slotsForDate.some(time => {
        return !isSlotBooked(new Date(dateStr), time);
      });
      return !hasAvailableSlot;
    });
  })();

  // Handle date selection
  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    setSelectedTime(null);
    setBookingSuccess(false);
  }

  // Handle time selection
  function handleTimeSelect(time: string) {
    setSelectedTime(time);
  }

  // Submit to Google Apps Script
  async function submitToGoogle(data: { name: string; mobile: string; dateTime: string }) {
 

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          mobile: data.mobile,
          dateTime: data.dateTime,
        }),
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Google Sheet submission error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : "N/A",
      });
      throw error;
    }
  }

  // Handle booking submission
  async function handleBookAppointment() {
    if (!selectedDate || !selectedTime) return;

    if (!userName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!userMobile.trim() || !/^\d{10}$/.test(userMobile.trim())) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Check if date is already booked
    if (isSlotBooked(selectedDate, selectedTime)) {
      alert("This time slot has already been booked. Please select another time.");
      return;
    }

    setIsSubmitting(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const timeStr = selectedTime;
      const fullDateTime = `${dateStr} ${timeStr}`;

      console.log("🔄 Processing appointment...");


      // Try to submit to Google Apps Script, but don't fail if it doesn't work
      try {
        await submitToGoogle({
          name: userName,
          mobile: userMobile,
          dateTime: fullDateTime,
        });
      } catch (googleError) {
        console.warn("⚠️ Google Sheet submission failed, but appointment saved locally:", googleError);
        // Continue with local saving even if Google Sheet fails
      }

      // Add appointment to local state (always happens)
      const newAppointment: Appointment = {
        id: Math.random().toString(36).slice(2),
        date: dateStr,
        time: timeStr,
        userName,
        userMobile,
      };

      setAppointments([...appointments, newAppointment]);
      setBookingSuccess(true);
      setShowPopup(true);

      // We do not reset the form here anymore.
      // It is reset when the popup is closed, so the WhatsApp message can access the state variables.

    } catch (err) {
      console.error("Booking error:", err);
      const errorMsg = err instanceof Error ? err.message : String(err);
      alert(`Failed to book appointment: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const getStepsCompleted = () => {
    let steps = 0;
    if (selectedDate) steps++;
    if (selectedTime) steps++;
    if (userName.trim()) steps++;
    if (userMobile.trim() && /^\d{10}$/.test(userMobile.trim())) steps++;
    return steps;
  };

  const totalSteps = 4;
  const stepsCompleted = getStepsCompleted();

  const handleClosePopup = () => {
    setShowPopup(false);
    // Reset form when popup is closed
    setUserName("");
    setUserMobile("");
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <section id="appointment" className="py-24 bg-background relative overflow-hidden">
      {isSyncingAppointments && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/45 backdrop-blur-sm">
          <div className="rounded-3xl bg-white/95 border border-slate-200/80 p-8 flex flex-col items-center gap-4 shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl animate-spin">
              ⏳
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">Syncing appointments details</p>
              <p className="text-sm text-muted-foreground mt-1">Please wait while we load your latest booking data.</p>
            </div>
          </div>
        </div>
      )}
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary">✨ Easy & Convenient</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Book Your
              <span className="block text-primary font-semibold">Appointment</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Take the first step towards your wellness journey. Select your preferred date and time slots at your convenience.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Progress</span>
              <span className="text-xs font-medium text-muted-foreground">{stepsCompleted} of {totalSteps}</span>
            </div>
            <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden backdrop-blur-sm border border-border/30">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500 ease-out rounded-full"
                style={{width: `${(stepsCompleted / totalSteps) * 100}%`}}
              />
            </div>
          </div>

          {/* Booking Form Card */}
          <Card className="bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl p-8 animate-fade-in relative overflow-hidden group">
            {/* Glassmorphism shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="space-y-7 relative z-10">
              {/* Step 1: Date Selection */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                    1
                  </div>
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span>📅</span> Select Your Date
                  </label>
                </div>
                <div className="ml-11">
                  <Input
                    type="date"
                    value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                    min={format(getToday(), "yyyy-MM-dd")}
                    max={format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")}
                    onChange={handleDateChange}
                    disabled={isSubmitting}
                    className="bg-white/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50"
                  />
                  {selectedDate && <p className="text-xs text-primary mt-2 font-medium">✓ {format(selectedDate, "EEEE, MMMM d")}</p>}
                </div>
              </div>

              {/* Step 2: Time Selection */}
              {selectedDate && !fullyBookedDates.includes(format(selectedDate, "yyyy-MM-dd")) && (
                <div className="relative animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                      2
                    </div>
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <span>⏰</span> Choose Time Slot
                    </label>
                  </div>
                  <div className="ml-11">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {getTimeSlotsForDate(selectedDate).map(time => {
                        const isBooked = isSlotBooked(selectedDate, time);
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            disabled={isBooked || isSubmitting}
                            onClick={() => handleTimeSelect(time)}
                            className={`group/slot px-3 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-300 transform ${
                              isBooked
                                ? "bg-muted/30 text-muted-foreground cursor-not-allowed border-border/20 opacity-50"
                                : isSelected
                                ? "bg-gradient-primary text-white border-primary shadow-lg scale-105"
                                : "bg-white/40 text-foreground border-border/30 hover:border-primary/50 hover:shadow-md hover:scale-102 backdrop-blur-sm"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    {selectedTime && <p className="text-xs text-primary mt-3 font-medium">✓ {selectedTime} selected</p>}
                  </div>
                </div>
              )}

              {/* Fully booked message */}
              {selectedDate && fullyBookedDates.includes(format(selectedDate, "yyyy-MM-dd")) && (
                <div className="animate-fade-in bg-amber-50/60 backdrop-blur-sm border-2 border-amber-200/50 rounded-xl p-5 text-amber-900">
                  <p className="font-semibold flex items-center gap-2 mb-1">
                    <span>📅</span> Date Fully Booked
                  </p>
                  <p className="text-sm mt-2">All time slots are reserved. Please select another date.</p>
                </div>
              )}

              {/* Step 3: Personal Information */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                    3
                  </div>
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span>👤</span> Your Details
                  </label>
                </div>
                <div className="ml-11 space-y-3">
                  <div>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      disabled={isSubmitting}
                      className="bg-white/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50"
                    />
                    {userName.trim() && <p className="text-xs text-primary mt-1.5 font-medium">✓ Name entered</p>}
                  </div>
                  
                  <div>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={userMobile}
                      onChange={e => setUserMobile(e.target.value.replace(/\D/g, ""))}
                      maxLength={10}
                      disabled={isSubmitting}
                      className="bg-white/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50"
                    />
                    {userMobile.trim() && /^\d{10}$/.test(userMobile.trim()) && (
                      <p className="text-xs text-primary mt-1.5 font-medium">✓ Valid mobile number</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 4: Confirmation */}
              {stepsCompleted === totalSteps && (
                <div className="relative animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-600 text-sm font-semibold">
                      ✓
                    </div>
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <span>🎯</span> Ready to Confirm
                    </label>
                  </div>
                </div>
              )}

              {/* Book button */}
              {selectedDate && selectedTime && !fullyBookedDates.includes(format(selectedDate, "yyyy-MM-dd")) && (
                <Button
                  onClick={handleBookAppointment}
                  disabled={isSubmitting || stepsCompleted !== totalSteps}
                  className={`w-full py-4 mt-4 font-semibold text-base transition-all duration-500 transform ${
                    stepsCompleted === totalSteps
                      ? "bg-gradient-primary hover:shadow-xl hover:scale-102 active:scale-95"
                      : "bg-gradient-primary opacity-60 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block animate-spin">⏳</span> Booking...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>🚀</span> Confirm Appointment
                    </span>
                  )}
                </Button>
              )}
            </div>
          </Card>

          {/* Info box */}
          <Card className="bg-white/30 backdrop-blur-xl border border-white/50 shadow-xl p-8 mt-10 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Why book with us?</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3 group">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                    <span className="group-hover:text-foreground transition-colors"><span className="font-semibold text-foreground">Easy & Fast</span> – Book in just 4 simple steps</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                    <span className="group-hover:text-foreground transition-colors"><span className="font-semibold text-foreground">Real-time Availability</span> – See available slots instantly</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                    <span className="group-hover:text-foreground transition-colors"><span className="font-semibold text-foreground">Flexible Scheduling</span> – Custom time slots per date</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                    <span className="group-hover:text-foreground transition-colors"><span className="font-semibold text-foreground">30-Day Window</span> – Book up to a month in advance</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Success popup */}
      {showPopup && bookingSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-black/30 backdrop-blur-sm absolute inset-0" 
            onClick={handleClosePopup} 
          />
          <Card className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-10 z-10 max-w-sm w-full text-center animate-fade-in relative overflow-hidden">
            {/* Success animation background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 animate-pulse" />
            
            <div className="relative z-10">
              {/* Success checkmark with animation */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-5xl animate-bounce">
                  ✓
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-foreground mb-2">Perfect!</h3>
              <p className="text-lg font-semibold text-primary mb-2">Appointment Confirmed</p>
              
              <p className="text-muted-foreground text-sm mb-8">
                Your appointment has been successfully booked and saved. We look forward to seeing you!
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-8 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <span>📅</span> Date
                  </span>
                  <p className="font-semibold text-foreground">
                    {selectedDate && format(selectedDate, "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="h-px bg-border/30" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <span>⏰</span> Time
                  </span>
                  <p className="font-semibold text-foreground">{selectedTime}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If you need to reschedule, please contact us at least 24 hours in advance.
                </p>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    const message = `Hello Cura Mentis! I have just booked a new appointment.\n*Name:* ${userName}\n*Mobile:* ${userMobile}\n*Date:* ${selectedDate ? format(selectedDate, "MMM dd, yyyy") : ""}\n*Time:* ${selectedTime}`;
                    const encoded = encodeURIComponent(message);
                    window.open(`https://wa.me/917012241360?text=${encoded}`, "_blank");
                    handleClosePopup();
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-102 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 .5C6.21.5 1.5 5.21 1.5 11c0 1.95.51 3.86 1.48 5.56L.5 23.5l6.98-2.01A11.5 11.5 0 0 0 12 22.5c5.79 0 10.5-4.71 10.5-10.5 0-1.92-.52-3.72-1.98-5.02zM12 20.5c-.98 0-1.95-.25-2.79-.72l-.2-.12-4.15 1.2 1.16-3.82-.13-.2A8.44 8.44 0 0 1 3.5 11c0-4.7 3.82-8.5 8.5-8.5 4.7 0 8.5 3.8 8.5 8.5S16.7 20.5 12 20.5z" /><path d="M17.03 14.47c-.27-.14-1.59-.78-1.84-.86-.24-.08-.42-.14-.6.14-.17.27-.66.86-.82 1.04-.15.18-.31.2-.57.07-.26-.14-1.09-.4-2.07-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.27-.02-.41.11-.55.11-.11.26-.28.39-.42.13-.14.17-.24.26-.4.09-.17.05-.32-.02-.45-.07-.13-.6-1.44-.82-1.96-.22-.52-.44-.45-.6-.46l-.51-.01c-.17 0-.45.06-.69.32-.24.26-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.72.13.18 1.86 2.86 4.51 3.9 1.87.8 2.55.86 3.47.72.53-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.15-1.28-.07-.11-.25-.17-.52-.3z" /></svg>
                  Notify Clinic on WhatsApp
                </Button>
                <Button
                  onClick={handleClosePopup}
                  variant="ghost"
                  className="w-full text-muted-foreground hover:bg-slate-100"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
