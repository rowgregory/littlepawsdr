import { FC } from "react";

interface CircleProps {
  online: boolean;
}

export const OnlineCircle: FC<CircleProps> = ({ online }) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="10px"
      height="10px"
      viewBox="0 0 29.107 29.107"
    >
      <path
        fill={online ? "#77b300" : "red"}
        d="M14.554,0C6.561,0,0,6.562,0,14.552c0,7.996,6.561,14.555,14.554,14.555c7.996,0,14.553-6.559,14.553-14.555
				C29.106,6.562,22.55,0,14.554,0z"
      />
    </svg>
  );
};
