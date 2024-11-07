import type { IconProps } from "./@type";

export default function Ellipsis({
  width = 24,
  height = 24,
  fill = "#838383",
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8571 12C17.8571 13.1835 18.8165 14.1429 20 14.1429C21.1834 14.1429 22.1428 13.1835 22.1428 12C22.1428 10.8166 21.1834 9.85718 20 9.85718C18.8165 9.85718 17.8571 10.8166 17.8571 12Z"
        fill={fill}
      />
      <path
        d="M9.99993 12C9.99993 13.1835 10.9593 14.1429 12.1428 14.1429C13.3263 14.1429 14.2856 13.1835 14.2856 12C14.2856 10.8166 13.3263 9.85718 12.1428 9.85718C10.9593 9.85718 9.99993 10.8166 9.99993 12Z"
        fill={fill}
      />
      <path
        d="M2.14287 12C2.14287 13.1835 3.10226 14.1429 4.28573 14.1429C5.4692 14.1429 6.42859 13.1835 6.42859 12C6.42859 10.8166 5.4692 9.85718 4.28573 9.85718C3.10226 9.85718 2.14287 10.8166 2.14287 12Z"
        fill={fill}
      />
    </svg>
  );
}
