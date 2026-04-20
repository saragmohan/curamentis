import { Card } from "@/components/ui/card";

export default function ClinicLocation() {
  // Coordinates: 11.763141036903706, 75.51045426232034
  const latitude = 11.763141036903706;
  const longitude = 75.51045426232034;
  const mapEmbedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
  const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

  return (
    <section id="location" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-semibold text-primary">📍 Find Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Visit Our
            <span className="block text-primary font-semibold">Center</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Located in a peaceful, welcoming environment designed for your comfort and healing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Map Section */}
          <Card className="bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden animate-fade-in">
            <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Cura Mentis Clinic Location Map"
              />
            </div>
          </Card>

          {/* Info Section */}
          <div className="space-y-6 animate-fade-in">
            {/* Clinic Info Card */}
            <Card className="bg-gradient-card shadow-large border-0 p-8">
              <div className="space-y-6">
                {/* Address */}
                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-primary/20 transition-colors">
                      📍
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                        Location
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Chonadam, Thalassery
                        <br />
                        Kerala, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-primary/20 transition-colors">
                      📞
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                        Phone
                      </h3>
                      <a 
                        href="tel:+917012241360"
                        className="text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        +91 7012241360
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-primary/20 transition-colors">
                      ✉️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                        Email
                      </h3>
                      <a 
                        href="mailto:thecuramentis@gmail.com"
                        className="text-primary hover:text-primary/80 transition-colors font-medium break-all"
                      >
                        thecuramentis@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-primary/20 transition-colors">
                      🕐
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                        Hours
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: By appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/20" />

                {/* CTA Button */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-102 active:scale-95"
                >
                  <span>🗺️</span>
                  <span>Get Directions</span>
                </a>
              </div>
            </Card>

            {/* Info Box */}
            <Card className="bg-primary/5 border border-primary/10 p-6 animate-fade-in">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Welcome to our space:</span> Our clinic is designed with tranquility and comfort in mind. We maintain a serene, judgment-free environment where you can feel completely at ease during your sessions.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
