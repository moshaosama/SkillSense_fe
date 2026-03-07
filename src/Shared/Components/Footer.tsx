import { motion } from "framer-motion";
import { Link } from "react-router";
import { Github, Twitter, Linkedin, Facebook, Shield, Globe, Cpu, HandCoins } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "AI CV Builder", href: "/upload-cv" },
        { label: "Portfolio AI", href: "/coming-soon", isSoon: true },
        { label: "Interview Prep", href: "/coming-soon", isSoon: true },
        { label: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Cookie Policy", href: "/cookie-policy" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/#contact-us" },
        { label: "FAQ", href: "/coming-soon", isSoon: true },
        { label: "Help Center", href: "/coming-soon", isSoon: true },
      ],
    },
  ];

  return (
    <footer className="relative mt-20 pt-20 pb-10 overflow-hidden bg-slate-50/50 border-t border-slate-100">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg bg-linear-to-br from-indigo-500 to-purple-600"
              >
                S
              </motion.div>
              <div>
                <p className="text-xl font-black tracking-tight text-slate-900 leading-none">
                  SkillSense
                </p>
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-indigo-600 leading-none mt-0.5">
                  AI Career Suite
                </p>
              </div>
            </Link>
            <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
              Empowering careers through artificial intelligence. Build professional CVs, portfolios, and master your interview skills with SkillSense AI.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {[
                { Icon: Twitter, href: "https://x.com/mohamedosfekry" },
                { Icon: Github, href: "https://github.com/moshaosama" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/thisfekry/" },
                { Icon: Facebook, href: "https://www.facebook.com/mohamedosamakin" },
              ].map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.isSoon ? (
                      <div className="text-slate-400 font-bold text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        {link.label}
                        <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400 border border-slate-200">Soon</span>
                      </div>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-slate-600 font-bold text-sm hover:text-indigo-600 transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-indigo-500 group-hover:scale-150 transition-all opacity-0 group-hover:opacity-100" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-sm text-slate-400 font-bold">
            <p>© {currentYear} SkillSense AI. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-tighter">
                <HandCoins size={14} className="text-emerald-400" />
                <span>Refund Policy</span>
             </div>
             <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-tighter">
                <Globe size={14} className="text-indigo-400" />
                <span>Global English</span>
             </div>
             <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-tighter">
                <Shield size={14} className="text-purple-400" />
                <span>SSL Secured</span>
             </div>
             <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-tighter">
                <Cpu size={14} className="text-emerald-400" />
                <span>AI Powered</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
