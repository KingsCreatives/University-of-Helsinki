import React from "react";

const WeatherInfo = ({ weather, capital }) => {
  if (!weather) {
    console.log("No weather data available");
    return null;
  }

  if (!weather.weather || !weather.weather[0]) {
    console.error("Unexpected weather data structure:", weather);
    return <p>Error: Unable to display weather information</p>;
  }

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const temperature = (weather.main.temp - 273.15).toFixed(2);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {temperature}°C</p>
      <img
        src={iconUrl}
        alt={weather.weather[0].description + " icon"}
        onError={(e) => {
          console.error("Failed to load weather icon:", iconUrl);
          e.target.style.display = "none";
        }}
      />
      <p>Weather: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherInfo;
