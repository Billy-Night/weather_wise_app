//useContext hook allows for the use of MyContext
import React, { useContext } from "react";
import { MyContext } from "../context/MyProvider.js";


const LocationSection = () => {
  const context = useContext(MyContext)


  return (
    <div className="search">
        <h1>Weather Wise</h1>
        <p>Please select your city</p>
        <form onSubmit={context.handleSubmit}>
            <input value={context.city} onChange={context.handleChange}placeholder="Location" />
            <button onClick={context.handleClick}>Click</button>
        </form>
        {context.showCity ? (
        <p>City you wrote is: {context.city}</p>
      ) : (
        <p>Write a city and click the button</p>
      )}
    </div>
);
};

export default LocationSection;