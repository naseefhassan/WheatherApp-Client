import { useContext, useState } from "react";
import axiosInstance from "../../Api/axios";
import { PlaceContext } from "../../Context/City";

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const { place, setPlace, setSearchTrigger, setFavorite } = useContext(PlaceContext);

  const handleSearch = async () => {
    if (place.trim() === "") {
      setError("Please enter a city or place");
      return;
    }
    try {
      const response = await axiosInstance.get(`/weather/current/${place}`);
      setWeather(response.data.data);
      setError("");
      setSearchTrigger((prevState) => !prevState);
    } catch (error) {
      setError("Could not fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  const handleFavorite = () => {
    if (!weather) return;

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyExists = storedFavorites.some(
      (fav) => fav.id === weather.id
    );

    if (alreadyExists) {
      setError("City is already in your favorites");
      return;
    }

    const newFavorites = [...storedFavorites, weather];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorite(newFavorites);
    setError(""); // Clear any previous errors
  };

  return (
    <div className="text-white bg-transparent shadow-2xl shadow-black inline-block p-5 rounded-md">
      <h1 className="text-2xl font-bold uppercase text-center m-2">Live Weather</h1>
     <div className="flex">
     <input
        type="text"
        name="place"
        onChange={(e) => setPlace(e.target.value)}
        value={place}
        placeholder="Search City/Place"
        className="p-1 rounded-md text-black text-sm text-center"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-1 bg-blue-500 rounded-md text-sm"
      >
        Search
      </button>
     </div>
      {error && <p className="text-red-500 text-[12px] text-center">{error}</p>}
      {weather && (
        <>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Feels Like: {Math.round(weather.main.feels_like - 273.15)}°C</p>
          </div>
          <div className="flex justify-end -mb-3 mt-2">
            <button
              onClick={handleFavorite}
              className="bg-gray-400 p-1 px-3 text-sm rounded-md self-end"
            >
              Add to Favorite
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
