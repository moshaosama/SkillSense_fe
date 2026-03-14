import { motion } from "framer-motion";
import { Link } from "react-router";
import { BarChart3, Target, Zap, ArrowRight, FileSearch } from "lucide-react";

const items = [
  { icon: FileSearch, title: "ATS Score", desc: "See how your CV performs against applicant tracking systems." },
  { icon: Target, title: "Job Match", desc: "Get suggestions aligned with your target role and industry." },
  { icon: BarChart3, title: "Skills Gap", desc: "Identify missing keywords and skills to improve your profile." },
  { icon: Zap, title: "AI Suggestions", desc: "Get actionable edits to boost your chances of landing interviews." },
];

const AnalysisPage = () => {
  return (
    <div
      className="min-h-screen pt-24 pb-20 px-6"
      style={{
        background: "linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 50%, #eef2ff 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#059669",
            }}
          >
            <BarChart3 size={16} />
            CV Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            AI-Powered <span className="text-gradient">CV Analysis</span>
          </h1>
          <p className="text-slate-600 font-bold text-lg max-w-2xl mx-auto">
            Upload your CV and get instant ATS scores, job-fit insights, and AI suggestions to stand out.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-3xl bg-white/90 backdrop-blur border border-slate-100 shadow-lg shadow-emerald-500/5"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 font-semibold text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/upload-cv"
            className="btn-main px-8 py-4 flex items-center gap-2 shadow-xl shadow-indigo-100"
          >
            Analyze My CV <ArrowRight size={20} />
          </Link>
          <Link
            to="/dashboard"
            className="btn-secondary px-8 py-4 flex items-center gap-2"
          >
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalysisPage;
