import React from "react";

const DragDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      width="20"
      height="20"
    >
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1="256"
        y1="55.3579"
        x2="256"
        y2="456.6421"
      >
        <stop offset="0" style={{ stopColor: "#2AF598" }} />
        <stop offset="1" style={{ stopColor: "#009EFD" }} />
      </linearGradient>
      <polygon
        style={{ fill: `url(#SVGID_1_)` }}
        points="512,95.358 512,55.358 0,55.358 0,95.358 236,95.358 236,380.074 191.754,335.828   163.47,364.112 256,456.642 348.53,364.112 320.246,335.828 276,380.074 276,95.358 "
      />
    </svg>
  );
};

export default DragDown;
