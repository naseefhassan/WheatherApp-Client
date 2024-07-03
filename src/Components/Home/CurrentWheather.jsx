import React, { useState } from 'react';
import axios from 'axios';

function CurrentWeather() {
  const [place, setPlace] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '31e39595099551de72198cdd7e62341e';
console.log(place);
  const handleSearch = async () => {
    if (place.trim() === '') {
      setError('Please enter a city or place');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`;
      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('Could not fetch weather data. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className='text-white'>
      <h1>Current Weather</h1>
      <input
        type="text"
        name='place'
        onChange={(e) => setPlace(e.target.value)}
        value={place}
        placeholder='Search City/Place'
        className='p-1 rounded-md text-black'
      />
      <button onClick={handleSearch} className='ml-2 p-1 bg-blue-500 rounded-md'>Search</button>
      {error && <p className='text-red-500'>{error}</p>}
      {weather && (
        <div className='mt-4'>
          <h2 className='text-2xl'>{weather.name}</h2>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Feels Like: {Math.round(weather.main.feels_like - 273.15)}℃</p>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
