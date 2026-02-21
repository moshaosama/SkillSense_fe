import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CardFeatures = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="card-premium group relative flex flex-col gap-6 h-full"
    >
      {/* Gradient blob behind icon */}
      <div
        className="absolute top-6 left-6 w-14 h-14 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
      />

      {/* Icon */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
        style={{
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          boxShadow: "0 6px 20px rgba(79,70,229,0.35)",
        }}
      >
        <Icon size={26} className="text-white" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 flex-1">
        <h3
          className="text-xl font-black transition-colors group-hover:text-indigo-600"
          style={{ color: "#1e1b4b" }}
        >
          {title}
        </h3>
        <p className="text-sm font-bold leading-relaxed" style={{ color: "#6b7280" }}>
          {description}
        </p>
      </div>

      {/* Learn more */}
      <div
        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
        style={{ color: "#4f46e5" }}
      >
        Learn More <ArrowRight size={14} />
      </div>
    </motion.div>
  );
};

export default CardFeatures;
