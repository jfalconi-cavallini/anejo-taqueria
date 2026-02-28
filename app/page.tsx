"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const menuCategories = [
  {
    id: "brunch",
    label: "Brunch",
    emoji: "🌅",
    items: [
      {
        name: "Chilaquiles Rojos",
        price: "$13.99",
        desc: "Crispy tortilla chips simmered in house red salsa, topped with two eggs, cotija, crema & onion.",
      },
      {
        name: "Huevos Rancheros",
        price: "$12.99",
        desc: "Two fried eggs on warm corn tortillas, smothered in ranchero sauce with black beans & avocado.",
      },
      {
        name: "Menudo",
        price: "$15.99",
        desc: "Traditional slow-cooked tripe soup with hominy, dried chiles, and fresh garnishes.",
      },
      {
        name: "Breakfast Tacos (3)",
        price: "$13.99",
        desc: "Your choice of scrambled egg with chorizo, bacon, or potato on fresh corn tortillas.",
      },
    ],
  },
  {
    id: "tacos",
    label: "Tacos",
    emoji: "🌮",
    items: [
      {
        name: "Carne Asada",
        price: "$4.50",
        desc: "Grilled marinated skirt steak, fresh cilantro, diced onion on double corn tortillas.",
      },
      {
        name: "Al Pastor",
        price: "$4.25",
        desc: "Spit-roasted pork with pineapple, achiote, cilantro & white onion.",
      },
      {
        name: "Pollo Asado",
        price: "$4.00",
        desc: "Citrus-marinated grilled chicken, pico de gallo, avocado crema.",
      },
      {
        name: "Birria Quesatacos",
        price: "$5.99",
        desc: "Braised beef birria in crispy cheese-fried tortilla with consommé for dipping.",
      },
    ],
  },
  {
    id: "papas",
    label: "Papas",
    emoji: "🥔",
    items: [
      {
        name: "Papas Tradicionales",
        price: "$9.99",
        desc: "Golden fried potatoes tossed in our house seasoning with jalapeños and cotija.",
      },
      {
        name: "Papas Locas",
        price: "$12.99",
        desc: "Loaded fries with carne asada, guacamole, pico, jalapeños, crema & cotija cheese.",
      },
      {
        name: "Papa Fritas CS",
        price: "$8.99",
        desc: "Classic seasoned fries with our signature anejo dipping sauce.",
      },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    emoji: "🫘",
    items: [
      {
        name: "Elote Callejero",
        price: "$5.99",
        desc: "Mexican street corn with mayo, cotija, chile powder & lime.",
      },
      {
        name: "Guacamole & Chips",
        price: "$8.99",
        desc: "Fresh hand-smashed avocado, tomato, cilantro, lime & house totopos.",
      },
      {
        name: "Frijoles de Olla",
        price: "$4.99",
        desc: "Slow-simmered pinto beans with epazote, chorizo & fresh tortillas.",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    emoji: "🍮",
    items: [
      {
        name: "Churros con Cajeta",
        price: "$7.99",
        desc: "Hand-rolled cinnamon churros with house-made goat milk caramel dipping sauce.",
      },
      {
        name: "Flan de la Casa",
        price: "$6.99",
        desc: "Classic Mexican flan with burnt orange caramel and candied citrus peel.",
      },
      {
        name: "Tres Leches",
        price: "$8.99",
        desc: "Light sponge cake soaked in three milks, topped with whipped cream & fresh berries.",
      },
    ],
  },
];

const galleryImages = [
  {
    src: "/images/mexican_pic.png",
    alt: "Mexican coat of arms",
    span: "tall",
  },
  { src: "/images/Neon_sign.png", alt: "Feed me tacos neon sign", span: "wide" },
  { src: "/images/Anejo_logo.png", alt: "Anejo Taqueria Logo", span: "normal" },
];

/* ─────────────────────────────────────────
   NAVBAR COMPONENT
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = [
    { href: "#menu", label: "Menu" },
    { href: "#about", label: "About" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav style={navStyle(scrolled)}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "var(--nav-height)" }}>
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "0.6rem", zIndex: 10 }}>
          <Image
            src="/images/Anejo_logo.png"
            alt="Anejo Taqueria"
            width={48}
            height={48}
            style={{ objectFit: "contain", filter: "brightness(1.1)" }}
            priority
          />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--cream)", fontWeight: 700, letterSpacing: "0.04em" }}>
            Anejo <span style={{ color: "var(--gold)" }}>Taqueria</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", alignItems: "center" }} className="desktop-nav">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={navLinkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#order" className="btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.75rem" }}>
              Order Now
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={hamburgerStyle}
          aria-label="Toggle menu"
          className="hamburger"
        >
          <span style={{ ...barStyle, transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ ...barStyle, opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "translateX(-10px)" : "none" }} />
          <span style={{ ...barStyle, transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={drawerStyle}>
          <div style={{ padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  ...mobileLinkStyle,
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                {l.label}
              </a>
            ))}
            <div style={{ marginTop: "1.5rem" }}>
              <a href="#order" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center" }} onClick={() => setMobileOpen(false)}>
                Order Now
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @media (min-width: 769px) { .hamburger { display: none !important; } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .mobile-link-anim { animation: slideDown 0.3s ease forwards; opacity: 0; }
      `}</style>
    </nav>
  );
}

const navStyle = (scrolled: boolean): React.CSSProperties => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  background: scrolled
    ? "rgba(15,7,0,0.97)"
    : "linear-gradient(180deg, rgba(15,7,0,0.85) 0%, transparent 100%)",
  backdropFilter: scrolled ? "blur(12px)" : "none",
  borderBottom: scrolled ? "1px solid rgba(200,146,42,0.2)" : "none",
  transition: "all 0.35s ease",
});

const navLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.8rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  transition: "color 0.2s",
};

const hamburgerStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "4px",
  zIndex: 10,
};

const barStyle: React.CSSProperties = {
  display: "block",
  width: "24px",
  height: "2px",
  background: "var(--cream)",
  borderRadius: "2px",
  transition: "all 0.3s ease",
};

const drawerStyle: React.CSSProperties = {
  position: "fixed",
  top: "var(--nav-height)",
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(10,5,0,0.97)",
  backdropFilter: "blur(16px)",
  borderTop: "1px solid rgba(200,146,42,0.2)",
  animation: "slideDown 0.3s ease",
  zIndex: 999,
};

const mobileLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "2rem",
  fontWeight: 700,
  color: "var(--cream)",
  padding: "0.75rem 0",
  borderBottom: "1px solid rgba(200,146,42,0.1)",
  display: "block",
  transition: "color 0.2s",
  animation: "slideDown 0.3s ease forwards",
  opacity: 0,
};

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={heroSection}>
      {/* Dark radial vignette */}
      <div style={heroVignette} />

      {/* Background subtle pattern */}
      <div style={heroBgPattern} />

      <div className="container" style={heroContent}>
        {/* Logo */}
        <div style={{ animation: "fadeUp 0.8s ease 0.1s both" }}>
          <Image
            src="/images/Anejo_logo.png"
            alt="Anejo Taqueria"
            width={220}
            height={220}
            style={{ objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(200,146,42,0.3))", animation: "floatY 5s ease-in-out infinite" }}
            priority
          />
        </div>

        {/* Tagline */}
        <div style={{ animation: "fadeUp 0.8s ease 0.35s both", textAlign: "center" }}>
          <span className="section-label" style={{ textAlign: "center", marginBottom: "1rem" }}>
            EST. 2022 · Authentic Mexican Cuisine
          </span>
          <h1 style={heroTitle}>
            Craving<br />
            <span style={{ color: "var(--gold-light)" }}>Tacos?</span>
          </h1>
          <p style={heroSubtitle}>
            Bold flavors. Real ingredients. Made with love.
          </p>
        </div>

        {/* Neon sign */}
        <div style={{ animation: "fadeUp 0.8s ease 0.55s both, neonPulse 3s ease-in-out 1s infinite" }}>
          <Image
            src="/images/Neon_sign.png"
            alt="Feed me tacos and tell me I'm pretty"
            width={480}
            height={280}
            style={{
              objectFit: "contain",
              maxWidth: "min(480px, 90vw)",
              filter: "drop-shadow(0 0 30px rgba(80,140,255,0.5)) drop-shadow(0 0 60px rgba(255,80,80,0.2))",
            }}
          />
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.8s ease 0.75s both" }}>
          <a href="#menu" className="btn-gold">
            View Menu
          </a>
          <a href="#order" className="btn-primary">
            Order Online
          </a>
        </div>

        {/* Scroll cue */}
        <div style={{ animation: "fadeIn 1s ease 1.5s both", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", marginTop: "1rem" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--text-muted)", textTransform: "uppercase" }}>
            Scroll to explore
          </span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, var(--gold), transparent)" }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes floatY { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes neonPulse {
          0%,100% { filter: drop-shadow(0 0 8px rgba(80,140,255,0.6)) drop-shadow(0 0 20px rgba(80,140,255,0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(80,140,255,0.9)) drop-shadow(0 0 50px rgba(255,80,80,0.5)); }
        }
      `}</style>
    </section>
  );
}

const heroSection: React.CSSProperties = {
  minHeight: "100dvh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  background: "radial-gradient(ellipse 80% 80% at 50% 20%, #1a0a00 0%, #0f0700 60%, #050200 100%)",
};

const heroVignette: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,2,0,0.7) 100%)",
  pointerEvents: "none",
};

const heroBgPattern: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: `repeating-linear-gradient(
    45deg,
    transparent,
    transparent 80px,
    rgba(200,146,42,0.015) 80px,
    rgba(200,146,42,0.015) 81px
  )`,
  pointerEvents: "none",
};

const heroContent: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  paddingTop: "calc(var(--nav-height) + 2rem)",
  paddingBottom: "4rem",
  textAlign: "center",
  position: "relative",
  zIndex: 1,
};

const heroTitle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(3.5rem, 10vw, 7rem)",
  fontWeight: 900,
  color: "var(--cream)",
  lineHeight: 1,
  letterSpacing: "-0.02em",
  textShadow: "0 4px 40px rgba(0,0,0,0.6)",
};

const heroSubtitle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
  color: "var(--text-muted)",
  marginTop: "0.75rem",
  fontWeight: 300,
  letterSpacing: "0.04em",
};

/* ─────────────────────────────────────────
   MARQUEE STRIP
───────────────────────────────────────── */
function MarqueeStrip() {
  const items = ["Tacos", "Birria", "Chilaquiles", "Al Pastor", "Elote", "Menudo", "Churros", "Guacamole", "Papas Locas"];
  const repeated = [...items, ...items];

  return (
    <div style={marqueeOuter}>
      <div style={marqueeInner}>
        {repeated.map((item, i) => (
          <span key={i} style={marqueeItem}>
            {item} <span style={{ color: "var(--red-bright)", margin: "0 0.4rem" }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        .marquee-inner { animation: marquee 22s linear infinite; }
        .marquee-inner:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}

const marqueeOuter: React.CSSProperties = {
  background: "linear-gradient(90deg, var(--red) 0%, #6b1111 50%, var(--red) 100%)",
  borderTop: "1px solid rgba(200,146,42,0.3)",
  borderBottom: "1px solid rgba(200,146,42,0.3)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  padding: "0.6rem 0",
};

const marqueeInner: React.CSSProperties = {
  display: "inline-flex",
  animation: "marquee 22s linear infinite",
};

const marqueeItem: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "var(--cream)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "0 0.5rem",
};

/* ─────────────────────────────────────────
   MENU SECTION
───────────────────────────────────────── */
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("tacos");
  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu" style={{ background: "var(--bg-section)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      {/* Mexican coat of arms watermark */}
      <div style={{ position: "absolute", right: "-5%", top: "5%", opacity: 0.04, pointerEvents: "none", width: "500px", height: "600px" }}>
        <Image src="/images/mexican_pic.png" alt="" fill style={{ objectFit: "contain" }} />
      </div>

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">What We Serve</span>
          <h2 style={sectionTitle}>Our Menu</h2>
          <div className="divider-gold" />
          <p style={sectionSubtitle}>
            Every dish made fresh, every flavor bold. <em>¡Buen Provecho!</em>
          </p>
        </div>

        {/* Category tabs */}
        <div style={tabsContainer}>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                ...tabBtn,
                background: activeCategory === cat.id ? "var(--red)" : "transparent",
                color: activeCategory === cat.id ? "var(--cream)" : "var(--text-muted)",
                borderColor: activeCategory === cat.id ? "var(--red)" : "rgba(200,146,42,0.2)",
              }}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div key={activeCategory} style={menuGrid}>
          {currentCategory.items.map((item, i) => (
            <div key={item.name} style={{ ...menuCard, animationDelay: `${i * 0.08}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <h3 style={menuItemName}>{item.name}</h3>
                <span style={menuItemPrice}>{item.price}</span>
              </div>
              <p style={menuItemDesc}>{item.desc}</p>
              <div style={{ marginTop: "1rem", height: "1px", background: "linear-gradient(90deg, var(--gold), transparent)" }} />
            </div>
          ))}
        </div>

        {/* Full menu CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="#order" className="btn-primary">
            Order Online — Full Menu Available
          </a>
        </div>
      </div>

      <style>{`
        @keyframes cardIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  );
}

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(2.5rem, 6vw, 4rem)",
  fontWeight: 900,
  color: "var(--cream)",
};

const sectionSubtitle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  color: "var(--text-muted)",
  marginTop: "0.75rem",
};

const tabsContainer: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: "2.5rem",
};

const tabBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.55rem 1.3rem",
  border: "1px solid",
  borderRadius: "100px",
  fontFamily: "var(--font-body)",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const menuGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "1.25rem",
};

const menuCard: React.CSSProperties = {
  background: "rgba(28, 14, 3, 0.8)",
  border: "1px solid rgba(200,146,42,0.15)",
  borderRadius: "8px",
  padding: "1.5rem",
  animation: "cardIn 0.4s ease forwards",
  opacity: 0,
  backdropFilter: "blur(4px)",
  transition: "border-color 0.2s, transform 0.2s",
};

const menuItemName: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "var(--cream)",
};

const menuItemPrice: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  fontWeight: 900,
  color: "var(--gold-light)",
  whiteSpace: "nowrap",
};

const menuItemDesc: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.85rem",
  color: "var(--text-muted)",
  lineHeight: 1.6,
};

/* ─────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" style={{ padding: "6rem 0", background: "var(--bg-dark)", position: "relative", overflow: "hidden" }}>
      {/* Gold accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

      <div className="container">
        <div style={aboutGrid}>
          {/* Image column */}
          <div style={aboutImageCol}>
            <div style={aboutImageFrame}>
              <Image
                src="/images/mexican_pic.png"
                alt="Mexican heritage"
                width={420}
                height={520}
                style={{ objectFit: "contain", position: "relative", zIndex: 1 }}
              />
              {/* Corner accents */}
              <div style={cornerTL} />
              <div style={cornerBR} />
            </div>
          </div>

          {/* Text column */}
          <div style={aboutText}>
            <span className="section-label">Our Story</span>
            <h2 style={{ ...sectionTitle, textAlign: "left", marginBottom: "1.5rem" }}>
              Born From
              <br />
              <span style={{ color: "var(--gold)" }}>Tradition</span>
            </h2>
            <div className="divider-gold" style={{ margin: "0 0 1.5rem 0" }} />

            <p style={aboutPara}>
              Anejo Taqueria was founded in 2022 with one mission — to bring the
              authentic, soulful flavors of Mexican street food right to your table.
              Every recipe is rooted in tradition, perfected over generations.
            </p>
            <p style={aboutPara}>
              We source fresh, local ingredients and prepare everything in-house
              daily. From slow-braised birria to hand-pressed tortillas, the love
              goes into every single plate.
            </p>
            <p style={aboutPara}>
              <strong style={{ color: "var(--gold-light)" }}>
                &ldquo;Feed me tacos and tell me I&apos;m pretty.&rdquo;
              </strong>{" "}
              — that&apos;s not just our sign. It&apos;s our promise.
            </p>

            <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
              {[["2022", "Est."], ["100%", "Fresh Daily"], ["5★", "Rated"]].map(([num, lbl]) => (
                <div key={lbl} style={statBox}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 900, color: "var(--gold-light)", lineHeight: 1 }}>{num}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "0.25rem" }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const aboutGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "4rem",
  alignItems: "center",
};

