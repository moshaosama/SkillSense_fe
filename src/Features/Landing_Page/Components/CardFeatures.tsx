import type { LucideIcon } from "lucide-react";

const CardFeatures = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col w-80 rounded-xl overflow-hidden mt-10 shadow shadow-gray-300 transition-all duration-200 group items-start gap-4 p-4 border border-gray-200">
      <div className="bg-(--main-color)/20 p-2 rounded-xl">
        <Icon className="w-8 h-8 text-(--main-color) group-hover:scale-110 transition-all duration-200" />
      </div>
      <div>
        <h1 className="font-bold text-lg wrap-break-word">{title}</h1>
        <p className="text-gray-500 font-semibold wrap-break-word w-76">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardFeatures;
