import ComingSoonSection from "../Shared/Components/ComingSoonSection";
import UploadSections from "../Features/Cv_Upload/Components/UploadSections"
import ExportSections from "../Features/Final_Export/ExportSections"

const SwitchSections = ({ currentSwitch, onNext }: { currentSwitch: number; onNext: () => void }) => {
    switch (currentSwitch) {
        case 1:
            return <UploadSections onNext={onNext} />
        case 2:
            return (
                <ComingSoonSection
                    title="AI Analysis Hub"
                    description="We're training our AI to provide deep insights into your CV. Detailed scoring and skill mapping will be available soon."
                    iconType="analyze"
                    onNext={onNext}
                    nextLabel="Continue to Improve"
                />
            )
        case 3:
            return (
                <ComingSoonSection
                    title="Smart Improvement"
                    description="Automated CV rewriting and optimization based on your target job is in the works. Stand out from the crowd with AI-powered tweaks."
                    iconType="improve"
                    onNext={onNext}
                    nextLabel="Continue to Export"
                />
            )
        case 4:
            return <ExportSections />
        default:
            return <UploadSections onNext={onNext} />
    }
}

export default SwitchSections