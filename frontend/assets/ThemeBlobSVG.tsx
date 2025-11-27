import { ThemeOptions } from "@/components/palette";

const ThemeBlobSVG = ({ theme }: { theme: ThemeOptions }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -top-4 -left-22 rotate-150 h-[180%] select-none"
    >
      <defs>
        <clipPath id="shape">
          <path
            fill={theme?.activeColor}
            d="M880.5,631Q861,762,745,830Q629,898,518,842.5Q407,787,279,770.5Q151,754,184.5,627Q218,500,293.5,452.5Q369,405,366.5,243.5Q364,82,502,75Q640,68,675.5,207.5Q711,347,805.5,423.5Q900,500,880.5,631Z"
          ></path>
        </clipPath>
      </defs>
      <g clipPath="url(#shape)">
        <path
          fill={theme?.activeColor}
          d="M880.5,631Q861,762,745,830Q629,898,518,842.5Q407,787,279,770.5Q151,754,184.5,627Q218,500,293.5,452.5Q369,405,366.5,243.5Q364,82,502,75Q640,68,675.5,207.5Q711,347,805.5,423.5Q900,500,880.5,631Z"
        />
      </g>
    </svg>
  );
};

export default ThemeBlobSVG;
