"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDirection } from "@/hooks/useDirection";
import { useTranslations } from "next-intl";

interface LocationButtonProps {
  className?: string;
  showIcon?: boolean;
  animate?: boolean;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  className = "",
  showIcon = true,
  animate = true,
}) => {
  const { direction } = useDirection();
  const t = useTranslations("home");

  const locationUrl =
    "https://www.google.com/maps/place/YASUR/data=!4m2!3m1!1s0x151dca54b64c7603:0x1acb071f63e0bc23?sa=X&ved=1t:242&ictx=111";

  const handleClick = () => {
    window.open(locationUrl, "_blank", "noopener,noreferrer");
  };

  const ButtonComponent = animate ? motion.div : "div";
  const animationProps = animate
    ? {
        whileHover: { scale: 1.02, y: -2 },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <ButtonComponent
      className={`p-4 md:p-6 rounded-2xl bg-surface/50 backdrop-blur-lg border border-border/30 cursor-pointer text-center ${className}`}
      onClick={handleClick}
      {...animationProps}
    >
      <p
        className='text-md md:text-lg text-text-secondary flex items-center justify-center gap-3'
        dir={direction}
      >
        {showIcon && <FaMapMarkerAlt className='flex-shrink-0 text-primary' />}
        <span>{t("location")}</span>
      </p>
    </ButtonComponent>
  );
};

export default LocationButton;
