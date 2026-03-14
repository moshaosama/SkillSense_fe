import { motion } from "framer-motion";
import { Link } from "react-router";
import { Settings, User, Bell, Shield, Palette, ArrowRight } from "lucide-react";

const sections = [
  { icon: User, title: "Profile", desc: "Name, email, and avatar.", path: "/profile" },
  { icon: Bell, title: "Notifications", desc: "Email and in-app alerts." },
  { icon: Shield, title: "Privacy & Security", desc: "Password and data settings." },
  { icon: Palette, title: "Appearance", desc: "Theme and display preferences." },
];

const SettingsPage = () => {
  return (
    <div
      className="min-h-screen pt-24 pb-20 px-6"
      style={{
        background: "linear-gradient(160deg, #faf5ff 0%, #f5f3ff 50%, #eef2ff 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <div
            className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600"
          >
            <Settings size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">
              <span className="text-gradient">Settings</span>
            </h1>
            <p className="text-slate-500 font-bold">Manage your account and preferences.</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {sections.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.35 }}
              whileHover={{ x: 4 }}
            >
              {item.path ? (
                <Link
                  to={item.path}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur border border-slate-100 shadow-md hover:shadow-lg hover:border-indigo-100 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <item.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 font-semibold text-sm">{item.desc}</p>
                  </div>
                  <ArrowRight size={20} className="text-slate-400" />
                </Link>
              ) : (
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                    <item.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 font-semibold text-sm">{item.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 px-3 py-1 rounded-full bg-slate-100">Soon</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/dashboard" className="btn-secondary px-8 py-4 flex items-center gap-2">
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
