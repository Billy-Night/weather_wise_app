import React, { useContext } from "react";
import { MyContext } from "../context/MyProvider.js";

const SelectSport = () => {
  const context = useContext(MyContext)

return (
    <div className="select-sport-header">
      <h1>Choose your sport</h1>
      <div className="sport-btn-container">
        <img src={context.cyclingImg} alt="cycling" onClick={context.handlClickCycle} />
        <p>Cycling</p>
      </div>
      <div className="sport-btn-container">
        <img src={context.runningImg} alt="running" onClick={context.handlClickRunning} />
        <p>Running</p>
      </div>
    </div>
);
};

export default SelectSport;