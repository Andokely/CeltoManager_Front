import { useEffect, useState } from "react";
import api from "../../../api";
import { _Cellule, _CellulePhoto } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";
import { formatMinuteEnHeure } from "../../../fonction";
import { _InputSearch } from "../../../components/_Input";

const PresenceJour = () => {
    const [presences, setPresences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchPresence();
    }, []);

    const fetchPresence = async () => {
        try {
            const response = await api.get(`/presences`);
            setPresences(response.data.presences);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { Header: "Photo", accessor: "photo" },
        { Header: "Matricule", accessor: "matricule", className: "text-center" },
        { Header: "Prénoms", accessor: "prenoms", className: "text-center" },
        { Header: "Poste", accessor: "poste", className: "text-center" },
        { Header: "Entree", accessor: "entree", className: "text-center" },
        { Header: "Entree Dej", accessor: "entreeDej", className: "text-center" },
        { Header: "Sortie Dej", accessor: "sortieDej", className: "text-center" },
        { Header: "Sortie", accessor: "sortie", className: "text-center" },
        { Header: "Retard", accessor: "retard", className: "text-center" },
    ];

    const renderCell = (valeur, defaultValue = "-") => <_Cellule valeur={valeur || defaultValue} />;
    const renderPhoto = (lienPhoto) => <_CellulePhoto valeur={lienPhoto} />;
    const formatRetard = (retard) => (retard !== null && retard !== undefined ? formatMinuteEnHeure(retard) : "-");

    // Filtrage des données
    const filteredPresences = presences.filter((presence) => {
        const search = searchValue.toLowerCase();
        return (
            presence.personnel?.matricule?.toLowerCase().includes(search) ||
            presence.personnel?.prenoms?.toLowerCase().includes(search) ||
            presence.personnel?.poste?.toLowerCase().includes(search) ||
            presence.entree?.toLowerCase().includes(search) ||
            presence.entreeDej?.toLowerCase().includes(search) ||
            presence.sortieDej?.toLowerCase().includes(search) ||
            presence.sortie?.toLowerCase().includes(search) ||
            (presence.retard !== null &&
                presence.retard !== undefined &&
                formatMinuteEnHeure(presence.retard).toLowerCase().includes(search))
        );
    });

    // Génération des données pour la table
    const dataTable = filteredPresences.map((presence) => ({
        photo: renderPhoto(presence.personnel?.lienPhoto),
        matricule: renderCell(presence.personnel?.matricule),
        prenoms: renderCell(presence.personnel?.prenoms),
        poste: renderCell(presence.personnel?.poste),
        entree: renderCell(presence.entree),
        entreeDej: renderCell(presence.entreeDej),
        sortieDej: renderCell(presence.sortieDej),
        sortie: renderCell(presence.sortie),
        retard: renderCell(formatRetard(presence.retard)),
    }));

    return (
        <div>
            <div className="transition-all duration-700 ease-in-out px-5 transform">
                <div className="flex mt-1 items-center justify-end">
                    <_InputSearch
                        name="search"
                        placeholder="Recherchez ici..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={"fixed top-2 z-10 right-8"}
                    />
                </div>
                <_Table
                    entriesPerPage={{ defaultValue: 50, entries: [10, 25, 50, 100] }}
                    title={"Liste des personnels présents"}
                    canSearch={true}
                    table={{ columns, rows: dataTable }}
                    pagination={true}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default PresenceJour;
