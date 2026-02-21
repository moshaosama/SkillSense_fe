import { FaFileUpload, FaRobot, FaMagic, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaFileUpload />,
    title: "Upload CV",
    description:
      "Upload your existing resume in PDF or Word format. Our AI extracts your professional history automatically.",
  },
  {
    icon: <FaRobot />,
    title: "AI Feedback",
    description:
      "Receive an instant AI score and detailed improvement suggestions tailored to your specific tech stack.",
  },
  {
    icon: <FaMagic />,
    title: "Optimize",
    description:
      "Apply smart suggestions to enhance your content and keywords, making it easier for recruiters to find you.",
  },
  {
    icon: <FaRocket />,
    title: "Export & Launch",
    description:
      "Download your high-quality PDF or launch your personal portfolio website with a single click.",
  },
];

const Works = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            The Journey to <br />
            <span className="text-gradient">Professional Success</span>
          </h2>
          <p className="text-slate-500 text-lg font-bold max-w-2xl">
            Four simple steps to transform your career presentation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative whitespace-normal">
          {/* Connector Line */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-indigo-500 hidden md:block rounded-full" />
          
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`space-y-4 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <h3 className="text-2xl font-black text-slate-900">{step.title}</h3>
                    <p className="text-slate-500 font-bold leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-brand rounded-3xl flex items-center justify-center text-white text-2xl md:text-3xl shadow-2xl shadow-brand/40 border-4 border-slate-50 rotate-3 transform hover:rotate-0 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Spacing placeholder */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
