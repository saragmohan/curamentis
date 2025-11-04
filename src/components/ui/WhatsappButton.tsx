import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  phone: string; // e.g. "919895629261"
  message?: string;
  className?: string;
};

const WhatsAppButton: React.FC<Props> = ({
  phone,
  message = "Hi!%20I%20would%20like%20to%20book%20a%20session.",
  className = "",
}) => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encoded}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 ${className}`}
    >
      <Button
        size="lg"
        className="rounded-full px-4 py-3 bg-[#25D366] hover:brightness-95 shadow-lg text-white flex items-center space-x-3"
      >
        {/* WhatsApp SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12 .5C6.21.5 1.5 5.21 1.5 11c0 1.95.51 3.86 1.48 5.56L.5 23.5l6.98-2.01A11.5 11.5 0 0 0 12 22.5c5.79 0 10.5-4.71 10.5-10.5 0-1.92-.52-3.72-1.98-5.02zM12 20.5c-.98 0-1.95-.25-2.79-.72l-.2-.12-4.15 1.2 1.16-3.82-.13-.2A8.44 8.44 0 0 1 3.5 11c0-4.7 3.82-8.5 8.5-8.5 4.7 0 8.5 3.8 8.5 8.5S16.7 20.5 12 20.5z" />
          <path d="M17.03 14.47c-.27-.14-1.59-.78-1.84-.86-.24-.08-.42-.14-.6.14-.17.27-.66.86-.82 1.04-.15.18-.31.2-.57.07-.26-.14-1.09-.4-2.07-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.27-.02-.41.11-.55.11-.11.26-.28.39-.42.13-.14.17-.24.26-.4.09-.17.05-.32-.02-.45-.07-.13-.6-1.44-.82-1.96-.22-.52-.44-.45-.6-.46l-.51-.01c-.17 0-.45.06-.69.32-.24.26-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.72.13.18 1.86 2.86 4.51 3.9 1.87.8 2.55.86 3.47.72.53-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.15-1.28-.07-.11-.25-.17-.52-.3z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>
    </a>
  );
};

export default WhatsAppButton;
