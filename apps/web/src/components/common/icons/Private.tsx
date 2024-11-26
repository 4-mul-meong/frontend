import type { IconProps } from "./@type";

function Private({ width = 24, height = 24 }: IconProps) {
  return (
    <div>
      <svg
        aria-hidden="true"
        focusable="false"
        className="Octicon-sc-9kayk9-0 knLhXt"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill="currentColor"
      >
        <path d="M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19.5v-8A2.5 2.5 0 0 1 5.5 9Zm-1.5 2.5v8a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-13a1 1 0 0 0-1 1Zm3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75-2.578 0-4.5 2.08-4.5 4.75Z" />
      </svg>
    </div>
  );
}

export default Private;
