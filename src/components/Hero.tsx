import { Button } from "@/components/ui/button";
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
          <h1 className="text-5xl md:text-7xl font-light mb-8 text-foreground leading-tight">
            Find Your
            <span className="block text-primary font-medium">Inner Peace</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            A safe space for healing, growth, and self-discovery. Together,
            we'll navigate your journey toward mental wellness.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-primary hover:shadow-medium transition-all duration-500 text-lg px-8 py-6 rounded-full"
            >
              Schedule a Session
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-500"
            >
              Learn More
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
