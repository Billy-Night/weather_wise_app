//imports the useContext hook from react
import React, { useContext } from "react";
import { MyContext } from "../context/MyProvider.js";

import ProgressBar from "./ProgressBar/ProgressBar";

//changed to curly brackets, because there will be a return
const CurrentRating = () => {
  //the varible is equal to the useContext hook with the argument of MyContext, this will give us our data instead of all the everthing.
  const context = useContext(MyContext);

  const colorArray = [
    "#7ea9e1",
    "#ed004f",
    "#00fcf0",
    "#d2fc00",
    "#7bff00",
    "#fa6900",
  ];

  const randomColor = () => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };

  const state = {
    size: 250,
    strokeWidth: 15,
    circleOneStroke: "#d9edfe",
    circleTwoStroke: randomColor(),
  };

  return (
    <div className="rating-main-container">
      <div className="rating-des-container">
        <h1>{context.sportSelected} Rating</h1>
        {context.cyclingRating >= 0 ? (
          <>
            <div className="circle-container">
              <ProgressBar
                progress={context.cyclingRating.toFixed(2)}
                {...state}
              />
            </div>
            <div className="rating-params">
              <p>The parameters we checked for your day were:</p>
              <p>
                1. The real feel temperature is:{" "}
                {context.weather.current.feels_like}°C
              </p>
              <p>
                2. The wind speed is: {context.weather.current.wind_speed}km/h
              </p>
              <p>
                3. The rain probability: {context.weather.hourly[0].pop * 100}%
              </p>
              <p>4. The UV index is: {context.weather.current.uvi}</p>
              <p>5. The air quality is: {context.airPollutionDes}</p>
            </div>
            <div className="rate-btn">
              <button onClick={context.handleNavCurrentWeather}>
                Check Weather
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Your rating is loading</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentRating;