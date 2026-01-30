import { Link2, Sparkles, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import CV_API from "../Services/CV.services";
import useAuth from "../../../Shared/Hooks/useAuth";

const UploadBox = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // const formData = new FormData();
    // formData.append("user_id", "1");
    // formData.append("cv", selectedFile);

    // try {
    //   const res = await fetch("http://localhost:3000/api/v1/cv/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   alert("File uploaded successfully!");
    // } catch (err) {
    //   console.error(err);
    //   alert("Upload failed!");
    // }

    await CV_API.UploadFile(user?.data?.id as string, selectedFile);

    setTimeout(() => {
      setIsLoading(false);

      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 3000);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="relative">
        <div
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-500 transition cursor-pointer"
          onClick={handleBrowseClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Upload className="text-blue-600" size={22} />
          </div>

          <p className="font-semibold text-gray-800">
            Drag & drop your CV here
          </p>

          <p className="text-sm text-gray-400">
            Supported formats: PDF, DOCX (Max 5MB)
          </p>

          <button
            type="button"
            onClick={handleBrowseClick}
            className="mt-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Browse Files
          </button>

          {/* File Preview */}
          {selectedFile && (
            <div className="mt-4 flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-gray-700 truncate">
                {selectedFile.name}
              </span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 rounded-full hover:bg-gray-200 transition"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 my-3">
        <label className="text-sm font-semibold my-5 text-gray-700">
          Import from LinkedIn <span className="text-gray-400">(Optional)</span>
        </label>

        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Link2 size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="https://linkedin.com/in/username"
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white px-6 py-4 rounded-lg flex items-center gap-3">
            <Upload className="animate-spin text-blue-600" size={24} />
            <span className="font-semibold text-gray-700">Uploading...</span>
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="w-full my-5 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
      >
        Start AI Analysis
        <Sparkles size={18} />
      </button>
    </>
  );
};

export default UploadBox;
