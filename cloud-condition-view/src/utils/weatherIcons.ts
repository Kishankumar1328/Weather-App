
import { CloudRain, CloudSnow, CloudLightning, Cloud, Sun, CloudFog, CloudDrizzle, Wind } from "lucide-react";

export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado";

export const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "Clear":
      return Sun;
    case "Clouds":
      return Cloud;
    case "Rain":
      return CloudRain;
    case "Drizzle":
      return CloudDrizzle;
    case "Thunderstorm":
      return CloudLightning;
    case "Snow":
      return CloudSnow;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
      return CloudFog;
    case "Squall":
    case "Tornado":
      return Wind;
    default:
      return Sun;
  }
};

export const getWeatherCardClass = (condition: string): string => {
  switch (condition) {
    case "Clear":
      return "clear-sky";
    case "Clouds":
      return "clouds";
    case "Rain":
    case "Drizzle":
      return "rain";
    case "Thunderstorm":
      return "thunderstorm";
    case "Snow":
      return "snow";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
      return "mist";
    default:
      return "clear-sky";
  }
};
