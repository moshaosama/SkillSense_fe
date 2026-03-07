import { motion } from "framer-motion";
import { Hammer, ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router";

const ComingSoon = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 pt-20"
      style={{
        background: "linear-gradient(160deg, #f8f7ff 0%, #eef2ff 50%, #ede9fe 100%)",
      }}
    >
      <div className="max-w-2xl w-full text-center space-y-8 relative">
        {/* Decorative blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block"
        >
          <div 
            className="w-24 h-24 rounded-4xl bg-white flex items-center justify-center text-indigo-600 mx-auto relative z-10 shadow-2xl shadow-indigo-100"
            style={{ border: "1px solid rgba(79,70,229,0.1)" }}
          >
            <Construction size={48} />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-0 w-full h-full border-2 border-dashed border-indigo-200 rounded-[2.2rem]"
          />
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
          >
            Built for <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-bold text-lg max-w-lg mx-auto leading-relaxed"
          >
            We're putting the finishing touches on this feature. It will be available very soon as part of our premium suite.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <Link
            to="/dashboard"
            className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 px-6 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 text-slate-400 font-black text-sm">
            <Hammer size={18} className="text-indigo-400" />
            Estimated: Q2 2026
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
