import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/ui/WhatsappButton";

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

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-primary/5 border-t border-border/30">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-primary mb-2">
              Curamentis
            </h3>
            <p className="text-muted-foreground text-sm">
              Healing Minds, Nurturing Growth
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
            <span className="text-muted-foreground text-sm">
              (+91) 7012241360
            </span>
            <span className="text-muted-foreground text-sm">
              thecuramentis@gmail.com
            </span>
          </div>

          <div className="border-t border-border/30 pt-6">
            <p className="text-muted-foreground text-xs">
              © 2026 Curamentis. All rights reserved.
              <span className="block mt-1">
                Confidential mental health services in a safe, supportive
                environment.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
