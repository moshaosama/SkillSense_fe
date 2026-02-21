import UploadSections from "../Features/Cv_Upload/Components/UploadSections"
import ExportSections from "../Features/Final_Export/ExportSections"

const SwitchSections = ({currentSwitch}: {currentSwitch: number}) => {


    switch (currentSwitch) {
        case 1:
            return <UploadSections />
        case 2:
            return null
        case 3:
            return null
        case 4:
            return <ExportSections/>
        default:
            return <UploadSections />
    }

}

export default SwitchSections