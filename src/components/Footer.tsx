"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./footer.css";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/trainers", label: "Our Trainers" },
    { href: "/classes", label: "Fitness Classes" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing Plans" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ];

  const services = [
    "Personal Training",
    "Group Classes",
    "Strength & Conditioning",
    "Cardio Programs",
    "Nutrition Coaching",
    "Weight Loss Programs",
    "Muscle Building",
    "Recovery & Wellness",
  ];

  const workingHours = [
    { day: "Monday – Friday", time: "5:00 AM – 10:00 PM" },
    { day: "Saturday", time: "6:00 AM – 10:00 PM" },
    { day: "Sunday", time: "7:00 AM – 9:00 PM" },
    { day: "Public Holidays", time: "7:00 AM – 7:00 PM" },
  ];

  return (
    <footer className="footer">
      {/* ── TOP ACCENT BAR ── */}
      <div className="footer-accent-bar">
        <div className="footer-accent-inner">
          <div className="footer-accent-text">
            <span className="accent-label">JOIN THE ERA</span>
            <span className="accent-tagline">
              Transform Your Body. Elevate Your Life.
            </span>
          </div>
          <button
            className="footer-cta-btn"
            onClick={() => handleNavigate("/membership")}
          >
            <span>BECOME A MEMBER</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── MAIN FOOTER BODY ── */}
      <div className="footer-body">
        <div className="footer-grid">
          {/* ── COL 1: BRAND ── */}
          <div className="footer-col footer-brand-col">
            <div className="footer-logo" onClick={() => handleNavigate("/")}>
              <Image
                src="/images/logo.png"
                alt="Muscle Era Logo"
                width={130}
                height={75}
                className="footer-logo-img"
              />
            </div>
            <p className="footer-brand-desc">
              Australia&apos;s premier fitness destination. We are committed to
              transforming lives through world-class training, expert coaching,
              and a community that pushes you beyond your limits.
            </p>

            {/* Address */}
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span>123 Fitness Boulevard</span>
                  <span>Melbourne VIC 3000, Australia</span>
                </div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <span>+61 3 9876 5432</span>
                  <span>+61 4 1234 5678</span>
                </div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span>info@muscleera.com.au</span>
                  <span>support@muscleera.com.au</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── COL 2: QUICK LINKS ── */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span>QUICK LINKS</span>
              <div className="footer-col-line" />
            </h4>
            <ul className="footer-links-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    className="footer-nav-link"
                    onClick={() => handleNavigate(link.href)}
                  >
                    <span className="footer-link-arrow">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 3: SERVICES ── */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span>OUR SERVICES</span>
              <div className="footer-col-line" />
            </h4>
            <ul className="footer-links-list">
              {services.map((service) => (
                <li key={service}>
                  <button
                    className="footer-nav-link"
                    onClick={() => handleNavigate("/services")}
                  >
                    <span className="footer-link-arrow">›</span>
                    <span>{service}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 4: HOURS + NEWSLETTER ── */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span>WORKING HOURS</span>
              <div className="footer-col-line" />
            </h4>
            <ul className="footer-hours-list">
              {workingHours.map((item) => (
                <li key={item.day} className="footer-hours-item">
                  <span className="hours-day">{item.day}</span>
                  <span className="hours-time">{item.time}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h5 className="footer-newsletter-title">NEWSLETTER</h5>
              <p className="footer-newsletter-desc">
                Get exclusive offers, tips &amp; fitness updates straight to
                your inbox.
              </p>
              {subscribed ? (
                <div className="newsletter-success">
                  ✅ You&apos;re subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── SOCIAL BAR ── */}
      <div className="footer-social-bar">
        <div className="footer-social-inner">
          <span className="footer-social-label">FOLLOW US</span>
          <div className="footer-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon-btn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-icon-btn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="social-icon-btn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
              <span>YouTube</span>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="social-icon-btn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
              </svg>
              <span>TikTok</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="social-icon-btn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
              <span>Twitter / X</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()}{" "}
            <span className="footer-copy-brand">Muscle Era</span>. All Rights
            Reserved. Melbourne, Australia.
          </p>
          <div className="footer-bottom-links">
            <button
              onClick={() => handleNavigate("/privacy-policy")}
              className="footer-bottom-link"
            >
              Privacy Policy
            </button>
            <span className="footer-bottom-sep">|</span>
            <button
              onClick={() => handleNavigate("/terms")}
              className="footer-bottom-link"
            >
              Terms &amp; Conditions
            </button>
            <span className="footer-bottom-sep">|</span>
            <button
              onClick={() => handleNavigate("/sitemap")}
              className="footer-bottom-link"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>

      {/* ── BACK TO TOP ── */}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </footer>
  );
}
