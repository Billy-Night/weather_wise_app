//imports the useContext hook from react
import React, { useContext } from 'react';
import { MyContext } from '../context/MyProvider.js';

//changed to curly brackets, because there will be a return
const CurrentRating = () => {
  //the varible is equal to the useContext hook with the argument of MyContext, this will give us our data instead of all the everthing.
  const context = useContext(MyContext);


  return (
  <div className="rating-main-container">
    <div className="rating-des-container">
      <h1>{context.sportSelected} Rating</h1>
        {context.cyclingRating >= 0 ? (
          <>
            <div className="circle-container">
              <div className="rate-circle">
                <div>{context.cyclingRating}/10</div>
              </div>
            </div>
            <div className="rating-params">
              <h2>The weather factors for today:</h2>
              <p>1. The real feel temperature is: {context.weather.current.feels_like}°C</p>
              <p>2. The wind speed is:  {context.crtWindSpeed}km/h</p>
              <p>3. The rain probability:  {((context.weather.hourly[0].pop)*100)}%</p>
              <p>4. The UV index is:  {context.weather.current.uvi}</p>
              <p>5. The air quality is: {context.airPollutionDes}</p>
            </div>
            <div className="rate-btn">
                <button onClick={context.handleNavCurrentWeather}>Check Weather</
            button>
            </div>
          </>
        ) : 
        (
        <div className="crt-rating-load">
          <h2>The rating is not loaded</h2>
          <p>Please double check you have added a location in the home section</p>
        </div>
        )}
      </div>
    </div>
  );
}

export default CurrentRating;