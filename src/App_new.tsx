import { Routes, Route } from 'react-router-dom';
import './App.css';
import { LocationProvider } from './context/LocationContext';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <LocationProvider>
      <WeatherProvider>
        <div className="App">
          <h1>Weather Wise App</h1>
          <p>Converting to TypeScript + Vite</p>
          <Routes>
            <Route path="/" element={<div>Home Page - Coming Soon</div>} />
            <Route path="/about" element={<div>About Page - Coming Soon</div>} />
          </Routes>
        </div>
      </WeatherProvider>
    </LocationProvider>
  );
}

export default App;
