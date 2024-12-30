import { useEffect, useState } from "react";
import { _BtnIcon } from "../../../components/_Bouton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import _Tabs from "../../../components/Tab/_Tabs";
import { VscDebugBreakpointData } from "react-icons/vsc";
import PresenceSecteur from "./PresenceSecteur";
import { _LoadingFull } from "../../../components/_Loading";
import PresencePiquage from "./PresencePiquage";


const Presence = () => {
    const navigate = useNavigate();
    const [secteur, setSecteur] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSecteur();
    }, []);

    const fetchSecteur = async () => {
        try {
            const response = await api.get(`/secteurs`);
            setSecteur(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = secteur.map((item) => ({
        id: `secteur-${item.id}`,
        label: item.labelSecteur,
        icon: VscDebugBreakpointData,
        content: item.labelSecteur === "Piquage"
            ? <PresencePiquage/>
            : <PresenceSecteur labelSecteur={item.labelSecteur} />
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
