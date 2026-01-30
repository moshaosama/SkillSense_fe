import UploadBox from "./UploadBox";

const UploadSections = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Import your CV</h1>
          <p className="text-gray-400 text-sm font-medium">
            Upload your professional resume or import from LinkedIn to generate
            your AI-powered portfolio
          </p>
        </div>

        {/* Upload Box */}
        <UploadBox />

        {/* Uploaded File Preview */}
        {/* <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" size={22} />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Fullstack_Developer_2024.pdf
              </p>
              <p className="text-xs text-gray-400">2.1 MB • Ready to analyze</p>
            </div>
          </div>

          <button className="text-gray-400 hover:text-red-500 transition">
            <X size={18} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UploadSections;
