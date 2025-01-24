import { useEffect, useState } from "react";
import api from "../../../api";
import { _Cellule, _CellulePhoto } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";
import { _InputSearch } from "../../../components/_Input";

const AbsenceJour = () => {
    const [absents, setAbsent] = useState([]);
    const [searchValue, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAbsent();
    }, []);

    const fetchAbsent = async () => {
        try {
            const response = await api.get(`/presences/absents`);
            setAbsent(response.data.absents);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredAbsents = absents.filter(absent =>
        absent.matricule?.toLowerCase().includes(searchValue) ||
        absent.prenoms?.toLowerCase().includes(searchValue) ||
        absent.poste?.toLowerCase().includes(searchValue) ||
        absent.secteur?.toLowerCase().includes(searchValue)
    );

    const columns = [
        { Header: "Photo", accessor: "photo" },
        { Header: "Matricule", accessor: "matricule", className: "text-center" },
        { Header: "Prénoms", accessor: "prenoms", className: "text-center" },
        { Header: "Poste", accessor: "poste", className: "text-center" },
        { Header: "Secteur", accessor: "secteur", className: "text-center" },
    ];

    const dataTable = filteredAbsents.map((absent, index) => ({
        photo: <_CellulePhoto valeur={absent.lienPhoto} />,
        matricule: <_Cellule valeur={absent.matricule || "-"} />,
        prenoms: <_Cellule valeur={absent.prenoms || "-"} />,
        poste: <_Cellule valeur={absent.poste || "-"} />,
        secteur: <_Cellule valeur={absent.secteur || "-"} />,
    }));

    return (
        <>
            <div>
                <div
                    className={`transition-all duration-700 ease-in-out px-5 transform`}>
                    <div className="flex mt-1 items-center justify-end">
                        <_InputSearch
                            name="search"
                            placeholder="Recherchez ici..."
                            value={searchValue}
                            onChange={handleSearch}
                            className={"fixed top-2 z-10 right-8"}
                        />
                    </div>
                    <_Table
                        entriesPerPage={{ defaultValue: 50, entries: [10, 25, 50, 100] }}
                        title={"Liste des personnels absents"}
                        canSearch={false} // Désactive la recherche interne
                        table={{ columns, rows: dataTable }}
                        pagination={true}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
};

export default AbsenceJour;
