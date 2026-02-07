import UploadSections from "../Features/Cv_Upload/Components/UploadSections"

const SwitchSections = ({currentSwitch}: {currentSwitch: number}) => {


    switch (currentSwitch) {
        case 1:
            return <UploadSections />
        case 2:
            return null
        case 3:
            return null
        case 4:
            return null
        default:
            return <UploadSections />
    }

}

export default SwitchSections