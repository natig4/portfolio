"use client";

import { useRef } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { Link } from "@/i18n/routing";
import NavLinks, { type NavItem } from "./NavLinks";
import LocaleSwitcher from "./LocaleSwitcher";

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type='button'
        onClick={() => dialogRef.current?.showModal()}
        aria-label={labels.open}
        aria-haspopup='dialog'
        className={`inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted ${buttonClassName}`}
      >
        <LuMenu className='size-5' aria-hidden='true' />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={labels.primary}
        className='fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none flex-col bg-background p-0 text-foreground open:flex backdrop:bg-black/40'
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className='flex h-16 shrink-0 items-center justify-between border-b border-border px-4'>
          <LocaleSwitcher />
          <button
            type='button'
            onClick={close}
            aria-label={labels.close}
            className='inline-flex size-10 items-center justify-center rounded-md transition-colors hover:bg-muted'
            autoFocus
          >
            <LuX className='size-5' aria-hidden='true' />
          </button>
        </div>

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
      </dialog>
    </>
  );
}
