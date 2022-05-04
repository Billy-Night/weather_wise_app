//The real feel temp variables
const tempStartValue = 26;
const totalTempDif = 12;
const tempStartRate = 3; 

//The wind variables
const totalWindDif = 20;
const windStartValue = 6;
const windStartRate = 3;

//The probability of rain variables
const popStartValue = 0;
const totalPopDif = 0.6;
const popStartRate = 3;

//The UV Index variables
const uvStartValue = 0;
const totalUvDif = 6;
const uvStartRate = 1;

//The first function is the master which controls the percentage rating system set-up it can be used for all the weather parameters passed in
const master = (currentWeather, rangeStart, totalDif, StartRate) => {
    let increase = currentWeather - rangeStart;
    let increasePer = increase/totalDif;
    let reduction = (StartRate * increasePer);
    let newRate = (StartRate - reduction);

    return newRate;
  }

  export const getCyclingStatus = (weatherFeelsLike, weatherWindSpeed, weatherPop, weatherUv) => {
    let currentTemp = weatherFeelsLike;
    let currentWindSpeed = weatherWindSpeed;
    let currentPoP = weatherPop;
    let currentUv = weatherUv;

    let tempFinRate = currentTemp > tempStartValue ? master(currentTemp, tempStartValue, totalTempDif, tempStartRate) : tempStartRate;

    let windFinRate = currentWindSpeed > windStartValue ? master(currentWindSpeed, windStartValue, totalWindDif, windStartRate) : tempStartRate;

    let popFinRate = master(currentPoP, popStartValue, totalPopDif, popStartRate);

    let uvFinRate = master(currentUv, uvStartValue, totalUvDif, uvStartRate);

    const totalRate = tempFinRate + windFinRate + popFinRate + uvFinRate;

    return totalRate.toFixed(0);
  }