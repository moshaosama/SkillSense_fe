import { motion } from "framer-motion";
import StatsGrid from "./Components/StatsGrid";
import RecentActivity from "./Components/RecentActivity";
import { ArrowRight, Layout, FileText, Zap } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../Shared/Hooks/useAuth";

const DashboardFeature = () => {
  const { user } = useAuth();
  const firstName = user?.data?.user_name?.split(" ")[0] || "User";

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header & Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-indigo-600 font-black text-sm uppercase tracking-widest"
          >
            Overivew
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900"
          >
            Welcome back, <span className="text-gradient">{firstName}!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-bold text-lg"
          >
            Here's what's happening with your tech career optimization.
          </motion.p>
        </div>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
        >
            <Link to="/upload-cv" className="btn-main px-8 py-4 flex items-center gap-2 shadow-lg shadow-indigo-100">
                Analyze New CV <ArrowRight size={20} />
            </Link>
        </motion.div>
      </div>

      {/* Stats Section */}
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          <RecentActivity />
          
          {/* Quick Actions / Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 font-black text-xl">
                    <FileText size={24} />
                </div>
                <h3 className="text-2xl font-black mb-3">ATS CV Analyzer</h3>
                <p className="text-slate-400 font-medium mb-8">Optimize your resume for 100+ different tech stacks and companies.</p>
                <Link to="/upload-cv" className="inline-flex items-center gap-2 text-indigo-400 font-black group-hover:gap-3 transition-all">
                    Start Analysis <ArrowRight size={18} />
                </Link>
             </div>

             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 mb-6 font-black text-xl">
                    <Layout size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Portfolio Builder</h3>
                <p className="text-slate-500 font-medium mb-8">Generate a premium web portfolio from your CV data in one click.</p>
                <Link to="/templates" className="inline-flex items-center gap-2 text-violet-600 font-black group-hover:gap-3 transition-all">
                    Explore Templates <ArrowRight size={18} />
                </Link>
             </div>
          </div>
        </div>

        {/* Sidebar area */}
        <div className="space-y-6">
            <div className="bg-linear-to-br from-indigo-600 to-violet-700 rounded-4xl p-8 text-white shadow-xl shadow-indigo-900/10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                    <Zap size={24} />
                </div>
                <h3 className="text-xl font-black mb-2">Upgrade to Pro</h3>
                <p className="text-indigo-100 font-medium text-sm mb-6 opacity-90">Unlock advanced ATS insights, custom domains, and AI-powered cover letters.</p>
                <Link to="/#pricing" className="w-full py-3.5 bg-white text-indigo-600 rounded-2xl font-black text-center block shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    See Plans
                </Link>
            </div>

            <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-4">Tips for you</h3>
                <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-sm font-bold text-slate-700 leading-snug">Update your LinkedIn URL to allow AI to pull latest data.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-sm font-bold text-slate-700 leading-snug">Use technical keywords from Job Description for 20% better score.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFeature;
