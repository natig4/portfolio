"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/routing";
import NavLinks, { type NavItem } from "./NavLinks";

const noopSubscribe = () => () => {};

export default function MobileMenu({
  items,
  labels,
  buttonClassName = "",
}: {
  items: NavItem[];
  labels: {
    open: string;
    close: string;
    startProject: string;
    primary: string;
  };
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  // The header's backdrop-filter would trap a fixed child, so the drawer is portalled to <body>.
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // Close if the viewport grows into the desktop nav.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const bar =
    "absolute inset-x-0 h-0.5 rounded-full bg-current transition-[translate,rotate,opacity,scale] duration-300 ease-(--ease-out-soft)";

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        aria-controls='mobile-menu'
        className={`inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted ${buttonClassName}`}
      >
        <span className='relative block h-3.5 w-5' aria-hidden='true'>
          <span
            className={`${bar} top-0 ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`${bar} top-1.5 ${open ? "scale-x-0 opacity-0" : ""}`}
          />
          <span
            className={`${bar} top-3 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </span>
      </button>

      {isClient &&
        createPortal(
          <div className='lg:hidden'>
            <div
              className='mobile-drawer-backdrop'
              data-open={open || undefined}
              onClick={close}
              aria-hidden='true'
            />
            <div
              ref={panelRef}
              id='mobile-menu'
              className='mobile-drawer flex flex-col border-s border-border bg-background text-foreground shadow-2xl'
              data-open={open || undefined}
            >
              <nav
                aria-label={labels.primary}
                className='flex-1 overflow-y-auto px-4 py-6'
              >
                <NavLinks items={items} variant='mobile' onNavigate={close} />
              </nav>

              <div className='border-t border-border p-4'>
                <Link
                  href='/contact'
                  onClick={close}
                  className='flex h-12 w-full items-center justify-center rounded-lg bg-accent font-medium text-accent-foreground transition-colors hover:bg-accent-hover'
                >
                  {labels.startProject}
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
