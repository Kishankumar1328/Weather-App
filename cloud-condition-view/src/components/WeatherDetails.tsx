
import React from "react";
import { WeatherData } from "@/utils/api";

interface WeatherDetailsProps {
  weatherData: WeatherData;
  tempUnit: "celsius" | "fahrenheit";
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData, tempUnit }) => {
  // Format temperature
  const formatTemp = (temp: number) => {
    if (tempUnit === "fahrenheit") {
      const fahrenheit = Math.round((temp * 9) / 5 + 32);
      return `${fahrenheit}°F`;
    }
    return `${Math.round(temp)}°C`;
  };

  return (
    <div className="weather-details rounded-xl p-6 shadow-md w-full max-w-md mx-auto animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Weather Details</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between py-2 px-3 border-b border-gray-200/50 detail-item">
          <span className="text-gray-600">Min Temperature</span>
          <span className="font-medium text-gray-800">{formatTemp(weatherData.main.temp_min)}</span>
        </div>
        
        <div className="flex justify-between py-2 px-3 border-b border-gray-200/50 detail-item">
          <span className="text-gray-600">Max Temperature</span>
          <span className="font-medium text-gray-800">{formatTemp(weatherData.main.temp_max)}</span>
        </div>
        
        <div className="flex justify-between py-2 px-3 border-b border-gray-200/50 detail-item">
          <span className="text-gray-600">Pressure</span>
          <span className="font-medium text-gray-800">{weatherData.main.pressure} hPa</span>
        </div>
        
        <div className="flex justify-between py-2 px-3 border-b border-gray-200/50 detail-item">
          <span className="text-gray-600">Humidity</span>
          <span className="font-medium text-gray-800">{weatherData.main.humidity}%</span>
        </div>
        
        <div className="flex justify-between py-2 px-3 border-b border-gray-200/50 detail-item">
          <span className="text-gray-600">Wind Direction</span>
          <span className="font-medium text-gray-800">{weatherData.wind.deg}°</span>
        </div>
        
        <div className="flex justify-between py-2 px-3 border-b border-gray-200/50 detail-item">
          <span className="text-gray-600">Visibility</span>
          <span className="font-medium text-gray-800">{(weatherData.visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
