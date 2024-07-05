import { useContext, useEffect, useState } from "react";
import HumidityImg from "../../assets/Images/cloud.png";
import windImg from "../../assets/Images/wind-power.png";
import axiosInstance from "../../Api/axios"; // Replace with your axios instance
import { PlaceContext } from "../../Context/City";

function History() {
  const { place, searchTrigger } = useContext(PlaceContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/weather/historical/${place}`);
        setHistory(response.data.data.timelines.daily); // Adjust according to your API response structure
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTrigger, place]);

  const calculateDailyAverages = (dailyData) => {
    if (!dailyData.hourly || dailyData.hourly.length === 0) {
      return {
        date: dailyData.time,
        avgTemp: 0,
        avgHumidity: 0,
        avgWindSpeed: 0
      };
    }

    const avgTemp = dailyData.hourly.reduce((acc, cur) => acc + cur.values.temperature, 0) / dailyData.hourly.length;
    const avgHumidity = dailyData.hourly.reduce((acc, cur) => acc + cur.values.humidity, 0) / dailyData.hourly.length;
    const avgWindSpeed = dailyData.hourly.reduce((acc, cur) => acc + cur.values.windSpeed, 0) / dailyData.hourly.length;

    return {
      date: dailyData.time,
      avgTemp,
      avgHumidity,
      avgWindSpeed
    };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-white bg-fixed overflow-x-scroll overflow-hidden gap-2 px-2 no-scrollbar">
      <h1 className="text-2xl font-bold uppercase text-center m-2 flex">
        Past Climate
      </h1>
      <div className="inline-flex">
        {history?.slice(0, 7).map((dayData) => {
          const averages = calculateDailyAverages(dayData);
          return (
            <div key={averages.date} className="bg-gray-500 bg-opacity-65 m-3 rounded-md p-2 px-5 mx-4 w-64">
              <h2 className="text-xl font-semibold text-center">{new Date(averages.date).toLocaleDateString()}</h2>
              <p>Temperature: {Math.round(averages.avgTemp)}°C</p>
              <p>Humidity: {Math.round(averages.avgHumidity)}%</p>
              <div className="flex gap-3 items-center">
                <img className="w-6 h-6" src={HumidityImg} alt="humidity img" />
                <p>Humidity: {Math.round(averages.avgHumidity)}%</p>
              </div>
              <div className="flex gap-3 items-center">
                <img className="w-6 h-6" src={windImg} alt="wind img" />
                <p>Wind: {Math.round(averages.avgWindSpeed)} m/s</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
