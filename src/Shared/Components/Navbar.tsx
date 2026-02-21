import { Link } from "react-router-dom";
import { useNavbar } from "../Context/Navbar_Links.context";
import { Bell, Settings } from "lucide-react";
import IconRender from "./IconRender";
import useAuth from "../Hooks/useAuth";
import { motion } from "framer-motion";

const Navbar = () => {
  const { NavLinks } = useNavbar();
  const { user } = useAuth();

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
        <Link to="/" className="flex items-center gap-3">
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

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-2 p-2 rounded-2xl"
            style={{ background: "rgba(79,70,229,0.06)" }}
          >
            <IconRender icon={<Bell size={18} />} />
            <IconRender icon={<Settings size={18} />} />
          </div>

          <div className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full"
            style={{
              background: "rgba(79,70,229,0.07)",
              border: "1px solid rgba(79,70,229,0.14)",
            }}
          >
            <img
              src="person.png"
              alt="User"
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
            />
            {user?.data?.user_name && (
              <span className="hidden sm:inline text-sm font-black" style={{ color: "#1e1b4b" }}>
                {user.data.user_name.split(" ")[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
