import { FcGoogle } from "react-icons/fc";
import { Github } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginType } from "./Schema/auth.schema";
import AuthApi from "./Services/auth.service";
import { useEffect, useState } from "react";
import useAuth from "../../Shared/Hooks/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AuthForm = ({
  title,
  description,
  isSignUp,
}: {
  title: string;
  description: string;
  isSignUp: boolean;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleRegister = async (data: LoginType) => {
    if (data?.user_name) {
      setLoading(true);
      await AuthApi.Register(data.user_name, data.email, data.password);
      setTimeout(() => { setLoading(false); navigate("/login"); }, 2000);
    } else {
      setLoading(true);
      const response = await AuthApi.Login(data.email, data.password);
      if (response.success === false) {
        toast.error(response.message);
        setLoading(false);
      } else {
        toast.success("Login successfully");
        setTimeout(() => { setLoading(false); navigate("/"); }, 2000);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Already logged in!");
      setTimeout(() => navigate("/"), 1500);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #f8f7ff 0%, #eef2ff 50%, #ede9fe 100%)",
      }}
    >
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-25"
          style={{ background: "radial-gradient(circle,#4f46e5,#7c3aed)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-20"
          style={{ background: "radial-gradient(circle,#a855f7,#4f46e5)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div
          className="rounded-[2.5rem] p-10"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid rgba(79,70,229,0.12)",
            boxShadow: "0 24px 80px rgba(79,70,229,0.14)",
          }}
        >
          {/* Brand / Header */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
              style={{
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                boxShadow: "0 6px 24px rgba(79,70,229,0.40)",
              }}
            >
              S
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-black" style={{ color: "#1e1b4b" }}>{title}</h1>
              <p className="text-sm font-bold mt-1" style={{ color: "#6b7280" }}>{description}</p>
            </div>
          </div>

          {/* Social Buttons */}
          <div className={`grid ${isSignUp ? "grid-cols-2" : "grid-cols-1"} gap-3 mb-6`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl font-bold text-sm transition-all"
              style={{
                border: "1.5px solid rgba(79,70,229,0.12)",
                color: "#374151",
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <FcGoogle size={20} />
              {isSignUp ? "Google" : "Continue with Google"}
            </motion.button>
            {isSignUp && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl font-bold text-sm transition-all"
                style={{
                  border: "1.5px solid rgba(79,70,229,0.12)",
                  color: "#374151",
                  background: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Github size={20} />
                GitHub
              </motion.button>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ background: "rgba(79,70,229,0.10)" }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#9ca3af" }}>
              {isSignUp ? "or email" : "or email login"}
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(79,70,229,0.10)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-5">
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black" style={{ color: "#374151" }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3.5 rounded-2xl text-sm font-bold outline-none transition-all input-field"
                  style={{
                    border: errors.user_name ? "1.5px solid #ef4444" : "1.5px solid rgba(79,70,229,0.15)",
                    background: "rgba(255,255,255,0.90)",
                    color: "#1e1b4b",
                  }}
                  {...register("user_name")}
                />
                {errors.user_name && <span className="text-xs font-bold text-red-500">{errors.user_name.message}</span>}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black" style={{ color: "#374151" }}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-bold outline-none transition-all input-field"
                style={{
                  border: errors.email ? "1.5px solid #ef4444" : "1.5px solid rgba(79,70,229,0.15)",
                  background: "rgba(255,255,255,0.90)",
                  color: "#1e1b4b",
                }}
                {...register("email")}
              />
              {errors.email && <span className="text-xs font-bold text-red-500">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black" style={{ color: "#374151" }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-bold outline-none transition-all input-field"
                style={{
                  border: errors.password ? "1.5px solid #ef4444" : "1.5px solid rgba(79,70,229,0.15)",
                  background: "rgba(255,255,255,0.90)",
                  color: "#1e1b4b",
                }}
                {...register("password")}
              />
              {errors.password && <span className="text-xs font-bold text-red-500">{errors.password.message}</span>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="btn-main w-full py-4 text-base mt-2"
              style={loading ? { opacity: 0.6, cursor: "not-allowed" } : {}}
            >
              {loading ? "Processing…" : isSignUp ? "Create Account" : "Login"}
            </motion.button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm font-bold mt-6" style={{ color: "#6b7280" }}>
            {isSignUp ? (
              <>Already have an account?{" "}
                <Link to="/login" className="font-black" style={{ color: "#4f46e5" }}>Login</Link>
              </>
            ) : (
              <>New here?{" "}
                <Link to="/signup" className="font-black" style={{ color: "#4f46e5" }}>Create an account</Link>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
