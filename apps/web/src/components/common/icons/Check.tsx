import type { IconProps } from "./@type";

function Check({ width = 14, height = 14 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="14" height="14" rx="7" fill="#217EFD" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.14795 10.3069L3.04787 7.91589C2.71974 7.54095 2.71974 6.93683 3.04787 6.56189C3.20495 6.38251 3.41887 6.28162 3.64201 6.28162C3.86514 6.28162 4.07906 6.38251 4.23614 6.56189L5.7381 8.27789L9.76419 3.69287C9.92127 3.51349 10.1352 3.4126 10.3583 3.4126C10.5815 3.4126 10.7954 3.51349 10.9525 3.69287C11.2804 4.06708 11.2804 4.67059 10.9525 5.04486L6.33266 10.3069C6.17558 10.4863 5.96167 10.5872 5.73853 10.5872C5.51539 10.5872 5.30147 10.4863 5.14439 10.3069H5.14795Z"
        fill="white"
      />
    </svg>
  );
}

export default Check;
