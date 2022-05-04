const getApiJson = (url) => fetch(url).then((response) => response.json());

export const getCityLoc = (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_APIKEY}`;
  return fetch(url).then((response) => response.json());
};

export const getWeatherAndPollution = (lat, long) => {
  const urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;

  const urlPollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_APIKEY}`;

  return Promise.all([getApiJson(urlWeather), getApiJson(urlPollution)]);
};