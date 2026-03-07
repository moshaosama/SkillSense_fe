import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Features from "./Components/Features";
import Hero from "./Components/Hero";
import Works from "./Components/Works";
import Pricing from "./Components/Pricing";
import PremiumBanner from "./Components/PremiumBanner";
import ContactUs from "./Components/ContactUs";
import SuccessModal from "../../Shared/Components/SuccessModal";
import PaymentService from "../Payment/Services/payment.service";

import useAuth from "../../Shared/Hooks/useAuth";

const LandingIndex = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  // Robust premium check
  const isPremiumLocal = localStorage.getItem("is_premium");
  const isPremiumUser = (user?.data as { is_premium?: string | boolean })?.is_premium;
  const isPro = isPremiumLocal === "CV_Premium" || isPremiumLocal === "Portfolio_Premium" || isPremiumUser;

  useEffect(() => {
    const syncPaymentStatus = async () => {
      const successParam = searchParams.get("success");
      const txnResponseCode = searchParams.get("txn_response_code");
      const orderIdParam = searchParams.get("order");
      const transactionIdParam = searchParams.get("id");

      // Check if successful via success param OR transaction approved code
      const isSuccessful = successParam === "true" || txnResponseCode === "APPROVED";

      if (isSuccessful) {
        if (orderIdParam || transactionIdParam) {
          try {
            const res = await PaymentService.checkStatus(
              orderIdParam ? Number(orderIdParam) : 0,
              transactionIdParam ? Number(transactionIdParam) : 0,
              user?.data?.email // Pass real user email as fallback
            );
            if (res.success) {
              setShowSuccessModal(true);
              localStorage.setItem("is_premium", res.status);
            }
          } catch (err) {
            console.error("Proactive status check failed:", err);
            setShowSuccessModal(true);
          }
        } else {
          // Fallback if no specific ID, still show modal if it's successful
          setShowSuccessModal(true);
        }

        // Clean up URL
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("success");
        newParams.delete("order");
        newParams.delete("id");
        newParams.delete("txn_response_code");
        newParams.delete("pending");
        setSearchParams(newParams);
      }
    };

    syncPaymentStatus();
  }, [searchParams, setSearchParams, user?.data?.email]);

  return (
    <div className="mt-5">
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false);
          // window.location.reload(); // Optional: Refresh to update is_premium everywhere
        }} 
      />
      <div className="mt-40 max-sm:mt-30">
        <Hero />
      </div>
      <Features />
      <Works />
      {isPro ? <PremiumBanner /> : <Pricing />}
      <ContactUs />
      {/* <Ready /> */}
    </div>
  );
};

export default LandingIndex;
