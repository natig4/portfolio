import type { CSSProperties } from "react";

/**
 * A number that counts up from 0 as it scrolls into view (`.count-up` in
 * globals.css). Only whole numbers below 1,000 animate — CSS counters can't
 * group digits — so anything else renders as plain text. Screen readers get
 * `text`, the fully formatted value.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  text,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  /** The value as it should be read, e.g. "+49%". */
  text: string;
}) {
  const animates = Number.isInteger(value) && value >= 10 && value < 1000;
  if (!animates) return <bdi dir='ltr'>{text}</bdi>;

  return (
    <>
      <span className='sr-only'>{text}</span>
      <bdi dir='ltr' aria-hidden='true'>
        {prefix}
        <span
          className='count-up inline-block tabular-nums'
          style={{ "--to": value } as CSSProperties}
        />
        {suffix}
      </bdi>
    </>
  );
}
