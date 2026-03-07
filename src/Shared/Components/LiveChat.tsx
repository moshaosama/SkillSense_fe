import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, LogIn } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";

const WHATSAPP_NUMBER = "201004365707"; // Mohamed's number (no +)

const LiveChat = () => {
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    // const userName = user?.data?.user_name ?? "A user";
    // const userEmail = user?.data?.email ?? "";
    const fullText = `${message}`;
    const encoded = encodeURIComponent(fullText);

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    toast.success("Opening WhatsApp to send your message!");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-4xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(79,70,229,0.14)",
              boxShadow: "0 24px 80px rgba(79,70,229,0.22)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="text-white font-black text-sm">Live Chat</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-indigo-200 text-xs font-medium">Mohamed is online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {!isAuthenticated ? (
                /* Not logged in state */
                <div className="flex flex-col items-center text-center gap-4 py-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(79,70,229,0.08)" }}
                  >
                    <LogIn size={28} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 mb-1">Login Required</p>
                    <p className="text-slate-500 text-sm font-medium">
                      Please log in first to start a live chat with us.
                    </p>
                  </div>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3.5 rounded-2xl font-black text-center text-white"
                    style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
                  >
                    Login to Chat
                  </Link>
                </div>
              ) : (
                /* Logged in state */
                <div className="flex flex-col gap-4">
                  <div
                    className="rounded-2xl p-4 text-sm font-medium"
                    style={{
                      background: "rgba(79,70,229,0.06)",
                      color: "#374151",
                    }}
                  >
                    👋 Hey <strong>{user?.data?.user_name?.split(" ")[0]}</strong>! Type your message and we'll open WhatsApp so Mohamed gets it instantly.
                  </div>

                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 rounded-2xl resize-none text-sm font-medium text-slate-900 outline-none transition-all"
                    style={{
                      background: "#f8fafc",
                      border: "1.5px solid rgba(79,70,229,0.15)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(79,70,229,0.15)")
                    }
                  />

                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="w-full py-3.5 rounded-2xl font-black text-white flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: message.trim()
                        ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
                        : "#e2e8f0",
                      color: message.trim() ? "white" : "#94a3b8",
                      cursor: message.trim() ? "pointer" : "not-allowed",
                      boxShadow: message.trim()
                        ? "0 4px 20px rgba(79,70,229,0.35)"
                        : "none",
                    }}
                  >
                    <Send size={16} />
                    Send via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        id="live-chat-btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl"
        style={{
          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
          boxShadow: "0 8px 30px rgba(79,70,229,0.50)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: "#4f46e5" }}
          />
        )}
      </motion.button>
    </>
  );
};

export default LiveChat;
