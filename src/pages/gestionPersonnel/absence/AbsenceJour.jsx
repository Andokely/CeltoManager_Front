import { useEffect, useState } from "react";
import api from "../../../api";
import { _Cellule } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";

const AbsenceJour = () => {
    const [absents, setAbsent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAbsent()
    }, [])

    const fetchAbsent = async () => {
        try {
            const response = await api.get(`/presences/absents`)
            setAbsent(response.data.absents);
        } catch (error) {
            console.error('Error fetching categories:', error);
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

    const dataTable = absents.map((absent, index) => ({
        matricule: (<_Cellule valeur={absent.matricule || "-"} />),
        nom: (<_Cellule valeur={absent.nom || "-"} />),
        prenoms: (<_Cellule valeur={absent.prenoms || "-"} />),
        poste: (<_Cellule valeur={absent.poste || "-"} />),
        secteur: (<_Cellule valeur={absent.secteur || "-"} />),
    }));

    return (
        <>
            <div>
                <div
                    className={`transition-all duration-700 ease-in-out px-5 transform`}>
                    <_Table
                        entriesPerPage={{ defaultValue: 50, entries: [10, 25, 50, 100] }}
                        title={"Liste des personnels absents"}
                        canSearch={true}
                        table={{ columns, rows: dataTable }}
                        pagination={true}
                        loading={loading}
                    // searchQuery={searchQuery}
                    />
                </div>
            </div>
        </>
    )
}

export default AbsenceJour