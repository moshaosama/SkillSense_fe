import type { ReactNode } from "react";

const SocialButton = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="flex cursor-pointer hover:bg-gray-100 transition-all duration-200 items-center border-2 py-3 justify-center rounded-xl border-gray-300 gap-2 w-full">
    {icon}
    <span className="font-bold text-sm sm:text-base">{text}</span>
  </div>
);

export default SocialButton;
