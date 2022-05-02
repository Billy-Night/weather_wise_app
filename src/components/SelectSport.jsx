
import React, { useContext } from "react";
import { MyContext } from "../context/MyProvider.js";
import { sportsOptions } from "../utils/sportsSelector";

const SelectSport = () => {
  const context = useContext(MyContext)

return (
    <div className="select-sport-header">
      <h1>Choose your sport</h1>
      {sportsOptions.map((el, i) => (
        <div className="sport-btn-container">
          <img src={el.img} alt={el.name} onClick={() => context.handlClickSport(el.name)} />
          <p>{el.name}</p>
          </div>
      ))}
      </div>
    //   <div className="sport-btn-container">
    //     <img src={context.cyclingImg} alt="cycling" onClick={context.handlClickCycle} />
    //     <p>Cycling</p>
    //   </div>
    //   <div className="sport-btn-container">
    //     <img src={context.runningImg} alt="running" onClick={context.handlClickRunning} />
    //     <p>Running</p>
    //   </div>
    // </div>
);
};

export default SelectSport;