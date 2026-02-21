import { Link2, Sparkles, Upload, X, FileText, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import CV_API from "../Services/CV.services";
import useAuth from "../../../Shared/Hooks/useAuth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const UploadBox = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first!");
      return;
    }
    setIsLoading(true);
    const data = await CV_API.UploadFile(user?.data?.id as string, selectedFile);
    if (data.success === false) {
      setIsLoading(false);
      toast.error(data.message);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast.success("File uploaded successfully!");
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 3000);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileSizeKB = selectedFile ? (selectedFile.size / 1024).toFixed(1) : "0";

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* ── Drop Zone ── */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onClick={handleBrowseClick}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className="relative rounded-3xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300"
        style={{
          border: isDragging
            ? "2px dashed #4f46e5"
            : selectedFile
            ? "2px solid rgba(79,70,229,0.30)"
            : "2px dashed rgba(79,70,229,0.20)",
          background: isDragging
            ? "rgba(79,70,229,0.05)"
            : selectedFile
            ? "rgba(79,70,229,0.03)"
            : "rgba(248,247,255,0.8)",
        }}
      >
        <motion.div
          animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-16 h-16 rounded-3xl flex items-center justify-center"
          style={{
            background: selectedFile
              ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
              : "rgba(79,70,229,0.10)",
            boxShadow: selectedFile ? "0 6px 20px rgba(79,70,229,0.35)" : "none",
          }}
        >
          {selectedFile
            ? <CheckCircle2 size={30} className="text-white" />
            : <Upload size={28} style={{ color: "#4f46e5" }} />
          }
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center gap-2 w-full"
            >
              <div
                className="flex items-center justify-between w-full max-w-sm px-4 py-3 rounded-2xl"
                style={{ background: "rgba(79,70,229,0.06)", border: "1px solid rgba(79,70,229,0.12)" }}
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} style={{ color: "#4f46e5" }} />
                  <div className="text-left">
                    <p className="text-sm font-black truncate max-w-[180px]" style={{ color: "#1e1b4b" }}>
                      {selectedFile.name}
                    </p>
                    <p className="text-xs font-bold" style={{ color: "#9ca3af" }}>{fileSizeKB} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 rounded-full transition-colors hover:bg-red-50"
                >
                  <X size={16} className="text-red-400" />
                </button>
              </div>
              <p className="text-xs font-bold" style={{ color: "#9ca3af" }}>Click to replace file</p>
            </motion.div>
          ) : (
            <motion.div
              key="no-file"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <p className="text-base font-black" style={{ color: "#1e1b4b" }}>
                Drop your CV here
              </p>
              <p className="text-sm font-bold" style={{ color: "#9ca3af" }}>
                or{" "}
                <span style={{ color: "#4f46e5" }}>browse files</span>
              </p>
              <p className="text-xs font-bold" style={{ color: "#c4b5fd" }}>
                PDF, DOCX · Max 5 MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── LinkedIn URL ── */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-black" style={{ color: "#374151" }}>
          LinkedIn URL{" "}
          <span className="font-bold" style={{ color: "#9ca3af" }}>(Optional)</span>
        </label>
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all"
          style={{
            border: "1.5px solid rgba(79,70,229,0.15)",
            background: "rgba(255,255,255,0.90)",
          }}
        >
          <Link2 size={18} style={{ color: "#a5b4fc", flexShrink: 0 }} />
          <input
            type="text"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full outline-none text-sm font-bold bg-transparent"
            style={{ color: "#1e1b4b" }}
            onFocus={(e) => {
              (e.target.parentElement as HTMLElement).style.borderColor = "#4f46e5";
            }}
            onBlur={(e) => {
              (e.target.parentElement as HTMLElement).style.borderColor = "rgba(79,70,229,0.15)";
            }}
          />
        </div>
      </div>

      {/* ── Submit Button ── */}
      <motion.button
        onClick={handleUpload}
        disabled={isLoading}
        whileHover={isLoading ? {} : { scale: 1.02 }}
        whileTap={isLoading ? {} : { scale: 0.97 }}
        className="btn-main w-full py-5 text-base gap-2 mt-2"
        style={isLoading ? { opacity: 0.7, cursor: "not-allowed" } : {}}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Analyzing your CV...
          </>
        ) : (
          <>
            Start AI Analysis
            <Sparkles size={20} />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default UploadBox;
