import { _Cellule } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";
import { MdEventBusy } from "react-icons/md";
import _TabGroup from "../../../components/Tab/_TabGroup";
import _Tabs from "../../../components/Tab/_Tabs";
import AbsenceJour from "./AbsenceJour";
import AbsencePoste from "./AbsencePoste";
import { FaUserSlash } from "react-icons/fa";

const Absence = () => {
    const tabs = [
        { id: "absenceJour", label: "Absence par jour", content: <AbsenceJour />, icon: MdEventBusy },
        { id: "absencePoste", label: "Absence par poste", content: <AbsencePoste />, icon: FaUserSlash },
    ];

    return (
        <>
            <div>
                <_Tabs tabs={tabs} />
            </div>
        </>
    )
}

export default Absence