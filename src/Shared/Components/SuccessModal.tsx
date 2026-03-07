import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal = ({ isOpen, onClose, title = "Payment Success!", message = "Your account has been upgraded to Pro. You can now export your premium AI portfolio." }: SuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center space-y-8 relative overflow-hidden"
            style={{
              boxShadow: "0 25px 60px rgba(16, 185, 129, 0.25)",
            }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full -z-10" />
            
            <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto">
              <PartyPopper size={40} />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900">{title}</h2>
              <p className="text-slate-500 font-bold">
                {message}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all cursor-pointer"
            >
              Let's Go!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
