import { useEffect, useRef, useState } from "react";

const IMG = {
  dining:   "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  chef:     "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  interior: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80",
  plating:  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
};

const STATS = [
  { value: "06", label: "Years of Excellence" },
  { value: "12", label: "Seasonal Menus" },
  { value: "3★", label: "Michelin Recognition" },
  { value: "98%", label: "Guest Satisfaction" },
];

const aboutCSS = `
@keyframes fadeUp {
  from { opacity:0; transform:translateY(28px); }
  to   { opacity:1; transform:translateY(0); }
}
.about-fade { opacity:0; }
.about-fade.visible { animation: fadeUp 0.85s ease forwards; }
.glass-card {
  backdrop-filter: blur(18px) saturate(1.4);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(200,169,126,0.12);
  transition: border-color 0.35s ease, transform 0.35s ease;
}
.glass-card:hover {
  border-color: rgba(200,169,126,0.35);
  transform: translateY(-5px);
}
.img-zoom-wrap { overflow:hidden; }
.img-zoom-wrap img { transition: transform 0.6s ease; }
.img-zoom-wrap:hover img { transform:scale(1.07); }
`;

function useInView(delay = 0) {
  const ref   = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis, delay];
}

function FadeEl({ children, delay = 0, className = "", style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`about-fade${vis ? " visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

export default function AboutSection() {
  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = aboutCSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <section 
    id="about" 
    style={{  color: "#f0ece4", fontFamily: "'Josefin Sans',sans-serif", overflow: "hidden" }}
    className="relative z-20 bg-black/80"
    >

      {/* ── STATS BAR ── */}
      <div style={{ borderTop: "1px solid rgba(200,169,126,0.15)", borderBottom: "1px solid rgba(200,169,126,0.15)", padding: "28px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "24px 12px", textAlign: "center" }}>
          {STATS.map((s, i) => (
            <FadeEl key={s.label} delay={i * 0.08}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,4vw,44px)", fontWeight: 300, color: "#c8a97e", lineHeight: 1, margin: "0 0 6px" }}>
                {s.value}
              </p>
              <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5a4830", margin: 0 }}>
                {s.label}
              </p>
            </FadeEl>
          ))}
        </div>
      </div>

      {/* ── MAIN STORY ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28, alignItems: "start" }}>

        {/* Left: image + quote */}
        <FadeEl>
          <div className="glass-card rounded-2xl overflow-hidden" style={{ height: "100%", minHeight: 400 }}>
            <div className="img-zoom-wrap" style={{ height: 260 }}>
              <img src={IMG.dining} alt="Fine dining" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.78) saturate(1.1)" }} />
            </div>
            <div style={{ padding: "24px 26px 28px" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 12 }}>
                Our Philosophy
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontStyle: "italic", color: "#b0a090", lineHeight: 1.75 }}>
                From humble beginnings to a refined culinary destination, Kitchen blends heritage with innovation — crafting experiences that linger long after the final bite.
              </p>
            </div>
          </div>
        </FadeEl>

        {/* Right: text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          <FadeEl delay={0.1}>
            <div style={{ paddingBottom: 8 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 14 }}>
                Our History &amp; Goals
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.05, color: "#f0ece4", margin: "0 0 18px" }}>
                A Sanctuary of <em style={{ color: "#c8a97e" }}>Flavour</em>
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#8a7860", lineHeight: 1.85 }}>
                Since 2019, Kitchen has stood as a quiet rebellion against the ordinary — a place where every plate is a considered act, every ingredient a deliberate choice. Guided by the rhythm of the seasons and the precision of classical technique, we create dining that is both deeply personal and unmistakably ambitious.
              </p>
            </div>
          </FadeEl>

          {/* Hours card */}
          <FadeEl delay={0.18}>
            <div className="glass-card rounded-2xl" style={{ padding: "24px 26px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 12 }}>Opening Hours</p>
                {[["Mon – Thu", "07:00 AM – 11:00 PM"], ["Fri – Sun", "07:00 AM – Midnight"]].map(([day, time]) => (
                  <div key={day} style={{ display: "flex", justifyContent: "space-between", gap: 32, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#6a5840", letterSpacing: "0.08em" }}>{day}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#a08a68" }}>{time}</span>
                  </div>
                ))}
              </div>
              <a
                href="#reservations"
                style={{
                  fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.25em",
                  textTransform: "uppercase", color: "#0a0805", background: "#c8a97e",
                  padding: "11px 22px", textDecoration: "none", borderRadius: 2,
                  transition: "background .3s", whiteSpace: "nowrap",
                }}
                onMouseEnter={e => e.target.style.background = "#dbbf8e"}
                onMouseLeave={e => e.target.style.background = "#c8a97e"}
              >
                Book a Table →
              </a>
            </div>
          </FadeEl>

        </div>
      </div>

      {/* ── CHEF + INTERIOR CARDS ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>

        {/* Chef */}
        <FadeEl delay={0.05}>
          <div className="glass-card rounded-2xl overflow-hidden img-zoom-wrap" style={{ position: "relative", minHeight: 300 }}>
            <img src={IMG.chef} alt="Chef" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) saturate(1.05)", position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,5,0.95) 0%, rgba(10,8,5,0.1) 55%)" }} />
            <div style={{ position: "absolute", bottom: 0, padding: "24px" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 8 }}>Food Philosophy</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#c0b09a", lineHeight: 1.65 }}>
                Precision, passion, and locally sourced excellence define every dish we craft.
              </p>
            </div>
          </div>
        </FadeEl>

        {/* Interior */}
        <FadeEl delay={0.12}>
          <div className="glass-card rounded-2xl overflow-hidden img-zoom-wrap" style={{ position: "relative", minHeight: 300 }}>
            <img src={IMG.interior} alt="Interior" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) saturate(1.05)", position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,5,0.95) 0%, rgba(10,8,5,0.1) 55%)" }} />
            <div style={{ position: "absolute", bottom: 0, padding: "24px" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 8 }}>Ambience</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#c0b09a", lineHeight: 1.65 }}>
                A curated atmosphere of elegance, warmth, and quiet luxury.
              </p>
            </div>
          </div>
        </FadeEl>

        {/* Chef quote card */}
        <FadeEl delay={0.2}>
          <div className="glass-card rounded-2xl" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 300 }}>
            <div style={{ width: 36, height: 1, background: "#c8a97e", marginBottom: 24 }} />
            <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "clamp(18px,2.5vw,22px)", color: "#c0b09a", lineHeight: 1.65, margin: 0, flex: 1 }}>
              "Cuisine is the art of transforming the ordinary into the extraordinary — one plate, one moment, one memory at a time."
            </blockquote>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 3 }}>
                Chef Aurélien Blanc
              </p>
              <p style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a2e1e" }}>
                Executive Chef &amp; Founder
              </p>
            </div>
          </div>
        </FadeEl>

      </div>

    </section>
  );
}