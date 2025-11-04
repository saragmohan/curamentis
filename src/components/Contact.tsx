import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
                Ready to Begin
                <span className="block text-primary font-medium">
                  Your Journey?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Taking the first step toward mental wellness can feel
                overwhelming. I'm here to make that step as comfortable as
                possible.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-soft border-0 p-6 hover:shadow-medium transition-all duration-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Phone</h3>
                    <p className="text-muted-foreground">(+91) 98956 29261</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card shadow-soft border-0 p-6 hover:shadow-medium transition-all duration-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <p className="text-muted-foreground">dr.chen@therapy.com</p>
                  </div>
                </div>
              </Card>

              {/* <Card className="bg-gradient-card shadow-soft border-0 p-6 hover:shadow-medium transition-all duration-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Office</h3>
                    <p className="text-muted-foreground">
                      123 Wellness St, Suite 200
                      <br />
                      Peaceful City, PC 12345
                    </p>
                  </div>
                </div>
              </Card> */}

              {/* <Card className="bg-gradient-card shadow-soft border-0 p-6 hover:shadow-medium transition-all duration-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">🕐</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Hours</h3>
                    <p className="text-muted-foreground">
                      Mon-Fri: 9:00 AM - 6:00 PM
                      <br />
                      Sat: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </Card> */}
            </div>
          </div>

          {/* Contact Form */}
          {/* <Card className="bg-gradient-card shadow-large border-0 p-8 animate-fade-in">
            <h3 className="text-2xl font-medium text-foreground mb-6">
              Send a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="First Name"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Last Name"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300"
                  />
                </div>
              </div>
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300"
              />
              <Input
                type="tel"
                placeholder="Phone Number (Optional)"
                className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300"
              />
              <Textarea
                placeholder="How can I help you today? Feel free to share what brings you here..."
                rows={5}
                className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300 resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-medium transition-all duration-500 py-3"
              >
                Send Message
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Your privacy is important. All messages are confidential.
            </p>
          </Card> */}
          <Card className="bg-gradient-card shadow-large border-0 p-8 animate-fade-in">
            <h3 className="text-2xl font-medium text-foreground mb-6">
              Send a Message
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300"
                  />
                </div>
                <div>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300"
                  />
                </div>
              </div>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300"
              />
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number (Optional)"
                className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300"
              />
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help you today? Feel free to share what brings you here..."
                rows={5}
                className="bg-background/50 border-border/50 focus:border-primary transition-colors duration-300 resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-medium transition-all duration-500 py-3"
              >
                Send Message
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Your privacy is important. All messages are confidential.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
