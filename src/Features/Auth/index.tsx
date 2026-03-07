import { FcGoogle } from "react-icons/fc";
import { Github, Mail, Lock, User, Eye, EyeOff, Camera, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginType } from "./Schema/auth.schema";
import AuthApi from "./Services/auth.service";
import { useEffect, useState } from "react";
import useAuth from "../../Shared/Hooks/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";

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
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleRegister = async (data: LoginType) => {
    if (data?.user_name) {
      setLoading(true);
      // Explicitly type data to avoid 'any' lint error
      const formData = data as LoginType & { avatar?: FileList };
      const avatarFile = formData.avatar?.[0]; 
      await AuthApi.Register(data.user_name, data.email, data.password, avatarFile);
      toast.success("Account created successfully!");
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

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const response = await AuthApi.GoogleLogin(
        user.email || "", 
        user.displayName || "Google User", 
        user.photoURL || ""
      );

      if (response.statusbar === "success") {
        toast.success("Logged in with Google successfully!");
        setTimeout(() => { setLoading(false); navigate("/"); }, 1500);
      } else {
        toast.error(response.message || "Google login failed on server");
        setLoading(false);
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Google login failed");
      setLoading(false);
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
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl font-bold text-sm transition-all"
              style={{
                border: "1.5px solid rgba(79,70,229,0.12)",
                color: "#374151",
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                ...(loading ? { opacity: 0.6, cursor: "not-allowed" } : {})
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
          <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4">
            {isSignUp && (
              <>
                <div className="flex flex-col gap-3 items-center mb-2">
                  <label className="text-xs font-black uppercase tracking-wider self-start" style={{ color: "#6b7280" }}>Profile Picture</label>
                  <div className="relative group">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-24 h-24 rounded-3xl overflow-hidden cursor-pointer relative shadow-inner"
                      style={{
                        background: "rgba(248,247,255,0.95)",
                        border: "2px dashed rgba(79,70,229,0.25)",
                      }}
                      onClick={() => document.getElementById("avatar-upload")?.click()}
                    >
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1" style={{ color: "#a5b4fc" }}>
                          <Camera size={28} strokeWidth={1.5} />
                          <span className="text-[10px] font-black uppercase tracking-tighter">Upload</span>
                        </div>
                      )}
                    </motion.div>
                    
                    {avatarPreview && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAvatarPreview(null);
                          const fileInput = document.getElementById("avatar-upload") as HTMLInputElement;
                          if (fileInput) fileInput.value = "";
                        }}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500 border border-red-50"
                      >
                        <X size={14} strokeWidth={3} />
                      </motion.button>
                    )}
                    
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("avatar")}
                      onChange={(e) => {
                        register("avatar").onChange(e);
                        onAvatarChange(e);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-2">
                  <label className="text-xs font-black uppercase tracking-wider" style={{ color: "#6b7280" }}>Full Name</label>
                  <div
                    className="flex items-center rounded-2xl overflow-hidden transition-all"
                    style={{
                      border: errors.user_name ? "1.5px solid #ef4444" : "1.5px solid rgba(79,70,229,0.18)",
                      background: "rgba(248,247,255,0.95)",
                      boxShadow: errors.user_name ? "0 0 0 3px rgba(239,68,68,0.10)" : "0 0 0 0px transparent",
                    }}
                  >
                    <span className="pl-4 pr-2 flex items-center" style={{ color: "#a5b4fc" }}>
                      <User size={16} strokeWidth={2.5} />
                    </span>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="flex-1 py-3.5 pr-4 text-sm font-semibold outline-none bg-transparent"
                      style={{ color: "#1e1b4b" }}
                      {...register("user_name")}
                    />
                  </div>
                  {errors.user_name && (
                    <span className="text-xs font-bold text-red-500 flex items-center gap-1 mt-0.5 pl-1">
                      {errors.user_name.message}
                    </span>
                  )}
                </div>
              </>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider" style={{ color: "#6b7280" }}>Email Address</label>
              <div
                className="flex items-center rounded-2xl overflow-hidden transition-all"
                style={{
                  border: errors.email ? "1.5px solid #ef4444" : "1.5px solid rgba(79,70,229,0.18)",
                  background: "rgba(248,247,255,0.95)",
                  boxShadow: errors.email ? "0 0 0 3px rgba(239,68,68,0.10)" : "0 0 0 0px transparent",
                }}
              >
                <span className="pl-4 pr-2 flex items-center" style={{ color: "#a5b4fc" }}>
                  <Mail size={16} strokeWidth={2.5} />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 py-3.5 pr-4 text-sm font-semibold outline-none bg-transparent"
                  style={{ color: "#1e1b4b" }}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <span className="text-xs font-bold text-red-500 flex items-center gap-1 mt-0.5 pl-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider" style={{ color: "#6b7280" }}>Password</label>
              <div
                className="flex items-center rounded-2xl overflow-hidden transition-all"
                style={{
                  border: errors.password ? "1.5px solid #ef4444" : "1.5px solid rgba(79,70,229,0.18)",
                  background: "rgba(248,247,255,0.95)",
                  boxShadow: errors.password ? "0 0 0 3px rgba(239,68,68,0.10)" : "0 0 0 0px transparent",
                }}
              >
                <span className="pl-4 pr-2 flex items-center" style={{ color: "#a5b4fc" }}>
                  <Lock size={16} strokeWidth={2.5} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="flex-1 py-3.5 text-sm font-semibold outline-none bg-transparent"
                  style={{ color: "#1e1b4b" }}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-4 pl-2 flex items-center transition-colors"
                  style={{ color: "#a5b4fc" }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs font-bold text-red-500 flex items-center gap-1 mt-0.5 pl-1">
                  {errors.password.message}
                </span>
              )}
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
