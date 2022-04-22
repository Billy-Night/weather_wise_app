// import { MyContext } from "../context/MyProvider";

// console.log(MyContext);

const CurrentWeather = () => (
    <div className="current-weather">
        <h1>This is the current weather section</h1>
        {/* <>
      {props.apiLoaded ? ( 
      <>
      <h1>Todays weather</h1>
        <p>weather is loaded</p>
        <p>Location {props.location[0].name} {props.location[0].country}</p>
        <p>The possibility of rain is {props.weather.hourly[props.currentHour].pop}%</p>
        <p>Tha temperature is {props.weather.current.temp}</p>
        <p>The weather is {props.weather.current.weather[0].description}</p>
        <p>The temperature feels like {props.weather.current.feels_like}</p>
        <p>The visibility is {props.weather.current.visibility}m</p>
        <p>The wind speed is {props.weather.current.wind_speed} km/h</p>
        <p>The humidity is {props.weather.current.humidity}%</p>
        <p>The UV Index is: {props.weather.current.uvi}</p>
      </>
      ) : (
        <h2>Loading weather</h2>
      )}
      </> */}
    </div>
);

export default CurrentWeather;