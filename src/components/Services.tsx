import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Individual Counseling",
      description:
        "Personalized one-on-one sessions to help you manage anxiety, depression, low self-esteem, stress, or life transitions.Each session is a safe space to understand your emotions and build healthier coping patterns.",
      icon: "🧘‍♀️",
      features: [
        "Anxiety & Depression",
        "Trauma Recovery",
        "Life Transitions",
        "Self-Esteem",
        "Personal Growth",
      ],
    },
    {
      title: "Child & Adolescent Counseling",
      description:
        "Therapeutic care for children and teens facing academic pressure, behavioral issues, emotional distress, or social difficulties. Sessions are gentle, engaging, and age-appropriate.",
      icon: "🧒",
      features: [
        "Academic Stress & Exam Anxiety",
        "Behavioral & Attention Issues",
        "Social & Peer Relationship Challenges",
        "Confidence & Self-Esteem Building",
        "Early Intervention & Preventive Care",
      ],
    },
    {
      title: "Relationship & Marital Therapy",
      description:
        "A supportive space for couples to reconnect, improve communication, rebuild trust, and understand emotional needs—helping you nurture a relationship based on empathy and balance.",
      icon: "💕",
      features: [
        "Communication Enhancement",
        "Conflict Resolution",
        "Trust Building & Healing",
        "Emotional Intimacy",
        "Managing Anger & Misunderstandings",
      ],
    },
    {
      title: "Family Therapy",
      description:
        "Guidance for families navigating conflict, parenting concerns, or emotional distance. Therapy helps each member express themselves better and rebuild harmony within the home.",
      icon: "👨‍👩‍👧‍👦",
      features: [
        "Parent–Child Relationship Support",
        "Family Conflict Resolution",
        "Communication & Understanding",
        "Blended Family Adjustment",
        "Emotional Bonding & Trust",
      ],
    },
    {
      title: "Hypnotherapy",
      description:
        "A focused and deeply relaxing approach that works with the subconscious mind to promote emotional healing, manage fears, and release unwanted patterns.",
      icon: "🌀",
      features: [
        "Stress Reduction",
        "Anxiety Management",
        "Trauma Healing",
        "Behavioral Change",
        "Self-Discovery",
      ],
    },
    {
      title: " Life Coaching",
      description:
        "Goal-focused sessions that help you identify your strengths, break limiting beliefs, and create a fulfilling path toward personal and professional growth.",
      icon: "🎯",
      features: [
        "Personal & Professional Growth",
        "Goal Setting & Achievement",
        "Confidence & Self-Empowerment",
        "Decision Making & Clarity",
        "Motivation & Habit Building",
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

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const positionClass =
              index >= 4
                ? index === 4
                  ? "lg:col-start-2"
                  : "lg:col-start-3"
                : "";

            return (
              <Card
                key={index}
                className={`${positionClass} bg-gradient-card shadow-soft border-0 p-8 text-center hover:shadow-large transition-all duration-700 hover:-translate-y-2 group`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
