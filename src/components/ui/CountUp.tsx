import type { CSSProperties } from "react";

/**
 * Renders a formatted number such as "+49%" so that its digits count up from 0
 * as it scrolls into view (`.count-up` in globals.css). Only whole numbers from
 * 10 to 999 animate — CSS counters can't group digits or show decimals — and
 * anything else renders as plain text. Screen readers always get the text.
 */
export default function CountUp({ text }: { text: string }) {
  const match = /^(\D*)(\d+)(\D*)$/.exec(text);
  const value = match ? Number(match[2]) : NaN;
  if (!match || value < 10 || value > 999) {
    return <bdi dir='ltr'>{text}</bdi>;
  }

  return (
    <>
      <span className='sr-only'>{text}</span>
      <bdi dir='ltr' aria-hidden='true'>
        {match[1]}
        <span
          className='count-up inline-block tabular-nums'
          style={{ "--to": value } as CSSProperties}
        />
        {match[3]}
      </bdi>
    </>
  );
}
