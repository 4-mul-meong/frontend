import type { IconProps } from "./@type";

export default function DownloadImage({
  width = 19,
  height = 19,
  fill = "#217EFD",
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.61786 18.0102C2.43451 18.0919 0.595886 16.3932 0.504944 14.2102L0.504883 10.2592C0.598572 8.07828 2.43652 6.38284 4.61786 6.46518H5.43683C5.74286 6.43881 6.03766 6.58719 6.19879 6.84866C6.35992 7.1102 6.35992 7.44016 6.19879 7.70169C6.03766 7.96317 5.74286 8.11154 5.43683 8.08517H4.61786C3.36798 8.03842 2.31494 9.00967 2.26086 10.2592V14.2172C2.31445 15.4671 3.36768 16.4389 4.61786 16.3921L14.3849 16.3922C15.635 16.4389 16.6882 15.4671 16.7418 14.2171L16.7419 10.2592C16.6888 9.01425 15.6401 8.04593 14.3948 8.09219H13.5679C13.2618 8.11856 12.967 7.97018 12.8059 7.70871C12.6448 7.44717 12.6448 7.11722 12.8059 6.85568C12.967 6.59421 13.2618 6.44583 13.5679 6.4722H14.3949C16.5703 6.39267 18.4017 8.08438 18.4949 10.2592V14.2172C18.4039 16.4001 16.5652 18.0988 14.3818 18.0171L4.61786 18.0102ZM8.62585 12.3412V3.73514L7.56787 4.71811C7.21124 5.02524 6.68353 5.02524 6.3269 4.71811C6.16339 4.57278 6.06982 4.36441 6.06982 4.14566C6.06982 3.92685 6.16333 3.71848 6.3269 3.57309L8.88684 1.20108C9.24872 0.906281 9.76788 0.906281 10.1298 1.20108L12.6898 3.57309C12.8528 3.71878 12.9459 3.92703 12.9459 4.1456C12.9459 4.36417 12.8528 4.57242 12.6898 4.71811C12.336 5.03476 11.8007 5.03476 11.4469 4.71811L10.3868 3.73514V12.3412H8.62585Z"
        fill={fill}
      />
    </svg>
  );
}
