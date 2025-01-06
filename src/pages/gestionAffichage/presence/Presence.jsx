import { useEffect, useState } from "react";
import { _BtnIcon } from "../../../components/_Bouton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import _Tabs from "../../../components/Tab/_Tabs";
import { VscDebugBreakpointData } from "react-icons/vsc";
import PresencePoste from "./PresencePoste";
import { _LoadingFull } from "../../../components/_Loading";
import PresencePiquage from "./PresencePiquage";


const Presence = () => {
    const navigate = useNavigate();
    const [poste, setPoste] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPoste();
    }, []);

    const fetchPoste = async () => {
        try {
            const response = await api.get(`/postes`);
            setPoste(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = poste.map((item) => ({
        id: `poste-${item.id}`,
        label: item.labelPoste,
        icon: VscDebugBreakpointData,
        content: item.labelPoste === "MACHINISTE"
            ? <PresencePiquage/>
            : <PresencePoste labelPoste={item.labelPoste} />
    }));

    return (
        <>
            <div className="px-5">

                {loading ? (
                    <div><_LoadingFull /></div>
                ) : (
                    <_Tabs tabs={tabs} />
                )}
            </div>

            <_BtnIcon
                icon={IoMdArrowRoundBack}
                variant="primary"
                size="md"
                onClick={() => navigate("/affichage")}
                className="fixed bottom-8 right-8"
            />
        </>
    );
};

export default Presence;
