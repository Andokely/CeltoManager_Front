import { _Cellule } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";
import PresenceJour from "./PresenceJour";
import Pointage from "./Pointage";
import Chaine from "../../gestionUtilisateur/Chaine";
import { MdToday, MdDateRange } from "react-icons/md";
import { IoMdToday } from "react-icons/io";
import { BiFingerprint } from "react-icons/bi";
import _TabGroup from "../../../components/Tab/_TabGroup";
import _Tabs from "../../../components/Tab/_Tabs";
import PresenceSecteur from "./PresenceSecteur";

const Presence = () => {
    const tabs = [
        { id: "pointage", label: "Pointage", content: <Pointage />, icon: BiFingerprint },
        { id: "presence1", label: "Présence par jour", content: <PresenceJour />, icon: MdToday },
        { id: "presence2", label: "Présence par secteur", content: <PresenceSecteur />, icon: IoMdToday },
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