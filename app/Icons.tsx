export function NextFilled() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="104"
      height="42"
      className="absolute inset-0 h-full w-full transition-opacity duration-500 group-hover:opacity-0 group-focus:opacity-0"
      style={{ color: "transparent" }}
    >
      <path
        fill="#D9D9DE"
        fillRule="evenodd"
        d="M63.054 37.67A19.907 19.907 0 0 1 52 41c-11.046 0-20-8.954-20-20S40.954 1 52 1s20 8.954 20 20c0 6-2.643 11.384-6.828 15.05l-4.95-6.407V13h-2.666v13.19L47.365 13H44v15.993h2.692V16.42L63.054 37.67Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#paint0_linear_485_6386)"
        fillOpacity=".4"
        fillRule="evenodd"
        d="M63.054 37.67A19.907 19.907 0 0 1 52 41c-11.046 0-20-8.954-20-20S40.954 1 52 1s20 8.954 20 20c0 6-2.643 11.384-6.828 15.05l-4.95-6.407V13h-2.666v13.19L47.365 13H44v15.993h2.692V16.42L63.054 37.67Z"
        clipRule="evenodd"
        style={{ mixBlendMode: "overlay" }}
      />
      <defs>
        <linearGradient
          id="paint0_linear_485_6386"
          x1="52"
          x2="52"
          y1="1"
          y2="41"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset=".775" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function NextOutline() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="104"
      height="42"
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"
      style={{ color: "transparent" }}
    >
      <path
        fill="#D9D9DE"
        fillRule="evenodd"
        d="m47.365 13 10.19 13.19V13h2.667v16.643l4.95 6.407A19.944 19.944 0 0 0 72 21C72 9.954 63.046 1 52 1S32 9.954 32 21s8.954 20 20 20a19.907 19.907 0 0 0 11.054-3.33L46.692 16.42v12.574H44V13h3.365Zm.077 5.622v11.121H43.25V12.25h4.483l9.073 11.743V12.25h4.166v17.137l4.296 5.56A19.193 19.193 0 0 0 71.25 21c0-10.632-8.618-19.25-19.25-19.25S32.75 10.368 32.75 21c0 10.631 8.618 19.25 19.25 19.25 3.646 0 7.054-1.013 9.959-2.773L47.442 18.622Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
