

// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Beef, Coffee, Drumstick, Fish, Salad, Soup,
//   Leaf, Apple, Utensils, Search, ChevronDown, ChevronUp, Clock,
// } from "lucide-react";


// const fontLink = document.createElement("link");
// fontLink.rel = "stylesheet";
// fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap";
// if (!document.head.querySelector("link[href*='Cormorant']")) document.head.appendChild(fontLink);


// const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "s", "r", "p"];
// const PREVIEW_COUNT = 4;

// const CATEGORY_META = {
//   Beef:          { Icon: Beef,      time: "25–35 min" },
//   Breakfast:     { Icon: Coffee,    time: "7 AM – 11 AM" },
//   Chicken:       { Icon: Drumstick, time: "20–30 min" },
//   Dessert:       { Icon: Apple,     time: "All day" },
//   Goat:          { Icon: Beef,      time: "35–45 min" },
//   Lamb:          { Icon: Beef,      time: "30–40 min" },
//   Miscellaneous: { Icon: Utensils,  time: "All day" },
//   Pasta:         { Icon: Utensils,  time: "15–25 min" },
//   Pork:          { Icon: Beef,      time: "25–35 min" },
//   Seafood:       { Icon: Fish,      time: "20–30 min" },
//   Side:          { Icon: Salad,     time: "All day" },
//   Starter:       { Icon: Soup,      time: "All day" },
//   Vegan:         { Icon: Leaf,      time: "All day" },
//   Vegetarian:    { Icon: Leaf,      time: "All day" },
// };

// const getMeta  = (cat) => CATEGORY_META[cat] || { Icon: Utensils, time: "All day" };
// const getPrice = (id)  => ((parseInt(id.slice(-2), 10) % 20) + 8).toFixed(2);


// async function fetchAllMeals() {
//   const results = await Promise.all(
//     LETTERS.map((l) =>
//       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
//         .then((r) => r.json())
//         .then((d) => d.meals || [])
//         .catch(() => [])
//     )
//   );
//   const map = {};
//   results.flat().forEach((m) => (map[m.idMeal] = m));
//   return Object.values(map);
// }

// function groupByCategory(meals) {
//   const map = {};
//   meals.forEach((m) => {
//     if (!map[m.strCategory]) map[m.strCategory] = [];
//     map[m.strCategory].push(m);
//   });
//   return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
// }

// /* ── Variants  */
// const listVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.055 } },
// };
// const rowVariants = {
//   hidden:   { opacity: 0, y: 14 },
//   visible:  { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
//   exit:     { opacity: 0, y: 8, transition: { duration: 0.18 } },
// };

// /* Fonts shorthand  */
// const serif = "'Cormorant Garamond', Georgia, serif";
// const sans  = "'Montserrat', sans-serif";

// /*  MealRow  */
// function MealRow({ meal }) {
//   const { Icon } = getMeta(meal.strCategory);

//   return (
//     <motion.div
//       variants={rowVariants}
//       layout
//       className="group flex items-center gap-4 sm:gap-5 px-4 sm:px-5 py-4 rounded-2xl
//                  bg-white/[0.025] border border-white/[0.06]
//                  hover:bg-white/[0.055] hover:border-white/[0.14]
//                  transition-all duration-300 cursor-pointer"
//     >
//       {/* Thumbnail */}
//       <div className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] flex-shrink-0 rounded-xl overflow-hidden">
//         <img
//           src={`${meal.strMealThumb}/preview`}
//           alt={meal.strMeal}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//       </div>

//       {/* Info */}
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-1">
//           <h4
//             className="text-[15px] sm:text-[16px] text-white/90 truncate leading-snug"
//             style={{ fontFamily: serif, fontWeight: 500 }}
//           >
//             {meal.strMeal}
//           </h4>
//           <Icon size={13} className="text-white/30 flex-shrink-0 hidden sm:block" />
//         </div>
//         <p
//           className="text-[10px] sm:text-[11px] text-white/35 truncate uppercase tracking-wider"
//           style={{ fontFamily: sans }}
//         >
//           {meal.strArea} · {meal.strCategory}
//         </p>
//       </div>

