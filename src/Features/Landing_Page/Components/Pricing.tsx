import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuth from "../../../Shared/Hooks/useAuth";
import UpgradeModal from "../../../Shared/Components/UpgradeModal";

const pricingTiers = [
  {
    name: "Free",
    price: "0 EGP",
    description: "Perfect for getting started with standard CV templates.",
    features: ["Standard CV Templates", "Basic Word/PDF Export"],
    buttonText: "Get Started Free",
    link: "/upload-cv",
    popular: false,
    actionType: "free",
  },
  {
    name: "Pro",
    price: "50 EGP",
    description: "Deep ATS analysis and feedback to get you past the bots.",
    features: ["Everything in Free", "Advanced ATS Analysis", "AI Content Suggestions"],
    buttonText: "Upgrade to Pro",
    link: "#",
    popular: true,
    actionType: "pro",
  },
  {
    name: "Premium",
    price: "75 EGP",
    description: "The ultimate package including your own personal web portfolio.",
    features: ["Everything in Pro", "Personal Web Portfolio", "Custom Domain Support"],
    buttonText: "Go Premium",
    link: "#",
    popular: false,
    actionType: "premium",
  },
];

const Pricing = () => {
  const { isAuthenticated } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradePlan, setUpgradePlan] = useState<"pro" | "premium">("pro");
  const navigate = useNavigate();

  const handleAction = async (e: React.MouseEvent, actionType: string) => {
    if (actionType === "free") {
      // Allow default link behavior (go to /upload-cv)
      return;
    }

    e.preventDefault();

    if (actionType === "premium") {
      if (!isAuthenticated) {
        toast.info("Please login to upgrade to Premium.");
        navigate("/login");
        return;
      }
      setShowUpgradeModal(true);
      return;
    }

    if (actionType === "pro") {
      if (!isAuthenticated) {
        toast.info("Please login to upgrade to Pro.");
        navigate("/login");
        return;
      }

      setUpgradePlan("pro");
      setShowUpgradeModal(true);
    }
  };

  const handlePremiumClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info("Please login to upgrade to Premium.");
      navigate("/login");
      return;
    }
    setUpgradePlan("premium");
    setShowUpgradeModal(true);
  };

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        plan={upgradePlan}
        onSuccess={() => {
          setShowUpgradeModal(false);
          toast.success(upgradePlan === "premium" ? "Welcome to Premium!" : "Welcome to Pro!");
          setTimeout(() => window.location.reload(), 1500);
        }}
      />

      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] -z-10 opacity-20"
        style={{ background: "radial-gradient(circle, #a855f7, #6d28d9)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] -z-10 opacity-20"
        style={{ background: "radial-gradient(circle, #4f46e5, #3730a3)" }}
      />

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]"
            style={{
              background: "rgba(79,70,229,0.08)",
              border: "1px solid rgba(79,70,229,0.18)",
              color: "#4f46e5",
            }}
          >
            ✦ Simple Pricing
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Choose the Right Plan <br />
            <span className="text-gradient">For Your Career</span>
          </h2>
          <p className="text-slate-500 text-lg font-bold max-w-2xl">
            From basic resume creation to an entire AI career suite. Upgrade when you need to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded-4xl p-8 flex flex-col ${
                tier.popular
                  ? "bg-linear-to-b from-indigo-50 to-white border-2 border-indigo-500"
                  : "bg-white border-2 border-slate-100"
              }`}
              style={{
                boxShadow: tier.popular
                  ? "0 20px 40px rgba(79,70,229,0.15)"
                  : "0 10px 30px rgba(0,0,0,0.05)",
                transform: tier.popular ? "scale(1.05)" : "scale(1)",
                zIndex: tier.popular ? 10 : 1,
              }}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-black tracking-wide shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-slate-500 font-medium text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl lg:text-5xl font-black text-slate-900">{tier.price}</span>
                <span className="text-slate-500 font-bold">{tier.price === "0 EGP" ? "" : " one-time"}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 font-semibold">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={tier.link}
                onClick={(e) => (tier.actionType === "premium" ? handlePremiumClick(e) : handleAction(e, tier.actionType))}
                className={`w-full py-4 rounded-xl font-black text-center transition-all block ${
                  tier.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {tier.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
