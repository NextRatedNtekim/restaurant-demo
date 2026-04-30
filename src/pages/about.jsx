import { useState } from "react";

const IMG = {
  hero: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
  dining: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  chef: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  interior: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80",
};

const injectStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Josefin+Sans:wght@300;400;600&display=swap');

  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-josefin   { font-family: 'Josefin Sans', sans-serif; }

  @keyframes heroZoom {
    from { transform: scale(1.04); }
    to   { transform: scale(1.13); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .anim-hero-zoom { animation: heroZoom 18s ease-in-out infinite alternate; }
  .anim-fade-up-1 { animation: fadeUp 0.9s 0.2s both; }
  .anim-fade-up-2 { animation: fadeUp 0.9s 0.4s both; }
  .anim-fade-up-3 { animation: fadeUp 0.9s 0.6s both; }
  .anim-fade-up-4 { animation: fadeUp 0.9s 0.8s both; }

  .card-hover { transition: border-color 0.3s, transform 0.3s; }
  .card-hover:hover { border-color: rgba(201,168,76,0.4) !important; transform: translateY(-3px); }

  .img-zoom img { transition: transform 0.55s ease; }
  .img-zoom:hover img { transform: scale(1.07); }

  .btn-book { transition: background 0.25s, color 0.25s; }
  .btn-book:hover { background: #c9a84c !important; color: #111 !important; }
  .btn-book svg { transition: transform 0.25s; }
  .btn-book:hover svg { transform: translateX(4px); }
`;

export default function VeloriaAbout() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <style>{injectStyles}</style>

      <div className="font-josefin bg-neutral-900 text-neutral-200 min-h-screen">

        

        {/* ── HERO SPLIT ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* LEFT — food image */}
          <div className="relative lg:sticky lg:top-0 overflow-hidden bg-black min-h-[55vw] lg:h-screen img-zoom ">
            <img
              src={IMG.hero}
              alt="Veloria cuisine"
              className="anim-hero-zoom absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.5) saturate(0.8)" }}
            />
            {/* gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 60%)" }}
            />
            {/* Label */}
            <div className="anim-fade-up-1 absolute bottom-10 left-8 md:left-12">
              <p className="font-josefin text-[0.65rem] tracking-[0.32em] font-light mb-3 uppercase" style={{ color: "#c9a84c" }}>
                Our Story
              </p>
              <h1 className="font-cormorant font-light leading-none text-white tracking-[0.1em]" style={{ fontSize: "clamp(3rem,6vw,5.5rem)" }}>
                ABOUT<br />US
              </h1>
            </div>
          </div>

          {/* RIGHT — cards */}
          <div className="flex flex-col gap-3 bg-neutral-900 px-5 md:px-10 pt-28 pb-10">

            {/* ── Card 1: History ── */}
            <div
              className="anim-fade-up-2 card-hover rounded-[18px] border border-white/[0.06] overflow-hidden flex flex-col sm:flex-row"
              style={{ background: "#191919" }}
            >
              <div className="p-7 flex-1">
                <p className="text-[0.65rem] tracking-[0.26em] font-semibold uppercase mb-3" style={{ color: "#c9a84c" }}>
                  Our History &amp; Goals
                </p>
                <div className="w-10 h-px mb-4 opacity-50" style={{ background: "#c9a84c" }} />
                <p className="font-cormorant font-light text-[1.05rem] leading-relaxed text-neutral-400">
                  From humble beginnings to a renowned dining spot, Veloria blends tradition and
                  innovation to deliver luxurious, unforgettable meals with exceptional service.
                </p>
              </div>
              <div className="relative w-full sm:w-[200px] shrink-0 min-h-[160px] overflow-hidden img-zoom">
                <img src={IMG.dining} alt="Veloria dining room" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute bottom-3 right-4 font-cormorant font-light text-white text-2xl tracking-wide" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
                  Veloria
                </span>
              </div>
            </div>

            {/* ── Card 2: Hours ── */}
            <div
              className="anim-fade-up-3 card-hover rounded-[18px] border border-white/[0.06] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              style={{ background: "#191919" }}
            >
              <div>
                <p className="text-[0.65rem] tracking-[0.26em] font-semibold uppercase mb-4" style={{ color: "#c9a84c" }}>
                  Opening Hours
                </p>
                <div className="flex items-center gap-2.5 text-[0.78rem] text-neutral-400 tracking-wide mb-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#c9a84c" }} />
                  Monday – Thursday: 07:00 AM – 11:00 PM
                </div>
                <div className="flex items-center gap-2.5 text-[0.78rem] text-neutral-400 tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#c9a84c" }} />
                  Friday – Sunday: 07:00 AM – Midnight
                </div>
              </div>

              <a
                href="#"
                className="btn-book flex items-center gap-2.5 shrink-0 text-[0.7rem] font-semibold tracking-[0.14em] uppercase px-5 py-3 rounded-full no-underline"
                style={{
                  border: "1px solid rgba(201,168,76,0.4)",
                  background: "rgba(201,168,76,0.1)",
                  color: "#c9a84c",
                }}
              >
                Book a Table
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* ── Card 3: Duo grid ── */}
            <div className="anim-fade-up-4 grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* Chef */}
              <div className="card-hover relative rounded-[18px] overflow-hidden min-h-[260px] border border-white/[0.06] img-zoom">
                <img
                  src={IMG.chef}
                  alt="Chef at work"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(0.6)" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}
                >
                  <p className="text-[0.62rem] tracking-[0.22em] font-semibold uppercase mb-1.5" style={{ color: "#c9a84c" }}>
                    Our Food Philosophy
                  </p>
                  <p className="font-cormorant text-[0.9rem] text-neutral-300 leading-snug">
                    Veloria crafts dishes with passion, precision, and the finest local ingredients.
                  </p>
                </div>
              </div>

              {/* Interior */}
              <div className="card-hover relative rounded-[18px] overflow-hidden min-h-[260px] border border-white/[0.06] img-zoom">
                <img
                  src={IMG.interior}
                  alt="Veloria interior"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(0.6)" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}
                >
                  <p className="text-[0.62rem] tracking-[0.22em] font-semibold uppercase mb-1.5" style={{ color: "#c9a84c" }}>
                    Our Ambience
                  </p>
                  <p className="font-cormorant text-[0.9rem] text-neutral-300 leading-snug">
                    Warm light, grand chandeliers, and timeless elegance — a setting designed to enchant.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}