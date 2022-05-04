import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import sunImg from '../assets/sunImg.png';
import rainImg from '../assets/rainImg.png';
import windImg from '../assets/windImg.png';
import humidityImg from '../assets/humidityImg.png';
import uvindexImg from '../assets/uv-indexImg.png';

import { getCityLoc, getWeatherAndPollution } from "../utils/apiCalls";
import { getCyclingStatus } from "../utils/sportsLogic";

export const MyContext = React.createContext();

//This finds the current date and hour.
let today = new Date();
let currentHour = today.getHours();

//Date information for the UI current weather.
const weekday = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

const d = new Date();
let day = weekday[d.getDay()];

const MyProvider = (props) => {
    //The states shows the user input recorded by the form
    let [city, setCity] = useState("");
    //This state saves the data from the geolocation API call
    let [location, setLocation] = useState({});
    //This state shows when the city has been loaded and can be used to display informtaion to the user.
    let [showCity, setShowCity] = useState(false);
    
    //This state saves the data from the weather API call
    let [weather, setWeather] = useState({});

    //This state converts the wind speed from m/s to km/h
    let [crtWindSpeed, setCrtWindSpeed] = useState(0);

    //This state shows when the weather API is finished
    let [apiLoaded, setApiLoaded] = useState(false);
    
    //This state updates the rating for cycling
    //Todo should I put a number here to get it ready for a number?
    let [cyclingRating, setCyclingRating] = useState();

    //This state updates when the user selects a sport 
    let [sportSelected, setSportSelected] = useState("");

    //This state will be updated by the API call for air pollution
    let [airPollution, setAirPollution] = useState({});
    let [airPollutionDes, setAirPollutionDes] = useState("");

    const navigate = useNavigate();

    //This handles the event change in the input for the city
    //todo change name to something more unique
    const handleChange = (event) => {
     setCity(event.currentTarget.value);
     }

    //This handles the click from the location search
    //Todo change name to something more unique
    const handleClick = () => {
        geoLocCall();
        navigate('/sport');
     };

    //New refactor API from Marc it is working and operational
    const geoLocCall = () => {
      getCityLoc(city).then((data) => {
        setLocation(data);
        setShowCity(true);
        getWeatherAndPollution(data[0].lat, data[0].lon).then(
          ([forecastData, pollutionData]) => {
            setWeather(forecastData);
            setAirPollution(pollutionData);
            setApiLoaded(true);
            setCrtWindSpeed((forecastData.current.wind_speed*3.6).toFixed(2))
          }
        );
      });
    };

    //Air Pollution Quality
    const handleAirPollution = () => {
    const qualitativeName = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    let AirPollutionDes = qualitativeName[(airPollution.list[0].main.aqi)-1];
    setAirPollutionDes(AirPollutionDes);
    }

    //This function handles the click from the sport selected, it will take one parameter which is the sport selected.
    const handlClickSport = (sport) => {
      setSportSelected(sport);
      handleMultiSport();
      navigate("/rating");
    }

    //This function handles  
    const handleMultiSport = () => {
      handleAirPollution();
      let totalRate = getCyclingStatus(weather.current.feels_like, crtWindSpeed, weather.hourly[0].pop, weather.current.uvi);
      setCyclingRating(totalRate);
    }

    //This is the method that handles the navigation to the current weather
    const handleNavCurrentWeather = () => (
        navigate('/current-weather')
    );

    return (
        <MyContext.Provider 
        value={{
            city: city,
            location: location,
            showCity: showCity,
            weather: weather,
            apiLoaded: apiLoaded,
            cyclingRating: cyclingRating,
            handleChange: handleChange,
            handleClick: handleClick,
            geoLocCall: geoLocCall,
            handlClickSport: handlClickSport,
            currentHour: currentHour,
            handleNavCurrentWeather: handleNavCurrentWeather,
            day: day,
            sunImg: sunImg,
            rainImg: rainImg,
            windImg: windImg,
            humidityImg: humidityImg,
            uvindexImg: uvindexImg,
            sportSelected: sportSelected,
            airPollutionDes: airPollutionDes,
            crtWindSpeed: crtWindSpeed
        }} >
            {props.children }

        </MyContext.Provider >
    )
};

export default MyProvider;