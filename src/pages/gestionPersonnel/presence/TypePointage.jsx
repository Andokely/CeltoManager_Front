import { useState } from "react"
import _Heure from "./_Heure"
import PersonnelCard from "./_PersonnelCard"
import { getCurrentTime } from "../../../fonction"
import api from "../../../api"
import { addNotify, errorNotify } from "../../../components/Notification/ToastUtil"
import _TabGroup from "../../../components/Tab/_TabGroup"
import { VscDebugBreakpointData } from "react-icons/vsc";
import Pointage from "./Pointage"


const TypePointage = () => {

    const typePointage = ["Entrée matin", "Sortie déjeuner", "Entrée déjeuner", "Sortie après-midi"];

    const tabs = [];
    for (let i = 0; i < typePointage.length; i++) {
        const label = typePointage[i];
        tabs.push({
            label,
            icon: VscDebugBreakpointData,
            title: label,
            content: <Pointage initialTypePointage={label} />
        });
    }



    return (
        <>
            <div className="w-full">
                <_TabGroup tabs={tabs} />
            </div>
        </>
    )

}

export default TypePointage