import { motion } from "framer-motion";
import { Shield, FileText, CheckCircle } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Shield size={30} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Last Updated: March 2024</p>
            </div>
          </div>

          <div className="space-y-10 text-slate-600 leading-relaxed font-medium">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</span>
                Introduction
              </h2>
              <p>
                At SkillSense AI, we prioritize your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our AI-powered career platform. By using SkillSense AI, you agree to the terms described in this policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</span>
                Information We Collect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-500 shadow-sm">
                    <User size={20} />
                  </div>
                  <h3 className="font-black text-slate-900">Account Data</h3>
                  <p className="text-sm">Name, email address, password, and profile picture (avatar).</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-purple-500 shadow-sm">
                    <FileText size={20} />
                  </div>
                  <h3 className="font-black text-slate-900">Career Content</h3>
                  <p className="text-sm">Information provided for CV building, portfolio creation, and interview practice.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">3</span>
                How We Use AI
              </h2>
              <p>
                SkillSense AI uses advanced language models to process your data and provide suggestions, analysis, and improvements for your professional documents. 
                <span className="block mt-4 p-4 rounded-xl border-l-4 border-indigo-500 bg-indigo-50/50 italic">
                  "Your data is used solely to generate your requested career materials and is not used to train global AI models without your explicit consent."
                </span>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">4</span>
                Data Security
              </h2>
              <p>
                We implement industry-standard security measures, including SSL encryption and secure database protocols, to ensure your information remains private and protected from unauthorized access.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {["SSL Encrypted", "Secure Authentication", "Encrypted Backups", "Privacy First"].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-wider border border-emerald-100">
                    <CheckCircle size={14} />
                    {tag}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4 pt-6 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-400">
                If you have any questions about this Privacy Policy, please contact us at <span className="text-indigo-600">privacy@skillsense-ai.com</span>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Help for icons since they might be missing in scope
const User = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default PrivacyPolicy;
