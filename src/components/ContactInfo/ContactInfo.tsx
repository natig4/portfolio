import React from "react";
import { IconType } from "react-icons";

interface ContactInfoProps {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  icon: Icon,
  label,
  value,
  href,
  className = "",
}) => {
  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className='p-2 rounded-lg bg-primary/10 flex-shrink-0'>
        <Icon size={20} className='text-primary' />
      </div>
      <div>
        <p className='text-sm text-text-secondary'>{label}</p>
        <p className='text-text font-medium'>{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='hover:bg-surface/50 p-3 rounded-lg transition-colors duration-200 block'
      >
        {content}
      </a>
    );
  }

  return <div className='p-3'>{content}</div>;
};

export default ContactInfo;
