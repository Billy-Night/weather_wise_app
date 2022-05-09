import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = (props) => {
  //7:
  const [offset, setOffset] = useState(0);
  //1:
  const { size, progress, strokeWidth, circleOneStroke, circleTwoStroke } =
    props;
  //3:
  const center = size / 2;
  //4:
  const radius = size / 2 - strokeWidth / 2;
  //5:
  const circumference = 2 * Math.PI * radius;
  //8:
  useEffect(() => {
    const progressOffset = ((100 - progress * 100) / 100) * circumference;
    setOffset(progressOffset);
  }, [setOffset, progress, circumference, offset]);
  //2:(we have input the atribute after step 3)
  return (
    <div>
      <svg className="circular-chart" width={size} height={size}>
        <circle
          className="circular-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          className="circle"
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          //6:
          strokeDasharray={circumference}
          strokeDashoffset={offset} //!the progress is empty we get pass the offset from the hook
        ></circle>
        {/* //9: going to display the progress value that it would get */}
        <text x={center} y={center} className="svg-circle-text">
          {progress} / 10
        </text>
      </svg>
    </div>
  );
};

export default ProgressBar;