import { Aperture, FileText, Globe, LayoutDashboard } from "lucide-react";
import CardFeatures from "./CardFeatures";
import { motion } from "framer-motion";

const Features = () => {
  const cards = [
    {
      icon: LayoutDashboard,
      title: "AI Scoring",
      description:
        "Get smart feedback and actionable insights on your CV content with our proprietary AI engine.",
    },
    {
      icon: Aperture,
      title: "ATS Optimization",
      description:
        "Ensure your resume passes through Applicant Tracking Systems with precise keyword matching.",
    },
    {
      icon: Globe,
      title: "Portfolio Generator",
      description:
        "Instantly convert your CV into a professional live web portfolio hosted on our platform.",
    },
    {
      icon: FileText,
      title: "PDF Export",
      description:
        "Download your optimized CV in various professional PDF templates optimized for recruiters.",
    },
  ];

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8f7ff 0%, #eef2ff 100%)" }}
    >
      {/* Subtle bg decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] -z-10 opacity-30"
        style={{ background: "radial-gradient(circle, #c7d2fe, #ede9fe)" }}
      />

      <div className="container mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-6 mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]"
            style={{
              background: "rgba(79,70,229,0.08)",
              border: "1px solid rgba(79,70,229,0.18)",
              color: "#4f46e5",
            }}
          >
            ✦ Professional Features
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            style={{ color: "#1e1b4b" }}
          >
            Powerful Features for <br />
            <span className="text-gradient">Tech Professionals</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-bold"
            style={{ color: "#6b7280" }}
          >
            Everything you need to stand out in the competitive tech job market
            and land your dream role.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <CardFeatures
              key={card.title}
              icon={card.icon}
              description={card.description}
              title={card.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
