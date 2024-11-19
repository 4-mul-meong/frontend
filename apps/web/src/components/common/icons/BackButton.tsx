import type { IconProps } from "./@type";

function BackButton({ width = 60, height = 64 }: IconProps) {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 66 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5" filter="url(#filter0_d_104_9260)">
          <rect
            x="4"
            width="58"
            height="58"
            rx="29"
            fill="#47474A"
            shapeRendering="crispEdges"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38.5207 19.4625C39.1598 20.0791 39.1598 21.0788 38.5207 21.6954L30.9505 29L38.5207 36.3046C39.1598 36.9212 39.1598 37.9209 38.5207 38.5375C37.8817 39.1542 36.8456 39.1542 36.2066 38.5375L27.4793 30.1165C26.8402 29.4999 26.8402 28.5001 27.4793 27.8835L36.2066 19.4625C36.8456 18.8458 37.8817 18.8458 38.5207 19.4625Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_104_9260"
            x="0"
            y="0"
            width="66"
            height="70"
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
              result="effect1_dropShadow_104_9260"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_104_9260"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default BackButton;
