import { Link } from "react-router";
import { useNavbar } from "../Context/Navbar_Links.context";
import { Layout, User as UserIcon, X } from "lucide-react";
import useAuth from "../Hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const { NavLinks } = useNavbar();
  const { user, handleLogout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen) return;
    const close = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [profileOpen]);

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-0 z-50 w-full px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(79,70,229,0.08)",
        boxShadow: "0 4px 24px rgba(79,70,229,0.07)",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base font-black shadow"
            style={{
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              boxShadow: "0 3px 12px rgba(79,70,229,0.35)",
            }}
          >
            S
          </div>
          <span className="text-lg font-black" style={{ color: "#1e1b4b" }}>
            SkillSense
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NavLinks?.map((link) => (
            <Link
              to={link.href}
              key={link.name}
              className="text-sm font-bold transition-colors hover:text-indigo-600"
              style={{ color: "#6b7280" }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Profile dropdown */}
        <div className="relative flex items-center gap-3" ref={profileRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full"
            style={{
              background: "rgba(79,70,229,0.07)",
              border: "1px solid rgba(79,70,229,0.14)",
            }}
          >
            <img
              src={user?.data?.avatar ? (user.data.avatar.startsWith("/") ? `https://skillsensebe-production.up.railway.app${user.data.avatar}` : user.data.avatar) : "/person.png"}
              alt="User"
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
            />
            {user?.data?.user_name && (
              <span className="hidden sm:inline text-sm font-black" style={{ color: "#1e1b4b" }}>
                {user.data.user_name.split(" ")[0]}
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full right-0 mt-3 w-44 rounded-2xl overflow-hidden p-2 z-50"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(79,70,229,0.10)",
                  boxShadow: "0 16px 48px rgba(79,70,229,0.15)",
                }}
              >
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="w-full text-left px-4 py-3 text-sm font-black rounded-xl transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-50"
                >
                  <UserIcon size={15} />
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="w-full text-left px-4 py-3 text-sm font-black rounded-xl transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-50"
                >
                  <Layout size={15} />
                  Dashboard
                </Link>
                <button
                  onClick={() => { setProfileOpen(false); handleLogout(); }}
                  className="w-full text-left px-4 py-3 text-sm font-black rounded-xl transition-colors flex items-center gap-2 text-red-500 hover:bg-red-50"
                >
                  <X size={15} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
