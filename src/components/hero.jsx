import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom"
import Video from "../assets/res.mp4";


const SPRING = { stiffness: 60, damping: 20, mass: 1 };

export default function ScrollZoomHero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, SPRING);

  // Video
  const videoScale  = useTransform(progress, [0, 1], [1, 1.22]);
  const videoFilter = useTransform(progress, [0, 1], ["blur(0px)", "blur(18px)"]);

  // Overlay
  const overlayOp = useTransform(progress, [0, 0.5, 1], [0.35, 0.6, 0.88]);

  // Top / bottom decorative rules
  const ruleWidth = useTransform(progress, [0, 0.35], ["0%", "55%"]);

  // Title
  const titleScale   = useTransform(progress, [0, 0.5, 1],       [1, 1.08, 1.2]);
  const titleOpacity = useTransform(progress, [0, 0.1, 0.45, 0.75], [0.9, 1, 1, 0]);
  const titleY       = useTransform(progress, [0, 0.75],          ["0%", "-30%"]);

  // Eyebrow + subtitle
  const subOpacity = useTransform(progress, [0, 0.15, 0.4, 0.65], [0, 1, 1, 0]);
  const subY       = useTransform(progress, [0, 0.65],             ["14px", "-38px"]);

  // Scroll pill
  const pillOpacity = useTransform(progress, [0, 0.18], [1, 0]);

  // Whole section fade-out
  const sectionOpacity = useTransform(progress, [0.7, 1], [1, 0]);

  return (
    /* scroll-track: 200vh gives a long, luxurious parallax feel */
    <div ref={containerRef} className="relative" style={{ height: "100vh" }}>

      {/* ── Video background ── */}
      <motion.video
        autoPlay muted loop playsInline
        style={{ scale: videoScale, filter: videoFilter }}
        className="fixed inset-0 w-full h-full object-cover z-10 pointer-events-none"
      >
        <source src={Video} type="video/mp4" />
        {/* Fallback gradient when no video provided */}
      </motion.video>

      {/* Fallback bg (shown when no video) */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 55% 40%, #3a2608 0%, #0a0805 65%)",
        }}
      />

      {/* ── Sticky hero frame ── */}
      <motion.div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-20"
        style={{ opacity: sectionOpacity }}
      >
        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none z-10"
          style={{ opacity: overlayOp }}
        />

        {/* Noise grain texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
            opacity: 0.4,
          }}
        />
        {/* Top rule */}
        <motion.div
          className="absolute top-[88px] left-1/2 -translate-x-1/2 h-px bg-white/20 z-10"
          style={{ width: ruleWidth }}
        />

        {/* Eyebrow */}
        <motion.p
          className="relative z-10 tracking-[0.38em] uppercase text-[10px] font-light mb-7 select-none"
          style={{ opacity: subOpacity, y: subY, color: "#c8a97e", fontFamily: "'Josefin Sans',sans-serif" }}
        >
          Est. 2019 · Fine Dining
        </motion.p>

        {/* Main title */}
        <motion.h1
          className="relative z-10 text-white uppercase text-center select-none"
          style={{
            scale: titleScale, opacity: titleOpacity, y: titleY,
            fontSize: "clamp(72px, 15vw, 180px)",
            lineHeight: 0.88,
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 300,
            letterSpacing: "0.04em",
            textShadow: "0 6px 50px rgba(0,0,0,0.6)",
          }}
        >
          KITCHEN
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="relative z-10 tracking-[0.28em] uppercase text-[11px] font-light mt-8 select-none"
          style={{ opacity: subOpacity, y: subY, color: "rgba(200,169,126,0.7)", fontFamily: "'Josefin Sans',sans-serif" }}
        >
          Where every dish tells a story
        </motion.p>

        {/* CTA pill */}
        <motion.div
          className="relative z-10 mt-12 flex gap-4"
          style={{ opacity: subOpacity }}
        >
          <button
            onClick={() => navigate("/menu")}
            className="cursor-pointer"
            style={{
              fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: "0.25em",
              textTransform: "uppercase", color: "#0a0805", background: "#c8a97e",
              padding: "14px 30px", textDecoration: "none", transition: "background .3s",
            }}
            onMouseEnter={e => e.target.style.background = "#dbbf8e"}
            onMouseLeave={e => e.target.style.background = "#c8a97e"}
          >
            Explore Menu
          </button>
          <a
            href="#about"
            style={{
              fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: "0.25em",
              textTransform: "uppercase", color: "#c8a97e", border: "1px solid rgba(200,169,126,0.45)",
              padding: "14px 30px", textDecoration: "none", background: "transparent", transition: "all .3s",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(200,169,126,0.08)"; e.target.style.borderColor = "#c8a97e"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(200,169,126,0.45)"; }}
          >
            Our Story
          </a>
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          className="absolute bottom-[72px] left-1/2 -translate-x-1/2 h-px bg-white/20 z-10"
          style={{ width: ruleWidth }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ opacity: pillOpacity }}
        >
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.35em", color: "rgba(200,169,126,0.55)", textTransform: "uppercase" }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #c8a97e, transparent)" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}



