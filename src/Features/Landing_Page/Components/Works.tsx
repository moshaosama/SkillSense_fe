import { FaFileUpload, FaRobot, FaMagic, FaRocket } from "react-icons/fa";

const steps = [
  {
    icon: <FaFileUpload />,
    title: "Upload CV",
    description:
      "Upload your existing resume in PDF or Word format. Our AI extracts your professional history automatically.",
  },
  {
    icon: <FaRobot />,
    title: "AI Feedback",
    description:
      "Receive an instant AI score and detailed improvement suggestions tailored to your specific tech stack.",
  },
  {
    icon: <FaMagic />,
    title: "Optimize",
    description:
      "Apply smart suggestions to enhance your content and keywords, making it easier for recruiters to find you.",
  },
  {
    icon: <FaRocket />,
    title: "Export & Launch",
    description:
      "Download your high-quality PDF or launch your personal portfolio website with a single click.",
  },
];

const Works = () => {
  return (
    <div className="max-w-4xl mx-10 px-4 sm:px-6 md:px-8 py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2">
        How It Works
      </h2>
      <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-6 md:ml-8">
        {steps.map((step, index) => (
          <div key={index} className="mb-10 relative sm:mb-12 md:mb-16">
            <span className="absolute -left-6 sm:-left-8 md:-left-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-blue-500 text-white text-lg sm:text-xl md:text-2xl">
              {step.icon}
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 ml-10 sm:ml-14 md:ml-16">
              {step.title}
            </h3>
            <p className="text-gray-600 ml-10 sm:ml-14 md:ml-16 text-sm sm:text-base md:text-lg">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
