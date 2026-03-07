import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Shared/Hooks/useAuth";
import ContactUsService from "../Service/contact-us.service";
import { Link } from "react-router";

// ─── Schema ───────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof schema>;

// ─── Component ────────────────────────────────────────────
const ContactUs = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.data?.user_name ?? "",
      email: user?.data?.email ?? "",
      message: "",
    },
  });

  const openChat = () => {
    const chatBtn = document.getElementById("live-chat-btn");
    chatBtn?.click();
  };

  const onSubmit = async (data: ContactForm) => {
    if (!isAuthenticated || !user?.data?.id) {
      toast.error("Please login first to send a message.");
      return;
    }
    try {
      setLoading(true);
      await ContactUsService.SendContactUs({
        name: data.name,
        email: data.email,
        message: data.message,
        user_id: user.data.id,
      });
      toast.success("Message sent! We'll get back to you soon 🎉");
      reset({ name: user?.data?.user_name ?? "", email: user?.data?.email ?? "", message: "" });
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-us" className="py-24 relative overflow-hidden bg-slate-50">
      {/* Subtle Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200 rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-200 rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]"
            style={{
              background: "rgba(79,70,229,0.08)",
              border: "1px solid rgba(79,70,229,0.18)",
              color: "#4f46e5",
            }}
          >
            ✦ Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
          >
            We'd Love to Hear <br />
            <span className="text-gradient">From You</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 font-bold max-w-2xl text-lg pt-2"
          >
            Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-500 font-medium mb-4">Our friendly team is here to help.</p>
              <a href="mailto:mohamedOSFekry@gmail.com" className="text-indigo-600 font-bold hover:text-indigo-700 break-all">
                mohamedOSFekry@gmail.com
              </a>
            </motion.div>

            {/* Live Chat Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={openChat}
              className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-100 transition-colors">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Live Chat</h3>
              <p className="text-slate-500 font-medium mb-4">Mon-Fri from 8am to 5pm.</p>
              <span className="text-violet-600 font-bold">Start new chat →</span>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Phone / WhatsApp</h3>
              <p className="text-slate-500 font-medium mb-4">Call us or send a message.</p>
              <a href="tel:+201004365707" className="text-purple-600 font-bold block">
                +201004365707
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-xl shadow-indigo-900/5 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10" />

            {!isAuthenticated ? (
              /* Not logged in — prompt user */
              <div className="flex flex-col items-center justify-center text-center gap-5 py-10">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-indigo-500"
                  style={{ background: "rgba(79,70,229,0.08)" }}
                >
                  <Mail size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Login to Send a Message</h3>
                  <p className="text-slate-500 font-medium max-w-xs mx-auto">
                    Please log in first so we know who we're talking to!
                  </p>
                </div>
                <Link
                  to="/login"
                  className="px-10 py-4 rounded-2xl font-black text-white transition-all"
                  style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", boxShadow: "0 4px 20px rgba(79,70,229,0.35)" }}
                >
                  Login to Contact Us
                </Link>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium placeholder-slate-400"
                      style={errors.name ? { borderColor: "#ef4444" } : {}}
                    />
                    {errors.name && (
                      <p className="text-xs font-bold text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium placeholder-slate-400"
                      style={errors.email ? { borderColor: "#ef4444" } : {}}
                    />
                    {errors.email && (
                      <p className="text-xs font-bold text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Leave us a message..."
                    {...register("message")}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium placeholder-slate-400 resize-none"
                    style={errors.message ? { borderColor: "#ef4444" } : {}}
                  />
                  {errors.message && (
                    <p className="text-xs font-bold text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-1 mt-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
