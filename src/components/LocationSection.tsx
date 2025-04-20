import React from "react";
import { useLocation } from "../context/LocationContext";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

const LocationSection: React.FC = () => {
  const { city, cityError, errorMessage, isLoading, setCity, searchLocation } = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchLocation();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <div className="location-section">
      <div className="location-header">
        <h1>Weather Wise</h1>
        <p>Please enter your location</p>
      </div>
      <form onSubmit={handleSubmit} className="searchBox">
        <input
          className="searchInput"
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name (e.g. Berlin)"
          disabled={isLoading}
        />
        <button 
          className="searchButton" 
          onClick={searchLocation} 
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
        </button>
      </form>
      <div className="location-error">
        {cityError && (
          <p className="error-message">{errorMessage || "There was a problem finding your location, please try again!"}</p>
        )}
      </div>
      {/* Mock data notice removed as requested */}
    </div>
  );
};

export default LocationSection;
