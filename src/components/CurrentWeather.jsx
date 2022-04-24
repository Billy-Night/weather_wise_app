import React, { useContext } from 'react';
import { MyContext } from "../context/MyProvider";


const CurrentWeather = () => {
  const context = useContext(MyContext);

  return (
    <div className="current-weather-main-container">
        <div className="current-weather-des-container">
          <div className="current-weather-grid-container">
          <h1>Current Weather</h1>
          <>
            {context.apiLoaded ? ( 
            <>
              <div className="current-weather-temp">
                <p>{context.weather.current.temp}°</p>
                <p>{context.location[0].name} {context.location[0].country}</p>
                <p>Feels like temperature {context.weather.current.feels_like}°C</p>
                <p>{context.day}, {context.currentHour}H</p>
              </div>
              <div className='current-weather-icon-des'>
                <img src={`http://openweathermap.org/img/wn/${context.weather.current.weather[0].icon}.png`} alt={context.weather.current.weather[0].description} />
                <p>{context.weather.current.weather[0].description}</p>
              </div>
{/* Todo below this needs to be done  */}
                <div className='current-weather-feels-like'>

                </div>

                <p>Possibility of rain {context.weather.hourly[context.currentHour].pop}%</p>
                <p>Temperature {context.weather.current.temp}°C</p>
                <p>Weather descripion {context.weather.current.weather[0].description}</p>
              
                <p>Visibility {((context.weather.current.visibility)/1000)} km</p>
                <p>Wind Speed {context.weather.current.wind_speed} km/h</p>
                <p>Humidity {context.weather.current.humidity}%</p>
                <p>UV Index {context.weather.current.uvi}</p>
              
            </>
            ) : (
              <h2>Loading weather</h2>
            )}
          </>
      </div>
      </div>
    </div>
);
}

export default CurrentWeather;