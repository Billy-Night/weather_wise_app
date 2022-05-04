//This finds the current date and hour.
let today = new Date();
let currentHour = today.getHours();

//More date information for the user.
const weekday = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

const d = new Date();
let day = weekday[d.getDay()];

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
    // console.log(`This is increase from master ${increase}`);
    let increasePer = increase/totalDif;
    let reduction = (StartRate * increasePer);
    // console.log(`reduction: ${reduction}`);
    // console.log(`start rate: ${StartRate}`);
    let newRate = (StartRate - reduction);
    //The below 
    // (newRate <= 0 ? newRate= -3 : newRate);
    console.log(`This is the new rate from Master ${newRate}`);
    return newRate;
  }

  export const getCyclingStatus = (weatherFeelsLike, weatherWindSpeed, weatherPop, weatherUv) => {
    // console.log(currentHour);
    //test value 36  
    let currentTemp = weatherFeelsLike;
      //test value 18  
    let currentWindSpeed = weatherWindSpeed;
      //test value 0.2
    let currentPoP = weatherPop;
      //test value 4
    let currentUv = weatherUv;
    
      //  console.log(`currentTemp: ${currentTemp}`);
      //  console.log(`tempStartValue: ${tempStartValue}`);
      //  console.log(`totalTempDif: ${totalTempDif}`);
      //  console.log(`tempStartRate: ${tempStartRate}`);
    let tempFinRate = currentTemp > tempStartValue ? master(currentTemp, tempStartValue, totalTempDif, tempStartRate) : tempStartRate;
      // console.log(`The temp rating is: ${tempFinRate}`);
  
      // console.log(`windStartValue ${windStartValue}`);
      // console.log(`totalWindDif ${totalWindDif}`);
      // console.log(`windStartRate ${windStartRate}`);
    let windFinRate = currentWindSpeed > windStartValue ? master(currentWindSpeed, windStartValue, totalWindDif, windStartRate) : tempStartRate;
      // console.log(`The wind rating is ${windFinRate}`);
      // console.log(`currentPoP: ${currentPoP}`);
      // console.log(`popStartValue: ${popStartValue}`);
      // console.log(`totalPopDif: ${totalPopDif}`);
      // console.log(`popStartRate: ${popStartRate}`);
    let popFinRate = master(currentPoP, popStartValue, totalPopDif, popStartRate);
      console.log(`The pop rating is ${popFinRate}`);
      // console.log(`uvStartValue: ${uvStartValue}`);
      // console.log(`totalUvDif: ${totalUvDif}`);
      // console.log(`uvStartRate: ${uvStartRate}`);
    let uvFinRate = master(currentUv, uvStartValue, totalUvDif, uvStartRate);
      // console.log(`The UV Index rating is ${uvFinRate}`); 
  
    const totalRate = tempFinRate + windFinRate + popFinRate + uvFinRate;
      // console.log(`The Rating is: ${totalRate}`);
  
    return totalRate.toFixed(0);
    // setCyclingRating(totalRate);
    // console.log(`The rating is: ${cyclingRating}`)
  }