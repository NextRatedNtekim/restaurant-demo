import { useState, useEffect } from "react";

const FETCH_LETTERS = ["a", "b", "c", "d", "e", "s"];
const CATEGORIES = ["All", "Beef", "Chicken", "Seafood", "Vegetarian", "Dessert"];

const marqueeCSS = `
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
`;

function SkeletonCard() {
  return (
    <div className="w-[195px] rounded-[14px] overflow-hidden shrink-0"
      style={{ background: "#161410", border: "1px solid #1e1c18" }}>
      <div className="w-full h-[155px]"
        style={{ background: "linear-gradient(90deg,#1a1814 25%,#232018 50%,#1a1814 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
      <div className="p-[12px_14px_14px] flex flex-col gap-2">
        <div className="h-[11px] rounded" style={{ background: "linear-gradient(90deg,#1a1814 25%,#232018 50%,#1a1814 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
        <div className="h-[11px] w-[55%] rounded" style={{ background: "linear-gradient(90deg,#1a1814 25%,#232018 50%,#1a1814 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
      </div>
    </div>
  );
}

function MealCard({ meal }) {
  return (
    <div
      className="group relative w-[195px] rounded-[14px] overflow-hidden shrink-0 cursor-pointer"
      style={{
        background: "#161410",
        border: "1px solid #1e1c18",
        transition: "all 0.35s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px) scale(1.03)"; e.currentTarget.style.borderColor = "#c8a97e"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#1e1c18"; }}
    >
      <div className="w-full h-[155px] overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88) saturate(1.1)", transition: "transform 0.5s ease, filter 0.4s ease" }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.1)"; e.target.style.filter = "brightness(1) saturate(1.2)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.filter = "brightness(0.88) saturate(1.1)"; }}
        />
      </div>

      {/* Category badge */}
      <div
        className="absolute top-2.5 left-2.5 px-2 py-[3px] text-[9px] tracking-[0.18em] uppercase"
        style={{ background: "rgba(10,8,5,0.75)", color: "#c8a97e", backdropFilter: "blur(6px)", border: "1px solid rgba(200,169,126,0.25)", borderRadius: 3 }}
      >
        {meal.strArea || meal.strCategory}
      </div>

      <div className="p-[10px_13px_13px]">
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 600, color: "#f0ece4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {meal.strMeal}
        </p>
        <p style={{ marginTop: 4, fontFamily: "'Josefin Sans',sans-serif", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7a6040" }}>
          {meal.strCategory}
        </p>
      </div>

      {/* Subtle gold sheen on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{ background: "rgba(200,169,126,0.05)" }} />
    </div>
  );
}

function MarqueeRow({ meals, reverse = false, loading }) {
  const skeletons = Array(8).fill(null);
  const doubled = loading ? [...skeletons, ...skeletons] : [...meals, ...meals];
  const duration = reverse ? "355s" : "340s";

  return (
    <div
      style={{
        display: "flex", width: "max-content", gap: 18,
        animation: `${reverse ? "marquee-right" : "marquee-left"} ${duration} linear infinite`,
      }}
      onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
      onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}
    >
      {doubled.map((meal, i) =>
        loading
          ? <SkeletonCard key={i} />
          : <MealCard key={`${meal.idMeal}-${i}`} meal={meal} />
      )}
    </div>
  );
}

export default function MealSlideshow() {
  const [allMeals, setAllMeals] = useState([]);
  const [rows, setRows]         = useState([[], [], []]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchAll() {
      try {
        const results = await Promise.all(
          FETCH_LETTERS.map(l =>
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
              .then(r => { if (!r.ok) throw new Error(); return r.json(); })
              .then(d => d.meals || [])
              .catch(() => [])
          )
        );
        const all = results.flat().sort(() => Math.random() - 0.5);
        setAllMeals(all);
        splitIntoRows(all);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  function splitIntoRows(meals) {
    const shuffled = [...meals].sort(() => Math.random() - 0.5);
    const third = Math.ceil(shuffled.length / 3);
    setRows([
      shuffled.slice(0, third),
      shuffled.slice(third, third * 2),
      shuffled.slice(third * 2),
    ]);
  }

  useEffect(() => {
    if (!allMeals.length) return;
    const filtered = activeCategory === "All"
      ? allMeals
      : allMeals.filter(m => m.strCategory === activeCategory || m.strArea === activeCategory);
    splitIntoRows(filtered.length > 8 ? filtered : allMeals);
  }, [activeCategory, allMeals]);

  return (
    <>
      <style>{marqueeCSS}</style>

      <section
        id="menu"
        // #0a0805
        style={{ background: "", paddingTop: 80, paddingBottom: 80, overflow: "hidden" }}
        className="z-20 relative bg-black/80"

      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52, padding: "0 24px" }}>
          <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c8a97e", marginBottom: 14 }}>
            World Cuisine · Live Menu
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(38px,6vw,72px)", color: "#f5f0e8", lineHeight: 1.02, margin: "0 0 16px" }}>
            Dishes from <em style={{ fontStyle: "italic", color: "#c8a97e" }}>every</em>
            <br />corner of the world
          </h2>
          <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 12, color: "#4a4030", letterSpacing: "0.08em" }}>
            Hover to pause · Scroll to explore
          </p>
        </div>

        {/* Category filter tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 44, padding: "0 16px", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'Josefin Sans',sans-serif",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "7px 16px",
                border: activeCategory === cat ? "1px solid #c8a97e" : "1px solid rgba(200,169,126,0.2)",
                background: activeCategory === cat ? "rgba(200,169,126,0.12)" : "transparent",
                color: activeCategory === cat ? "#c8a97e" : "#6a5840",
                cursor: "pointer",
                transition: "all 0.2s",
                borderRadius: 2,
              }}
              onMouseEnter={e => { if (activeCategory !== cat) e.currentTarget.style.borderColor = "rgba(200,169,126,0.5)"; }}
              onMouseLeave={e => { if (activeCategory !== cat) e.currentTarget.style.borderColor = "rgba(200,169,126,0.2)"; }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error state */}
        {error && (
          <p style={{ textAlign: "center", fontFamily: "'Cormorant Garamond',serif", color: "#6a5840", fontSize: 16, marginBottom: 40 }}>
            Couldn't load dishes — please try again later.
          </p>
        )}

        {/* Marquee stage */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Left fade */}
          <div style={{ pointerEvents: "none", position: "absolute", left: 0, top: 0, bottom: 0, width: 110, zIndex: 10, background: "linear-gradient(to right, #0a0805, transparent)" }} />
          {/* Right fade */}
          <div style={{ pointerEvents: "none", position: "absolute", right: 0, top: 0, bottom: 0, width: 110, zIndex: 10, background: "linear-gradient(to left, #0a0805, transparent)" }} />

          <MarqueeRow meals={rows[0]} loading={loading} />
          <MarqueeRow meals={rows[1]} loading={loading} reverse />
          <MarqueeRow meals={rows[2]} loading={loading} />
        </div>

        {/* Attribution */}
        <p style={{ textAlign: "center", marginTop: 44, fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, color: "#2e2618", letterSpacing: "0.1em" }}>
          Data from{" "}
          <a href="https://www.themealdb.com" target="_blank" rel="noreferrer" style={{ color: "#5a4828", textDecoration: "none" }}>
            TheMealDB
          </a>
        </p>
      </section>
    </>
  );
}