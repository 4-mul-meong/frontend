import type { IconProps } from "./@type";

function DeleteShorts({ width = 30, height = 30 }: IconProps) {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_104_9031)">
          <path
            d="M6.16109 23.8387C5.49762 23.1752 5.49762 22.1 6.16108 21.4366L21.4366 6.16102C22.1001 5.49755 23.1753 5.49755 23.8388 6.16102C24.5022 6.82449 24.5022 7.89967 23.8388 8.56314L8.5632 23.8387C7.89974 24.5022 6.82455 24.5022 6.16109 23.8387Z"
            fill="#47D0BF"
          />
          <path
            d="M21.4367 23.8387L6.16112 8.56314C5.49766 7.89967 5.49766 6.82449 6.16112 6.16102C6.82459 5.49755 7.89978 5.49755 8.56324 6.16102L23.8388 21.4366C24.5023 22.1 24.5023 23.1752 23.8388 23.8387C23.1753 24.5022 22.1001 24.5022 21.4367 23.8387Z"
            fill="#47D0BF"
          />
        </g>
        <defs>
          <clipPath id="clip0_104_9031">
            <rect width="30" height="30" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default DeleteShorts;
