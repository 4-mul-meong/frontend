import type { IconProps } from "./@type";

export default function PushImage({
  width = 30,
  height = 30,
  fill = "white",
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="25" height="25" rx="12.5" fill="black" fillOpacity="0.2" />
      <path
        d="M12.5002 16.5354C12.8031 16.5354 13.0486 16.29 13.0486 15.9871L13.0486 9.01272C13.0486 8.7098 12.8031 8.46436 12.5002 8.46436C12.1973 8.46436 11.9519 8.7098 11.9519 9.01272L11.9519 15.9871C11.9519 16.29 12.1973 16.5354 12.5002 16.5354Z"
        fill="white"
      />
      <path
        d="M9.01294 13.0484L15.9873 13.0484C16.2902 13.0484 16.5356 12.8029 16.5356 12.5C16.5356 12.1971 16.2902 11.9517 15.9873 11.9517L9.01294 11.9517C8.71002 11.9517 8.46457 12.1971 8.46457 12.5C8.46457 12.8029 8.71002 13.0484 9.01294 13.0484Z"
        fill={fill}
      />
    </svg>
  );
}
