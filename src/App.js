import React, { useState } from "react";
import './App.css';

let today = new Date();
let currentHour = today.getHours();


const totalTempDif = 20;
const tempStartValue = 26;
const realFeelTempStartRate = 3; 

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
//This state saves the data from the weather API call
  let [weather, setWeather] = useState({});
//This state shows when the weather API is finished
  let [apiLoaded, setApiLoaded] = useState(false);

  // let [currentTemp, setCurrentTemp] = useState();
  // let [currentPop, setCurrentPop] = useState();

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
const cyclingRatingfn = () => {
  //weather.current.feels_like
  let realFeelCurrentTemp = 36;
  console.log(realFeelCurrentTemp);
  let increase = realFeelCurrentTemp - tempStartValue;
  console.log(increase)
  let increasePer = (increase/totalTempDif);
  console.log(increasePer);
  let reduction = (realFeelTempStartRate * increasePer).toFixed(2);
  console.log(reduction);
  let newRate = realFeelTempStartRate - reduction;
  return newRate;
}


  return (
    <div className="App">
      <h1>Please select your city</h1>
      <form onSubmit={handleSubmit}>
        <input value={city} onChange={handleChange} />
        <button onClick={geoLocCall}>Click</button>
      </form>
      {showCity ? (
        <p>City you wrote is: {city}</p>
      ) : (
        <p>Write a city and click the button</p>
      )}
      <hr></hr>
      {apiLoaded ? ( 
      <>
        <p>weather is loaded</p>
        <p>Location {location[0].name} {location[0].country}</p>
        <p>The possibility of rain is {weather.hourly[currentHour].pop}</p>
        <p>Tha temperature is {weather.current.temp}</p>
        <p>The weather is {weather.current.weather[0].description}</p>
        <p>The temperature feels like {weather.current.feels_like}</p>
        <p>The visibility is {weather.current.visibility}</p>
        <p>The wind speed is {weather.current.wind_speed} km/h</p>
        <p>The humidity is {weather.current.humidity}%</p>
      </>
      ) : (
        <h2>Loading weather</h2>
      )}
      <hr></hr>
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
      {apiLoaded ? ( 
      <>
      
      <button onClick={() => setCyclingRating(cyclingRatingfn)}>Get your Rating</button>
      {cyclingRating >= 0 ? (
        <p>Todays cycling Rating is {cyclingRating}</p>
      ) : 
      (
        <p>Your rating is loading</p>
      )}
      <p>The parameters we checked for your day were:</p>
      {/* <p>1. The real feel temperature is:{weather.main.feels_like}</p> */}
      {/* <p>2. The wind speed is: {weather.wind.speed}</p> */}
      {/* <p>3. The rain is: </p> */}
      </>
      ) : (
        <h2>Loading weather</h2>
      )}
    </div>
  );
}

export default App;
