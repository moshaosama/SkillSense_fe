import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Ready = () => {
  return (
    <section className="px-6 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-[3rem] overflow-hidden py-24 px-8 text-center"
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #6d28d9 50%, #7c3aed 100%)",
          boxShadow: "0 30px 80px rgba(79,70,229,0.40)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "rgba(255,255,255,0.10)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "rgba(0,0,0,0.12)" }}
        />
        {/* Tiny grid decoration */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#e0e7ff" }}
          >
            ✦ Limited Time Access
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
          >
            Ready to Land Your <br />
            <span style={{ color: "#c7d2fe", fontStyle: "italic" }}>Dream Job?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-bold mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#a5b4fc" }}
          >
            Join 10,000+ developers using SkillSense AI to optimize their careers.
            Get your ATS score in seconds — for free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/upload-cv">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 font-black text-lg px-10 py-5 rounded-2xl transition-all group"
                style={{
                  background: "white",
                  color: "#4f46e5",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                }}
              >
                Analyze My CV Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
              </motion.button>
            </Link>

            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="font-black text-lg px-10 py-5 rounded-2xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "white",
                  border: "1.5px solid rgba(255,255,255,0.30)",
                }}
              >
                Get Started Free
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Ready;
