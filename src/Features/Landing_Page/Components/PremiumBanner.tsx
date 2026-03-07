import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Rocket, Award } from "lucide-react";
import { Link } from "react-router";

const PremiumBanner = () => {
  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10 opacity-20"
        style={{ background: "radial-gradient(circle, #4f46e5, #7c3aed)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 opacity-20"
        style={{ background: "radial-gradient(circle, #a855f7, #4f46e5)" }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[3.5rem] p-12 relative overflow-hidden text-center sm:text-left"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            boxShadow: "0 40px 100px rgba(49, 46, 129, 0.3)",
          }}
        >
          {/* Decorative Sparkles */}
          <div className="absolute top-10 right-10 opacity-20 animate-pulse">
             <Sparkles size={100} className="text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-8 flex-1">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <Award size={18} className="text-amber-400" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Premium Member Active</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  You're all set for <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-indigo-300">Global Opportunities</span>
                </h2>
                <p className="text-indigo-100/70 text-lg font-bold max-w-xl">
                  Your premium access is active. Launch your AI portfolio, get unlimited ATS analysis, and stand out to top recruiters worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Unlimited Portfolio Exports",
                  "AI CV Score Unlocked",
                  "Global Template Access",
                  "Priority AI Processing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/90">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-bold text-sm tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 min-w-[280px]">
              <Link
                to="/upload-cv"
                className="group w-full py-5 bg-white text-indigo-900 rounded-2xl font-black text-center shadow-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3"
              >
                <Rocket size={22} className="text-indigo-600 group-hover:rotate-12 transition-transform" />
                Start Deployment
              </Link>
              <p className="text-center text-indigo-200/50 text-xs font-bold">
                 Access all your pro features now
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumBanner;
