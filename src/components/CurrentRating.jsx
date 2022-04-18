const CurrentRating = (props) => (
    <div ClassName="current-rating">
        {props.cyclingRating >= 0 ? (
      <>
        <p>Todays cycling Rating is: {props.cyclingRating}/10</p>
        <p>The parameters we checked for your day were:</p>
        <p>1. The real feel temperature is:{props.weather.current.feels_like}</p>
        <p>2. The wind speed is: {props.weather.current.wind_speed}km/h</p>
        <p>3. The rain is probability: {props.weather.hourly[props.currentHour].pop}</p>
        <p>4. The UV index is: {props.weather.current.uvi}</p>
      </>
      ) : 
      (
      <>
        <p>Your rating is loading</p>
      </>
      )}
    </div>
);

export default CurrentRating;