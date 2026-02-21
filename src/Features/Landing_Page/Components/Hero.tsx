import { Link } from "react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 lg:pt-52 lg:pb-32 overflow-hidden bg-white">
      {/* Decorative blobs — pushed down so they don't bleed into navbar */}
      <div
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20 -z-10"
        style={{ background: "radial-gradient(circle, #4f46e5, #7c3aed)" }}
      />
      <div
        className="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full blur-[110px] opacity-15 -z-10"
        style={{ background: "radial-gradient(circle, #a855f7, #4f46e5)" }}
      />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ── Left Content ── */}
          <div className="flex-1 text-center lg:text-left space-y-10 max-w-2xl mx-auto lg:mx-0">

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
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.93]"
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
              className="text-lg lg:text-xl font-medium leading-relaxed"
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
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link to="/upload-cv" className="btn-main group h-15 px-10 text-base w-full sm:w-auto">
                Analyze My CV <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <button className="btn-secondary h-15 px-10 text-base w-full sm:w-auto">
                View Showcase
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4"
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
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="flex-1 relative w-full max-w-2xl"
          >
            {/* Glowing halo */}
            <div
              className="absolute inset-0 rounded-[3rem] blur-3xl -z-10 scale-95"
              style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.25), rgba(139,92,246,0.20))" }}
            />

            <div
              className="relative glass rounded-[2.5rem] p-4 overflow-hidden"
              style={{
                border: "1.5px solid rgba(79,70,229,0.12)",
                boxShadow: "0 30px 80px rgba(79,70,229,0.18)"
              }}
            >
              <img
                src="dashboard.png"
                alt="SkillSense Dashboard"
                className="w-full h-auto rounded-[1.75rem]"
                loading="lazy"
              />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 -right-6 lg:-right-12 glass rounded-3xl p-5 hidden md:flex items-center gap-4"
                style={{
                  border: "1.5px solid rgba(79,70,229,0.12)",
                  boxShadow: "0 16px 48px rgba(79,70,229,0.15)",
                  minWidth: 220
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", boxShadow: "0 4px 16px rgba(79,70,229,0.4)" }}
                >
                  ✨
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#9ca3af" }}>
                    AI Insight
                  </p>
                  <p className="text-sm font-black" style={{ color: "#1e1b4b" }}>
                    98% Match Found
                  </p>
                  <p className="text-xs font-bold" style={{ color: "#6b7280" }}>
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
