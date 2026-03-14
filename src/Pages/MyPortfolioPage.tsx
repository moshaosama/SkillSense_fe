import { motion } from "framer-motion";
import { Link } from "react-router";
import { Layout, ArrowRight, Globe, Sparkles, FileCode } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Personal Portfolio Site",
    desc: "One-click generation of a professional portfolio from your CV.",
  },
  {
    icon: FileCode,
    title: "Custom Domain",
    desc: "Connect your own domain for a branded presence.",
  },
  {
    icon: Sparkles,
    title: "AI-Optimized Content",
    desc: "Sections tailored for tech roles and ATS.",
  },
];

const MyPortfolioPage = () => {
  return (
    <div
      className="min-h-screen pt-24 pb-20 px-6"
      style={{
        background: "linear-gradient(160deg, #f8f7ff 0%, #eef2ff 50%, #ede9fe 100%)",
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
              background: "rgba(79,70,229,0.1)",
              border: "1px solid rgba(79,70,229,0.2)",
              color: "#4f46e5",
            }}
          >
            <Layout size={16} />
            My Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Your <span className="text-gradient">Personal Portfolio</span> Hub
          </h1>
          <p className="text-slate-600 font-bold text-lg max-w-2xl mx-auto">
            Create a stunning portfolio website from your CV in one click. Perfect for developers and tech professionals.
          </p>
        </motion.div>

        <div className="grid gap-6 mb-12">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="flex items-center gap-6 p-6 rounded-3xl bg-white/80 backdrop-blur border border-slate-100 shadow-lg shadow-indigo-500/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <item.icon size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                <p className="text-slate-500 font-semibold">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/templates"
            className="btn-main px-8 py-4 flex items-center gap-2 shadow-xl shadow-indigo-100"
          >
            Choose Template <ArrowRight size={20} />
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

export default MyPortfolioPage;
