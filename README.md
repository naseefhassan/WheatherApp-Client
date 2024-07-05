# Weather Dashboard Application

This project is a weather dashboard application that allows users to register, login, search for weather information by city, view current, forecast, and historical weather data, and save favorite cities. 

## Features

- **User Authentication:** User registration and login using JWT (JSON Web Tokens). Passwords are hashed and securely stored.
- **Weather Data Integration:** Fetches weather data from a third-party API (e.g., OpenWeatherMap or Weatherstack).
- **Weather Dashboard:** Displays current weather, 7-day forecast, and historical weather data for the past 7 days for a searched city.
- **Favorite Cities:** Users can save favorite cities and view their weather data on the dashboard.

## Report
  -Due to some Technical issues i didn't complete the Past 7 days Climate monitor, I think the issue is with the Api while accessing the api it showing the error request limit reached,there is no issue with other api. Please consider this .

## API Endpoints

- **User Authentication:**
  - `POST /register` - Register a new user.
  - `POST /login` - Authenticate a user and return a JWT.

- **Weather Data:**
  - `GET /weather/current?city={city}` - Get current weather for a city.
  - `GET /weather/forecast?city={city}` - Get 7-day weather forecast for a city.
  - `GET /weather/historical?city={city}` - Get historical weather data for the past 7 days for a city.

- **Favorite Cities:**
  - `POST /favorites` - Add a city to the user's favorites.
  - `GET /favorites` - Get the user's favorite cities and their weather data.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication

- **Frontend:**
  - React (Vite.JS)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   https://github.com/naseefhassan/WheatherApp-Client
