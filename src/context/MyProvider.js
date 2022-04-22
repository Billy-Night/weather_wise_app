import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const MyContext = React.createContext();

const MyProvider = (props) => {

    let [section, setSection] = useState("");
    //The states shows the user input recorded by the form
    let [city, setCity] = useState("");
    //This state saves the data from the geolocation API call
    let [location, setLocation] = useState();
    //This state shows when the city has been loaded and can be used to display informtaion to the user.
    let [showCity, setShowCity] = useState(false);
    //These states save the latitude and longitude of the users location
    let [lat, setLat] = useState();
    let [lon, setLon] = useState();
    
    // let [coordinates, setCord] = useState({lat:"", long:""})
    //This state saves the data from the weather API call
    let [weather, setWeather] = useState({});
    //This state shows when the weather API is finished
    let [apiLoaded, setApiLoaded] = useState(false);
    
    //This state updates the rating for cycling
    let [cyclingRating, setCyclingRating] = useState();

    //The API for the geolocation, it relies on the input(city) from the user form.
    const geoLocApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_APIKEY}`;

    const navigate = useNavigate();

    //This handles the event change in the form for the city
    const handleChange = (event) => {
     setCity(event.currentTarget.value);
     }
    
    //This handles the submit of the form it will stop the page from reloading
    const handleSubmit = (event) => {
       event.preventDefault();
     }

    const handleClick = () => {
    //console.log("clicked!");
        geoLocCall();
        navigate('/sport');
     };
    
    //The function below will call the first API which has been saved in a variable with the city input.
    const geoLocCall = () => { 
    //calling the fetch() API
    fetch(geoLocApi)
    //passing a handler function into the Promise's then() method. When (and if) the fetch operation succeeds, the promise will call our handler, passing in a response object, which will contain the server's response.
    //Once you get a response object, you need to call another function to get the response data. In this case we want we want to get the response data as JSON, so we would call the json() method of the Response object.
    //the feature of promises is that: then() itself returns a promise, which will be completed with the result of the function that was passed to it.
      .then((response) => response.json())
      .then((data) => {
         setLocation(data);
         setLat(data[0].lat);
         setLon(data[0].lon);
         setShowCity(true);
        //This API will provide the current weather(!!NOT IN USE!!!)
            // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${process.env.REACT_APP_APIKEY}`)
        
        //This API will provide the weather forecast
         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
            .then((response) => response.json())
            .then((data2) => {
            setWeather(data2); 
            setApiLoaded(true);
         });
       });
   };

    return (
        <MyContext.Provider 
        value={{
            section: section,
            city: city,
            location: location,
            showCity: showCity,
            lat: lat,
            lon: lon,
            weather: weather,
            apiLoaded: apiLoaded,
            cycling: cyclingRating,
            handleChange: handleChange,
            handleSubmit: handleSubmit,
            handleClick: handleClick,
            geoLocCall: geoLocCall,
        }} >
            {props.children }
        </MyContext.Provider >
    )
};

export default MyProvider;