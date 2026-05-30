"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface NavbarProps {
  _isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onNavigate: (path: string) => void;
}

export default function Navbar({
  _isSidebarOpen,
  toggleSidebar,
  onNavigate,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingUp = currentScrollPos < prevScrollPos;
      setIsScrolled(currentScrollPos > 50 && !scrollingUp);
      setIsTop(currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleSidebar();
  };

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
    <nav
      className={`fixed left-0 w-full font-zen-dots ${
        isScrolled || isTop ? "bg-transparent" : "bg-black"
      } text-white z-40 transition-transform duration-300 ${
        isScrolled ? "navbar-hidden" : "navbar-visible"
      } ${isTop && "lg:top-[40px]"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[1rem] sm:py-[2rem] flex justify-between items-center">
        <a onClick={() => onNavigate("/")} className="cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Gym Logo"
            width={122}
            height={70}
            className=""
          />
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              onClick={() => onNavigate(link.href)}
              className={`nav-link cursor-pointer ${
                pathname === link.href ? "active text-custom-teal" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <a
            onClick={() => onNavigate("/membership")}
            className="slanted-button text-white font-semibold cursor-pointer"
          >
            Become a Member
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={handleMenuClick} aria-label="Toggle menu">
            <Bars3Icon className="h-8 w-8 text-custom-teal" />
          </button>
        </div>
      </div>
    </nav>
  );
}
