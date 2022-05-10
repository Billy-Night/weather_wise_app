
import MyProvider from './context/MyProvider.js';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LocationSection from "./components/LocationSection.jsx";
import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import SelectSport from "./components/SelectSport.jsx";
// import { useNavigate } from 'react-router-dom';
import CurrentRating from "./components/CurrentRating/CurrentRating.jsx";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.jsx";
// import Footer from "./components/Footer.jsx";


function App() {


  return (
    <MyProvider>
        <NavBar />
        <div className="App">
        <Routes>
          <Route path="/" element= {<LocationSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/sport" element={<SelectSport />} />
          <Route path="/rating" element={<CurrentRating />} />
          <Route path="/current-weather" element={<CurrentWeather />} />
        </Routes>
        {/* <Footer /> */}
    </div>
    </MyProvider>
  );
}

export default App;