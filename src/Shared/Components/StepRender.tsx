import type { ReactNode } from "react";
import { motion } from "framer-motion";

const StepRender = ({
  icon,
  text,
  isActive,
  isShowHr,
  handleMove,
  stepNumber,
}: {
  icon: ReactNode;
  text: string;
  isActive: boolean;
  isShowHr: boolean;
  handleMove: (step?: number) => void;
  stepNumber?: number;
}) => {
  return (
    <div className="flex items-center">
      {/* Step Item */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleMove()}
      >
        {/* Circle */}
        <div
          className="relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
          style={
            isActive
              ? {
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  boxShadow: "0 6px 20px rgba(79,70,229,0.40)",
                  color: "white",
                }
              : {
                  background: "rgba(79,70,229,0.07)",
                  border: "1.5px solid rgba(79,70,229,0.12)",
                  color: "rgba(79,70,229,0.40)",
                }
          }
        >
          {icon}

          {/* Step number badge */}
          {stepNumber && (
            <div
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-[9px] font-black flex items-center justify-center"
              style={{
                background: isActive ? "#4f46e5" : "#d1d5db",
                boxShadow: isActive ? "0 2px 8px rgba(79,70,229,0.4)" : "none",
              }}
            >
              {stepNumber}
            </div>
          )}
        </div>

        {/* Label */}
        <span
          className="text-xs font-black uppercase tracking-wider transition-colors"
          style={{ color: isActive ? "#4f46e5" : "#9ca3af" }}
        >
          {text}
        </span>
      </motion.div>

      {/* Connector line */}
      {isShowHr && (
        <div
          className="w-20 sm:w-28 md:w-36 h-0.5 mx-2 rounded-full transition-all duration-500"
          style={{
            background: isActive
              ? "linear-gradient(90deg,#4f46e5,rgba(79,70,229,0.2))"
              : "rgba(209,213,219,0.7)",
          }}
        />
      )}
    </div>
  );
};

export default StepRender;
