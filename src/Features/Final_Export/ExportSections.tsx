import { Download, FileText, Briefcase, Code2, Sparkles, Rocket, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ExportService from "./Services/Export.service";
import { createPortal } from "react-dom";
import useAuth from "../../Shared/Hooks/useAuth";
import PaymentService from "../Payment/Services/payment.service";
import { useSearchParams } from "react-router";

import SuccessModal from "../../Shared/Components/SuccessModal";
import UpgradeModal from "../../Shared/Components/UpgradeModal";

const loadingSteps = [
  { text: "Initializing Export...", icon: <Code2 size={24} className="text-indigo-500" /> },
  { text: "Generative AI configuring...", icon: <Sparkles size={24} className="text-purple-500" /> },
  { text: "Building Assets...", icon: <Briefcase size={24} className="text-pink-500" /> },
  { text: "Deploying Portfolio...", icon: <Rocket size={24} className="text-indigo-500" /> },
  { text: "Finalizing...", icon: <CheckCircle2 size={24} className="text-blue-500" /> },
];

const ExportSections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  interface UserData {
    plan?: string;
    is_pro?: boolean;
    id: string;
    user_name: string;
    avatar?: string;
    email?: string;
    is_premium?: string;
  }

  // For demo purposes, we'll check if the user has a "plan" or if we just want to block it for now
  const userData = user?.data as UserData;
  const premiumStatus = localStorage.getItem("is_premium") || userData?.is_premium;
  const isPro = userData?.plan === "pro" || userData?.is_pro === true || premiumStatus === "CV_Premium" || premiumStatus === "Portfolio_Premium";

  useEffect(() => {
    // Check for success param from Paymob redirect
    const syncPaymentStatus = async () => {
      const orderId = searchParams.get("order");
      const transactionId = searchParams.get("id"); // Paymob sends 'id'
      const successParam = searchParams.get("success");
      const txnResponseCode = searchParams.get("txn_response_code");

      const isSuccessful = successParam === "true" || txnResponseCode === "APPROVED";

      if (isSuccessful && (orderId || transactionId)) {
        setIsLoading(true);
        try {
          const res = await PaymentService.checkStatus(
            orderId ? Number(orderId) : 0,
            transactionId ? Number(transactionId) : 0,
            user?.data?.email // Pass real user email as fallback
          );
          if (res.success) {
            setShowSuccessModal(true);
            localStorage.setItem("is_premium", res.status);
            toast.success("Payment verified! Portfolio Access Unlocked.");
          } else {
            toast.error("Payment verification failed. Please contact support.");
          }
        } catch (e) {
          console.error("Status check failed", e);
        } finally {
          setIsLoading(false);
          // Clean up the URL
          const newParams = new URLSearchParams(searchParams);
          newParams.delete("success");
          newParams.delete("order");
          newParams.delete("id");
          newParams.delete("txn_response_code");
          setSearchParams(newParams);
        }
      }
    };

    syncPaymentStatus();

    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStage((prev) => (prev < loadingSteps.length - 2 ? prev + 1 : prev));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isLoading, searchParams, setSearchParams, user?.data?.email]);

  const handleExportPortfolio = async () => {
    if (!isPro) {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoading(true);
    setLoadingStage(0);
    setDeploymentUrl(null);

    try {
      const repoName = `${userData?.id}-portfolio`;

      const response = await ExportService.CreateAutomation(
        repoName,
        userData?.id as string,
        { VITE_USER_ID: userData?.id as string }
      );

      if (response?.success) {
        setLoadingStage(loadingSteps.length - 1);
        setDeploymentUrl(response.data?.deploymentUrl || null);

        setTimeout(() => {
          toast.success(
            <div>
              Portfolio deployed!{" "}
              {response.data?.deploymentUrl && (
                <a
                  href={response.data.deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold"
                >
                  View Live ↗
                </a>
              )}
            </div>
          );
          setIsLoading(false);
          setLoadingStage(0);
        }, 1500);
      } else {
        throw new Error("Deployment failed");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
        (error instanceof Error ? error.message : "An error occurred during export")
      );
      setIsLoading(false);
      setLoadingStage(0);
    }
  };

  const handleExportCV = () => {
    toast.info("CV Export is Coming Soon! 🚀");
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <div
        className="w-full max-w-xl rounded-4xl p-8 sm:p-10"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1.5px solid rgba(79,70,229,0.10)",
          boxShadow: "0 20px 60px rgba(79,70,229,0.12)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              boxShadow: "0 6px 20px rgba(79,70,229,0.35)",
            }}
          >
            <Download size={22} className="text-white" />
          </div>

          <h1 className="text-2xl font-black" style={{ color: "#1e1b4b" }}>
            Export Your Files
          </h1>

          <p className="text-sm font-bold leading-relaxed" style={{ color: "#9ca3af" }}>
            Download your enhanced CV or your generated AI portfolio
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex cursor-pointer items-center justify-center gap-3 py-4 rounded-2xl font-bold transition"
            style={{
              background: "white",
              color: "#4f46e5",
              border: "2px solid #4f46e5",
              boxShadow: "0 5px 15px rgba(79,70,229,0.1)",
            }}
            onClick={handleExportCV}
          >
            <FileText size={20} />
            Export CV
          </motion.button>

          <motion.button
            whileHover={isLoading ? {} : { scale: 1.02 }}
            whileTap={isLoading ? {} : { scale: 0.98 }}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition ${
              isLoading ? "cursor-not-allowed opacity-80" : "cursor-pointer"
            }`}
            style={{
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              color: "white",
              boxShadow: "0 10px 25px rgba(79,70,229,0.35)",
            }}
            onClick={handleExportPortfolio}
          >
            <Briefcase size={20} />
            Export Portfolio
          </motion.button>

          {/* ✅ Show deployment URL after success */}
          {deploymentUrl && !isLoading && (
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              href={deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition cursor-pointer text-center"
              style={{
                background: "linear-gradient(135deg,#10b981,#059669)",
                color: "white",
                boxShadow: "0 10px 25px rgba(16,185,129,0.35)",
              }}
            >
              <Rocket size={20} />
              View Live Portfolio ↗
            </motion.a>
          )}
        </div>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
        onSuccess={() => {
          setShowUpgradeModal(false);
          setShowSuccessModal(true);
        }} 
      />

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />

      {/* Loading Modal */}
      {createPortal(
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-4xl p-8 max-w-sm w-full flex flex-col items-center justify-center text-center relative overflow-hidden"
                style={{
                  boxShadow: "0 25px 60px rgba(79, 70, 229, 0.25)",
                  border: "1.5px solid rgba(79, 70, 229, 0.1)",
                }}
              >
                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full text-indigo-50" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" />
                    </svg>
                    <motion.svg
                      className="absolute inset-0 w-full h-full text-indigo-500 drop-shadow-lg"
                      viewBox="0 0 100 100"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
                    >
                      <circle
                        cx="50" cy="50" r="46" fill="none"
                        stroke="currentColor" strokeWidth="8"
                        strokeDasharray="290"
                        strokeDashoffset={loadingStage === loadingSteps.length - 1 ? 0 : 220}
                        strokeLinecap="round"
                      />
                    </motion.svg>
                    <div className="absolute z-20">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={loadingStage}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          {loadingSteps[loadingStage].icon}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Processing</h3>
                  <div className="h-6 mb-6 overflow-hidden flex items-center justify-center relative w-full">
                    <AnimatePresence mode="wait">
                      <motion.p key={loadingStage} className="text-gray-500 font-bold absolute text-sm">
                        {loadingSteps[loadingStage].text}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default ExportSections;
