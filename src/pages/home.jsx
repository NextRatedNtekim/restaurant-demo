// import ScrollZoomHero from "../components/hero";
// import MealSlideshow from "../components/slideshow"
// import AboutSection from "../components/about-section"
// const HomePage = () => {
//   return (
//     <div className="m-0 overflow-hidden">
//       <div className="overflow-hidden">
//         <ScrollZoomHero />
//       </div>
//       <div>
//         <MealSlideshow />
//       </div>
//       <div>
//         <AboutSection />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { useEffect } from "react";
import ScrollZoomHero from "../components/hero";
import MealSlideshow from "../components/slideshow";
import AboutSection from "../components/about-section";
import SpecialsSection from "../components/specials";
import ReservationSection from "../components/reservation";


// Global styles: fonts + resets shared across all sections
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;500&family=Playfair+Display:wght@700;900&display=swap');



html { scroll-behavior: smooth; }

body {
  background: #0a0805;
  color: #f0ece4;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: rgba(200,169,126,0.25);
  color: #f0ece4;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #0a0805; }
::-webkit-scrollbar-thumb { background: #3a2e1e; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #c8a97e; }

input::placeholder,
textarea::placeholder {
  color: rgba(200,169,126,0.3);
  font-family: 'Josefin Sans', sans-serif;
}

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5) sepia(1) hue-rotate(10deg) brightness(0.7);
}

select option {
  background: #1a1410;
  color: #f0ece4;
}
`;

export default function HomePage() {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "kitchen-global-styles";
    if (!document.getElementById("kitchen-global-styles")) {
      style.innerHTML = GLOBAL_CSS;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById("kitchen-global-styles");
      if (el) document.head.removeChild(el);
    };
  }, []);

  return (
    <div style={{ background: "#0a0805", overflowX: "hidden" }}>

      {/* 1. Scroll-zoom hero with video + navbar overlay */}
      <ScrollZoomHero />

      {/* 2. Live meal marquee slideshow */}
      <MealSlideshow />

      {/* 3. Featured dishes / specials grid */}
      <SpecialsSection />

      {/* 4. About / story / chef */}
      <AboutSection />

      {/* 5. Reservation form */}
      <ReservationSection />
    </div>
  );
}