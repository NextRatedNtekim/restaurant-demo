import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function HeroSlideshow() {
  const [image, setImage] = useState("");

  const fetchRandomMeal = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    setImage(res.data.meals[0].strMealThumb);
  };

  useEffect(() => {
    fetchRandomMeal();

    const interval = setInterval(fetchRandomMeal, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.img
          key={image}
          src={image}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>
  );
}

export default HeroSlideshow;