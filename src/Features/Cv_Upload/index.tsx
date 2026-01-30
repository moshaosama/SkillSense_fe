import { Upload } from "lucide-react";
import StepRender from "../../Shared/Components/StepRender";
import UploadSections from "./Components/UploadSections";

function index() {
  return (
    <div className="flex flex-col justify-center m-28 gap-20">
      <div className="flex justify-center">
        <StepRender
          icon={<Upload />}
          isActive={true}
          text="Upload"
          isShowHr={true}
        />
        <StepRender
          icon={<Upload />}
          isActive={false}
          text="Analyze"
          isShowHr={true}
        />
        <StepRender
          icon={<Upload />}
          isActive={false}
          text="Improve"
          isShowHr={true}
        />
        <StepRender
          icon={<Upload />}
          isActive={false}
          text="Export"
          isShowHr={false}
        />
      </div>

      <div>
        <UploadSections />
      </div>
    </div>
  );
}

export default index;
