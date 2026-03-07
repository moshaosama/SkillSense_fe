import { motion } from "framer-motion";
import { HandCoins, CreditCard, RefreshCw, AlertCircle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <HandCoins size={30} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Refund Policy</h1>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Last Updated: March 2024</p>
            </div>
          </div>

          <div className="space-y-10 text-slate-600 leading-relaxed font-medium">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Refund Eligibility</h2>
              <p>
                Since SkillSense AI provides digital services and AI-generated content that can be consumed immediately, we generally do not offer refunds once a subscription or one-time payment is processed and features are accessed.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Subscription Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <RefreshCw className="text-indigo-500 mb-3" size={20} />
                  <h3 className="font-black text-slate-900 text-sm italic">Monthly Subscriptions</h3>
                  <p className="text-sm mt-2">You can cancel your monthly subscription at any time. You will continue to have access to pro features until the end of your billing cycle.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <CreditCard className="text-purple-500 mb-3" size={20} />
                  <h3 className="font-black text-slate-900 text-sm italic">One-time Payments</h3>
                  <p className="text-sm mt-2">One-time payments for specific document optimizations or portfolio generation are final once the AI process has started.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Exceptions</h2>
              <p>
                We may consider refund requests on a case-by-case basis under the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Duplicate transactions due to technical errors.</li>
                <li>Complete failure of the service for an extended period (more than 24 hours).</li>
                <li>Unauthorized transactions that are reported immediately.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <AlertCircle className="text-indigo-500" size={24} />
                How to Request a Refund
              </h2>
              <p>
                To request a refund under these exceptions, please email <span className="text-indigo-600 font-black">billing@skillsense-ai.com</span> within 48 hours of the transaction with your order ID and the reason for the request.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-400">
                Processed via Paymob. Refund processing times may vary based on your bank or payment method (typically 5-10 business days).
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;
