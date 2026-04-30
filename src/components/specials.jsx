import { useRef, useState, useEffect } from "react";

const SPECIALS = [
  {
    name: "Wagyu Beef Tenderloin",
    tag: "Signature",
    desc: "Bone marrow butter, pommes purée, bordelaise sauce",
    price: "$89",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  },
  {
    name: "Seared Duck Confit",
    tag: "Chef's Choice",
    desc: "Wild cherry reduction, mushroom risotto, truffle oil",
    price: "$42",
    img: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800&q=80",
  },
  {
    name: "Lobster Bisque",
    tag: "Seasonal",
    desc: "Cognac cream, chive oil, crispy shallots, brioche",
    price: "$28",
    img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
  },
  {
    name: "Champagne Sorbet",
    tag: "Dessert",
    desc: "Elderflower granita, candied citrus zest, edible gold",
    price: "$18",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  },
  {
    name: "Pan-Seared Scallops",
    tag: "Seafood",
    desc: "Cauliflower purée, pancetta, micro herbs, lemon beurre blanc",
    price: "$36",
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
  },
  {
    name: "Tarte Tatin",
    tag: "Pâtisserie",
    desc: "Caramelised apple, crème fraîche, Calvados caramel",
    price: "$16",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
  },
];

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

function DishCard({ dish, delay }) {
  const [ref, vis] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "4/5",
        borderRadius: 14,
      }}
    >
      {/* Image */}
      <img
        src={dish.img}
        alt={dish.name}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover",
          filter: `brightness(${hovered ? 0.55 : 0.72}) saturate(${hovered ? 1.2 : 1})`,
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "filter 0.5s ease, transform 0.6s ease",
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(10,8,5,0.97) 0%, rgba(10,8,5,0.3) 60%)"
          : "linear-gradient(to top, rgba(10,8,5,0.88) 0%, rgba(10,8,5,0.05) 55%)",
        transition: "background 0.5s ease",
      }} />

      {/* Tag badge */}
      <div style={{
        position: "absolute", top: 14, left: 14,
        fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "#c8a97e", background: "rgba(10,8,5,0.72)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(200,169,126,0.3)", padding: "4px 10px", borderRadius: 2,
      }}>
        {dish.tag}
      </div>

      {/* Content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "22px 20px" }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(17px,2vw,21px)", fontWeight: 400,
          color: "#f0ece4", margin: "0 0 6px", lineHeight: 1.2,
        }}>
          {dish.name}
        </h3>

        {/* Description — revealed on hover */}
        <p style={{
          fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 13,
          color: "#908070", lineHeight: 1.55, margin: "0 0 14px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
          maxHeight: hovered ? "80px" : 0,
          overflow: "hidden",
        }}>
          {dish.desc}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: "#c8a97e" }}>
            {dish.price}
          </span>
          <span style={{
            fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#c8a97e", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease",
          }}>
            View →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SpecialsSection() {
  const [headerRef, headerVis] = useInView(0.2);

  return (
    <section style={{ padding: "90px 0", borderTop: "1px solid rgba(200,169,126,0.1)" }}
    className="relative z-20 bg-black/90"
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerVis ? 1 : 0, transform: headerVis ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: 52, gap: 20,
          }}
        >
          <div>
            <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 14 }}>
              Seasonal Selections
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(36px,5vw,64px)", color: "#f0ece4", lineHeight: 1, margin: 0 }}>
              Tonight's <em style={{ fontStyle: "italic", color: "#c8a97e" }}>Highlights</em>
            </h2>
          </div>
          <div
            onClick={() => navigate("/menu")}
            className="cursor-pointer"
            style={{
              fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#c8a97e", borderBottom: "1px solid rgba(200,169,126,0.4)", paddingBottom: 4, textDecoration: "none",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.target.style.borderColor = "#c8a97e"}
            onMouseLeave={e => e.target.style.borderColor = "rgba(200,169,126,0.4)"}
          >
            Full Menu →
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,260px), 1fr))",
          gap: 16,
        }}>
          {SPECIALS.map((dish, i) => (
            <DishCard key={dish.name} dish={dish} delay={i * 0.08} />
          ))}
        </div>

      </div>
    </section>
  );
}