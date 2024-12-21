import { useEffect, useState } from "react";
import api from "../../../api";
import { _Cellule } from "../../../components/_Cellule";
import _Table from "../../../components/_Table";

const Presence = () => {
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
        // { Header: "Action", accessor: "action", className: "text-center" },

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
        // action: (
        //     <>
        //         <div className="flex justify-center space-x-5">
        //             <MdEdit
        //                 className="text-blue-500 cursor-pointer"
        //                 size={20}
        //                 onClick={() => getChaineById(Chaine.id)}
        //             />
        //             <MdDelete
        //                 className="text-red-500 cursor-pointer"
        //                 size={20}
        //                 onClick={() => handleDelete(Chaine.id)}
        //             />
        //         </div>
        //     </>
        // ),
    }));

    return (
        <>
            <div>
                <div class="border-b border-gray-200 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li class="me-2">
                            <a href="/personnel/pointage" class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>Profile
                            </a>
                        </li>
                        <li class="me-2">
                            <a href="#" class="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                                <svg class="w-4 h-4 me-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>Dashboard
                            </a>
                        </li>
                        <li class="me-2">
                            <a href="#" class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                                </svg>Settings
                            </a>
                        </li>
                        <li class="me-2">
                            <a href="#" class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                </svg>Contacts
                            </a>
                        </li>
                        <li>
                            <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
                        </li>
                    </ul>
                </div>

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

export default Presence