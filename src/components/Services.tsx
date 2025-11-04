import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Individual Therapy",
      description:
        "One-on-one sessions tailored to your unique needs and goals, focusing on personal growth and healing.",
      icon: "🧘‍♀️",
      features: [
        "Anxiety & Depression",
        "Trauma Recovery",
        "Life Transitions",
        "Self-Esteem",
      ],
    },
    {
      title: "Couples Counseling",
      description:
        "Strengthen your relationship through improved communication and deeper understanding.",
      icon: "💕",
      features: [
        "Communication Skills",
        "Conflict Resolution",
        "Intimacy Building",
        "Trust Rebuilding",
      ],
    },
    {
      title: "Family Therapy",
      description:
        "Create healthier family dynamics and improve relationships between family members.",
      icon: "👨‍👩‍👧‍👦",
      features: [
        "Family Dynamics",
        "Parenting Support",
        "Teen Counseling",
        "Blended Families",
      ],
    },
    {
      title: "Group Sessions",
      description:
        "Connect with others facing similar challenges in a supportive group environment.",
      icon: "🤝",
      features: [
        "Support Groups",
        "Skills Building",
        "Peer Connection",
        "Shared Growth",
      ],
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Therapeutic
            <span className="block text-primary font-medium">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive mental health support tailored to your individual
            journey toward wellness and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-gradient-card shadow-soft border-0 p-8 text-center hover:shadow-large transition-all duration-700 hover:-translate-y-2 group"
            >
              <div className="text-5xl mb-6 group-hover:animate-gentle-float">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mr-2 mb-2"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
