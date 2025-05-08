
import React from "react";
import { WeatherData } from "@/utils/api";
import { getWeatherIcon, getWeatherCardClass } from "@/utils/weatherIcons";

interface WeatherCardProps {
  weatherData: WeatherData;
  tempUnit: "celsius" | "fahrenheit";
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, tempUnit }) => {
  const WeatherIcon = getWeatherIcon(weatherData.weather[0].main);
  const cardClass = getWeatherCardClass(weatherData.weather[0].main);
  
  // Format time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Format temperature
  const formatTemp = (temp: number) => {
    if (tempUnit === "fahrenheit") {
      const fahrenheit = Math.round((temp * 9) / 5 + 32);
      return `${fahrenheit}°F`;
    }
    return `${Math.round(temp)}°C`;
  };

  return (
    <div className={`weather-card ${cardClass} rounded-xl p-6 text-white w-full max-w-md mx-auto transition-all animate-fade-in`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">{weatherData.name}</h2>
          <p className="text-sm opacity-90">{weatherData.sys.country}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">{formatTemp(weatherData.main.temp)}</p>
          <p className="text-sm">
            Feels like {formatTemp(weatherData.main.feels_like)}
          </p>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <WeatherIcon className="h-12 w-12 mr-4" />
        <div>
          <p className="text-lg font-semibold capitalize">
            {weatherData.weather[0].description}
          </p>
          <p className="text-sm opacity-90">
            {new Date(weatherData.dt * 1000).toLocaleDateString([], {
              weekday: "long",
              month: "short",
              day: "numeric"
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105">
          <p className="text-sm opacity-80">Humidity</p>
          <p className="font-semibold">{weatherData.main.humidity}%</p>
        </div>
        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105">
          <p className="text-sm opacity-80">Wind</p>
          <p className="font-semibold">{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
        </div>
        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105">
          <p className="text-sm opacity-80">Sunrise</p>
          <p className="font-semibold">{formatTime(weatherData.sys.sunrise)}</p>
        </div>
        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105">
          <p className="text-sm opacity-80">Sunset</p>
          <p className="font-semibold">{formatTime(weatherData.sys.sunset)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
