"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedDigits({ digits }: { digits: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(digits);

  useEffect(() => {
    const target = element.current;
    if (
      !target ||
      typeof IntersectionObserver !== "function" ||
      typeof requestAnimationFrame !== "function" ||
      typeof cancelAnimationFrame !== "function" ||
      typeof matchMedia !== "function"
    ) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let frame = 0;
    let started = false;
    let finished = false;
    const finish = () => {
      finished = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      setDisplay(digits);
    };
    const observer = new IntersectionObserver((entries) => {
      if (started || finished || !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.15)) return;
      started = true;
      observer.disconnect();
      setDisplay("0");
      let start: number | undefined;
      const tick = (now: number) => {
        if (finished) return;
        start ??= now;
        const progress = Math.min((now - start) / 1200, 1);
        if (progress === 1) {
          finish();
          return;
        }
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(String(Math.round(Number(digits) * eased)));
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.15 });
    const onMotionChange = () => {
      if (motion.matches) finish();
    };
    motion.addEventListener("change", onMotionChange);
    observer.observe(target);

    return () => {
      finished = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, [digits]);

  return (
    <span ref={element} className='count-up inline-grid tabular-nums'>
      {/* Reserve the final width so the number and its suffix do not jump. */}
      <span className='invisible col-start-1 row-start-1'>{digits}</span>
      <span className='col-start-1 row-start-1 text-right'>{display}</span>
    </span>
  );
}

/**
 * Renders a formatted number such as "+49%" so that its digits count up from 0
 * the first time it comes into view and then stay put. Only whole numbers from
 * 10 to 999 animate; other formats stay as plain text. Server rendering and
 * screen readers always get the final value.
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
        <AnimatedDigits key={text} digits={match[2]} />
        {match[3]}
      </bdi>
    </>
  );
}
