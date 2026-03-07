import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, ShieldCheck, X, CheckCircle2, ChevronRight, Copy, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import PaymentService, { type BillingData } from "./Services/payment.service";
import { toast } from "react-toastify";

interface PaymentProps {
    amount: number;
    onClose: () => void;
    onSuccess?: (data: { orderId: number; paymentKey: string }) => void;
    billingData?: BillingData;
}

type PaymentMethod = "card" | "wallet" | "instapay";

const PaymentView: React.FC<PaymentProps> = ({ amount, onClose, billingData }) => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [instaPayInfo, setInstaPayInfo] = useState<{ ipa: string; name: string } | null>(null);

    // Sync with URL params for Paymob redirect
    useEffect(() => {
        const syncStatus = async () => {
            const params = new URLSearchParams(window.location.search);
            const orderId = params.get("order");
            const success = params.get("success") === "true";

            if (success && !isSuccess && orderId) {
                setLoading(true);
                try {
                    const res = await PaymentService.checkStatus(Number(orderId));
                    if (res.success) {
                        setIsSuccess(true);
                        toast.success("Payment verified and account upgraded!");
                    } else {
                        console.warn("Payment verification failed", res.message);
                    }
                } catch (e) {
                    console.error("Status sync failed", e);
                } finally {
                    setLoading(false);
                }
            }
        };
        syncStatus();
    }, [isSuccess]);

    const handlePaymobInitiate = async (type: "card" | "wallet") => {
        setLoading(true);
        try {
            const response = await PaymentService.initiatePayment(amount, type, billingData);
            
            if (response.success && response.data.checkoutUrl) {
                // Redirect to Paymob Iframe
                window.location.href = response.data.checkoutUrl;
            } else {
                toast.error(response.error || "Failed to initiate payment");
                setLoading(false);
            }
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
            setLoading(false);
        }
    };

    const handleManualInstaPay = async () => {
        setLoading(true);
        const info = await PaymentService.getInstaPayInfo();
        if (info && info.success) {
            setInstaPayInfo(info.data);
        } else {
            toast.error("Failed to load InstaPay details");
        }
        setLoading(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.info("Copied to clipboard!");
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white rounded-[2.5rem] p-10 text-center shadow-2xl"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Successful!</h2>
                    <p className="text-slate-500 font-bold mb-8">Your account has been upgraded to Premium_CV.</p>
                    <button 
                        onClick={() => {
                            const newUrl = window.location.pathname; // Clear params
                            window.history.replaceState({}, document.title, newUrl);
                            navigate("/");
                            onClose();
                        }}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all"
                    >
                        Return to Dashboard
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative"
                style={{ border: "1.5px solid rgba(79,70,229,0.1)" }}
            >
                {/* Header */}
                <div className="p-8 pb-4 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Checkout</h2>
                        <p className="text-slate-500 font-bold text-sm mt-1">Select your preferred payment method</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <div className="p-8 pt-0">
                    {/* Amount Card */}
                    <div className="bg-indigo-50/50 rounded-3xl p-6 mb-8 flex items-center justify-between border border-indigo-100/50">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Total Amount</span>
                            <div className="text-3xl font-black text-indigo-600 mt-1">{amount} <span className="text-sm">EGP</span></div>
                        </div>
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-indigo-100">
                             <ShieldCheck size={24} className="text-indigo-500" />
                        </div>
                    </div>

                    {!instaPayInfo ? (
                        <>
                            {/* Method Selection */}
                            <div className="space-y-3">
                                <PaymentOption 
                                    title="Credit / Debit Card"
                                    description="Visa, Mastercard, Meeza"
                                    icon={<CreditCard size={20} />}
                                    selected={selectedMethod === "card"}
                                    onClick={() => setSelectedMethod("card")}
                                />
                                <PaymentOption 
                                    title="Mobile Wallet"
                                    description="Vodafone, Orange, Etisalat Cash"
                                    icon={<Smartphone size={20} />}
                                    selected={selectedMethod === "wallet"}
                                    onClick={() => setSelectedMethod("wallet")}
                                />
                                <PaymentOption 
                                    title="Direct InstaPay"
                                    description="Transfer to IPA manually"
                                    icon={<CheckCircle2 size={20} />}
                                    selected={selectedMethod === "instapay"}
                                    onClick={() => setSelectedMethod("instapay")}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => selectedMethod === "instapay" ? handleManualInstaPay() : handlePaymobInitiate(selectedMethod)}
                                disabled={loading}
                                className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {loading ? "Processing..." : (
                                    <>
                                        {selectedMethod === "instapay" ? "Show Details" : "Proceed to Payment"}
                                        <ChevronRight size={18} />
                                    </>
                                )}
                            </motion.button>
                        </>
                    ) : (
                        /* Manual InstaPay View */
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-300">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Transfer to this Address</p>
                                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                                    <span className="font-bold text-slate-700">{instaPayInfo.ipa}</span>
                                    <button onClick={() => copyToClipboard(instaPayInfo.ipa)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all">
                                        <Copy size={16} />
                                    </button>
                                </div>
                                <p className="text-sm font-bold text-slate-500 mt-4">Account Holder: <span className="text-slate-800">{instaPayInfo.name}</span></p>
                            </div>
                            
                            <div className="text-xs text-slate-400 font-medium px-4">
                                <p>Once transferred, please send the confirmation screenshot to our WhatsApp or Support team to activate your service.</p>
                            </div>

                            <button 
                                onClick={() => setInstaPayInfo(null)}
                                className="w-full py-4 text-slate-500 font-black text-sm hover:text-slate-800 transition-colors"
                            >
                                ← Back to other methods
                            </button>
                        </motion.div>
                    )}

                    <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                        <Lock size={10} />
                        SECURE ENCRYPTED TRANSACTION
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

interface PaymentOptionProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    selected: boolean;
    onClick: () => void;
}

const PaymentOption = ({ title, description, icon, selected, onClick }: PaymentOptionProps) => (
    <div 
        onClick={onClick}
        className={`p-5 rounded-3xl flex items-center gap-4 cursor-pointer transition-all border-2 ${
            selected 
            ? "border-indigo-600 bg-indigo-50/30 shadow-sm" 
            : "border-slate-100 hover:border-indigo-200 bg-white"
        }`}
    >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
            selected ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-slate-100 text-slate-500"
        }`}>
            {icon}
        </div>
        <div className="flex-1">
            <h4 className={`font-black text-sm ${selected ? "text-indigo-900" : "text-slate-800"}`}>{title}</h4>
            <p className="text-xs font-bold text-slate-400">{description}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            selected ? "border-indigo-600 bg-indigo-600" : "border-slate-200"
        }`}>
            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
    </div>
);

export default PaymentView;
