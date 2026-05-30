"use client";

import { useEffect } from "react";
import {
  XMarkIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onNavigate: (path: string) => void;
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node) && isSidebarOpen) {
        toggleSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isSidebarOpen, toggleSidebar]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/trainers", label: "Trainers" },
    { href: "/classes", label: "Classes" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div
      className={`font-zen-dots ${
        isSidebarOpen ? "backdrop-blur fixed inset-0 z-40" : ""
      }`}
    >
      <div
        id="sidebar"
        className={`fixed top-0 bottom-0 right-0 h-full w-64 bg-black text-white z-50 md:hidden border-2 border-[#028b8f] overflow-y-scroll ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar();
            }}
            className="self-end"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-8 w-8 text-custom-teal" />
          </button>
          <div className="flex justify-center my-6">
            <a
              onClick={() => {
                toggleSidebar();
                onNavigate("/");
              }}
              className="cursor-pointer"
            >
              <Image
                src="/images/logo.png"
                alt="Gym Logo"
                width={48}
                height={48}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>
          </div>
          <div className="flex flex-col items-start gap-4 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                onClick={() => {
                  toggleSidebar();
                  onNavigate(link.href);
                }}
                className={`sidebar-link cursor-pointer ${
                  pathname === link.href
                    ? "active bg-custom-teal text-black"
                    : ""
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              onClick={() => {
                toggleSidebar();
                onNavigate("/membership");
              }}
              className="slanted-button text-white font-semibold cursor-pointer"
            >
              Become a Member
            </a>
          </div>
          <div className="flex flex-col items-center gap-4 text-sm border-t pt-4 pb-[2rem]">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-custom-teal" />
              <span>Faisalabad, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-custom-teal" />
              <span>Sunday to Friday: 8:00 AM - 9:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-custom-teal" />
              <span>+923360763840</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
