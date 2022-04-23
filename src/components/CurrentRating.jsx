//imports the useContext hook from react
import React, { useContext } from 'react';
import { MyContext } from '../context/MyProvider.js';

//changed to curly brackets, because there will be a return
const CurrentRating = () => {
  //the varible is equal to the useContext hook with the argument of MyContext, this will give us our data instead of all the everthing.
  const context = useContext(MyContext);


  return (
  <div className="current-rating">
    <h1>This is the Rating section</h1>
      {context.cyclingRating >= 0 ? (
        <>
          <p>Todays cycling Rating is: {context.cyclingRating}/10</p>
          <p>The parameters we checked for your day were:</p>
          <p>1. The real feel temperature is:{context.weather.current.feels_like}</p>
          <p>2. The wind speed is: {context.weather.current.wind_speed}km/h</p>
          <p>3. The rain is probability: {context.weather.hourly[context.currentHour].pop}</p>
          <p>4. The UV index is: {context.weather.current.uvi}</p>
          <button >Todays Weather</button>
       </>
       ) : 
       (
       <>
         <p>Your rating is loading</p>
       </>
       )}
  </div>
  );
}

export default CurrentRating;