import { Card } from "@/components/ui/card";
import profilePhoto from "../../public/Assets/Sijisha_Sacheendran.jpg";

const About = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <div className="relative">
            <Card className="bg-gradient-card shadow-medium border-0 p-2 transform rotate-2 hover:rotate-1 transition-transform duration-700">
              <div className="aspect-[4/5] bg-accent/20 rounded-lg flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-gentle-float"
                  style={{ backgroundImage: `url(${profilePhoto})` }}
                />
              </div>
            </Card>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary/30 rounded-full blur-xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-lg -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
                Hello, I'm
                <span className="block text-primary font-medium">
                  Sijisha Sacheendran
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                With MSc and MA in Psychology, a Post Graduate Diploma in
                Counseling Psychology (PGDCP), and specialized diplomas in Child
                & Adolescent Counseling and Hypnotherapy.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I offer a warm, supportive space where you can feel safe,
                understood, and gently guided toward healing, balance, and
                personal growth.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-card shadow-soft border-0 p-6 text-center hover:shadow-medium transition-all duration-500">
                <div className="text-3xl font-light text-primary mb-2">2+</div>
                <div className="text-muted-foreground text-sm">
                  Years Experience
                </div>
              </Card>
              <Card className="bg-gradient-card shadow-soft border-0 p-6 text-center hover:shadow-medium transition-all duration-500">
                <div className="text-3xl font-light text-primary mb-2">50+</div>
                <div className="text-muted-foreground text-sm">
                  Clients Helped
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
