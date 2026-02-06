import React from 'react'

interface LogoProps {
  className?: string
  size?: number
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 201 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="49.2184" cy="48.4004" r="48.4" fill="currentColor" />
      <path
        d="M104.018 48.4004C104.018 21.6698 125.687 0.000366211 152.418 0.000366211V0.000366211C179.148 0.000366211 200.818 21.6698 200.818 48.4004V48.4004C200.818 75.131 179.148 96.8004 152.418 96.8004H104.018V48.4004Z"
        fill="currentColor"
      />
      <path
        d="M0.818359 151.6C0.818359 124.87 22.4878 103.2 49.2184 103.2H97.6184V151.6C97.6184 178.331 75.9489 200 49.2184 200V200C22.4878 200 0.818359 178.331 0.818359 151.6V151.6Z"
        fill="currentColor"
      />
      <circle cx="152.418" cy="151.6" r="48.4" fill="currentColor" />
    </svg>
  )
}
