//imports the useContext hook from react
import React, { useContext } from "react";
import { MyContext } from "../context/MyProvider.js";
import ProgressBar from "./StatusBar/ProgressBar";


//changed to curly brackets, because there will be a return
const CurrentRating = () => {
  //the varible is equal to the useContext hook with the argument of MyContext, this will give us our data instead of all the everthing.
  const context = useContext(MyContext);

  // let circleColor = "green";


  const state = {
    size: 180,
    strokeWidth: 14,
    circleOneStroke: "green",
    circleTwoStroke: "gray",
  };

  return (
    <div className="rating-main-container">
      <div className="rating-des-container">
        <h1>{context.sportSelected} Rating</h1>
        {context.cyclingRating >= 0 ? (
          <>
            <div className="circle-container">
              <ProgressBar
                progress={Number(context.cyclingRating)}
                {...state}
              />
            </div>
            <div className="rating-params">
              <p>The weather factors are:</p>
              <p>
                1. Real feel temperature is:{"   "}
                {context.weather.current.feels_like.toFixed(0)}°C
              </p>
              <p>
                2. Wind speed is: {context.crtWindSpeed}km/h
              </p>
              <p>
                3. Rain probability: {(context.weather.hourly[0].pop * 100).toFixed(0)}%
              </p>
              <p>4. UV index is: {context.weather.current.uvi}</p>
              <p>5. Air quality is: {context.airPollutionDes}</p>
            </div>
            <div className="rate-btn">
              <button onClick={context.handleNavCurrentWeather}>
                Check Weather
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>The rating is not loaded</h3>
            <p>Please check you have input a location</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentRating;