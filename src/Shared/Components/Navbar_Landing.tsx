import { Menu, X } from "lucide-react";
import { useNavbar } from "../Context/Navbar_Links.context";
import cn from "../../utils/cn";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar_Landing = () => {
  const { isOpen, toggleMenu } = useNavbar();
  const { user, isAuthenticated, handleLogout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ─── Main bar ─── */}
        <div
          className={cn(
            "transition-all duration-500",
            scrolled ? "py-2 px-4" : "py-4 px-6"
          )}
        >
          <div
            className={cn(
              "container mx-auto flex items-center justify-between transition-all duration-500",
              scrolled ? "rounded-2xl px-6 py-3" : "px-0"
            )}
            style={
              scrolled
                ? {
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(79,70,229,0.10)",
                    boxShadow: "0 4px 30px rgba(79,70,229,0.10)",
                  }
                : undefined
            }
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  boxShadow: "0 4px 14px rgba(79,70,229,0.40)",
                }}
              >
                S
              </motion.div>
              <div>
                <p className="text-xl font-black tracking-tight leading-none" style={{ color: "#1e1b4b" }}>
                  SkillSense
                </p>
                <p className="text-[9px] font-black uppercase tracking-[0.22em] leading-none mt-0.5" style={{ color: "#4f46e5" }}>
                  AI Career Suite
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-10">
              {["Features", "How it works", "Pricing"].map((label) => (
                <button
                  key={label}
                  className="text-sm font-bold transition-colors hover:text-indigo-600 relative group"
                  style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}
                >
                  {label}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed)" }}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25 }}
                  />
                </button>
              ))}
            </nav>

            {/* Auth area */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full transition-all"
                    style={{
                      background: "rgba(79,70,229,0.07)",
                      border: "1px solid rgba(79,70,229,0.15)",
                    }}
                  >
                    <img
                      src="person.png"
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover shadow"
                    />
                    <span className="hidden sm:inline text-sm font-black" style={{ color: "#1e1b4b" }}>
                      {user?.data?.user_name?.split(" ")[0]}
                    </span>
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
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm font-black rounded-xl transition-colors flex items-center gap-2 text-red-500 hover:bg-red-50"
                        >
                          <X size={15} />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-sm font-black transition-colors"
                    style={{ color: "#6b7280" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#4f46e5")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                  >
                    Login
                  </Link>
                  <Link to="/signup" className="btn-main text-sm px-7 py-2.5">
                    Get Started Free
                  </Link>
                </div>
              )}

              {/* Hamburger */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={toggleMenu}
                className="lg:hidden p-2.5 rounded-2xl transition-colors"
                style={{
                  background: "rgba(79,70,229,0.08)",
                  border: "1px solid rgba(79,70,229,0.14)",
                  color: "#4f46e5",
                }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[72px] left-4 right-4 z-40 lg:hidden"
          >
            <div
              className="rounded-[2rem] p-8"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(79,70,229,0.10)",
                boxShadow: "0 20px 60px rgba(79,70,229,0.15)",
              }}
            >
              <div className="flex flex-col gap-5">
                {["Features", "How it works", "Pricing"].map((label) => (
                  <button
                    key={label}
                    className="text-xl font-black text-left transition-colors hover:text-indigo-600"
                    style={{ color: "#1e1b4b", background: "none", border: "none", cursor: "pointer" }}
                    onClick={toggleMenu}
                  >
                    {label}
                  </button>
                ))}

                <div className="h-px" style={{ background: "rgba(79,70,229,0.10)" }} />

                {!isAuthenticated && (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={toggleMenu} className="btn-secondary w-full text-center">
                      Login
                    </Link>
                    <Link to="/signup" onClick={toggleMenu} className="btn-main w-full text-center">
                      Get Started Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar_Landing;
