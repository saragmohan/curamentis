import { Button } from "@/components/ui/button";
import logo from "../../public/Assets/logo_curamentis.png";
import heroImage from "../../public/Assets/therapy-room.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 animate-gentle-float"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <img
            src={logo}
            alt="Cura Mentis logo"
            className="mx-auto mb-6 w-20 h-20 object-contain"
          />

          <h1 className="text-5xl md:text-7xl font-light mb-8 text-foreground leading-tight">
            Cura Mentis
            <span className="block text-primary font-medium">
              Where Transformation Begins Within
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            A safe space for healing and growth. Through counseling,
            hypnotherapy, and life coaching, we help you build resilience and
            reconnect with your true self.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-primary hover:shadow-medium transition-all duration-500 text-lg px-8 py-6 rounded-full"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Schedule a Session
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-soft-pulse blur-sm hidden lg:block" />
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-primary/10 rounded-full animate-gentle-float blur-sm hidden lg:block" />
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-secondary/30 rounded-full animate-soft-pulse blur-sm hidden lg:block" />
      </div>
    </section>
  );
};

export default Hero;
