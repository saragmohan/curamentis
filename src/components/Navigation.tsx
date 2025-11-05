import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "../../public/Assets/logo_curamentis.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Cura Mentis logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-medium text-xl text-primary">
              Cura Mentis
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Services
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </a>
            <Button
              size="sm"
              className="bg-gradient-primary hover:shadow-medium transition-all duration-300 px-6"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Session
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Contact
              </a>
              <Button
                size="sm"
                className="bg-gradient-primary hover:shadow-medium transition-all duration-300 w-fit"
              >
                Book Session
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
