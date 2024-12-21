import { useEffect, useState } from "react";
import api from "../../../api";
import { _Cellule } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";
import { VscDebugBreakpointData } from "react-icons/vsc";
import _TabGroup from "../../../components/Tab/_TabGroup";
import { _LoadingComponents } from "../../../components/_Loading";

const AbsenceSecteur = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAbsence();
    }, []);

    const fetchAbsence = async () => {
        try {
            const response = await api.get(`/presences/absentsParSecteur`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { Header: "Matricule", accessor: "matricule", className: "text-center" },
        { Header: "Nom", accessor: "nom", className: "text-center" },
        { Header: "Prénoms", accessor: "prenoms", className: "text-center" },
        { Header: "Poste", accessor: "poste", className: "text-center" },
        { Header: "Secteur", accessor: "secteur", className: "text-center" },
    ];

    const tabs = data.absentsBySector
        ? Object.keys(data.absentsBySector).map((secteur) => {
            const rows = data.absentsBySector[secteur].map((absence) => ({
                matricule: <_Cellule valeur={absence.matricule || "-"} />,
                nom: <_Cellule valeur={absence.nom || "-"} />,
                prenoms: <_Cellule valeur={absence.prenoms || "-"} />,
                poste: <_Cellule valeur={absence.poste || "-"} />,
                secteur: <_Cellule valeur={absence.secteur || "-"} />,
            }));

            return {
                label: secteur,
                icon: <VscDebugBreakpointData className="w-5 h-5" />,
                title: `${secteur}`,
                content: (
                    <div className="transition-all duration-700 ease-in-out px-5 transform">
                        <_Table
                            entriesPerPage={{ defaultValue: 50, entries: [10, 25, 50, 100] }}
                            title={`Liste des personnels présent - ${secteur}`}
                            canSearch={true}
                            table={{ columns, rows }}
                            pagination={true}
                            loading={false}
                        />
                    </div>
                ),
            };
        })
        : [];

    return (
        <>
            <div>
                {loading ? (
                    <div><_LoadingComponents /></div>
                ) : tabs.length > 0 ? (
                    <_TabGroup tabs={tabs} />
                ) : (
                    <div>Aucune donnée disponible</div>
                )}
            </div>
        </>
    );
};

export default AbsenceSecteur;
