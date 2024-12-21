import { useEffect, useState } from "react";
import api from "../../../api";
import { _Cellule } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";

const PresenceJour = () => {
    const [presences, setPrsences] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetchPresence()
    }, [])

    const fetchPresence = async () => {
        try {
            const response = await api.get(`/presences`)
            setPrsences(response.data.presences);
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
        { Header: "Entree", accessor: "entree", className: "text-center" },
        { Header: "Entree Dej", accessor: "entreeDej", className: "text-center" },
        { Header: "Sortie Dej", accessor: "sortieDej", className: "text-center" },
        { Header: "Sortie", accessor: "sortie", className: "text-center" },
        { Header: "Retard", accessor: "retard", className: "text-center" },
    ];

    const dataTable = presences.map((presence, index) => ({
        matricule: (<_Cellule valeur={presence.personnel.matricule || "-"} />),
        nom: (<_Cellule valeur={presence.personnel.nom || "-"} />),
        prenoms: (<_Cellule valeur={presence.personnel.prenoms || "-"} />),
        poste: (<_Cellule valeur={presence.personnel.poste || "-"} />),
        entree: (<_Cellule valeur={presence.entree || "-"} />),
        entreeDej: (<_Cellule valeur={presence.entreeDej || "-"} />),
        sortieDej: (<_Cellule valeur={presence.sortieDej || "-"} />),
        sortie: (<_Cellule valeur={presence.sortie || "-"} />),
        retard: (<_Cellule valeur={presence.retard || "-"} />),
    }));

    return (
        <>
            <div>
                <div
                    className={`transition-all duration-700 ease-in-out px-5 transform`}>
                    <_Table
                        entriesPerPage={{ defaultValue: 50, entries: [10, 25, 50, 100] }}
                        title={"Liste des personnels présent"}
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

export default PresenceJour