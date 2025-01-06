import { _Cellule } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";
import PresenceJour from "./PresenceJour";
import Chaine from "../../gestionUtilisateur/Chaine";
import { MdToday, MdDateRange } from "react-icons/md";
import { IoMdToday } from "react-icons/io";
import { BiFingerprint } from "react-icons/bi";
import _TabGroup from "../../../components/Tab/_TabGroup";
import _Tabs from "../../../components/Tab/_Tabs";
import PresencePoste from "./PresencePoste";
import TypePointage from "./TypePointage";

const Presence = () => {
    const tabs = [
        { id: "pointage", label: "Pointage", content: <TypePointage />, icon: BiFingerprint },
        { id: "presence1", label: "Présence par jour", content: <PresenceJour />, icon: MdToday },
        { id: "presence2", label: "Présence par poste", content: <PresencePoste />, icon: IoMdToday },
        { id: "presence3", label: "Présence par période", content: <Chaine />, icon: MdDateRange },
    ];

    return (
        <>
            <div>
                <_Tabs tabs={tabs} />
            </div>
        </>
    )
}

export default Presence