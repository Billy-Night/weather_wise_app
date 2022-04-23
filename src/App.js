
import MyProvider from './context/MyProvider.js';
import { Routes, Route, } from 'react-router-dom';
import './App.css';
import LocationSection from "./components/LocationSection.js";
import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import SelectSport from "./components/SelectSport.jsx";
// import { useNavigate } from 'react-router-dom';
import CurrentRating from "./components/CurrentRating.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";


function App() {


  return (
    <MyProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element=
            {<LocationSection />} 
          />
          <Route path="/about" element={<About/>} />
          <Route path="/sport" element={<SelectSport />} />
          <Route path="/rating" element={<CurrentRating />} />
          <Route path="/current-weather" element={<CurrentWeather />} />
        </Routes>
    </div>
    </MyProvider>
  );
}

export default App;