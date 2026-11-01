/** The NG/> mark. N follows the text colour; G and "/>" use the brand accent. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 80 40'
      className={className}
      fill='none'
      strokeWidth='6'
      aria-hidden='true'
      focusable='false'
    >
      <path
        d='M4 35V5h6.5L22 25.5V5h6v30h-6.5L10 14.5V35z'
        fill='currentColor'
      />
      <path d='M56.2 11.8A12.5 12.5 0 1 0 59 20H47' stroke='var(--accent)' />
      <path
        d='M63 34l6-27M71 15l5 5-5 5'
        stroke='var(--accent)'
        strokeWidth='3.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
