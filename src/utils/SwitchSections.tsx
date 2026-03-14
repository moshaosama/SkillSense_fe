import ComingSoonSection from "../Shared/Components/ComingSoonSection";
import UploadSections from "../Features/Cv_Upload/Components/UploadSections"
import ExportSections from "../Features/Final_Export/ExportSections"
import AnalysisHub from "../Features/Ai_Insights/Components/AnalysisHub";

const SwitchSections = ({ 
    currentSwitch, 
    onNext, 
    onUploadSuccess, 
    hasUploadedPdf,
    analysisData 
}: { 
    currentSwitch: number; 
    onNext: () => void; 
    onUploadSuccess?: () => void; 
    hasUploadedPdf?: boolean;
    analysisData?: any;
}) => {
    switch (currentSwitch) {
        case 1:
            return <UploadSections onNext={onNext} onUploadSuccess={onUploadSuccess} hasUploadedPdf={hasUploadedPdf} />
        case 2:
            return analysisData ? (
                <AnalysisHub analysis={analysisData} />
            ) : (
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
            return <UploadSections onNext={onNext} onUploadSuccess={onUploadSuccess} hasUploadedPdf={hasUploadedPdf} />
    }
}

export default SwitchSections