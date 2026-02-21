import UploadBox from "./UploadBox";
import { FileText } from "lucide-react";

const UploadSections = () => {
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
        <div className="flex flex-col items-center text-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              boxShadow: "0 6px 20px rgba(79,70,229,0.35)",
            }}
          >
            <FileText size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-black" style={{ color: "#1e1b4b" }}>
            Import your CV
          </h1>
          <p className="text-sm font-bold leading-relaxed" style={{ color: "#9ca3af" }}>
            Upload your professional resume or import from LinkedIn to generate
            your AI-powered portfolio
          </p>
        </div>

        <UploadBox />
      </div>
    </div>
  );
};

export default UploadSections;
