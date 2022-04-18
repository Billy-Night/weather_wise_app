import React, { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LocationSection from "./components/LocationSection.js";
import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import SelectSport from "./components/SelectSport.jsx";
import { useNavigate } from 'react-router-dom';
import CurrentRating from "./components/CurrentRating.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";


//This finds the current date and hour.
let today = new Date();
let currentHour = today.getHours();

//The real feel temp variables
const tempStartValue = 26;
const totalTempDif = 16;
const tempStartRate = 3; 

//The wind variables
const totalWindDif = 20;
const windStartValue = 12;
const windStartRate = 3;

//The probability of rain variables
const popStartValue = 0;
const totalPopDif = 0.7;
const popStartRate = 3;

//The UV Index variables
const uvStartValue = 0;
const totalUvDif = 10;
const uvStartRate = 1;


function App() {

  let [section, setSection] = useState("");
//The states shows the user input recorded by the form
  let [city, setCity] = useState("");
//This state saves the data from the geolocation API call
  let [location, setLocation] = useState();
//This state shows when the city has been loaded and can be used to display informtaion to the user.
  let [showCity, setShowCity] = useState(false);
//These states save the latitude and longitude of the users location
  let [lat, setLat] = useState();
  let [lon, setLon] = useState();

  // let [coordinates, setCord] = useState({lat:"", long:""})
//This state saves the data from the weather API call
  let [weather, setWeather] = useState({});
//This state shows when the weather API is finished
  let [apiLoaded, setApiLoaded] = useState(false);

//This state updates the rating for cycling
  let [cyclingRating, setCyclingRating] = useState();

//The API for the geolocation, it relies on the input(city) from the user form.
  const geoLocApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_APIKEY}`;

  
  const navigate = useNavigate();


//This handles the event change in the form for the city
  const handleChange = (event) => {
    setCity(event.currentTarget.value);
  }

//This handles the submit of the form it will stop the page from reloading
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
//    console.log("clicked!");
   geoLocCall();
   navigate('/sport');
};

//The function below will call the first API which has been saved in a variable with the city input.
  const geoLocCall = () => { 
    //calling the fetch() API
    fetch(geoLocApi)
    //passing a handler function into the Promise's then() method. When (and if) the fetch operation succeeds, the promise will call our handler, passing in a response object, which will contain the server's response.
    //Once you get a response object, you need to call another function to get the response data. In this case we want we want to get the response data as JSON, so we would call the json() method of the Response object.
    //the feature of promises is that: then() itself returns a promise, which will be completed with the result of the function that was passed to it.
      .then((response) => response.json())
      .then((data) => {
        setLocation(data);
        setLat(data[0].lat);
        setLon(data[0].lon);
        setShowCity(true);
        //This API will provide the current weather
        // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${process.env.REACT_APP_APIKEY}`)
        //This API will provide the weather forecast
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
          .then((response) => response.json())
          .then((data2) => {
          setWeather(data2); 
          setApiLoaded(true);
        });
      });
  };



//Cycling rating logic
const handlClickCycle = () => {
  cyclingWeatherFn(tempStartValue, totalTempDif, tempStartRate, windStartValue, totalWindDif, windStartRate, popStartValue, totalPopDif, popStartRate, currentHour, uvStartValue, totalUvDif, uvStartRate);
  navigate('/rating');
};

//The first function is the master which controls the percentage rating system set-up it can be used for all the weather parameters passed in
const master = (currentWeather, rangeStart, totalDif, StartRate) => {
  let increase = currentWeather - rangeStart;
  // console.log(`This is increase from master ${increase}`);
  let increasePer = increase/totalDif;
  let reduction = (StartRate * increasePer).toFixed(2);
  // console.log(`reduction: ${reduction}`);
  // console.log(`start rate: ${StartRate}`);
  let newRate = (StartRate - reduction);
  // eslint-disable-next-line no-unused-expressions
  newRate <= 0 ? newRate= -3 : newRate
  return newRate;
}
//The next function manages the variables that will be create from the current weather conditions, this will only run once the button is pressed by the user, it will also pass the variables to the master function and retrieve the results, once it has the results it will calcultate the rating and then store it in the cycling rating state.
//ToDo this needs some attention and possible re-factoring (fully functioning with no problems).
const cyclingWeatherFn = (tempStartValue, totalTempDif, tempStartRate, windStartValue, totalWindDif, windStartRate, popStartValue, totalPopDif, popStartRate, currentHour, uvStartValue, totalUvDif, uvStartRate) => {
  //test value 36  
  let currentTemp = weather.current.feels_like;
  //test value 18  
  let currentWindSpeed = weather.current.wind_speed;
  //test value 0.2
  let currentPoP = weather.hourly[currentHour].pop;
  //test value 4
  let currentUv = weather.current.uvi;
    //  console.log(`currentTemp: ${currentTemp}`);
    //  console.log(`tempStartValue: ${tempStartValue}`);
    //  console.log(`totalTempDif: ${totalTempDif}`);
    //  console.log(`tempStartRate: ${tempStartRate}`);
  let tempFinRate = currentTemp > tempStartValue ? master(currentTemp, tempStartValue, totalTempDif, tempStartRate) : tempStartRate;
    // console.log(`The temp rating is: ${tempFinRate}`);

    // console.log(`windStartValue ${windStartValue}`);
    // console.log(`totalWindDif ${totalWindDif}`);
    // console.log(`windStartRate ${windStartRate}`);
  let windFinRate = currentWindSpeed > windStartValue ? master(currentWindSpeed, windStartValue, totalWindDif, windStartRate) : tempStartRate;
    // console.log(`The wind rating is ${windFinRate}`);
    // console.log(`currentPoP: ${currentPoP}`);
    // console.log(`popStartValue: ${popStartValue}`);
    // console.log(`totalPopDif: ${totalPopDif}`);
    // console.log(`popStartRate: ${popStartRate}`);
  let popFinRate = currentPoP >= 0.7 ? 0 : master(currentPoP, popStartValue, totalPopDif, popStartRate);
    // console.log(`The pop rating is ${popFinRate}`);
    // console.log(`uvStartValue: ${uvStartValue}`);
    // console.log(`totalUvDif: ${totalUvDif}`);
    // console.log(`uvStartRate: ${uvStartRate}`);
  let uvFinRate = master(currentUv, uvStartValue, totalUvDif, uvStartRate);
  // console.log(`The UV Index rating is ${uvFinRate}`); 

  const totalRate = tempFinRate + windFinRate + popFinRate + uvFinRate;
  // console.log(`The Rating is: ${totalRate}`);

  setCyclingRating(totalRate);
  // console.log(`The rating is: ${cyclingRating}`)
}

  return (
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element=
            {<LocationSection handleSubmit={handleSubmit} city={city} handleChange={handleChange} handleClick={handleClick} showCity={showCity} />} 
          />
          <Route path="/about" element={<About/>} />
          <Route path="/sport" element={<SelectSport handleClickCycle={handlClickCycle}/>} />
          <Route path="/rating" element={<CurrentRating cyclingRating={cyclingRating} weather={weather} currentHour={currentHour}/>} />
          <Route path="/current-weather" element={<CurrentWeather apiLoaded={apiLoaded} location={location} currentHour={currentHour} weather={weather}/>} />
        </Routes>
    </div>
  );
}

export default App;


//The code below was used to render the LocationSection Component and pass down props, it has now been replaced with the routes.
//<LocationSection handleSubmit={handleSubmit} city={city} handleChange={handleChange} handleClick={handleClick} showCity={showCity}/>