import { PartyPopper, Upload } from "lucide-react";
import StepRender from "../../Shared/Components/StepRender";
import { useState } from "react";
import SwitchSections from "../../utils/SwitchSections";

function Index() {
  const [currentStep, setCurrentStep] = useState(1);


  const handleMove = (step : number) => {
    setCurrentStep(step);
  };

  return (
    <div className="flex flex-col justify-center m-28 gap-20">
      <div className="flex justify-center">
        <StepRender
          icon={<Upload />}
          isActive={currentStep === 1}
          text="Upload"
          isShowHr={true}
          handleMove={() => handleMove(1)}
        />
        <StepRender
          icon={<Upload />}
          isActive={currentStep === 2}
          text="Analyze"
          isShowHr={true}
          handleMove={() => handleMove(2)}
        />
        <StepRender
          icon={<Upload />}
          isActive={currentStep === 3}
          text="Improve"
          isShowHr={true}
          handleMove={() => handleMove(3)}
        />
        <StepRender
          icon={<PartyPopper />}
          isActive={currentStep === 4}
          text="Export"
          isShowHr={false}
          handleMove={() => handleMove(4)}
        />
      </div>

      <div>
        <SwitchSections currentSwitch={currentStep}/>
      </div>
    </div>
  );
}

export default Index;