//       {/* Price */}
//       <span
//         className="flex-shrink-0 text-[13px] text-white/70 px-3 py-1.5
//                    bg-white/[0.05] border border-white/[0.09] rounded-xl
//                    group-hover:border-white/25 group-hover:text-white
//                    transition-all duration-300"
//         style={{ fontFamily: sans, fontWeight: 300 }}
//       >
//         ${getPrice(meal.idMeal)}
//       </span>
//     </motion.div>
//   );
// }

// /* CategorySection*/
// function CategorySection({ category, meals }) {
//   const [expanded, setExpanded] = useState(false);
//   const { Icon, time } = getMeta(category);
//   const visible = expanded ? meals : meals.slice(0, PREVIEW_COUNT);

//   return (
//     <section className="mb-16">
//       {/* Header */}
//       <div className="flex items-end justify-between mb-6 pb-5 border-b border-white/[0.08]">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.09]
//                           flex items-center justify-center flex-shrink-0">
//             <Icon size={14} className="text-white/55" />
//           </div>
//           <h3
//             className="text-2xl sm:text-3xl text-white/90 uppercase tracking-[0.1em] font-light"
//             style={{ fontFamily: serif }}
//           >
//             {category}
//           </h3>
//         </div>
//         <div className="flex items-center gap-1.5 text-white/25 mb-0.5 flex-shrink-0 ml-3">
//           <Clock size={10} />
//           <span
//             className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase whitespace-nowrap"
//             style={{ fontFamily: sans }}
//           >
//             {time}
//           </span>
//         </div>
//       </div>

//       {/* Rows */}
//       <motion.div
//         variants={listVariants}
//         initial="hidden"
//         animate="visible"
//         className="flex flex-col gap-3"
//       >
//         <AnimatePresence mode="popLayout">
//           {visible.map((meal) => (
//             <MealRow key={meal.idMeal} meal={meal} />
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* Toggle */}
//       {meals.length > PREVIEW_COUNT && (
//         <motion.button
//           onClick={() => setExpanded((p) => !p)}
//           whileHover={{ scale: 1.005 }}
//           whileTap={{ scale: 0.995 }}
//           className="mt-5 w-full py-3.5 flex items-center justify-center gap-2
//                      border border-white/[0.08] rounded-2xl
//                      text-white/30 hover:text-white/65 hover:border-white/22
//                      hover:bg-white/[0.025] transition-all duration-300"
//           style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase" }}
//         >
//           {expanded
//             ? <><ChevronUp size={12} /><span>Show less</span></>
//             : <><span>See all {meals.length} items</span><ChevronDown size={12} /></>
//           }
//         </motion.button>
//       )}
//     </section>
//   );
// }

// /* Main Page*/
// export default function MenuPage() {
//   const [meals, setMeals]       = useState([]);
//   const [search, setSearch]     = useState("");
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState(false);
//   const [activeFilter, setActiveFilter] = useState("All");

//   useEffect(() => {
//     fetchAllMeals()
//       .then(setMeals)
//       .catch(() => setError(true))
//       .finally(() => setLoading(false));
//   }, []);

//   const allCategories = useMemo(
//     () => ["All", ...Array.from(new Set(meals.map((m) => m.strCategory))).sort()],
//     [meals]
//   );

//   const filtered = useMemo(() => {
//     let list = meals;
//     if (search.trim())
//       list = list.filter((m) =>
//         `${m.strMeal} ${m.strCategory} ${m.strArea}`.toLowerCase().includes(search.toLowerCase())
//       );
//     if (activeFilter !== "All")
//       list = list.filter((m) => m.strCategory === activeFilter);
//     return list;
//   }, [meals, search, activeFilter]);

//   const categories = useMemo(() => groupByCategory(filtered), [filtered]);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5">
//         <div className="w-9 h-9 border border-white/15 border-t-white/50 rounded-full animate-spin" />
//         <p className="text-white/25 text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: sans }}>
//           Curating the menu…
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white/30 text-sm">
//         Failed to load. Please try again.
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#080808] text-white flex flex-col lg:flex-row" style={{ fontFamily: sans }}>

//       {/*LEFT: Sticky hero */}
//       <div
//         className="
//           relative flex-shrink-0
//           h-[56vw] min-h-[220px] max-h-[400px]
//           lg:w-[40%] lg:h-screen lg:max-h-none lg:sticky lg:top-0
//         "
//       >
//         <img
//           src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85"
//           alt="Kitchen"
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         {/* overlays */}
//         <div className="absolute inset-0 bg-black/55" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/25 hidden lg:block" />

