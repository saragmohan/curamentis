
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/ui/WhatsappButton";
import AppointmentBooking from "@/components/AppointmentBooking";
import ClinicLocation from "@/components/ClinicLocation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WhatsAppButton
        phone="917012241360"
        message="Hi, I would like to book a session."
      />


      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="appointment" className="py-8">
          <AppointmentBooking />
        </section>


        <section id="location">
          <ClinicLocation />
        </section>

        {/* <section id="contact">
          <Contact />
        </section> */}
      </main>

      {/* Footer */}
      <footer id="contact" className="py-12 bg-primary/5 border-t border-border/30">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-primary mb-2">
              Cura Mentis
            </h3>
            <p className="text-muted-foreground text-sm">
              Your path to mindful living.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
            <span className="text-muted-foreground text-sm">
              (+91) 7012241360
            </span>
            <span className="text-muted-foreground text-sm">
              thecuramentis@gmail.com
            </span>
            <a
              href="https://www.instagram.com/curamentis_wellness?utm_source=qr&igsh=MWJxMG9yNGVwa2J6OQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground text-sm inline-flex items-center space-x-2"
              aria-label="Open Curamentis Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm6.2-3.7a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2z" />
              </svg>
              <span>curamentis_wellness</span>
            </a>
          </div>

          <div className="border-t border-border/30 pt-6 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <a href="/admin" className="text-xs font-medium text-muted-foreground/50 hover:text-primary transition-colors flex items-center gap-1 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Login
              </a>
            </div>
            <div className="text-center order-1 md:order-2">
              <p className="text-muted-foreground text-xs">
                © 2026 Cura Mentis. All rights reserved.
                <span className="block mt-1">
                  Confidential mental health services in a safe, supportive
                  environment.
                </span>
              </p>
            </div>
            <div className="hidden md:block order-3"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
