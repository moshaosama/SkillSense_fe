import { Download, FileText, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const ExportSections = () => {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <div
        className="w-full max-w-xl rounded-[2rem] p-8 sm:p-10"
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

          <p
            className="text-sm font-bold leading-relaxed"
            style={{ color: "#9ca3af" }}
          >
            Download your enhanced CV or your generated AI portfolio
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-col gap-4">
          {/* Export CV */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex cursor-pointer  items-center justify-center gap-3 py-4 rounded-2xl font-bold transition"
            style={{
              background: "linear-gradient(135deg,#4f46e5,#6366f1)",
              color: "white",
              boxShadow: "0 10px 25px rgba(79,70,229,0.35)",
            }}
            onClick={() => console.log("Export CV")}
          >
            <FileText size={20} />
            Export CV
          </motion.button>

          {/* Export Portfolio */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              color: "white",
              boxShadow: "0 10px 25px rgba(124,58,237,0.35)",
            }}
            onClick={() => console.log("Export Portfolio")}
          >
            <Briefcase size={20} />
            Export Portfolio
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ExportSections;