import { useId } from "react";

/** The NG/> mark. N follows the text colour; G and "/>" carry the violet → cyan brand gradient. */
export default function Logo({ className = "" }: { className?: string }) {
  const gradient = useId();

  return (
    <svg
      viewBox='0 0 80 40'
      className={className}
      fill='none'
      strokeWidth='6'
      aria-hidden='true'
      focusable='false'
    >
      <defs>
        <linearGradient id={gradient} x1='36' y1='4' x2='78' y2='36'>
          <stop offset='0' stopColor='#8b5cf6' />
          <stop offset='1' stopColor='#22d3ee' />
        </linearGradient>
      </defs>
      <path
        d='M4 35V5h6.5L22 25.5V5h6v30h-6.5L10 14.5V35z'
        fill='currentColor'
      />
      <path
        d='M56.2 11.8A12.5 12.5 0 1 0 59 20H47'
        stroke={`url(#${gradient})`}
      />
      <path
        d='M63 34l6-27M71 15l5 5-5 5'
        stroke={`url(#${gradient})`}
        strokeWidth='3.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
