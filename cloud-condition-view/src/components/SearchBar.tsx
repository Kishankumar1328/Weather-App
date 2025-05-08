
import React, { useState, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (query.trim().length > 0) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`search-bar flex items-center gap-2 p-2 rounded-lg shadow-lg w-full max-w-md mx-auto border transition-all duration-300 ${isFocused ? 'border-purple-400 shadow-purple-200' : 'border-white/20'}`}>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent pl-3 pr-10 py-2 rounded-md text-gray-700"
        />
        <Button 
          onClick={handleSearch} 
          variant="default"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-transform hover:scale-105"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
