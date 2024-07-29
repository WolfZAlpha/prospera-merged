import React from "react";

function GoalSvg({ current, goal, widthPercentage }) {
  const goalTextX = 1089 - 50; // Adjust based on your design

  // The width of the blue rectangle should be a percentage of the total width
  const currentWidth = (widthPercentage * 1089) / 100;

  return (
    <svg width="1089" height="52" viewBox="0 0 1089 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="clip-slanted-corners">
          <path
            d="M6.58386 49.2864L2.36426 45.0981C0.851197 43.5961 0.000122954 41.5523 0.000123142 39.4202L0.000247607 12.1859C0.000247794 10.0531 0.851933 8.00862 2.36597 6.50655L6.58411 2.32187C8.08252 0.835344 10.1078 0.00121847 12.2184 0.00121484L1076.85 9.4311e-05C1078.92 9.06764e-05 1080.91 0.803745 1082.4 2.24192L1086.55 6.24694C1088.12 7.75471 1089 9.83329 1089 12.0052L1089 39.4192C1089 41.5512 1088.15 43.5949 1086.63 45.0969L1082.41 49.2852C1080.92 50.7727 1078.89 51.6074 1076.78 51.6074L12.2197 51.6086C10.1083 51.6086 8.0824 50.7739 6.58386 49.2864Z"
            fill="#071923"
          />
        </clipPath>
        <filter id="filter0_di_10_89" x="-0.999878" y="0.00012207" width="1117" height="79.6085" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="13" dy="14" />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_89" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_89" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="7.05" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.204167 0 0 0 0 0.7135 0 0 0 0 1 0 0 0 0.7 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_10_89" />
        </filter>
      </defs>

      <g filter="url(#filter0_di_10_89)">
        <path
          d="M6.58386 49.2864L2.36426 45.0981C0.851197 43.5961 0.000122954 41.5523 0.000123142 39.4202L0.000247607 12.1859C0.000247794 10.0531 0.851933 8.00862 2.36597 6.50655L6.58411 2.32187C8.08252 0.835344 10.1078 0.00121847 12.2184 0.00121484L1076.85 9.4311e-05C1078.92 9.06764e-05 1080.91 0.803745 1082.4 2.24192L1086.55 6.24694C1088.12 7.75471 1089 9.83329 1089 12.0052L1089 39.4192C1089 41.5512 1088.15 43.5949 1086.63 45.0969L1082.41 49.2852C1080.92 50.7727 1078.89 51.6074 1076.78 51.6074L12.2197 51.6086C10.1083 51.6086 8.0824 50.7739 6.58386 49.2864Z"
          fill="#071923"
        />
      </g>

      {/* Clip the blue rectangle using the same path for slanted edges */}
      <g clipPath="url(#clip-slanted-corners)">
        <rect x="0" y="0" width={currentWidth} height="52" fill="rgb(56 189 248)" />
      </g>

      {/* Text should be above the blue rectangle, ensure they are rendered last */}
      <text x="10" y="30" fill="white" fontSize="20" fontFamily="'Orbitron', Arial" fontWeight="bold">{`${current} $PROS`}</text>
      <text x={goalTextX} y="30" fill="white" fontSize="20" fontFamily="'Orbitron', Arial" fontWeight="bold" textAnchor="end">{`${goal} $PROS`}</text>
    </svg>
  );
}

export default GoalSvg;
