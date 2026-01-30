import type { ReactNode } from "react";

const IconRender = ({ icon }: { icon: ReactNode }) => {
  return (
    <div className="bg-gray-200 cursor-pointer p-2 rounded-xl">{icon}</div>
  );
};

export default IconRender;
