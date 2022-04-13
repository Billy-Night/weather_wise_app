import React, { useState } from "react";
import './App.css';


function App() {

  let [weather, setWeather] = useState({});
  let [apiLoaded, setApiLoaded] = useState(false);

  let [city, setCity] = useState("");
  let [showCity, setShowCity] = useState(false);


  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=161b93914792ab2a2ebd537a08bb7915`;  


  const handleChange = (event) => {
    setCity(event.currentTarget.value); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowCity(true);
  };

  const weatherCall = () => {
    fetch(apiCity)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setApiLoaded(true);
      });
  };

//   const cyclingRating = {
//     realFeelTemperature: 4,
//     WindSpeed: 3,
//     Rain: 3,
//   };
//   console.log(cyclingRating);

// const totalRating = (el) => {
//     return el.realFeelTemperature + el.WindSpeed + el.Rain;
// }
// console.log(totalRating(cyclingRating))

// const realFeelCycling = () => {
//   let increaseinTemp = weather.main.feels_like - 26;
//   return increaseinTemp;
// }
// console.log(realFeelCycling);

  return (
    <div className="App">
      <h1>Please select your city</h1>
      <form onSubmit={handleSubmit}>
        <input value={city} onChange={handleChange} />
        <button onClick={weatherCall}>Click</button>
      </form>
      {showCity ? (
        <p>City you wrote is: {city}</p>
      ) : (
        <p>Write a city and click the button</p>
      )}

      {apiLoaded ? ( 
      <>
        <p>Location {weather.name} {weather.sys.country}</p>
        <p>Tha temperature is {weather.main.temp}</p>
        <p>The weather is {weather.weather[0].description}</p>
        <p>The temperature feels like {weather.main.feels_like}</p>
        <p>The visibility is {weather.visibility}</p>
        <p>The wind speed is {weather.wind.speed} km/h</p>
        <p>The humidity is {weather.main.humidity}%</p>
      </>
      ) : (
        <h2>Loading weather</h2>
      )}

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
    </div>
  );
}

export default App;
