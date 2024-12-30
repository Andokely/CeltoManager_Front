import { useEffect, useState } from "react";
import { _BtnIcon } from "../../../components/_Bouton";
import api from "../../../api";
import _PersonnelCard from "./_PersonnelCard";
import _TabGroup from "../../../components/Tab/_TabGroup";
import { BiSolidSquareRounded } from "react-icons/bi";
import Piquage from "./Piquage";


const PresencePiquage = () => {
    const [chaine, setChaine] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPersonnelSecteur();
    }, []);

    const fetchPersonnelSecteur = async () => {
        try {
            const response = await api.get(`/chaines`);
            setChaine(response.data);
        } catch (error) {
            console.error("Error fetching chaine:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    const tabs = chaine.map((item) => ({
        label: `${item.labelChaine.split(" ")[1]}`,
        icon: <BiSolidSquareRounded className="w-4 h-4" />,
        title: item.labelChaine,
        content: <Piquage labelSecteur={"Piquage"} chaine={item.labelChaine} />
    }));

    return (
        <div className="">
            <_TabGroup tabs={tabs} />
        </div>
    );
};

export default PresencePiquage;
