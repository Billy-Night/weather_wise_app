//useContext hook allows for the use of MyContext
import React, { useContext } from "react";
import { MyContext } from "../context/MyProvider.js";


const LocationSection = () => {
  const context = useContext(MyContext)


  return (
    <div className="location-section">
      <div className="location-container">
        <h1>Weather Wise</h1>
        <p>Please select your city</p>
        <div className="searchBox" >
            <input className="searchInput" value={context.city} onChange={context.handleChange}placeholder="Location" />
            <button className="searchButton" onClick={context.handleClick}>
              <i className="material-icons"></i>
            </button>
        </div>
        <>
        {context.showCity ? (
        <p>City you wrote is: {context.city}</p>
        ) : (
        <p>Write a city and click the button</p>
        )}
        </>
      </div>
    </div>
);
};

export default LocationSection;

        //<form onSubmit={context.handleSubmit}>
        //    <input className="searchBox" value={context.city} onChange={context.handleChange}placeholder="Location" />
        //    <button onClick={context.handleClick}>Click</button>
        //</form>