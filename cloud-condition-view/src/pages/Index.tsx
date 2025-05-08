
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import WeatherDetails from "@/components/WeatherDetails";
import { fetchWeatherByCity, fetchWeatherByCoordinates, WeatherData } from "@/utils/api";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tempUnit, setTempUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get user's location on first load
  useEffect(() => {
    const getUserLocation = () => {
      setLoading(true);
      setError(null);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const data = await fetchWeatherByCoordinates(latitude, longitude);
              if (data) {
                setWeatherData(data);
                setCity(data.name);
                setError(null);
              }
            } catch (err) {
              console.error("Error fetching weather data:", err);
              setError("Failed to fetch weather data. Please try again.");
              toast({
                title: "Error",
                description: "Failed to load weather data for your location.",
                variant: "destructive",
              });
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            toast({
              title: "Location access denied",
              description: "Please search for a city instead.",
              variant: "destructive",
            });
            setLoading(false);
          }
        );
      } else {
        toast({
          title: "Geolocation not supported",
          description: "Please search for a city manually.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  const handleSearch = async (searchCity: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(searchCity);
      if (data) {
        setWeatherData(data);
        setCity(searchCity);
        setError(null);
        toast({
          title: "Success",
          description: `Weather data loaded for ${searchCity}`,
        });
      }
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
      setError("Failed to fetch weather data. Please try again.");
      toast({
        title: "Error",
        description: "Could not find weather data for this city.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === "celsius" ? "fahrenheit" : "celsius");
    toast({
      title: "Units changed",
      description: `Temperature now displayed in ${tempUnit === "celsius" ? "Fahrenheit" : "Celsius"}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="app-container rounded-xl w-full max-w-4xl p-6 sm:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Weather App</h1>
        <p className="text-gray-600 mb-8">Check the current weather in your city</p>
        
        <div className="w-full max-w-md mx-auto mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="flex items-center justify-center mb-8 space-x-2 glass-card py-2 px-4 rounded-full w-fit mx-auto temp-toggle">
          <Label htmlFor="temp-unit" className={`text-sm transition-colors ${tempUnit === 'celsius' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>°C</Label>
          <Switch 
            id="temp-unit" 
            checked={tempUnit === "fahrenheit"} 
            onCheckedChange={toggleTempUnit} 
            className="data-[state=checked]:bg-indigo-600"
          />
          <Label htmlFor="temp-unit" className={`text-sm transition-colors ${tempUnit === 'fahrenheit' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>°F</Label>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 mx-auto max-w-md animate-fade-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 glass-card rounded-xl animate-fade-in">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        ) : weatherData ? (
          <div className="w-full space-y-6">
            <WeatherCard weatherData={weatherData} tempUnit={tempUnit} />
            <WeatherDetails weatherData={weatherData} tempUnit={tempUnit} />
          </div>
        ) : (
          <div className="text-center p-12 glass-card rounded-xl animate-fade-in">
            <p className="text-lg text-gray-700">
              {city ? "No weather data found for this location." : "Search for a city to see the weather."}
            </p>
          </div>
        )}
      </div>
      
      <footer className="mt-auto pt-8 text-center text-sm text-gray-500">
        <p>Weather data provided by OpenWeatherMap API</p>
      </footer>
    </div>
  );
};

export default Index;
