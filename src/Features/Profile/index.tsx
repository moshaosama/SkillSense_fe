import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Camera, Edit3, Save, X, LogOut, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../Shared/Hooks/useAuth";
import AuthApi from "../Auth/Services/auth.service";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

interface ProfileForm {
  user_name: string;
}

const ProfileFeature = () => {
  const { user, handleLogout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<ProfileForm>({
    defaultValues: {
      user_name: user?.data?.user_name || "",
    },
  });

  // Sync form with user data if it changes
  useEffect(() => {
    if (user?.data?.user_name) {
      setValue("user_name", user.data.user_name);
    }
  }, [user, setValue]);

  // Robust premium check
  const isPremiumLocal = localStorage.getItem("is_premium");
  const isPremiumUser = user?.data?.is_premium;
  const isPro = isPremiumLocal === "CV_Premium" || isPremiumLocal === "Portfolio_Premium" || isPremiumUser;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setIsEditing(true);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      const res = await AuthApi.UpdateUser(
        user?.data?.id as string,
        data.user_name,
        avatarFile || user?.data?.avatar || ""
      );
      
      if (res.statusbar === "success") {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(null);
        setTimeout(() => window.location.reload(), 800);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    reset();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
          border: "1.5px solid rgba(79,70,229,0.1)",
          boxShadow: "0 20px 50px rgba(79,70,229,0.08)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-4xl bg-linear-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-indigo-200">
              <div className="w-full h-full rounded-[1.8rem] bg-white flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : user?.data?.avatar ? (
                  <img 
                    src={user.data.avatar.startsWith('/') ? `https://skillsensebe-production.up.railway.app${user.data.avatar}` : user.data.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <User size={60} className="text-indigo-200" />
                )}
              </div>
            </div>
            <label className="absolute bottom-0 right-0 p-2.5 bg-white rounded-2xl border border-indigo-100 shadow-xl text-indigo-600 hover:scale-110 transition-transform cursor-pointer">
              <Camera size={18} />
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </label>
          </div>

          {/* User Details Section */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight flex flex-wrap items-center gap-3">
                    {isEditing ? (
                      <input
                        type="text"
                        {...register("user_name", { required: true })}
                        className="bg-transparent border-b-2 border-indigo-500 outline-none flex-1 min-w-[200px]"
                        autoFocus
                      />
                    ) : (
                      user?.data?.user_name || "User Name"
                    )}
                    {isPro && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600">
                        <Award size={14} className="fill-amber-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Pro Member</span>
                      </div>
                    )}
                  </h1>
                  
                  <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                    {isEditing ? (
                      <>
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer"
                        >
                          <Save size={18} /> Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all cursor-pointer"
                        >
                          <X size={18} /> Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-100 rounded-2xl font-black hover:border-indigo-600 transition-all cursor-pointer"
                      >
                        <Edit3 size={18} /> Edit Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-indigo-400" />
                {user?.data?.email || "email@example.com"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Account Status</h3>
            <p className="text-slate-500 font-bold text-sm">
              {isPro 
                ? "You have full access to all premium career tools." 
                : "Free Member. Upgrade to unlock AI features."}
            </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Date Joined</h3>
            <p className="text-slate-500 font-bold text-sm">
              Member since {user?.data?.created_at ? new Date(user.data.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "March 2024"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Logout Area */}
      <div className="pt-8 text-center md:text-left">
         <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all w-full md:w-auto cursor-pointer"
         >
            <LogOut size={20} /> Logout Account
         </button>
      </div>
    </div>
  );
};

export default ProfileFeature;
