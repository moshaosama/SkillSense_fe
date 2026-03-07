import { motion } from "framer-motion";
import { Cookie, Info, ToggleRight, ShieldCheck } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Cookie size={30} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Cookie Policy</h1>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Last Updated: March 2024</p>
            </div>
          </div>

          <div className="space-y-10 text-slate-600 leading-relaxed font-medium">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">What are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit SkillSense AI. They help us provide you with a smoother, faster, and more personalized experience by remembering your preferences and login status.
              </p>
            </section>

            <section className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">Essential Cookies</h3>
                    <p className="text-sm mt-1">Required for the platform to function. These include authentication cookies that keep you logged in and security cookies to prevent attacks.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                    <Info size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">Performance & Analytics</h3>
                    <p className="text-sm mt-1">Allow us to analyze how users interact with the site so we can improve the UI and fix technical issues.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <ToggleRight size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">Preference Cookies</h3>
                    <p className="text-sm mt-1">Used to remember your settings, such as your theme choice or language preferences.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Managing Your Preferences</h2>
              <p>
                Most browsers allow you to control cookies through their settings. However, if you disable essential cookies, some parts of SkillSense AI (like authentication) will not work correctly.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-400 italic">
                By continuing to use SkillSense AI, you consent to the use of cookies as described in this policy.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
