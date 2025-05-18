import React from "react";
import { useDirection } from "@/hooks/useDirection";

interface IconWithTextProps {
  icon: React.ReactNode;
  text: string;
  gap?: "sm" | "md" | "lg";
  className?: string;
  vertical?: boolean;
}

const IconWithText: React.FC<IconWithTextProps> = ({
  icon,
  text,

  gap = "md",
  className = "",
  vertical = false,
}) => {
  const { direction } = useDirection();

  const gapClasses = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  };

  if (vertical) {
    return (
      <div
        className={`flex flex-col items-center text-center ${gapClasses[gap]} ${className}`}
      >
        <div className='flex-shrink-0'>{icon}</div>
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center ${gapClasses[gap]} ${className}`}
      dir={direction}
    >
      <div className='flex-shrink-0'>{icon}</div>
      <span>{text}</span>
    </div>
  );
};

export default IconWithText;
