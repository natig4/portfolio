"use client";

import { motion } from "framer-motion";
import { useDirection } from "@/hooks/useDirection";
import { ReactNode } from "react";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  side: "left" | "right";
  icon?: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  year,
  title,
  company,
  description,
  side,
  icon,
  gradientFrom = "primary",
  gradientTo = "secondary",
}) => {
  const { isRTL } = useDirection();

  const effectiveSide = isRTL ? (side === "left" ? "right" : "left") : side;
  const isLeft = effectiveSide === "left";

  return (
    <div className='flex items-center mb-16 md:mb-24 relative'>
      <div className='md:hidden w-full flex justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 p-6 relative'
        >
          <div
            className={`absolute top-0 ${
              isRTL ? "right-6" : "left-6"
            } -translate-y-1/2 px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white`}
          >
            {year}
          </div>

          <div className='mt-3'>
            <h3 className='text-xl font-bold text-text'>{title}</h3>
            <p className='text-primary mb-3'>{company}</p>
            <p className='text-text-secondary'>{description}</p>
          </div>
        </motion.div>
      </div>

      <div className='hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary z-10' />

      <div className='hidden md:flex w-full items-center'>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className={`w-5/12 ${
            isLeft
              ? isRTL
                ? "pl-8"
                : "pr-8 text-right"
              : isRTL
              ? "pr-8 text-right"
              : "pl-8"
          }`}
        >
          {isLeft && (
            <div className='bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200'>
              <h3 className='text-xl font-bold text-text mb-2'>{title}</h3>
              <p className='text-primary mb-3'>{company}</p>
              <p className='text-text-secondary'>{description}</p>

              <div
                className={`text-sm mt-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white font-medium`}
              >
                {year}
              </div>
            </div>
          )}
        </motion.div>

        <div className='w-2/12 flex justify-center relative'>
          {icon && (
            <div className='w-12 h-12 rounded-full bg-surface border border-border/50 flex items-center justify-center text-primary'>
              {icon}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='w-5/12'
        >
          {!isLeft && (
            <div className='bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200'>
              <h3 className='text-xl font-bold text-text mb-2'>{title}</h3>
              <p className='text-primary mb-3'>{company}</p>
              <p className='text-text-secondary'>{description}</p>

              <div
                className={`text-sm mt-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white font-medium`}
              >
                {year}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineItem;
