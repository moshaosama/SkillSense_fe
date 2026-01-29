import { Aperture, FileText, Globe, LayoutDashboard } from "lucide-react";
import CardFeatures from "./cardFeatures";

const Features = () => {
  const cards = [
    {
      icon: LayoutDashboard,
      title: "Ai Scoring",
      description:
        "Get smart feedback and actionable insights on your CV content with our proprietary AI engine.",
    },
    {
      icon: Aperture,
      title: "ATS Optimization",
      description:
        "Ensure your resume passes through Applicant Tracking Systems with precise keyword matching.",
    },
    {
      icon: Globe,
      title: "Portfolio Generator",
      description:
        "Instantly convert your CV into a professional live web portfolio hosted on our platform.",
    },

    {
      icon: FileText,
      title: "PDF Export",
      description:
        "Download your optimized CV in various professional PDF templates optimized for recruiters.",
    },
  ];

  return (
    <div className="bg-white px-5 sm:px-10 md:px-20 flex flex-col gap-5 items-center py-10 justify-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
        Powerful Features for Tech Professionals
      </h1>
      <p className="text-gray-400 text-center max-w-2xl">
        Everything you need to stand out in the competitive tech job market and
        land your dream role.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-8 w-full">
        {cards?.map((card) => (
          <div
            key={card.title}
            className="w-full sm:w-[48%] lg:w-[23%] flex justify-center"
          >
            <CardFeatures
              icon={card.icon}
              description={card.description}
              title={card.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
