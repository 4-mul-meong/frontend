import type { IconProps } from "./@type";

export default function DeleteButton({ width = 35, height = 35 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="35" height="35" rx="17.5" fill="#0CEDA9" />
      <g clipPath="url(#clip0_104_9144)">
        <path
          d="M10.4288 24.5712C9.89805 24.0405 9.89805 23.1803 10.4288 22.6496L22.6493 10.4291C23.18 9.89834 24.0402 9.89834 24.571 10.4291C25.1017 10.9599 25.1017 11.82 24.571 12.3508L12.3505 24.5712C11.8197 25.102 10.9596 25.102 10.4288 24.5712Z"
          fill="white"
        />
        <path
          d="M22.6495 24.5712L10.429 12.3508C9.89827 11.82 9.89827 10.9599 10.429 10.4291C10.9598 9.89834 11.82 9.89834 12.3507 10.4291L24.5712 22.6496C25.102 23.1803 25.102 24.0405 24.5712 24.5712C24.0404 25.102 23.1803 25.102 22.6495 24.5712Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_104_9144">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(5.5 5.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
