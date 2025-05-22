"use client";

interface HeaderProps {
  links: React.JSX.Element[];
  children?: React.ReactNode;
}

const DesktopNav: React.FC<HeaderProps> = ({ links, children }) => {
  return (
    <div className='flex items-center flex-1 justify-center'>
      {children}
      <nav>
        <ul className='flex items-center text-lg md:text-xl font-header rtl:text-2xl'>
          {links}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopNav;
