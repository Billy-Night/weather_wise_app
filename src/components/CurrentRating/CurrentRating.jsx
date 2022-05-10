//imports the useContext hook from react
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyProvider.js";
import ProgressBar from "../StatusBar/ProgressBar";
import "../CurrentRating/CurrentRating.css";


//changed to curly brackets, because there will be a return
const CurrentRating = () => {
  //the varible is equal to the useContext hook with the argument of MyContext, this will give us our data instead of all the everthing.
  const context = useContext(MyContext);
  let [circleColor, setCircleColor] = useState("");
  // let circleColor = "green";

  useEffect(() => {
      if (context.cyclingRating <= 3) {
        setCircleColor("Red");
    } else if (context.cyclingRating > 3 && context.cyclingRating <= 7) {
      setCircleColor("yellow");
    } else {
      setCircleColor("green");
    }
  }, [context.cyclingRating]);

  const state = {
    size: 150,
    strokeWidth: 12,
    circleOneStroke: circleColor,
    circleTwoStroke: "gray",
  };

  return (
    <div className="current-rating-main-container">
      <div className="current-rating-second-container">
        <div className="current-rating-grid-container">
          <div className="current-rating-grid-header">
            <h1> {context.sportSelected} Rating</h1>
          </div>
        {context.cyclingRating >= 0 ? (
          <>
            <div className="circle-container">
              <ProgressBar
                progress={Number(context.cyclingRating)}
                {...state} />
            </div>
            <div className="rating-params">
              <h2>The weather factors are:</h2>
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
          <div className="rating-not-loaded">
            <h3>The rating is not loaded</h3>
            <p>Please check you have input a location</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default CurrentRating;