//         {/* hero copy */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
//           <div className="w-10 h-px bg-white/30 mb-5" />

//           <p
//             className="text-[9px] sm:text-[10px] tracking-[0.5em] text-white/40 uppercase mb-4"
//             style={{ fontFamily: sans }}
//           >
//             Est. 2019 · Fine Dining
//           </p>

//           <h1
//             className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-light text-white
//                        leading-[0.92] tracking-[0.05em] uppercase"
//             style={{ fontFamily: serif }}
//           >
//             Our
//             <br />
//             <em style={{ fontStyle: "italic", fontWeight: 300 }}>Menu</em>
//           </h1>

//           <div className="w-10 h-px bg-white/30 mt-5 mb-4" />

//           <p
//             className="text-[10px] sm:text-[11px] text-white/35 tracking-[0.22em] uppercase leading-relaxed"
//             style={{ fontFamily: sans }}
//           >
//             Fresh ingredients · Bold flavours
//           </p>
//         </div>

//         {/* mobile bottom fade */}
//         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#080808] lg:hidden" />
//       </div>

//       {/* RIGHT: Scrollable ──────────────────── */}
//       <div className="flex-1 lg:h-screen lg:overflow-y-auto overscroll-contain">

//         {/* Sticky top bar: search + filters */}
//         <div className="sticky top-0 z-20 bg-[#080808]/96 backdrop-blur-xl border-b border-white/[0.06] px-5 sm:px-8 py-5">
//           {/* Search */}
//           <div className="relative mb-4">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={13} />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search dishes, cuisine, category…"
//               className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] text-white/75
//                          bg-white/[0.04] border border-white/[0.07]
//                          placeholder:text-white/22 outline-none tracking-wide
//                          focus:border-white/22 focus:bg-white/[0.055] transition-all duration-300"
//               style={{ fontFamily: sans }}
//             />
//           </div>

//           {/* Filter pills */}
//           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
//             {allCategories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveFilter(cat)}
//                 className={`flex-shrink-0 px-4 py-1.5 rounded-full border transition-all duration-200
//                   ${activeFilter === cat
//                     ? "bg-white text-[#080808] border-white font-medium"
//                     : "border-white/[0.11] text-white/32 hover:text-white/65 hover:border-white/28"
//                   }`}
//                 style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Menu content */}
//         <div className="px-5 sm:px-8 lg:px-10 pt-10 pb-24">
//           {categories.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-32 text-center">
//               <p className="text-white/20 text-2xl mb-3" style={{ fontFamily: serif, fontStyle: "italic" }}>
//                 No dishes found
//               </p>
//               <p className="text-white/15 text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: sans }}>
//                 Try a different search term
//               </p>
//             </div>
//           ) : (
//             <AnimatePresence mode="popLayout">
//               {categories.map(([category, catMeals]) => (
//                 <CategorySection key={category} category={category} meals={catMeals} />
//               ))}
//             </AnimatePresence>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-white/[0.05] px-8 py-7 text-center">
//           <p className="text-white/12 text-[9px] tracking-[0.35em] uppercase" style={{ fontFamily: sans }}>
//             Made by Samuel Ntekim · 2026
//           </p>
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }



import { useCart } from "../components/CartContent";       
import { useNavigate } from "react-router-dom"; 
import { useState, useEffect, useMemo, useCallback, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Beef, Coffee, Drumstick, Fish, Salad, Soup,
  Leaf, Apple, Utensils, Search, ChevronDown, ChevronUp, Clock,
  ShoppingBag, Plus,
} from "lucide-react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap";
if (!document.head.querySelector("link[href*='Cormorant']")) document.head.appendChild(fontLink);

const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "s", "r", "p"];
const PREVIEW_COUNT = 4;

const CATEGORY_META = {
  Beef:          { Icon: Beef,      time: "25–35 min" },
  Breakfast:     { Icon: Coffee,    time: "7 AM – 11 AM" },
  Chicken:       { Icon: Drumstick, time: "20–30 min" },
  Dessert:       { Icon: Apple,     time: "All day" },
  Goat:          { Icon: Beef,      time: "35–45 min" },
  Lamb:          { Icon: Beef,      time: "30–40 min" },
  Miscellaneous: { Icon: Utensils,  time: "All day" },
  Pasta:         { Icon: Utensils,  time: "15–25 min" },
  Pork:          { Icon: Beef,      time: "25–35 min" },
  Seafood:       { Icon: Fish,      time: "20–30 min" },
  Side:          { Icon: Salad,     time: "All day" },
  Starter:       { Icon: Soup,      time: "All day" },
  Vegan:         { Icon: Leaf,      time: "All day" },
  Vegetarian:    { Icon: Leaf,      time: "All day" },
};

const getMeta  = (cat) => CATEGORY_META[cat] || { Icon: Utensils, time: "All day" };
const getPrice = (id)  => ((parseInt(id.slice(-2), 10) % 20) + 8).toFixed(2);

async function fetchAllMeals() {
  const results = await Promise.all(
    LETTERS.map((l) =>
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
        .then((r) => r.json())
        .then((d) => d.meals || [])
        .catch(() => [])
    )
  );
  const map = {};
  results.flat().forEach((m) => (map[m.idMeal] = m));
  return Object.values(map);
}

function groupByCategory(meals) {
  const map = {};
  meals.forEach((m) => {
    if (!map[m.strCategory]) map[m.strCategory] = [];
    map[m.strCategory].push(m);
  });
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};
const rowVariants = {
  hidden:   { opacity: 0, y: 14 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
  exit:     { opacity: 0, y: 8,  transition: { duration: 0.18 } },
};

const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'Montserrat', sans-serif";

/* ─── FloatingPlus: the "+1" that flies up on add ─── */
function FloatingPlus({ trigger }) {
  const [sparks, setSparks] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    const id = ++counterRef.current;
    setSparks((prev) => [...prev, id]);
    setTimeout(() => setSparks((prev) => prev.filter((s) => s !== id)), 800);
  }, [trigger]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <AnimatePresence>
        {sparks.map((id) => (
          <motion.span
            key={id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -34, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: sans,
              fontSize: "11px",
              fontWeight: 500,
              color: "#c8a97e",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 50,
            }}
          >
            +1
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

/* ─── PriceBadge: the clickable price with add animation ─── */
function PriceBadge({ meal, onAdd }) {
  const [addTrigger, setAddTrigger] = useState(0);
  const [burst, setBurst] = useState(false);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onAdd(meal);
    setAddTrigger((t) => t + 1);
    setBurst(true);
    setTimeout(() => setBurst(false), 350);
  }, [meal, onAdd]);

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <FloatingPlus trigger={addTrigger} />
      <motion.button
        onClick={handleClick}
        animate={burst
          ? { scale: [1, 1.22, 1], boxShadow: ["0 0 0px #c8a97e00", "0 0 18px #c8a97e88", "0 0 0px #c8a97e00"] }
          : { scale: 1, boxShadow: "0 0 0px #c8a97e00" }
        }
        transition={{ duration: 0.35 }}
        style={{
          fontFamily: sans,
          fontSize: "13px",
          fontWeight: 300,
          color: burst ? "#c8a97e" : "rgba(255,255,255,0.7)",
          padding: "6px 14px",
          background: burst ? "rgba(200,169,126,0.12)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${burst ? "rgba(200,169,126,0.55)" : "rgba(255,255,255,0.09)"}`,
          borderRadius: "12px",
          cursor: "pointer",
          transition: "color 0.2s, background 0.2s, border-color 0.2s",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          userSelect: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(200,169,126,0.4)";
          e.currentTarget.style.color = "#c8a97e";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = burst ? "rgba(200,169,126,0.55)" : "rgba(255,255,255,0.09)";
          e.currentTarget.style.color = burst ? "#c8a97e" : "rgba(255,255,255,0.7)";
        }}
      >
        <Plus size={10} style={{ opacity: 0.6 }} />
        ${getPrice(meal.idMeal)}
      </motion.button>
    </div>
  );
}

/* ─── MealRow ─── */
const MealRow = forwardRef(function MealRow({ meal, onAdd }, ref) {
  const { Icon } = getMeta(meal.strCategory);
  return (
    <motion.div
      ref={ref}
      variants={rowVariants}
      layout
      className="group flex items-center gap-4 sm:gap-5 px-4 sm:px-5 py-4 rounded-2xl
                 bg-white/[0.025] border border-white/[0.06]
                 hover:bg-white/[0.055] hover:border-white/[0.14]
                 transition-all duration-300 cursor-pointer"
    >      <div className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={`${meal.strMealThumb}/preview`}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4
            className="text-[15px] sm:text-[16px] text-white/90 truncate leading-snug"
            style={{ fontFamily: serif, fontWeight: 500 }}
          >
            {meal.strMeal}
          </h4>
          <Icon size={13} className="text-white/30 flex-shrink-0 hidden sm:block" />
        </div>
        <p
          className="text-[10px] sm:text-[11px] text-white/35 truncate uppercase tracking-wider"
          style={{ fontFamily: sans }}
        >
          {meal.strArea} · {meal.strCategory}
        </p>
      </div>

      <PriceBadge meal={meal} onAdd={onAdd} />
    </motion.div>
  );
});

/* ─── CategorySection ─── */
const CategorySection = forwardRef(function CategorySection({ category, meals, onAdd }, ref) {
  const [expanded, setExpanded] = useState(false);
  const { Icon, time } = getMeta(category);
  const visible = expanded ? meals : meals.slice(0, PREVIEW_COUNT);

  return (
    <section ref={ref} className="mb-16">      <div className="flex items-end justify-between mb-6 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.09]
                          flex items-center justify-center flex-shrink-0">
            <Icon size={14} className="text-white/55" />
          </div>
          <h3
            className="text-2xl sm:text-3xl text-white/90 uppercase tracking-[0.1em] font-light"
            style={{ fontFamily: serif }}
          >
            {category}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-white/25 mb-0.5 flex-shrink-0 ml-3">
          <Clock size={10} />
          <span
            className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase whitespace-nowrap"
            style={{ fontFamily: sans }}
          >
            {time}
          </span>
        </div>
      </div>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((meal) => (
            <MealRow key={meal.idMeal} meal={meal} onAdd={onAdd} />
          ))}
        </AnimatePresence>
      </motion.div>

      {meals.length > PREVIEW_COUNT && (
        <motion.button
          onClick={() => setExpanded((p) => !p)}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          className="mt-5 w-full py-3.5 flex items-center justify-center gap-2
                     border border-white/[0.08] rounded-2xl
                     text-white/30 hover:text-white/65 hover:border-white/22
                     hover:bg-white/[0.025] transition-all duration-300"
          style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase" }}
        >
          {expanded
            ? <><ChevronUp size={12} /><span>Show less</span></>
            : <><span>See all {meals.length} items</span><ChevronDown size={12} /></>}
        </motion.button>
      )}
    </section>
  );
});

