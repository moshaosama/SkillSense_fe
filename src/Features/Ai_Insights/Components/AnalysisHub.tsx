import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";

interface ATSAnalysis {
  atsScore: number;
  pros: string[];
  cons: string[];
  suggestions: string[];
}

const AnalysisHub = ({ analysis }: { analysis: ATSAnalysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e"; // Success
    if (score >= 50) return "#f59e0b"; // Warning
    return "#ef4444"; // Danger
  };

  const scoreColor = getScoreColor(analysis.atsScore);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 px-4">
      {/* ── ATS Score Section ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[2.5rem] p-10 flex flex-col items-center text-center gap-6"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(79, 70, 229, 0.1)",
          boxShadow: "0 25px 60px rgba(79, 70, 229, 0.1)",
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="relative">
          <svg className="w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="12"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke={scoreColor}
              strokeWidth="12"
              strokeDasharray="502.4"
              initial={{ strokeDashoffset: 502.4 }}
              animate={{ strokeDashoffset: 502.4 - (502.4 * analysis.atsScore) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-black" style={{ color: "#1e1b4b" }}
            >
              {analysis.atsScore}
            </motion.span>
            <span className="text-sm font-bold text-slate-400">ATS Score</span>
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <h2 className="text-2xl font-black text-slate-900">Your Resume Health</h2>
          <p className="max-w-md text-slate-500 font-medium leading-relaxed">
            {analysis.atsScore >= 80 
              ? "Impressive! Your CV is highly optimized and ready for top-tier opportunities."
              : analysis.atsScore >= 50
              ? "Good start, but there's room for optimization to stand out further."
              : "Your CV needs significant updates to pass modern recruitment systems."}
          </p>
        </div>
      </motion.div>

      {/* ── Pros & Cons Grid ── */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-8 space-y-6"
          style={{
            background: "rgba(34, 197, 94, 0.05)",
            border: "1.5px solid rgba(34, 197, 94, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-xl font-black text-emerald-900">Key Strengths</h3>
          </div>
          <ul className="space-y-4">
            {analysis.pros.map((pro, i) => (
              <li key={i} className="flex gap-3 text-emerald-800/80 font-bold text-sm">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                {pro}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Gaps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-8 space-y-6"
          style={{
            background: "rgba(239, 68, 68, 0.05)",
            border: "1.5px solid rgba(239, 68, 68, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-200">
              <AlertCircle size={20} />
            </div>
            <h3 className="text-xl font-black text-red-900">Gaps to Fill</h3>
          </div>
          <ul className="space-y-4">
            {analysis.cons.map((con, i) => (
              <li key={i} className="flex gap-3 text-red-800/80 font-bold text-sm">
                <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                {con}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ── Suggestions Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-[2rem] p-8 space-y-6"
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)",
        }}
      >
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Lightbulb size={20} />
          </div>
          <h3 className="text-xl font-black">AI Recommendations</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {analysis.suggestions.map((sug, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 font-bold text-sm leading-relaxed"
            >
              {sug}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisHub;
