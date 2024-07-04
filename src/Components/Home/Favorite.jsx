import { useContext, useEffect } from "react";
import { PlaceContext } from "../../Context/City";
import HumidityImg from '../../assets/Images/cloud.png'
import windImg from '../../assets/Images/wind-power.png'

function Favorite() {
  const { Favorite, setFavorite } = useContext(PlaceContext);
  console.log(Favorite, "ff");
  useEffect(() => {
    const Favorite = localStorage.getItem("favorites");
    if (Favorite) {
      setFavorite(JSON.parse(Favorite));
    }
  }, []);
  return (
    <div className="text-white   bg-fixed overflow-x-scroll overflow-hidden gap-2 px-2 no-scrollbar ">
      <h1 className="text-2xl font-bold uppercase text-center m-2 flex ">
        Favorite Cities
      </h1>
      {Favorite.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="inline-flex   ">
          {Favorite.map((weather, index) => (
            <div
              key={index}
              className="bg-gray-500 bg-opacity-65 m-3 rounded-md p-2 px-5 mx-4  w-64"
            >
              <h2 className="text-xl font-semibold text-center">{weather.name}</h2>
              <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>
                Feels Like : {Math.round(weather.main.feels_like - 273.15)}°C ❄️
              </p>
              <div className="flex gap-3 items-center ">
                <img className="w-6 h-6 " src={HumidityImg} alt="humidity img" />
                <p>{weather.main.humidity}%</p>
              </div>
              <div className="flex gap-3 items-center">
                <img className="w-6 h-6" src={windImg} alt="wind img" />
              <p>{weather.wind.speed} m/s</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;
