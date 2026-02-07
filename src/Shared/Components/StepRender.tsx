import type { ReactNode } from "react";
import cn from "../../utils/cn";

const StepRender = ({
  icon,
  text,
  isActive,
  isShowHr,
  handleMove
}: {
  icon: ReactNode;
  text: string;
  isActive: boolean;
  isShowHr: boolean;
  handleMove: (step?: number) => void
}) => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => handleMove()}>
          <div
            className={cn(
              isActive ? "bg-(--main-color) text-white" : "bg-gray-300",
              "p-3 rounded-full",
            )}
          >
            {icon}
          </div>

          <div>
            <h1
              className={cn(
                "text-md font-bold",
                isActive ? "text-(--main-color)" : "text-gray-400",
              )}
            >
              {text}
            </h1>
          </div>
        </div>

        {isShowHr && (
          <div>
            <hr className="h-0.5 border-0 w-40 bg-gray-500" />
          </div>
        )}
      </div>
    </>
  );
};

export default StepRender;
