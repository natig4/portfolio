/** Slowly drifting violet/cyan/lime glows for ink sections (see `.aurora` in globals.css). Decorative. */
export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden='true'>
      <span />
    </div>
  );
}
