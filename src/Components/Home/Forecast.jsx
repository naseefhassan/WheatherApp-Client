import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PlaceContext } from "../../Context/City";

function Forecast() {
  const [dailyAverages, setDailyAverages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const { place } = useContext(PlaceContext);
  const { searchTrigger } = useContext(PlaceContext);

  useEffect(() => {
    const fetchWeatherByCoordinates = async (latitude, longitude) => {
      try {
        let response;
        if (place !== "") {
            response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=31e39595099551de72198cdd7e62341e`
            );
            setCity(response.data.city.name);
        } else {
            response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=31e39595099551de72198cdd7e62341e`
            );
        }

        const data = response.data;

        const dailyData = {};
        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!dailyData[date]) {
            dailyData[date] = {
              tempSum: 0,
              count: 0,
              humiditySum: 0,
              windSpeedSum: 0,
              weatherDescription: item.weather[0].description,
            };
          }
          dailyData[date].tempSum += item.main.temp;
          dailyData[date].count += 1;
          dailyData[date].humiditySum += item.main.humidity;
          dailyData[date].windSpeedSum += item.wind.speed;
        });

        const averages = Object.keys(dailyData).map((date) => {
          const { tempSum, count, humiditySum, windSpeedSum, weatherDescription } = dailyData[date];
          const avgTemp = (tempSum / count - 273.15).toFixed(2);
          const avgHumidity = (humiditySum / count).toFixed(2);
          const avgWindSpeed = (windSpeedSum / count).toFixed(2);

          const dateObj = new Date(date);
          const dayName = dateObj.toLocaleDateString("en-US", {
            weekday: "long",
          });
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          });

          return {
            dayName,
            formattedDate,
            avgTemp,
            avgHumidity,
            avgWindSpeed,
            weatherDescription,
          };
        });

        setDailyAverages(averages);
        setCity(response.data.city.name)
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const locateUser = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        }, handleLocationError);
      } else {
        console.log("Geolocation is not supported by this browser.");
        handleLocationError();
      }
    };

    const handleLocationError = (error) => {
      console.error("Error getting user location:", error);
      setCity("Ooty");
      fetchWeatherByCoordinates(11.4118, 76.6953);
    };

    locateUser();
  }, [searchTrigger]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1 className="m-3 font-bold text-xl">Daily Average Temperature</h1>
      <div className="bg-gray-500 bg-opacity-65 m-3 rounded-md p-3  bg-fixed overflow-x-scroll overflow-hidden gap-2 px-2 no-scrollbar">
        <h1 className="font-bold text-xl mx-3 m-2 text-center sm:text-start">
          {city}
        </h1>
        <div className="inline-flex  bg-fixed overflow-x-scroll overflow-hidden gap-2 px-2 no-scrollbar">
          {dailyAverages.map((item, index) => (
            <div
              key={index}
              className="shadow-inner shadow-cyan-500  w-64 flex flex-col items-center flex-wrap rounded-md px-4"
            >
              <p>{item.dayName}</p>
              <p>{item.formattedDate}</p>
              <p>Temperature: {item.avgTemp}°C</p>
              <p>Humidity: {item.avgHumidity}%</p>
              <p>Wind Speed: {item.avgWindSpeed} m/s</p>
              <p>Weather: {item.weatherDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Forecast;
