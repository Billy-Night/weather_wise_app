// import {  } from '@mui/material';
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
              <div className='current-weather-pop'>
                <p>Possibility of rain</p> 
                <p>{((context.weather.hourly[0].pop)*100)}%</p>
                <>
                {context.weather.hourly[0].pop <= 0.2 ? <img src={context.sunImg} alt="Sun" /> : <img src={context.rainImg} alt="Rain" />}
                </>
              </div>
                <div className="current-weather-vis">
                  <p>Visibility</p>
                  <p>{((context.weather.current.visibility)/1000)} km</p>
                </div>
                <div className="current-weather-wind">
                  <p>Wind Speed</p>
                  <p>{context.crtWindSpeed} km/h</p>
                  <img src={context.windImg} alt="wind" />
                </div>
                <div className="current-weather-hum">
                  <p>Humidity</p>
                  <p>{context.weather.current.humidity}%</p>
                  <img src={context.humidityImg} alt="humidity" />
                </div>
                <div className="current-weather-uvi">
                  <p>UV Index</p> 
                  <p>{context.weather.current.uvi}</p>
                  <img src={context.uvindexImg} alt="UV Index" />
                </div>
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