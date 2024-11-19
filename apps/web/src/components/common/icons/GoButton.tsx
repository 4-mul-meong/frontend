import type { IconProps } from "./@type";

function GoButton({ width = 64, height = 64 }: IconProps) {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 78 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_104_9263)">
          <rect
            x="74"
            y="70"
            width="70"
            height="70"
            rx="35"
            transform="rotate(-180 74 70)"
            fill="#47D0BF"
            shapeRendering="crispEdges"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.4793 44.5375C32.8402 43.9209 32.8402 42.9212 33.4793 42.3046L41.0495 35L33.4793 27.6954C32.8402 27.0788 32.8402 26.0791 33.4793 25.4625C34.1183 24.8458 35.1544 24.8458 35.7934 25.4625L44.5207 33.8835C45.1598 34.5001 45.1598 35.4999 44.5207 36.1165L35.7934 44.5375C35.1544 45.1542 34.1183 45.1542 33.4793 44.5375Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_104_9263"
            x="0"
            y="0"
            width="78"
            height="82"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="8" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.608412 0 0 0 0 0.703044 0 0 0 0 0.691301 0 0 0 0.42 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_104_9263"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_104_9263"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default GoButton;
