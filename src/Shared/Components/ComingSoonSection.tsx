import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2, ScanSearch, Construction } from "lucide-react";
import React from "react";

interface ComingSoonSectionProps {
  title: string;
  description: string;
  iconType: "analyze" | "improve";
  onNext: () => void;
  nextLabel: string;
}

const iconMap = {
  analyze: <ScanSearch size={32} className="text-indigo-600" />,
  improve: <Wand2 size={32} className="text-purple-600" />,
};

const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({
  title,
  description,
  iconType,
  onNext,
  nextLabel,
}) => {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl rounded-4xl p-10 relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1.5px solid rgba(79,70,229,0.10)",
          boxShadow: "0 20px 60px rgba(79,70,229,0.12)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-tr-full -z-10 opacity-50" />

        <div className="flex flex-col items-center text-center space-y-8">
          {/* Icon Header */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-0 w-20 h-20 -m-2 border-2 border-dashed border-indigo-200 rounded-3xl"
            />
            <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-indigo-100 flex items-center justify-center relative z-10 border border-indigo-50">
              {iconMap[iconType]}
            </div>
            <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute -top-1 -right-1"
            >
              <Sparkles size={20} className="text-amber-400 fill-amber-400" />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200">
               <Construction size={14} className="text-slate-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Feature in Development</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              {title}
            </h2>
            <p className="text-slate-500 font-bold leading-relaxed max-w-sm mx-auto">
              {description}
            </p>
          </div>

          {/* Action Area */}
          <div className="w-full pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              {nextLabel} <ArrowRight size={20} />
            </motion.button>
            <p className="text-[10px] text-slate-400 font-bold mt-4">
              Estimated Release: Early April 2026
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoonSection;
