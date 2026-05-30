"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Chat({ toggleChat }: { toggleChat: () => void }) {
  const phoneNumber = "61XXXXXXXXXX"; // Apna WhatsApp number daalo (country code ke saath, + ke bina)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Muscle%20Era%20membership.`;

  return (
    <div className="flex flex-col h-96 font-zen-dots">
      {/* Header */}
      <div className="flex items-center justify-between bg-teal-500 text-white px-4 py-3">
        <h3 className="text-lg font-semibold">Chat With Us</h3>
        <button onClick={toggleChat} aria-label="Close chat">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center flex-grow gap-6 px-6 bg-white">
        <div className="text-center">
          <p className="text-gray-700 text-sm mb-1 font-semibold">
            👋 Hi! Welcome to Muscle Era
          </p>
          <p className="text-gray-500 text-xs">
            Click below to chat with us on WhatsApp. We typically reply within
            minutes!
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
        >
          {/* WhatsApp Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-6 w-6 fill-white"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.494 2.027 7.808L0 32l8.418-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.787-1.858l-.486-.29-5.003 1.196 1.225-4.874-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.307-9.907c-.4-.2-2.368-1.168-2.735-1.302-.367-.133-.634-.2-.9.2-.267.4-1.034 1.302-1.267 1.568-.233.267-.467.3-.867.1-.4-.2-1.688-.623-3.216-1.984-1.188-1.06-1.99-2.37-2.223-2.77-.233-.4-.025-.616.175-.815.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.168-1.233-2.968-.325-.78-.655-.673-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5s-1.4 1.368-1.4 3.335 1.433 3.868 1.633 4.135c.2.267 2.82 4.308 6.833 6.04.955.413 1.7.659 2.28.843.958.305 1.83.262 2.52.159.768-.115 2.368-.968 2.702-1.903.333-.934.333-1.735.233-1.903-.1-.167-.367-.267-.767-.467z" />
          </svg>
          Chat on WhatsApp
        </a>

        <p className="text-gray-400 text-xs text-center">Mon–Sat: 6am – 10pm</p>
      </div>
    </div>
  );
}
