import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { useDirection } from "@/hooks/useDirection";

interface InProgressRibbonProps {
  className?: string;
  animate?: boolean;
}

const InProgressRibbon = memo(function InProgressRibbon({
  className = "",
  animate = true,
}: InProgressRibbonProps) {
  const t = useTranslations("projects");
  const { isRTL } = useDirection();

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: isRTL ? -15 : 15 },
    visible: { opacity: 1, scale: 1, rotate: isRTL ? -12 : 12 },
    hover: { scale: 1.05, rotate: isRTL ? -10 : 10 },
  };

  return (
    <motion.div
      className={`absolute ${
        isRTL ? "top-5 left-0" : "top-8 right-0"
      } z-20 ${className}`}
      variants={variants}
      initial={animate ? "hidden" : false}
      animate={animate ? "visible" : undefined}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
      whileHover={animate ? "hover" : undefined}
    >
      <div className='relative'>
        <div
          className={`bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 shadow-lg transform ${
            isRTL ? "-rotate-20" : "rotate-20"
          } border border-yellow-300/20`}
          style={{
            clipPath: isRTL
              ? "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
              : "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
          }}
        >
          <div className='flex items-center gap-1.5'>
            <span className='text-xs font-bold tracking-wide uppercase'>
              {t("inProgress")}
            </span>
            <div className='relative'>
              <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
              <div className='absolute inset-0 w-2 h-2 bg-white/50 rounded-full animate-ping'></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default InProgressRibbon;
