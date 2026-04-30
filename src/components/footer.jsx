const LINKS = {
  Discover: ["Menu", "Wine List", "Tasting Menu", "Private Dining"],
  Visit: ["Reservations", "Hours & Location", "Parking", "Gift Cards"],
  Connect: ["Instagram", "Facebook", "OpenTable", "Press"],
};

export default function Footer() {
  return (
    <footer className="bg-[#060503] border-t border-[rgba(200,169,126,0.12)] font-['Josefin_Sans',sans-serif] relative z-20">

      {/* Main grid */}
      <div className="max-w-[1100px] mx-auto px-6 pt-16 pb-12 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-y-10 gap-x-8">

        {/* Brand column */}
        <div>
          <div className="mb-5">
            <p className="font-['Cormorant_Garamond',serif] font-light text-[24px] tracking-[0.16em] text-[#c8a97e] mb-[3px]">
              KITCHEN
            </p>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#3a2e1e]">
              Fine Dining
            </p>
          </div>

          <p className="font-['Cormorant_Garamond',serif] italic text-[14px] text-[#4a3c28] leading-[1.75] max-w-[200px]">
            A sanctuary of flavour in the heart of the city.
          </p>

          <div className="flex gap-3 mt-[22px]">
            {["IG", "FB", "TW"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 flex items-center justify-center border border-[rgba(200,169,126,0.2)] text-[#5a4830] no-underline text-[9px] tracking-[0.1em] transition-all duration-200 hover:border-[#c8a97e] hover:text-[#c8a97e]"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group}>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#c8a97e] mb-[18px]">
              {group}
            </p>

            <ul className="flex flex-col gap-[10px] list-none p-0 m-0">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[11px] tracking-[0.1em] text-[#4a3c28] no-underline transition-colors duration-200 hover:text-[#c8a97e]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#c8a97e] mb-[18px]">
            Newsletter
          </p>

          <p className="font-['Cormorant_Garamond',serif] text-[14px] text-[#4a3c28] leading-[1.7] mb-4">
            Seasonal menus, events, and curated stories from our kitchen.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-[rgba(200,169,126,0.2)] border-r-0 text-[#f0ece4] px-3 py-[9px] font-['Josefin_Sans',sans-serif] text-[10px] tracking-[0.08em] outline-none"
            />

            <button
              className="bg-[#c8a97e] text-[#0a0805] px-[14px] py-[9px] cursor-pointer font-['Josefin_Sans',sans-serif] text-[9px] tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[#dbbf8e]"
            >
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(200,169,126,0.08)] px-6 py-5 max-w-[1100px] mx-auto flex justify-between flex-wrap gap-3 items-center">
        <p className="text-[9px] tracking-[0.12em] text-[#2e2418] m-0">
          © 2025 Kitchen Fine Dining · All Rights Reserved
        </p>

        <div className="flex gap-5">
          {["Privacy Policy", "Terms of Use", "Accessibility"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[9px] tracking-[0.12em] text-[#2e2418] no-underline transition-colors duration-200 hover:text-[#5a4830]"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}