import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const BACKEND_URL = "http://localhost:8081/api";

interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  mobile: string;
}

interface BlockedSlot {
  id: string;
  date: string;
  time: string;
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"appointments" | "slots">("appointments");
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ id: string; date: string; availableTimes: string[] }[]>([]);
  
  const [blockDate, setBlockDate] = useState("");
  const [blockTime, setBlockTime] = useState("");

  const [customDate, setCustomDate] = useState("");
  const [customTimesInput, setCustomTimesInput] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  const fetchAppointments = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/admin/appointments`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      setAppointments(await res.json());
    } else if (res.status === 401) {
      handleLogout();
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/admin/appointments/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      fetchAppointments();
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Booked Appointments", 14, 15);
    
    const tableColumn = ["Date", "Time", "Patient Name", "Mobile"];
    const tableRows = appointments
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime())
      .map(app => [app.date, app.time, app.name, app.mobile]);
      
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    
    doc.save(`Appointments_${format(new Date(), "yyyy-MM-dd")}.pdf`);
  };

  const downloadExcel = () => {
    const tableData = appointments
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime())
      .map(app => ({
        "Date": app.date,
        "Time": app.time,
        "Patient Name": app.name,
        "Mobile": app.mobile
      }));
      
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
    XLSX.writeFile(workbook, `Appointments_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  const fetchBlockedSlots = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/admin/blocked-slots`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      setBlockedSlots(await res.json());
    }
  };

  const fetchTimeSlots = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/admin/time-slots`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      setTimeSlots(await res.json());
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchAppointments();
      fetchBlockedSlots();
      fetchTimeSlots();
    }
  }, [isLoggedIn]);

  const handleUpdateTimeSlots = async () => {
    if (!customDate || !customTimesInput) return;
    const times = customTimesInput.split(',').map(t => t.trim()).filter(Boolean);
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/admin/time-slots`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ date: customDate, availableTimes: times })
    });
    if (res.ok) {
      setCustomDate("");
      setCustomTimesInput("");
      fetchTimeSlots();
    }
  };

  const handleDeleteTimeSlot = async (date: string) => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/admin/time-slots/${date}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      fetchTimeSlots();
    }
  };

  const handleBlockSlot = async () => {
    if (!blockDate || !blockTime) return;
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/admin/blocked-slots`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ date: blockDate, time: blockTime })
    });
    if (res.ok) {
      setBlockDate("");
      setBlockTime("");
      fetchBlockedSlots();
    }
  };

  const handleUnblockSlot = async (date: string, time: string) => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/admin/blocked-slots`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ date, time })
    });
    if (res.ok) {
      fetchBlockedSlots();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
        <div className="absolute top-6 left-6">
          <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2" onClick={() => window.location.href = '/'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Home
          </Button>
        </div>
        <Card className="w-full max-w-md p-8 shadow-xl bg-white/80 backdrop-blur-xl border-white/50">
          <h1 className="text-3xl font-bold text-center text-primary mb-8">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">Username</label>
              <Input value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">Password</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-6">Login</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-foreground">Curamentis Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2" onClick={() => window.location.href = '/'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Home
            </Button>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            variant={activeTab === "appointments" ? "default" : "outline"} 
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </Button>
          <Button 
            variant={activeTab === "slots" ? "default" : "outline"} 
            onClick={() => setActiveTab("slots")}
          >
            Slot Management
          </Button>
        </div>

        {activeTab === "appointments" && (
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-bold">All Booked Appointments</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={downloadExcel} className="gap-2 text-green-700 hover:text-green-800 hover:bg-green-50 border-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={downloadPDF} className="gap-2 text-red-700 hover:text-red-800 hover:bg-red-50 border-red-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  PDF
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-4 font-semibold rounded-tl-lg">Date</th>
                    <th className="p-4 font-semibold">Time</th>
                    <th className="p-4 font-semibold">Patient Name</th>
                    <th className="p-4 font-semibold">Mobile</th>
                    <th className="p-4 font-semibold rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.length === 0 ? (
                    <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No appointments found.</td></tr>
                  ) : (
                    appointments.sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime()).map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-medium text-primary">{app.date}</td>
                        <td className="p-4">{app.time}</td>
                        <td className="p-4 font-medium">{app.name}</td>
                        <td className="p-4">{app.mobile}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50" onClick={() => handleDeleteAppointment(app.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "slots" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Block a Time Slot</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1 block">Date</label>
                    <Input type="date" value={blockDate} onChange={e => setBlockDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1 block">Time (e.g. 09:00)</label>
                    <Input type="time" value={blockTime} onChange={e => setBlockTime(e.target.value)} />
                  </div>
                  <Button onClick={handleBlockSlot} className="w-full">Block Slot</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Currently Blocked Slots</h2>
                {blockedSlots.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No slots are currently blocked.</p>
                ) : (
                  <div className="space-y-3">
                    {blockedSlots.map(slot => (
                      <div key={slot.id} className="flex justify-between items-center p-3 bg-red-50 text-red-900 rounded-lg border border-red-100">
                        <div>
                          <span className="font-bold">{slot.date}</span> at <span className="font-bold">{slot.time}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-100" onClick={() => handleUnblockSlot(slot.date, slot.time)}>
                          Unblock
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Manage Custom Time Slots</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1 block">Date to override</label>
                    <Input type="date" value={customDate} onChange={e => setCustomDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1 block">Available Times (Comma separated)</label>
                    <Input placeholder="e.g. 10:00, 11:30, 15:00" value={customTimesInput} onChange={e => setCustomTimesInput(e.target.value)} />
                  </div>
                  <Button onClick={handleUpdateTimeSlots} className="w-full">Update Available Slots</Button>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-slate-500">Currently Overridden Dates</h3>
                  {timeSlots.length === 0 ? (
                    <p className="text-sm text-slate-500">No custom schedules defined.</p>
                  ) : (
                    <div className="space-y-3">
                      {timeSlots.map(ts => (
                        <div key={ts.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                          <div>
                            <span className="font-bold text-primary block mb-1">{ts.date}</span>
                            <span className="text-slate-600">{ts.availableTimes.join(", ")}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50" onClick={() => handleDeleteTimeSlot(ts.date)}>
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