const aboutImageCol: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
};

const aboutImageFrame: React.CSSProperties = {
  position: "relative",
  background: "radial-gradient(ellipse at center, rgba(200,146,42,0.08) 0%, transparent 70%)",
  borderRadius: "12px",
  padding: "1.5rem",
};

const cornerTL: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "40px",
  height: "40px",
  borderTop: "2px solid var(--gold)",
  borderLeft: "2px solid var(--gold)",
  borderRadius: "4px 0 0 0",
};

const cornerBR: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: "40px",
  height: "40px",
  borderBottom: "2px solid var(--gold)",
  borderRight: "2px solid var(--gold)",
  borderRadius: "0 0 4px 0",
};

const aboutText: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const aboutPara: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.98rem",
  color: "var(--text-muted)",
  lineHeight: 1.8,
  marginBottom: "1rem",
};

const statBox: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderLeft: "2px solid var(--gold)",
  paddingLeft: "1rem",
};

/* ─────────────────────────────────────────
   GALLERY SECTION
───────────────────────────────────────── */
function GallerySection() {
  return (
    <section id="gallery" style={{ padding: "6rem 0", background: "var(--bg-card)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">Our Vibe</span>
          <h2 style={sectionTitle}>Experience Anejo</h2>
          <div className="divider-gold" />
        </div>

        <div style={galleryGrid}>
          {/* Neon sign – large feature tile */}
          <div style={galleryTileLarge}>
            <Image
              src="/images/Neon_sign.png"
              alt="Feed me tacos neon sign"
              fill
              style={{ objectFit: "contain", padding: "1.5rem", filter: "drop-shadow(0 0 20px rgba(80,140,255,0.6))" }}
            />
            <div style={galleryOverlay}>
              <span style={galleryLabel}>&ldquo;Feed Me Tacos&rdquo; — Our Neon Heart</span>
            </div>
          </div>

          {/* Logo tile */}
          <div style={galleryTileNormal}>
            <Image
              src="/images/Anejo_logo.png"
              alt="Anejo Taqueria Logo"
              fill
              style={{ objectFit: "contain", padding: "2rem" }}
            />
            <div style={galleryOverlay}>
              <span style={galleryLabel}>Anejo Taqueria — EST. 2022</span>
            </div>
          </div>

          {/* Mexican heritage tile */}
          <div style={galleryTileNormal}>
            <Image
              src="/images/mexican_pic.png"
              alt="Mexican heritage"
              fill
              style={{ objectFit: "contain", padding: "1rem" }}
            />
            <div style={galleryOverlay}>
              <span style={galleryLabel}>Rooted in Mexican Heritage</span>
            </div>
          </div>

          {/* Quote tile */}
          <div style={{ ...galleryTileNormal, background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--cream)", textAlign: "center", lineHeight: 1.3 }}>
              &ldquo;Real food.<br />Real flavor.<br /><span style={{ color: "var(--gold-pale)" }}>Real love.&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const galleryGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "auto",
  gap: "1rem",
};

const galleryTileBase: React.CSSProperties = {
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  background: "rgba(15,7,0,0.7)",
  border: "1px solid rgba(200,146,42,0.15)",
  cursor: "pointer",
};

const galleryTileLarge: React.CSSProperties = {
  ...galleryTileBase,
  gridColumn: "1 / 2",
  gridRow: "1 / 3",
  minHeight: "420px",
};

const galleryTileNormal: React.CSSProperties = {
  ...galleryTileBase,
  minHeight: "200px",
};

const galleryOverlay: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "1rem",
  background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
};

const galleryLabel: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  color: "var(--gold-pale)",
  textTransform: "uppercase",
};

/* ─────────────────────────────────────────
   ORDER / CTA SECTION
───────────────────────────────────────── */
function OrderSection() {
  return (
    <section id="order" style={orderSection}>
      <div style={orderBg} />
      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ animation: "fadeUp 0.7s ease both" }}>
          <Image
            src="/images/Anejo_logo.png"
            alt="Anejo Taqueria"
            width={100}
            height={100}
            style={{ objectFit: "contain", margin: "0 auto 1.5rem", filter: "drop-shadow(0 0 20px rgba(200,146,42,0.4))" }}
          />
          <span className="section-label" style={{ textAlign: "center" }}>Don&apos;t Wait</span>
          <h2 style={{ ...sectionTitle, fontSize: "clamp(2.5rem, 7vw, 5rem)", marginBottom: "1rem" }}>
            Order <span style={{ color: "var(--gold-light)" }}>Online</span>
            <br />Now
          </h2>
          <p style={{ ...sectionSubtitle, marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Skip the wait. Get Anejo Taqueria delivered straight to your door or ready for pickup.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+1234567890" className="btn-outline">
              📞 Call to Order
            </a>
            <a href="#" className="btn-gold" style={{ fontSize: "0.9rem", padding: "1rem 2.5rem" }}>
              Order Online →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const orderSection: React.CSSProperties = {
  padding: "8rem 0",
  position: "relative",
  overflow: "hidden",
  background: "radial-gradient(ellipse 90% 80% at 50% 50%, #2a0d00 0%, #0f0700 70%)",
};

const orderBg: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: `repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 60px,
    rgba(200,146,42,0.02) 60px,
    rgba(200,146,42,0.02) 61px
  )`,
};

/* ─────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────── */
function ContactSection() {
  return (
    <section id="contact" style={{ padding: "6rem 0", background: "var(--bg-section)", borderTop: "1px solid rgba(200,146,42,0.15)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">Find Us</span>
          <h2 style={sectionTitle}>Come Visit</h2>
          <div className="divider-gold" />
        </div>

        <div style={contactGrid}>
          {[
            { icon: "📍", label: "Address", value: "7355 N Beach St Ste 161 \nFort Worth, TX 76137", href: "https://maps.app.goo.gl/sfjQi9bx7H942Vzk7?g_st=ic" },
            { icon: "📞", label: "Phone", value: "(817) 773-9929", href: "tel:+18177739929" },
            { icon: "🕐", label: "Hours", value: "Mon–Fri: 11am – 9pm\nSat–Sun: 9am – 10pm", href: null },
            { icon: "📸", label: "Instagram", value: "@anejotaqueria", href: "https://instagram.com/anejotaqueria" },
          ].map((info) => (
            <div key={info.label} style={contactCard}>
              <span style={{ fontSize: "2rem" }}>{info.icon}</span>
              <span style={contactLabel}>{info.label}</span>
              {info.href ? (
                <a href={info.href} style={contactValue}>{info.value}</a>
              ) : (
                <span style={contactValue}>{info.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const contactGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1.5rem",
};

const contactCard: React.CSSProperties = {
  background: "rgba(28,14,3,0.8)",
  border: "1px solid rgba(200,146,42,0.15)",
  borderRadius: "10px",
  padding: "2rem 1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  textAlign: "center",
  transition: "border-color 0.2s, transform 0.2s",
};

const contactLabel: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--gold)",
};

const contactValue: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.95rem",
  color: "var(--cream)",
  whiteSpace: "pre-line",
  lineHeight: 1.6,
};

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={footerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Image
              src="/images/Anejo_logo.png"
              alt="Anejo Taqueria"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--cream)", fontWeight: 700 }}>
              Anejo <span style={{ color: "var(--gold)" }}>Taqueria</span>
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
            © {new Date().getFullYear()} Anejo Taqueria. All rights reserved. EST. 2022.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            Feed me tacos and tell me I&apos;m pretty. 🌮
          </p>
        </div>
      </div>
    </footer>
  );
}

const footerStyle: React.CSSProperties = {
  background: "rgba(5,2,0,0.95)",
  borderTop: "1px solid rgba(200,146,42,0.2)",
  padding: "2rem 0",
};

const footerInner: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  flexWrap: "wrap",
};

/* ─────────────────────────────────────────
   RESPONSIVE OVERRIDES (CSS-in-JS)
───────────────────────────────────────── */
function ResponsiveStyles() {
  return (
    <style>{`
      @media (max-width: 768px) {
        .about-grid { grid-template-columns: 1fr !important; }
        .about-image-col { display: none !important; }
        .gallery-grid { grid-template-columns: 1fr !important; }
        .gallery-tile-large { grid-column: 1 / 2 !important; grid-row: auto !important; min-height: 260px !important; }
        .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; }
      }
      @media (max-width: 640px) {
        .contact-grid { grid-template-columns: 1fr 1fr !important; }
      }
    `}</style>
  );
}

/* ─────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <ResponsiveStyles />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <OrderSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}