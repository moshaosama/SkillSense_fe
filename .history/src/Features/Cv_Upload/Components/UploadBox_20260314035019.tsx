import {
  Link2,
  Sparkles,
  Upload,
  X,
  FileText,
  CheckCircle2,
  Code2,
  RefreshCw,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import CV_API from "../Services/CV.services";
import useAuth from "../../../Shared/Hooks/useAuth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const loadingSteps = [
  {
    text: "Uploading CV...",
    icon: <Upload size={24} className="text-indigo-500" />,
  },
  {
    text: "Extracting Text...",
    icon: <FileText size={24} className="text-purple-500" />,
  },
  {
    text: "AI Analyzing Skills...",
    icon: <Sparkles size={24} className="text-pink-500" />,
  },
  {
    text: "Generating Profile...",
    icon: <Code2 size={24} className="text-indigo-500" />,
  },
  {
    text: "Finalizing...",
    icon: <CheckCircle2 size={24} className="text-blue-500" />,
  },
];

const UploadBox = ({
  onNext,
  onUploadSuccess,
  hasUploadedPdf = false,
}: {
  onNext: () => void;
  onUploadSuccess?: () => void;
  hasUploadedPdf?: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [replaceMode, setReplaceMode] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStage((prev) =>
          prev < loadingSteps.length - 2 ? prev + 1 : prev,
        );
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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
    setLoadingStage(0);
    try {
      const data = await CV_API.UploadFile(
        user?.data?.id as string,
        selectedFile,
      );
      if (data.success === false) {
        setIsLoading(false);
        setLoadingStage(0);
        toast.error(data.message);
      } else {
        setLoadingStage(loadingSteps.length - 1);
        setTimeout(() => {
          setIsLoading(false);
          setLoadingStage(0);
          toast.success(
            replaceMode
              ? "تم استبدال السيرة بنجاح!"
              : "File uploaded successfully!",
          );
          setSelectedFile(null);
          setReplaceMode(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
          onUploadSuccess?.();
          onNext(); // Advance to Analyze step
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setLoadingStage(0);
      toast.error("An error occurred during upload.");
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileSizeKB = selectedFile ? (selectedFile.size / 1024).toFixed(1) : "0";

  const showUploadUI = !hasUploadedPdf || replaceMode;

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* ── Already uploaded state (replace CTA) ── */}
      <AnimatePresence mode="wait">
        {hasUploadedPdf && !replaceMode && (
          <motion.div
            key="already-uploaded"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-center"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1.5px solid rgba(34,197,94,0.25)",
            }}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                تم رفع السيرة الذاتية
              </h3>
              <p className="text-sm font-bold text-slate-600">
                لو عايز تبدّل الملف، اضغط «استبدال»
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => setShowReplaceModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-emerald-700 bg-emerald-50 border-2 border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <RefreshCw size={18} />
              استبدال السيرة
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Replace confirmation modal ── */}
      <AnimatePresence>
        {showReplaceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowReplaceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              style={{ border: "1px solid rgba(79,70,229,0.12)" }}
            >
              <h3 className="text-xl font-black text-slate-900 mb-2">
                هل أنت متأكد؟
              </h3>
              <p className="text-slate-600 font-bold text-sm mb-6">
                عايز تستبدل السيرة الذاتية الحالية بملف جديد؟
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowReplaceModal(false)}
                  className="flex-1 py-3.5 rounded-2xl font-black text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReplaceModal(false);
                    setReplaceMode(true);
                  }}
                  className="flex-1 py-3.5 rounded-2xl font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  نعم، استبدال
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Drop Zone (only when no upload yet or replace mode) ── */}
      {showUploadUI && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />

          <div
            onClick={handleBrowseClick}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
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
                boxShadow: selectedFile
                  ? "0 6px 20px rgba(79,70,229,0.35)"
                  : "none",
              }}
            >
              {selectedFile ? (
                <CheckCircle2 size={30} className="text-white" />
              ) : (
                <Upload size={28} style={{ color: "#4f46e5" }} />
              )}
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
                    style={{
                      background: "rgba(79,70,229,0.06)",
                      border: "1px solid rgba(79,70,229,0.12)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} style={{ color: "#4f46e5" }} />
                      <div className="text-left">
                        <p
                          className="text-sm font-black truncate max-w-[180px]"
                          style={{ color: "#1e1b4b" }}
                        >
                          {selectedFile.name}
                        </p>
                        <p
                          className="text-xs font-bold"
                          style={{ color: "#9ca3af" }}
                        >
                          {fileSizeKB} KB
                        </p>
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
                  <p className="text-xs font-bold" style={{ color: "#9ca3af" }}>
                    Click to replace file
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="no-file"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <p
                    className="text-base font-black"
                    style={{ color: "#1e1b4b" }}
                  >
                    Drop your CV here
                  </p>
                  <p className="text-sm font-bold" style={{ color: "#9ca3af" }}>
                    or <span style={{ color: "#4f46e5" }}>browse files</span>
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
              <span className="font-bold" style={{ color: "#9ca3af" }}>
                (Optional)
              </span>
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
                  (e.target.parentElement as HTMLElement).style.borderColor =
                    "#4f46e5";
                }}
                onBlur={(e) => {
                  (e.target.parentElement as HTMLElement).style.borderColor =
                    "rgba(79,70,229,0.15)";
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
            <>
              {replaceMode ? "رفع السيرة الجديدة" : "Start AI Analysis"}
              <Sparkles size={20} />
            </>
          </motion.button>
        </>
      )}

      {/* Modern Processing Loading Modal */}
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
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div
                  className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
                    <svg
                      className="absolute inset-0 w-full h-full text-indigo-50"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                      />
                    </svg>
                    <motion.svg
                      className="absolute inset-0 w-full h-full text-indigo-500 drop-shadow-lg"
                      viewBox="0 0 100 100"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 2,
                      }}
                      style={{ transformOrigin: "center" }}
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray="290"
                        strokeDashoffset={
                          loadingStage === loadingSteps.length - 1 ? 0 : 220
                        }
                        strokeLinecap="round"
                        style={{
                          transition: "stroke-dashoffset 0.5s ease-in-out",
                        }}
                      />
                    </motion.svg>
                    <div className="absolute z-20 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={loadingStage}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {loadingSteps[loadingStage].icon}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    Processing
                  </h3>

                  <div className="h-6 mb-6 overflow-hidden flex items-center justify-center relative w-full">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStage}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500 font-bold absolute text-sm"
                      >
                        {loadingSteps[loadingStage].text}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-2 w-full justify-center">
                    {loadingSteps.map((_, idx) => (
                      <motion.div
                        key={idx}
                        className="h-1.5 rounded-full"
                        initial={false}
                        animate={{
                          width: idx === loadingStage ? 24 : 8,
                          backgroundColor:
                            idx <= loadingStage ? "#4f46e5" : "#e5e7eb",
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default UploadBox;
