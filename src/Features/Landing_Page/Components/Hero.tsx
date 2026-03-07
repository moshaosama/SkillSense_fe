import { Link } from "react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-white">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px), radial-gradient(#4f46e5 0.5px, transparent 0.5px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />

      {/* Decorative blobs — repositioned for better fill */}
      <div
        className="absolute top-10 -left-20 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 -z-10 animate-pulse"
        style={{ background: "radial-gradient(circle, #4f46e5, #7c3aed)" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 -z-10"
        style={{ background: "radial-gradient(circle, #a855f7, #4f46e5)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Left Content ── */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.18em]"
              style={{
                background: "rgba(79,70,229,0.08)",
                border: "1px solid rgba(79,70,229,0.18)",
                color: "#4f46e5"
              }}
            >
              <Zap size={13} fill="#4f46e5" />
              Revolutionizing Tech Careers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-[5.8rem] font-extrabold tracking-tight leading-[0.93]"
              style={{ color: "#1e1b4b" }}
            >
              Land Your <br />
              <span className="text-gradient">Dream Role</span> <br />
              With&nbsp;AI.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ color: "#6b7280" }}
            >
              SkillSense uses advanced AI to optimize your CV for ATS, instantly
              generate professional portfolios, and provide personalized career
              roadmaps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/upload-cv" className="btn-main group h-14 px-10 text-base w-full sm:w-auto flex items-center justify-center">
                Analyze My CV <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/templates" className="btn-secondary h-14 px-10 text-base w-full sm:w-auto flex items-center justify-center border-2 border-slate-100 hover:border-indigo-100">
                View Showcase
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-2"
            >
              {[
                { icon: CheckCircle2, label: "ATS Optimized" },
                { icon: ShieldCheck, label: "Data Protected" },
                { icon: Zap, label: "AI Powered" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-bold" style={{ color: "#9ca3af" }}>
                  <Icon size={18} style={{ color: "#4f46e5" }} />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="flex-1 relative w-full lg:max-w-xl"
          >
            {/* Multi-layered glow */}
            <div
              className="absolute inset-0 rounded-[3rem] blur-3xl -z-10 scale-105 opacity-50"
              style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(139,92,246,0.2))" }}
            />

            <div
              className="relative glass rounded-[2.5rem] p-3 overflow-hidden"
              style={{
                border: "1px solid rgba(79,70,229,0.15)",
                boxShadow: "0 40px 100px rgba(79,70,229,0.22)"
              }}
            >
              <img
                src="dashboard.png"
                alt="SkillSense Dashboard"
                className="w-full h-auto rounded-[1.8rem]"
                loading="lazy"
              />

              {/* Floating badge - refined */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 -right-6 lg:-right-10 glass rounded-3xl p-5 hidden md:flex items-center gap-4"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  boxShadow: "0 20px 50px rgba(79,70,229,0.2)",
                  minWidth: 220,
                  backdropFilter: "blur(20px)"
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg"
                  style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
                >
                  ✨
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5 text-indigo-400">
                    AI Insight
                  </p>
                  <p className="text-sm font-black text-slate-900">
                    98% Match Found
                  </p>
                  <p className="text-xs font-bold text-slate-500">
                    Senior SWE roles
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
