"use client";

import { useState } from "react";
import Image from "next/image";
import "./blog.css";

/* ─── BLOG DATA ─── */
const allPosts = [
  {
    id: 1,
    tag: "Nutrition",
    title: "The Ultimate Pre-Workout Meal Guide For Maximum Gains",
    excerpt:
      "Fuel your body the right way before every session. Learn which macros to prioritize and when to eat for peak performance.",
    date: "May 20, 2025",
    readTime: "5 min read",
    author: "Alex Carter",
    authorInitials: "AC",
    image: "/images/blog1.jfif",
    category: "nutrition",
  },
  {
    id: 2,
    tag: "Training",
    title: "Progressive Overload: The Key To Breaking Every Plateau",
    excerpt:
      "Plateau killing strategies that elite athletes use. Your complete roadmap to consistent strength and size progression.",
    date: "May 14, 2025",
    readTime: "7 min read",
    author: "Jordan Lee",
    authorInitials: "JL",
    image: "/images/blog2.webp",
    category: "training",
  },
  {
    id: 3,
    tag: "Recovery",
    title: "Sleep Science: How 8 Hours Transforms Your Physique",
    excerpt:
      "Recovery is where the real gains happen. Discover the hormone cycles and muscle repair processes that make sleep your secret weapon.",
    date: "May 08, 2025",
    readTime: "6 min read",
    author: "Sam Rivera",
    authorInitials: "SR",
    image: "/images/blog3.jpg",
    category: "recovery",
  },
  {
    id: 4,
    tag: "Lifestyle",
    title: "Building a Champion Mindset: Mental Toughness 101",
    excerpt:
      "The gym is 20% physical and 80% mental. Master your psychology and watch every aspect of your training transform.",
    date: "Apr 30, 2025",
    readTime: "8 min read",
    author: "Alex Carter",
    authorInitials: "AC",
    image: "/images/blog4.webp",
    category: "lifestyle",
  },
  {
    id: 5,
    tag: "Nutrition",
    title: "Creatine, BCAAs & Protein: What You Actually Need",
    excerpt:
      "Cut through the supplement noise. Evidence-based breakdown of what works, what's overhyped, and what belongs in your stack.",
    date: "Apr 22, 2025",
    readTime: "6 min read",
    author: "Jordan Lee",
    authorInitials: "JL",
    image: "/images/blog5.webp",
    category: "nutrition",
  },
  {
    id: 6,
    tag: "Training",
    title: "HIIT vs Steady-State Cardio: Which Burns More Fat?",
    excerpt:
      "The debate settled. We break down the science behind both methods so you can choose the right cardio for your specific goals.",
    date: "Apr 15, 2025",
    readTime: "5 min read",
    author: "Sam Rivera",
    authorInitials: "SR",
    image: "/images/blog6.jfif",
    category: "training",
  },
];

const categories = [
  { label: "All Posts", value: "all" },
  { label: "Training", value: "training" },
  { label: "Nutrition", value: "nutrition" },
  { label: "Recovery", value: "recovery" },
  { label: "Lifestyle", value: "lifestyle" },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  const filtered =
    activeCategory === "all"
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterDone(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterDone(false), 4000);
  };

  return (
    <main className="blog-page">
      {/* ─── HERO BANNER ─── */}
      <section className="blog-banner">
        {/* Banner background image — allban.png same as contact page */}
        <div className="blog-banner-bg">
          <Image
            src="/images/allban.png"
            alt="Blog Banner"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="blog-banner-overlay" />
        <div className="blog-banner-content">
          <p className="blog-banner-sub">KNOWLEDGE IS POWER</p>
          <h1 className="blog-banner-title">OUR BLOG</h1>
          <div className="blog-banner-divider" />
          <p className="blog-banner-breadcrumb">
            <span>Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">Blog</span>
          </p>
        </div>
      </section>

      {/* ─── FILTER / HEADING ─── */}
      <section className="blog-filter-section">
        <div className="blog-section-heading">
          <p className="blog-sub-label">EXPLORE OUR ARTICLES</p>
          <h2 className="blog-main-title">LATEST FROM MUSCLE ERA</h2>
          <div className="blog-title-line" />
        </div>
        <div className="blog-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-btn ${activeCategory === cat.value ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── FEATURED POST ─── */}
      {activeCategory === "all" && (
        <section className="blog-featured-section">
          <div className="featured-label-row">
            <span className="featured-label">FEATURED</span>
            <div className="featured-label-line" />
          </div>

          <div className="featured-card">
            {/* Featured image — blog-featured.jpg from public/images */}
            <div className="featured-card-img-wrap">
              <Image
                src="/images/blog-featured.jpg"
                alt="Featured Blog Post"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                className="featured-card-img"
              />
            </div>
            <div className="featured-card-overlay" />
            <div className="featured-card-content">
              <span className="featured-tag">Training</span>
              <h2 className="featured-card-title">
                The Science Of Muscle Hypertrophy: Everything You Need To Know
              </h2>
              <p className="featured-card-excerpt">
                From motor unit recruitment to mTOR signalling — a deep dive
                into exactly how muscles grow, why most people train wrong, and
                the evidence-based principles that guarantee results.
              </p>
              <div className="featured-meta">
                <div className="meta-author">
                  <div className="meta-avatar">AC</div>
                  <span className="meta-author-name">Alex Carter</span>
                </div>
                <span className="meta-sep">|</span>
                <span className="meta-date">June 01, 2025</span>
                <span className="meta-sep">|</span>
                <span className="meta-read">10 min read</span>
                <button className="featured-read-btn">
                  <span>READ ARTICLE</span>
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
          </div>
        </section>
      )}

      {/* ─── BLOG GRID ─── */}
      <section className="blog-grid-section">
        <div className="blog-grid">
          {filtered.map((post, i) => (
            <article key={post.id} className={`blog-card card-delay-${i % 6}`}>
              {/* Thumbnail — Next.js Image with object-fit cover */}
              <div className="blog-card-thumb">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="blog-card-thumb-img"
                />
                <div className="blog-card-overlay" />
                <span className="blog-card-tag">{post.tag}</span>
              </div>

              {/* Body */}
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-date">{post.date}</span>
                  <span className="blog-card-dot" />
                  <span className="blog-card-read">{post.readTime}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
              </div>

              {/* Footer */}
              <div className="blog-card-footer">
                <div className="blog-card-author">
                  <div className="card-avatar">{post.authorInitials}</div>
                  <span className="card-author-name">{post.author}</span>
                </div>
                <button className="blog-card-link">
                  <span>READ</span>
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
            </article>
          ))}
        </div>
      </section>

      {/* ─── LOAD MORE ─── */}
      <div className="blog-load-more">
        <button className="load-more-btn">
          <span>LOAD MORE ARTICLES</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* ─── NEWSLETTER STRIP ─── */}
      <section className="blog-newsletter-strip">
        <div className="newsletter-inner">
          <div className="newsletter-icon">
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
          <p className="newsletter-sub">STAY IN THE LOOP</p>
          <h3 className="newsletter-title">
            GET FITNESS TIPS STRAIGHT TO YOUR INBOX
          </h3>
          <p className="newsletter-desc">
            Join 10,000+ members receiving weekly training tips, nutrition
            guides, and exclusive Muscle Era content.
          </p>
          {newsletterDone ? (
            <div className="newsletter-success">
              ✅ You&apos;re subscribed! Welcome to the Muscle Era community.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit">
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
