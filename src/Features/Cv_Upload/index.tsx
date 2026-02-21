import { PartyPopper, Upload, ScanSearch, Wand2 } from "lucide-react";
import StepRender from "../../Shared/Components/StepRender";
import { useState } from "react";
import SwitchSections from "../../utils/SwitchSections";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { icon: <Upload size={20} />, text: "Upload", showHr: true },
  { icon: <ScanSearch size={20} />, text: "Analyze", showHr: true },
  { icon: <Wand2 size={20} />, text: "Improve", showHr: true },
  { icon: <PartyPopper size={20} />, text: "Export", showHr: false },
];

function Index() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-4"
      style={{
        background: "linear-gradient(160deg, #f8f7ff 0%, #eef2ff 50%, #ede9fe 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      >
        <div
          className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full blur-[130px] opacity-20"
          style={{ background: "radial-gradient(circle,#4f46e5,#7c3aed)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full blur-[100px] opacity-15"
          style={{ background: "radial-gradient(circle,#a855f7,#4f46e5)" }}
        />
      </div>

      <div className="container mx-auto max-w-3xl flex flex-col gap-12">
        {/* ── Page Title ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]"
            style={{
              background: "rgba(79,70,229,0.08)",
              border: "1px solid rgba(79,70,229,0.18)",
              color: "#4f46e5",
            }}
          >
            ✦ AI CV Analyzer
          </div>
          <h1 className="text-3xl sm:text-4xl font-black" style={{ color: "#1e1b4b" }}>
            Analyze Your CV
          </h1>
          <p className="text-base font-bold" style={{ color: "#9ca3af" }}>
            Follow the steps below to get your personalized AI feedback
          </p>
        </motion.div>

        {/* ── Step Tracker ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center items-center flex-wrap gap-0"
        >
          {steps.map((s, i) => (
            <StepRender
              key={s.text}
              icon={s.icon}
              isActive={currentStep === i + 1}
              text={s.text}
              isShowHr={s.showHr}
              handleMove={() => setCurrentStep(i + 1)}
              stepNumber={i + 1}
            />
          ))}
        </motion.div>

        {/* ── Step Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SwitchSections currentSwitch={currentStep} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Index;
