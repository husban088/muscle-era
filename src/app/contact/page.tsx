"use client";

import { useState } from "react";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <main className="contact-page">
      {/* ─── HERO BANNER ─── */}
      <section className="contact-banner">
        <div className="contact-banner-overlay" />
        <div className="contact-banner-content">
          <p className="contact-banner-sub">GET IN TOUCH</p>
          <h1 className="contact-banner-title">CONTACT US</h1>
          <div className="contact-banner-divider" />
          <p className="contact-banner-breadcrumb">
            <span>Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">Contact</span>
          </p>
        </div>
      </section>

      {/* ─── INFO CARDS ─── */}
      <section className="contact-info-section">
        <div className="contact-info-grid">
          {/* Location */}
          <div className="contact-info-card card-delay-0">
            <div className="info-card-icon">
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
            <h3>OUR LOCATION</h3>
            <p>123 Fitness Boulevard</p>
            <p>Melbourne VIC 3000</p>
            <p>Australia</p>
          </div>

          {/* Phone */}
          <div className="contact-info-card card-delay-1">
            <div className="info-card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3>PHONE NUMBER</h3>
            <p>+61 3 9876 5432</p>
            <p>+61 4 1234 5678</p>
            <p>Mon–Sat: 6AM – 10PM</p>
          </div>

          {/* Email */}
          <div className="contact-info-card card-delay-2">
            <div className="info-card-icon">
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
            <h3>EMAIL ADDRESS</h3>
            <p>info@muscleera.com.au</p>
            <p>support@muscleera.com.au</p>
            <p>We reply within 24hrs</p>
          </div>

          {/* Hours */}
          <div className="contact-info-card card-delay-2">
            <div className="info-card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>OPENING HOURS</h3>
            <p>Mon – Fri: 5AM – 11PM</p>
            <p>Sat – Sun: 6AM – 9PM</p>
            <p>Public Holidays: 7AM – 7PM</p>
          </div>
        </div>
      </section>

      {/* ─── FORM + MAP ─── */}
      <section className="contact-main-section">
        {/* Section heading */}
        <div className="contact-section-heading">
          <p className="section-sub-label">REACH OUT</p>
          <h2 className="section-main-title">SEND US A MESSAGE</h2>
          <div className="section-title-line" />
        </div>

        <div className="contact-form-map-wrapper">
          {/* Form */}
          <div className="contact-form-box">
            {submitted && (
              <div className="form-success-msg">
                ✅ Message sent! We&apos;ll get back to you shortly.
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+61 4XX XXX XXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="membership">Membership Enquiry</option>
                    <option value="personal-training">Personal Training</option>
                    <option value="classes">Fitness Classes</option>
                    <option value="pricing">Pricing & Plans</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                <span>SEND MESSAGE</span>
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
          </div>

          {/* Map */}
          <div className="contact-map-box">
            <div className="map-label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Muscle Era — Melbourne, Australia</span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345256167!2d144.9537353!3d-37.8162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Muscle Era Location"
            />
          </div>
        </div>
      </section>

      {/* ─── SOCIAL STRIP ─── */}
      <section className="contact-social-strip">
        <p>FOLLOW US</p>
        <div className="social-links">
          <a href="#" aria-label="Instagram" className="social-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </a>
          <a href="#" aria-label="Facebook" className="social-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            <span>Facebook</span>
          </a>
          <a href="#" aria-label="YouTube" className="social-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
            </svg>
            <span>YouTube</span>
          </a>
          <a href="#" aria-label="TikTok" className="social-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
            </svg>
            <span>TikTok</span>
          </a>
        </div>
      </section>
    </main>
  );
}
