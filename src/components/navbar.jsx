


import { Link, Outlet } from "react-router-dom";
import { X, Menu, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import Footer from "./footer";

// ── Animation variants 

const navbarVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const logoVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
};

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ctaVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.55, ease: "easeOut" } },
};

// Mobile menu
const mobileMenuVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

// ── Nav links data

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

// ── NavLink with animated underline

function NavLink({ to, children, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="relative group text-sm tracking-widest uppercase">
      {children}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-white origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ width: "100%" }}
      />
    </Link>
  );
}

// ── Main Component 

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  // Track scroll position for condensed state
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  // Smooth spring for padding/blur transitions
  const rawProgress = useTransform(scrollY, [0, 120], [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 80, damping: 20 });

  // Navbar shrinks and gains a more opaque backdrop on scroll
  const paddingY = useTransform(progress, [0, 1], [20, 10]);
  const bgOpacity = useTransform(progress, [0, 1], [0.5, 0.92]);
  const borderOpacity = useTransform(progress, [0, 1], [0, 0.18]);
  const blurPx = useTransform(progress, [0, 1], [6, 18]);

  const handleLinkClick = () => setToggleMenu(false);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = toggleMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [toggleMenu]);

  return (
    <div className="h-screen">

      {/* ── Navbar ── */}
      <motion.nav
        className="fixed top-4 left-4 right-4 z-50 rounded-xl text-white"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(0,0,0,${v})`
          ),
          borderColor: useTransform(
            borderOpacity,
            (v) => `rgba(255,255,255,${v})`
          ),
          borderWidth: "1px",
          borderStyle: "solid",
          backdropFilter: useTransform(blurPx, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blurPx, (v) => `blur(${v}px)`),
        }}
      >
        <div className="flex justify-between items-center px-5">

          {/* Mobile: hamburger */}
          <motion.button
            className="sm:hidden cursor-pointer z-[60] relative w-8 h-8 flex items-center justify-center"
            onClick={() => setToggleMenu(!toggleMenu)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.88 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {toggleMenu ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Logo */}
          <motion.div
            variants={logoVariants}
            className="font-serif italic tracking-[0.2em] text-base select-none"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <Link to="/">KITCHEN</Link>
          </motion.div>

          {/* Desktop links */}
          <motion.div
            className="gap-8 hidden sm:flex items-center"
            variants={linkContainerVariants}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <motion.div key={to} variants={linkVariants}>
                <NavLink to={to} onClick={handleLinkClick}>
                  {label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA button */}
          <motion.div variants={ctaVariants} className="cursor-pointer">
            
              <motion.span
                className="text-[11px] tracking-[0.22em] uppercase border border-white/40 px-4 py-2 rounded-full inline-block"
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderColor: "rgba(255,255,255,0.8)",
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/order" >ORDERS </Link>
              </motion.span>
            
          </motion.div>

        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            className="sm:hidden fixed inset-0 z-[55] flex flex-col"
            style={{
              background: "rgba(0,0,0,0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Decorative top accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            <div className="flex flex-col gap-10 h-full items-center justify-center">
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    to={to}
                    onClick={handleLinkClick}
                    className="text-3xl font-serif italic tracking-widest text-white/90 hover:text-white transition-colors"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6"
              >
                <Link to="/order" onClick={handleLinkClick}>
                  <span className="text-xs tracking-[0.3em] uppercase border border-white/30 px-8 py-3 rounded-full text-white/70">
                   Check orders
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Bottom label */}
            <motion.p
              className="absolute bottom-10 text-white/20 text-[10px] tracking-[0.4em] uppercase self-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Made by Samuel Ntekim · 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page content ── */}
      {/* <div className="flex"> */}
        <div className="">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      {/* </div> */}
    </div>
  );
}

export default Navbar;