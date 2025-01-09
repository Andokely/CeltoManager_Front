import { useState } from "react";
import { _EnTete } from "../../../components/_Entete"
import { _BtnIcon, _BtnText } from "../../../components/_Bouton";
import { FaPlus, FaCheck } from 'react-icons/fa';
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from 'react-modal';
import { _TextInput, _DateInput, _IntInput } from "../../../components/_Input";
import Select from 'react-select';
import _ConfirmationDialog from "../../../components/_ConfirmationDialog";
import { addNotify, errorNotify } from "../../../components/Notification/ToastUtil";
import _Table from "../../../components/_Table";
import { useEffect } from "react";
import { _Cellule, _CellulePhoto } from "../../../components/_Cellule";
import _UploadImage from "../../../components/_UploadImage";
import { convertirDateEnFormatFrancais } from "../../../fonction";
import api from "../../../api";
Modal.setAppElement('#root');

function Personnel() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [personnels, setPersonnels] = useState([]);
    const [postes, setPostes] = useState([]);
    const [chaines, setChaines] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [dialogType, setDialogType] = useState(null);
    const [selectedPoste, setSelectedPoste] = useState(null);
    const [selectedSecteur, setSelectedSecteur] = useState(null);
    const [selectedChaine, setSelectedChaine] = useState(null);
    const [selectedPersonnelId, setSelectedPersonnelId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const initialFormState = {
        matricule: '',
        nom: '',
        prenoms: '',
        adresse: '',
        telephone: '',
        embauche: '',
        debauche: null,
        salaire: '',
        categorie: '',
        poste: '',
        chaine: '',
        secteur: '',
        lienPhoto: null,
        po: '',
    }
    const [formDatas, setFormDatas] = useState(initialFormState);
    const [change, setChange] = useState({});

    const deletePersonnelMessage = "Voulez-vous vraiment supprimer cet personnel ?"
    const deletePersonnelMessageType = "Confirmation de Suppression"

    const addPersonnelMessage = "Voulez-vous vraiment ajouter cet personnel ?"
    const addPersonnelMessageType = "Confirmation d'ajout"

    const editPersonnelMessage = "Voulez-vous vraiment modifier cet personnel ?"
    const editPersonnelMessageType = "Confirmation de modification"

    useEffect(() => {
        fetchPersonnels()
    }, [])

    const fetchPersonnels = async () => {
        try {
            const response = await api.get("/personnels")
            setPersonnels(response.data.personnels);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPoste = async () => {
        try {
            const response = await api.get("/postes")
            setPostes(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChaine = async () => {
        try {
            const response = await api.get("/chaines")
            setChaines(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSecteur = async () => {
        try {
            const response = await api.get(`/secteurs`)
            setSecteurs(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => {
        setModalIsOpen(true)
        fetchPoste()
        fetchChaine()
        fetchSecteur()
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setFormDatas(initialFormState);
        setDialogType(null);
        setSelectedPoste(null)
        setSelectedSecteur(null)
        setSelectedChaine(null)
    }
    const handleOpenDialog = (type) => {
        setDialogType(type);
        setDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogType(null);
        setSelectedPoste(null)
        setSelectedSecteur(null)
        setSelectedChaine(null)
        setSelectedPersonnelId(null)
        setChange({})
        closeModal()
    }
    const handleAdd = (e) => {
        handleOpenDialog('addPersonnel')
        console.log(formDatas)
    }
    const optionsPostes = postes.map(poste => ({
        value: poste.labelPoste,
        label: poste.labelPoste,
    }));
    const optionsChaines = chaines.map(chaine => ({
        value: chaine.labelChaine,
        label: chaine.labelChaine,
    }));
    const optionsSecteurs = secteurs.map(secteur => ({
        value: secteur.labelSecteur,
        label: secteur.labelSecteur,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas({
            ...formDatas,
            [name]: value,
        });

        setChange({
            ...change,
            [name]: value,
        })
    };

    const handleSelectedPoste = (poste) => {
        setSelectedPoste(poste)
        setFormDatas({
            ...formDatas,
            poste: poste.value,
        });
        setChange({
            ...change,
            poste: poste.value,
        });
    };

    const handleSelectedSecteur = (secteur) => {
        setSelectedSecteur(secteur)
        setFormDatas({
            ...formDatas,
            secteur: secteur.value,
        });
        setChange({
            ...change,
            secteur: secteur.value,
        });
    };
    const handleSelectedChaine = (chaine) => {
        setSelectedChaine(chaine)
        setFormDatas({
            ...formDatas,
            chaine: chaine.value,
        });
        setChange({
            ...change,
            chaine: chaine.value,
        });
    };

    const handleAddConfirm = async () => {
        try {
            const dataObject = formDatas;
            dataObject["salaire"] = parseFloat(formDatas.salaire)
            dataObject["po"] = parseInt(formDatas.po)

            const response = await api.post(`/personnels`, JSON.stringify(dataObject))
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
            await fetchPersonnels()
        } catch (error) {
            errorNotify({ message: error.response.data.message });
            handleCloseDialog();
        }
    }

    const handleDelete = async (personnelId) => {
        handleOpenDialog('deletePersonnel')
        setSelectedPersonnelId(personnelId)
    }

    const handleDeleteConfirm = async () => {
        try {
            const response = await api.delete(`/personnels/${selectedPersonnelId}`)
            addNotify({ message: response.data.message })
            handleCloseDialog()
            await fetchPersonnels()
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
        }

    }

    const handleEdit = async (personnelId) => {
        handleOpenDialog('editPersonnel')
    }

    const getPersonnelById = async (personnelId) => {
        setDialogType('editPersonnel')
        await openModal();
        setSelectedPersonnelId(personnelId)
        const response = await api.get(`/personnels/${personnelId}`)

        setFormDatas({
            matricule: response.data.matricule,
            nom: response.data.nom,
            prenoms: response.data.prenoms,
            adresse: response.data.adresse,
            telephone: response.data.telephone,
            embauche: response.data.embauche,
            debauche: response.data.debauche,
            salaire: response.data.salaire,
            categorie: response.data.categorie,
            poste: response.data.poste,
            chaine: response.data.chaine,
            secteur: response.data.secteur,
            lienPhoto: response.data.lienPhoto,
            po: response.data.po,
        });
        setSelectedPoste({
            value: response.data.poste,
            label: response.data.poste
        })
        setSelectedChaine({
            value: response.data.chaine,
            label: response.data.chaine
        })
        setSelectedSecteur({
            value: response.data.secteur,
            label: response.data.secteur
        })
    }

    const handleEditConfirm = async () => {
        try {
            const dataObject = change;
            dataObject["salaire"] = parseFloat(formDatas.salaire)
            dataObject["po"] = parseFloat(formDatas.po)

            await api.patch(`/personnels/${selectedPersonnelId}`, JSON.stringify(dataObject))
            handleCloseDialog();
            closeModal()
            addNotify({ message: "Personnel mis à jour avec succès" });
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
            closeModal()
        }
        await fetchPersonnels();
    }

    const columns = [
        { Header: "Photo", accessor: "photo" },
        { Header: "Matricule", accessor: "matricule" },
        { Header: "Nom", accessor: "nom" },
        { Header: "Prénoms", accessor: "prenoms", className: "text-center" },
        { Header: "Adresse", accessor: "adresse", className: "text-center" },
        { Header: "Télephone", accessor: "telephone", className: "text-center" },
        // { Header: "Embauche", accessor: "embauche", className: "text-center" },
        // { Header: "Salaire", accessor: "salaire", className: "text-center" },
        // { Header: "Catégorie", accessor: "categorie", className: "text-center" },
        { Header: "Poste", accessor: "poste", className: "text-center" },
        // { Header: "Chaine", accessor: "chaine", className: "text-center" },
        // { Header: "Secteur", accessor: "secteur", className: "text-center" },
        { Header: "Action", accessor: "action", className: "text-center" },

    ];

    const dataTable = personnels.map((personnel) => ({
        photo: (<_CellulePhoto valeur={personnel.lienPhoto} />),
        matricule: (<_Cellule valeur={personnel.matricule} />),
        nom: (<_Cellule valeur={personnel.nom} />),
        prenoms: (<_Cellule valeur={personnel.prenoms} />),
        adresse: (<_Cellule valeur={personnel.adresse} />),
        telephone: (<_Cellule valeur={personnel.telephone} />),
        // embauche: (<_Cellule valeur={convertirDateEnFormatFrancais(personnel.embauche)} />),
        // salaire: (<_Cellule valeur={personnel.salaire} />),
        // categorie: (<_Cellule valeur={personnel.categorie} />),
        poste: (<_Cellule valeur={personnel.poste} />),
        // chaine: (<_Cellule valeur={personnel.chaine} />),
        // secteur: (<_Cellule valeur={personnel.secteur} />),
        action: (
            <>
                <div className="flex justify-center space-x-5">
                    <MdEdit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => getPersonnelById(personnel.id)}
                    />
                    <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(personnel.id)}
                    />
                </div>
            </>
        ),
    }));

    return (
        <>
            <div
                className={`transition-all duration-700 ease-in-out px-5 transform`}>
                <_Table
                    entriesPerPage={{ defaultValue: 50, entries: [10, 25, 50, 100] }}
                    title={"Liste des personnels"}
                    canSearch={true}
                    table={{ columns, rows: dataTable }}
                    pagination={true}
                    loading={loading}
                // searchQuery={searchQuery}
                />
            </div>
            <_BtnIcon
                icon={FaPlus}
                variant="success"
                size="md"
                onClick={() => openModal()}
                className='fixed bottom-8 right-8'
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className="fixed inset-0  flex items-center animate-slideInUp justify-center bg-black bg-opacity-60"
                overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-80"
            >
                <div className="modal-content rounded-lg shadow-lg px-5 py-2 max-w-4xl w-full md:w-[100%] lg:w-[100%] relative" style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                    <div className="flex justify-between">
                        <h2 className="text-xl mt-2 font-semibold">{dialogType === 'editPersonnel' ? 'Modifier un personnel' : 'Ajouter un personnel'}</h2>
                        <button onClick={closeModal} className="close-button text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>
                    <hr className='py-2' />

                    <div className='grid grid-cols-2 gap-x-4'>
                        <_TextInput
                            type="text"
                            name="matricule"
                            placeholder="Matricule ..."
                            value={formDatas.matricule}
                            onChange={handleChange}
                            labelLabel="Matricule"
                        />
                        <_TextInput
                            type="text"
                            name="nom"
                            placeholder="Nom ..."
                            value={formDatas.nom}
                            onChange={handleChange}
                            labelLabel="Nom"
                        />
                        <_TextInput
                            type="text"
                            name="prenoms"
                            placeholder="Prénoms ..."
                            value={formDatas.prenoms}
                            onChange={handleChange}
                            labelLabel="Prénoms"
                        />
                        <_TextInput
                            type="text"
                            name="adresse"
                            placeholder="Adresse ..."
                            value={formDatas.adresse}
                            onChange={handleChange}
                            labelLabel="Adresse"
                        />
                        <_TextInput
                            type="text"
                            name="telephone"
                            placeholder="Télephone ..."
                            value={formDatas.telephone}
                            onChange={handleChange}
                            labelLabel="Télephone"
                        />
                        <_DateInput
                            name="embauche"
                            placeholder="Embauche ..."
                            value={formDatas.embauche}
                            onChange={handleChange}
                            labelLabel="Embauche"
                        />
                        <_IntInput
                            name="salaire"
                            placeholder="Salaire ..."
                            value={formDatas.salaire}
                            onChange={handleChange}
                            labelLabel="Salaire"
                        />
                        <_TextInput
                            type="text"
                            name="categorie"
                            placeholder="Catégorie ..."
                            value={formDatas.categorie}
                            onChange={handleChange}
                            labelLabel="Catégorie"
                        />
                        <div className='mb-5'>
                            <label htmlFor=""> Poste</label>
                            <Select
                                className="basic-single mt-2"
                                classNamePrefix="select"
                                name="poste"
                                options={optionsPostes}
                                placeholder="Selectionnez un ..."
                                value={selectedPoste}
                                onChange={handleSelectedPoste}
                                style={{ backgroundColor: 'var(--primary-1)' }}
                            />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor=""> Secteur</label>
                            <Select
                                className="basic-single mt-2"
                                classNamePrefix="select"
                                name="secteur"
                                options={optionsSecteurs}
                                placeholder="Selectionnez un ..."
                                value={selectedSecteur}
                                onChange={handleSelectedSecteur}
                                style={{ backgroundColor: 'var(--primary-1)' }}
                            />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor=""> Chaine</label>
                            <Select
                                className="basic-single mt-2"
                                classNamePrefix="select"
                                name="chaine"
                                options={optionsChaines}
                                placeholder="Selectionnez un ..."
                                value={selectedChaine}
                                onChange={handleSelectedChaine}
                                style={{ backgroundColor: 'var(--primary-1)' }}
                            />
                        </div>
                        <_IntInput
                            name="po"
                            placeholder="Poste opératoire ..."
                            value={formDatas.po}
                            onChange={handleChange}
                            labelLabel="Poste opératoire"
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <_BtnText
                            text="Enregistrer"
                            onClick={dialogType === 'editPersonnel' ? handleEdit : handleAdd}
                            variant="primary"
                            icon={FaCheck}
                            iconPosition="left"
                        />
                    </div>
                </div>
            </Modal>
            <_ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onConfirm={
                    dialogType === 'deletePersonnel'
                        ? handleDeleteConfirm
                        : dialogType === 'editPersonnel'
                            ? handleEditConfirm
                            : handleAddConfirm
                }
                title={
                    dialogType === 'deletePersonnel'
                        ? deletePersonnelMessageType
                        : dialogType === 'editPersonnel'
                            ? editPersonnelMessageType
                            : addPersonnelMessageType
                }
                message={
                    dialogType === 'deletePersonnel'
                        ? deletePersonnelMessage
                        : dialogType === 'editPersonnel'
                            ? editPersonnelMessage
                            : addPersonnelMessage
                }
            />
        </>
    )

}

export default Personnel