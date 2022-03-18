import React from "react";

const DonateLine = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="30px"
      height="30px"
      viewBox="0 0 512 512"
    >
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="258"
        x2="512"
        y2="258"
        gradientTransform="matrix(1 0 0 -1 0 514)"
      >
        <stop offset="0" style={{ stopColor: "#00F2FE" }} />
        <stop offset="0.021" style={{ stopColor: "#03EFFE" }} />
        <stop offset="0.293" style={{ stopColor: "#24D2FE" }} />
        <stop offset="0.554" style={{ stopColor: "#3CBDFE" }} />
        <stop offset="0.796" style={{ stopColor: "#4AB0FE" }} />
        <stop offset="1" style={{ stopColor: "#4FACFE" }} />
      </linearGradient>
      <path
        style={{ fill: `url(#SVGID_1_)` }}
        d="M492,276H20c-11.046,0-20-8.954-20-20s8.954-20,20-20h472c11.046,0,20,8.954,20,20
	C512,267.046,503.046,276,492,276z"
      />
    </svg>
  );
};

export default DonateLine;
