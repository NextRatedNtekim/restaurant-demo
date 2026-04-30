import { useState, useEffect } from "react";
import axios from "axios";

function SearchMeals() {
  // const [query, setQuery] = useState("");
  // const [meals, setMeals] = useState(null);

  // const handleSearch = async () => {
  //   if (!query) return;

  //   const res = await axios.get(
  //     `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  //   );

  //   setMeals(res.data.meals);
  // };


  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 2) { // Only search if query is longer than 2 chars
        searchMeals();
      } else {
        setMeals([]);
        setError("");
      }
    }, 500); // Debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const searchMeals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      if (!res.data.meals) {
        setMeals([]);
        setError("No meals found");
      } else {
        setMeals(res.data.meals);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch meals");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="p-4">
    //   <input
    //     type="text"
    //     placeholder="Search meals..."
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     className="border p-2 mr-2"
    //   />

    //   <button onClick={handleSearch} className="bg-black text-white px-4 py-2">
    //     Search
    //   </button>

    //   <div className="mt-4 grid grid-cols-2 gap-4">
    //     {meals?.map((meal) => (
    //       <div key={meal.idMeal}>
    //         <h3>{meal.strMeal}</h3>
    //         <img src={meal.strMealThumb} width="150" />
    //       </div>
    //     ))}
    //   </div>
    // </div>
    
    <div >
      <input
        type="text"
        placeholder="Search meal..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        onKeyDown={(e) => e.key === 'Enter' && searchMeals()} // Allows for pressing Enter to search
      />

      <button 
        onClick={searchMeals}
        style={{ padding: "10px 20px", cursor: "pointer", marginBottom: "20px" }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {meals.length > 0 && (
        <div>
          {meals.map((meal) => (
            <div key={meal.idMeal} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
              <h3>{meal.strMeal}</h3>
              {meal.strMealThumb && (
                <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: "100%", borderRadius: "5px" }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchMeals;