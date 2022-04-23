import React, { useContext } from 'react';
import { MyContext } from "../context/MyProvider";


const CurrentWeather = () => {
  const context = useContext(MyContext);

  return (
    <div className="current-weather">
        <h1>This is the current weather section</h1>
        <>
      {context.apiLoaded ? ( 
      <>
      <h1>Todays weather</h1>
        <p>weather is loaded</p>
        <p>Location {context.location[0].name} {context.location[0].country}</p>
        <p>The possibility of rain is {context.weather.hourly[context.currentHour].pop}%</p>
        <p>Tha temperature is {context.weather.current.temp}</p>
        <p>The weather is {context.weather.current.weather[0].description}</p>
        <p>The temperature feels like {context.weather.current.feels_like}</p>
        <p>The visibility is {context.weather.current.visibility}m</p>
        <p>The wind speed is {context.weather.current.wind_speed} km/h</p>
        <p>The humidity is {context.weather.current.humidity}%</p>
        <p>The UV Index is: {context.weather.current.uvi}</p>
      </>
      ) : (
        <h2>Loading weather</h2>
      )}
      </>
    </div>
);
}

export default CurrentWeather;