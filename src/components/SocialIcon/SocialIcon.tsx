import { IconType } from "react-icons";

export default function SocialIcon({
  href,
  Icon,
  size = 24,
}: {
  href: string;
  Icon: IconType;
  size?: number;
}) {
  return (
    <a
      href={href}
      key={href}
      target='_blank'
      rel='noopener noreferrer'
      className='text-gray-300 hover:text-white transition-colors duration-300 hover:scale-110 transform inline-flex'
      aria-label={`Visit ${href}`}
    >
      <Icon size={size} />
    </a>
  );
}
