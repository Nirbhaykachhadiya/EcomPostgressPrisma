import React from "react";

const LoadingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="50"
    height="50"
    style={{
      shapeRendering: "auto",
      display: "block",
      //margin: "auto",
      background: "rgb(255, 255, 255)",
    }}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g transform="rotate(0 50 50)">
      <path
        strokeWidth="12"
        stroke="#ff6a00"
        fill="none"
        d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843"
      ></path>
      <path fill="#ff6a00" d="M49 3L49 27L61 15L49 3"></path>
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </g>
  </svg>
);

export default LoadingIcon;
