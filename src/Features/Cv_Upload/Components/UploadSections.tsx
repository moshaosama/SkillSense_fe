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
        <UploadBox />

      </div>
    </div>
  );
};

export default UploadSections;