/* ─── CartBadge in top-right ─── */
function CartButton({ count, onClick }) {
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
      prevCount.current = count;
    }
  }, [count]);

  return (
    <motion.button
      onClick={onClick}
      animate={pulse ? { scale: [1, 1.18, 1] } : { scale: 1 }}
      transition={{ duration: 0.35 }}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "9px",
        background: count > 0 ? "#c8a97e" : "rgba(255,255,255,0.06)",
        border: `1px solid ${count > 0 ? "#c8a97e" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "40px",
        padding: count > 0 ? "12px 20px 12px 16px" : "12px 16px",
        cursor: "pointer",
        transition: "background 0.35s, border-color 0.35s, padding 0.35s",
        boxShadow: count > 0 ? "0 8px 30px rgba(200,169,126,0.35)" : "none",
      }}
    >
      <ShoppingBag
        size={16}
        style={{ color: count > 0 ? "#0a0805" : "rgba(255,255,255,0.45)", transition: "color 0.3s" }}
      />
      <AnimatePresence mode="wait">
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.8 }}
            transition={{ duration: 0.22 }}
            style={{
              fontFamily: sans,
              fontSize: "12px",
              fontWeight: 500,
              color: "#0a0805",
              lineHeight: 1,
              minWidth: "16px",
              textAlign: "center",
            }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
      <span style={{
        fontFamily: sans, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
        color: count > 0 ? "#0a0805" : "rgba(255,255,255,0.3)", transition: "color 0.3s",
        display: count > 0 ? "inline" : "none",
      }}>
        Order
      </span>
    </motion.button>
  );
}

/* ─── Main MenuPage ─── */
export default function MenuPage() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [meals, setMeals]     = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchAllMeals()
      .then(setMeals)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = useCallback((meal) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.idMeal === meal.idMeal);
      if (existing) {
        return prev.map((i) =>
          i.idMeal === meal.idMeal ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...meal, qty: 1, price: parseFloat(getPrice(meal.idMeal)) }];
    });
  }, [setCart]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const allCategories = useMemo(
    () => ["All", ...Array.from(new Set(meals.map((m) => m.strCategory))).sort()],
    [meals]
  );

  const filtered = useMemo(() => {
    let list = meals;
    if (search.trim())
      list = list.filter((m) =>
        `${m.strMeal} ${m.strCategory} ${m.strArea}`.toLowerCase().includes(search.toLowerCase())
      );
    if (activeFilter !== "All")
      list = list.filter((m) => m.strCategory === activeFilter);
    return list;
  }, [meals, search, activeFilter]);

  const categories = useMemo(() => groupByCategory(filtered), [filtered]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5">
        <div className="w-9 h-9 border border-white/15 border-t-white/50 rounded-full animate-spin" />
        <p className="text-white/25 text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: sans }}>
          Curating the menu…
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white/30 text-sm">
        Failed to load. Please try again.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col lg:flex-row" style={{ fontFamily: sans }}>

      {/* LEFT: Sticky hero */}
      <div className="relative flex-shrink-0 h-[56vw] min-h-[220px] max-h-[400px] lg:w-[40%] lg:h-screen lg:max-h-none lg:sticky lg:top-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85"
          alt="Kitchen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/25 hidden lg:block" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-10 h-px bg-white/30 mb-5" />
          <p className="text-[9px] sm:text-[10px] tracking-[0.5em] text-white/40 uppercase mb-4" style={{ fontFamily: sans }}>
            Est. 2019 · Fine Dining
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-light text-white leading-[0.92] tracking-[0.05em] uppercase"
            style={{ fontFamily: serif }}
          >
            Our<br /><em style={{ fontStyle: "italic", fontWeight: 300 }}>Menu</em>
          </h1>
          <div className="w-10 h-px bg-white/30 mt-5 mb-4" />
          <p className="text-[10px] sm:text-[11px] text-white/35 tracking-[0.22em] uppercase leading-relaxed" style={{ fontFamily: sans }}>
            Fresh ingredients · Bold flavours
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#080808] lg:hidden" />
      </div>

      {/* RIGHT: Scrollable */}
      <div className="flex-1 lg:h-screen lg:overflow-y-auto overscroll-contain">
        <div className="sticky top-0 z-20 bg-[#080808]/96 backdrop-blur-xl border-b border-white/[0.06] px-5 sm:px-8 py-5">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={13} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes, cuisine, category…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] text-white/75
                         bg-white/[0.04] border border-white/[0.07]
                         placeholder:text-white/22 outline-none tracking-wide
                         focus:border-white/22 focus:bg-white/[0.055] transition-all duration-300"
              style={{ fontFamily: sans }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full border transition-all duration-200
                  ${activeFilter === cat
                    ? "bg-white text-[#080808] border-white font-medium"
                    : "border-white/[0.11] text-white/32 hover:text-white/65 hover:border-white/28"
                  }`}
                style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 sm:px-8 lg:px-10 pt-10 pb-36">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="text-white/20 text-2xl mb-3" style={{ fontFamily: serif, fontStyle: "italic" }}>
                No dishes found
              </p>
              <p className="text-white/15 text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: sans }}>
                Try a different search term
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {categories.map(([category, catMeals]) => (
                <CategorySection key={category} category={category} meals={catMeals} onAdd={handleAdd} />
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="border-t border-white/[0.05] px-8 py-7 text-center">
          <p className="text-white/12 text-[9px] tracking-[0.35em] uppercase" style={{ fontFamily: sans }}>
            Made by Samuel Ntekim · 2026
          </p>
        </div>
      </div>

      {/* Floating cart button */}
      <CartButton count={totalItems} onClick={() => navigate("/order")} />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}