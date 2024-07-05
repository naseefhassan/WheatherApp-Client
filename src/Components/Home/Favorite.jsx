import { useContext, useEffect } from "react";
import { PlaceContext } from "../../Context/City";
import HumidityImg from "../../assets/Images/cloud.png";
import windImg from "../../assets/Images/wind-power.png";
import BinImg from "../../assets/Images/recycle-bin.png";
import axiosInstance from "../../Api/axios";

function Favorite() {
  const { Favorite, setFavorite, searchTrigger } = useContext(PlaceContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/favorites");
        setFavorite(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setFavorite, searchTrigger]);

  const handleDelete=async(DelId)=>{
    try {
      await axiosInstance.delete(`/weather/delete/${DelId}`,)
      setFavorite((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite._id !== DelId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="text-white bg-fixed overflow-x-scroll overflow-hidden gap-2 px-2 no-scrollbar">
      <h1 className="text-2xl font-bold uppercase text-center m-2 flex">
        Favorite Cities
      </h1>
      {Favorite.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="inline-flex">
          {Favorite.map((weather, index) => (
            <div
              key={index}
              className="bg-gray-500 bg-opacity-65 m-3 rounded-md p-2 px-5 mx-4 w-64"
            >
              <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-center">
                {weather.weather}
              </h2>
              <img onClick={()=>handleDelete(weather._id)} className="w-4 h-4 cursor-pointer" src={BinImg} alt="" />
              </div>
              <p>
                Temperature:
                {Math.round(weather.temp - 273.15)}
                °C
              </p>
              <p>
                Weather:
                {weather.description}
              </p>
              <p>
                Feels Like:
                {Math.round(weather.feelsLike - 273.15)}°C ❄️
              </p>
              <div className="flex gap-3 items-center">
                <img className="w-6 h-6" src={HumidityImg} alt="humidity img" />
                <p>{weather.humidity}%</p>
              </div>
              <div className="flex gap-3 items-center">
                <img className="w-6 h-6" src={windImg} alt="wind img" />
                <p>
                  {weather.wind}
                  m/s
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;
