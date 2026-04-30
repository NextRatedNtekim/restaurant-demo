import { useRef, useState, useEffect } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

const inputBase = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(200,169,126,0.25)",
  color: "#f0ece4",
  padding: "12px 0",
  fontFamily: "'Josefin Sans',sans-serif",
  fontSize: 12,
  letterSpacing: "0.1em",
  width: "100%",
  outline: "none",
  transition: "border-color 0.25s",
};

function Field({ label, type = "text", placeholder, style }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: focused ? "#c8a97e" : "#5a4830", transition: "color 0.25s" }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        style={{ ...inputBase, borderBottomColor: focused ? "rgba(200,169,126,0.7)" : "rgba(200,169,126,0.25)", ...style }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default function Contact() {
  const [ref, vis] = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="reservations"
      style={{ background: "#0a0805", borderTop: "1px solid rgba(200,169,126,0.12)", borderBottom: "1px solid rgba(200,169,126,0.12)", padding: "90px 24px" }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 960, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
          gap: "60px 80px", alignItems: "start",
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        {/* Left: copy */}
        <div>
          <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 18 }}>
            Reserve a Table
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(34px,5vw,58px)", color: "#f0ece4", lineHeight: 1.02, margin: "0 0 24px" }}>
            Begin Your<br /><em style={{ color: "#c8a97e" }}>Evening</em>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 16, color: "#7a6848", lineHeight: 1.8, marginBottom: 36 }}>
            Tables are intimate and limited. We recommend booking at least two weeks in advance for the best availability.
          </p>

          {/* Info list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["Hours", "Tuesday – Sunday, from 6:00 PM"],
              ["Dress Code", "Smart casual attire required"],
              ["Contact", "+1 (800) 555-0199"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8a97e", minWidth: 70 }}>{k}</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#7a6848" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div>
          {submitted ? (
            <div style={{ padding: "48px 0", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 22, color: "#c8a97e", marginBottom: 12 }}>
                Thank you.
              </p>
              <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#5a4830" }}>
                We'll confirm your reservation within 24 hours.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <Field label="First Name" placeholder="Aurélien" />
                <Field label="Last Name" placeholder="Blanc" />
              </div>
              <Field label="Email" type="email" placeholder="you@example.com" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <Field label="Date" type="date" />
                <Field label="Time" type="time" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#5a4830" }}>Guests</label>
                <select
                  style={{ ...inputBase, cursor: "pointer", appearance: "none" }}
                  defaultValue=""
                >
                  <option value="" disabled>Select guests</option>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#5a4830" }}>Special Requests</label>
                <textarea
                  rows={3}
                  placeholder="Dietary requirements, occasions, preferences…"
                  style={{
                    ...inputBase,
                    border: "1px solid rgba(200,169,126,0.2)",
                    padding: "12px",
                    resize: "vertical",
                    borderRadius: 4,
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 14,
                    color: "#a09070",
                  }}
                />
              </div>
              <button
                onClick={() => setSubmitted(true)}
                style={{
                  fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
                  color: "#0a0805", background: "#c8a97e", border: "none",
                  padding: "16px 32px", cursor: "pointer", transition: "background 0.3s", alignSelf: "flex-start",
                }}
                onMouseEnter={e => e.target.style.background = "#dbbf8e"}
                onMouseLeave={e => e.target.style.background = "#c8a97e"}
              >
                Request Table →
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}