import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import PaymentService from "../../Features/Payment/Services/payment.service";

const PLAN_AMOUNTS = { pro: 50, premium: 75 } as const;

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plan?: "pro" | "premium";
}

interface UserData {
  email?: string;
  user_name?: string;
}

const UpgradeModal = ({ isOpen, onClose, onSuccess, plan = "pro" }: UpgradeModalProps) => {
  const amount = PLAN_AMOUNTS[plan];
  const [paymentMethod, setPaymentMethod] = useState<"card" | "instapay" | null>(null);
  const [instapayInfo, setInstapayInfo] = useState<{ ipa: string; name: string; qr_code: string } | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { user } = useAuth();

  const userData = user?.data as UserData;

  const handleClose = () => {
    setPaymentMethod(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="bg-white rounded-[2.5rem] p-8 max-w-md w-full relative overflow-hidden"
            style={{
              boxShadow: "0 25px 60px rgba(79, 70, 229, 0.25)",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10" />

            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto">
                <Sparkles size={32} />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900">
                  {plan === "premium" ? "Unlock Premium" : "Unlock Pro Features"}
                </h2>
                <p className="text-slate-500 font-bold">
                  {plan === "premium"
                    ? "Get your personal web portfolio and full suite. One-time payment."
                    : "Portfolio Export and advanced features. One-time payment."}
                </p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-black text-slate-700">One-Time Payment</span>
                  <span className="text-2xl font-black text-indigo-600">{amount} EGP</span>
                </div>
                <ul className="text-left space-y-3">
                  {(plan === "premium"
                    ? ["Everything in Pro", "Personal Web Portfolio", "Custom Domain Support", "Prioritized Support"]
                    : ["Full Portfolio Export", "Advanced ATS Analysis", "AI Content Suggestions", "Prioritized Support"]
                  ).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                {!paymentMethod ? (
                  <>
                    <button
                      onClick={async () => {
                        setPaymentMethod("card");
                        setIsProcessingPayment(true);
                        try {
                          const billing = {
                            email: userData?.email || "user@example.com",
                            firstName: userData?.user_name?.split(" ")[0] || "User",
                            lastName: userData?.user_name?.split(" ")[1] || "Customer",
                            phone: "01004365707", // Paymob requires a valid phone
                          };
                          const res = await PaymentService.initiatePayment(amount, "card", billing);
                          if (res.success && res.data?.checkoutUrl) {
                            window.location.href = res.data.checkoutUrl;
                          }
                        } catch (err) {
                          console.error("Payment initiation failed", err);
                          toast.error("Failed to initiate Paymob payment");
                          setPaymentMethod(null);
                        } finally {
                          setIsProcessingPayment(false);
                        }
                      }}
                      disabled={isProcessingPayment}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessingPayment ? (
                        "Processing..."
                      ) : (
                        <>
                          Pay with Card (Paymob) <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                    <button
                      onClick={async () => {
                        setPaymentMethod("instapay");
                        try {
                          const res = await PaymentService.getInstaPayInfo();
                          if (res.success) setInstapayInfo(res.data);
                        } catch (err) {
                           console.error("Failed to fetch instapay info", err);
                           toast.error("Failed to load InstaPay details.");
                           setPaymentMethod(null);
                        }
                      }}
                      className="w-full py-4 bg-emerald-50 text-emerald-700 border-2 border-emerald-100 rounded-2xl font-black hover:bg-emerald-100 transition-all"
                    >
                      Transfer via InstaPay
                    </button>
                  </>
                ) : paymentMethod === "instapay" ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 space-y-2">
                      <p className="text-xs font-black text-emerald-600 uppercase">InstaPay Address (IPA)</p>
                      <p
                        className="text-lg font-black text-emerald-900 select-all cursor-copy"
                        onClick={() => {
                          navigator.clipboard.writeText(instapayInfo?.ipa || "");
                          toast.success("IPA copied!");
                        }}
                      >
                        {instapayInfo?.ipa || "Loading..."}
                      </p>
                      <p className="text-sm font-bold text-emerald-700">Name: {instapayInfo?.name}</p>
                    </div>
                    <button
                      onClick={async () => {
                        try {
                          await PaymentService.confirmInstapayPayment(
                            userData?.email || "user@example.com",
                            amount
                          );
                          handleClose();
                          onSuccess();
                        } catch (err) {
                          console.error("Manual confirmation failed", err);
                          toast.error("Failed to send confirmation. Please try again.");
                        }
                      }}
                      className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                    >
                      I've Transferred
                    </button>
                  </div>
                ) : null}

                <button
                  onClick={handleClose}
                  className="w-full py-4 text-slate-400 font-black hover:text-slate-600 transition-all"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
