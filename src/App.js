import React, { useState } from "react";
import './App.css';
import LocationSection from "./components/LocationSection.js";

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
      <LocationSection handleSubmit={handleSubmit} value={city} handleChange={handleChange} handleClick={handleClick}/>
      {showCity ? (
        <p>City you wrote is: {city}</p>
      ) : (
        <p>Write a city and click the button</p>
      )}

      <hr></hr>
      <>
        <h1>Choose your sport</h1>
        <button>Cycling</button>
        <br></br>
        <button>Surfing</button>
        <br></br>
        <button>Sailing</button>
        <br></br>
        <button>Hiking</button>
        <br></br>
        <button>Running</button>
        <br></br>
        <button>Snowboarding</button>
        <br></br>
        <hr></hr>
        <h1>Todays weather rating</h1>
      </>
      <button onClick={() => cyclingWeatherFn(tempStartValue, totalTempDif, tempStartRate, windStartValue, totalWindDif, windStartRate, popStartValue, totalPopDif, popStartRate, currentHour, uvStartValue, totalUvDif, uvStartRate)}>Get your Rating</button>
      {cyclingRating >= 0 ? (
      <>
        <p>Todays cycling Rating is: 10/{cyclingRating}</p>
        <p>The parameters we checked for your day were:</p>
        <p>1. The real feel temperature is:{weather.current.feels_like}</p>
        <p>2. The wind speed is: {weather.current.wind_speed}km/h</p>
        <p>3. The rain is probability: {weather.hourly[currentHour].pop}</p>
        <p>4. The UV index is: {weather.current.uvi}</p>
      </>
      ) : 
      (
      <>
        <p>Your rating is loading</p>
      </>
      )}

<hr></hr>
      <>
      {apiLoaded ? ( 
      <>
      <h1>Todays weather</h1>
        <p>weather is loaded</p>
        <p>Location {location[0].name} {location[0].country}</p>
        <p>The possibility of rain is {weather.hourly[currentHour].pop}%</p>
        <p>Tha temperature is {weather.current.temp}</p>
        <p>The weather is {weather.current.weather[0].description}</p>
        <p>The temperature feels like {weather.current.feels_like}</p>
        <p>The visibility is {weather.current.visibility}m</p>
        <p>The wind speed is {weather.current.wind_speed} km/h</p>
        <p>The humidity is {weather.current.humidity}%</p>
        <p>The UV Index is: {weather.current.uvi}</p>
      </>
      ) : (
        <h2>Loading weather</h2>
      )}
      </>
    </div>
  );
}

export default App;
