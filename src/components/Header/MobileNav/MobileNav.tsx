"use client";

interface HeaderProps {
  links: React.JSX.Element[];
  menuOpen: boolean;
  handleToggleMenu: () => void;
}

export default function MobileNav({
  menuOpen,
  links,
  handleToggleMenu,
}: HeaderProps) {
  return (
    <nav className='z-40 flex flex-col items-start'>
      <button
        className='relative z-50 flex flex-col justify-center items-center w-10 h-10 bg-transparent border-0 cursor-pointer p-0'
        onClick={(e) => {
          e.stopPropagation();
          handleToggleMenu();
        }}
        aria-label='Toggle menu'
        aria-expanded={menuOpen}
      >
        <div className='w-8 h-9 relative flex justify-center items-center'>
          <span
            className={`absolute w-8 h-0.5 bg-white rounded-sm transition-all duration-300 ${
              menuOpen
                ? "rotate-45 bg-primary-500 translate-y-0"
                : "translate-y-[-14px]"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-0.5 bg-white rounded-sm transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-0.5 bg-white rounded-sm transition-all duration-300 ${
              menuOpen
                ? "-rotate-45 bg-primary-500 translate-y-0"
                : "translate-y-[14px]"
            }`}
          ></span>
        </div>
      </button>

      {menuOpen && (
        <aside
          className='fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-40'
          onClick={handleToggleMenu}
        >
          <div
            className='w-64 h-full bg-gray-800/95 shadow-lg'
            onClick={(e) => e.stopPropagation()}
          >
            <ul className='flex flex-col w-full h-full pt-20 font-header'>
              {links.map((link, index) => (
                <div
                  key={index}
                  className='animate-slide-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link}
                </div>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </nav>
  );
}
