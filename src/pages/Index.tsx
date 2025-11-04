import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

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
              (+91) 98956 29261
            </span>
            <span className="text-muted-foreground text-sm">
              sijishasacheendran@gmail.com
            </span>
          </div>

          <div className="border-t border-border/30 pt-6">
            <p className="text-muted-foreground text-xs">
              © 2024 Curamentis. All rights reserved.
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
