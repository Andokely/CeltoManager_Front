import { useState } from "react";
import { _EnTete } from "../../components/_Entete"
import { _BtnIcon, _BtnText } from "../../components/_Bouton";
import { FaPlus, FaCheck } from 'react-icons/fa';
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from 'react-modal';
import { _TextInput } from "../../components/_Input";
import _ConfirmationDialog from "../../components/_ConfirmationDialog";
import { addNotify, errorNotify } from "../../components/Notification/ToastUtil";
import _Table from "../../components/_Table";
import { useEffect } from "react";
import { _Cellule, _CellulePhoto } from "../../components/_Cellule";
import _UploadImage from "../../components/_UploadImage";
import api from "../../api";
Modal.setAppElement('#root');

function Secteur() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [Secteur, setSecteur] = useState([]);
    const [dialogType, setDialogType] = useState(null);
    const [selectedSecteur, setSelectedSecteur] = useState(null);
    const [selectedSecteurId, setSelectedSecteurId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const initialFormState = {
        labelSecteur: '',
    }
    const [formDatas, setFormDatas] = useState(initialFormState);

    const deleteSecteurMessage = "Voulez-vous vraiment supprimer ce Secteur ?"
    const deleteSecteurMessageType = "Confirmation de Suppression"

    const addSecteurMessage = "Voulez-vous vraiment ajouter ce Secteur ?"
    const addSecteurMessageType = "Confirmation d'ajout"

    const editSecteurMessage = "Voulez-vous vraiment modifier ce Secteur ?"
    const editSecteurMessageType = "Confirmation de modification"

    useEffect(() => {
        fetchSecteur()
    }, [])

    const fetchSecteur = async () => {
        try {
            const response = await api.get(`/Secteurs`)
            setSecteur(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {
        setModalIsOpen(false);
        setFormDatas(initialFormState);
        setDialogType(null);
        setSelectedSecteur(null)
    }
    const handleOpenDialog = (type) => {
        setDialogType(type);
        setDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogType(null);
        setSelectedSecteur(null);
        setSelectedSecteurId(null);
        closeModal()
    }

    const handleAdd = (e) => {
        handleOpenDialog('addSecteur')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas({
            ...formDatas,
            [name]: value,
        });
    };

    const handleAddConfirm = async () => {
        try {
            const dataObject = formDatas;
            const response = await api.post(`/Secteurs`, JSON.stringify(dataObject))
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
            await fetchSecteur()
        } catch (error) {
            errorNotify({ message: error.response.data.message });
            handleCloseDialog();
        }
    }

    const handleDelete = async (SecteurId) => {
        handleOpenDialog('deleteSecteur')
        setSelectedSecteurId(SecteurId)
    }

    const handleDeleteConfirm = async () => {
        try {
            const response = await api.delete(`/Secteurs/${selectedSecteurId}`)
            addNotify({ message: response.data.message })
            handleCloseDialog()
            await fetchSecteur()
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
        }

    }

    const handleEdit = async (SecteurId) => {
        handleOpenDialog('editSecteur')
    }

    const getSecteurById = async (SecteurId) => {
        setDialogType('editSecteur')
        await openModal();
        setSelectedSecteurId(SecteurId)

        const response = await api.get(`/Secteurs/${SecteurId}`)

        setFormDatas({
            labelSecteur: response.data.labelSecteur,
        })
    }

    const handleEditConfirm = async () => {
        try {
            const dataObject = formDatas;
            const response = await api.patch(`/Secteurs/${selectedSecteurId}`, JSON.stringify(dataObject))
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
            closeModal()
        }
        await fetchSecteur();
    }


    const columns = [
        { Header: "Numero", accessor: "numero" },
        { Header: "Secteur", accessor: "Secteur" },
        { Header: "Action", accessor: "action", className: "text-center" },

    ];

    const dataTable = Secteur.map((Secteur, index) => ({
        numero: (<_Cellule valeur={index + 1} />),
        Secteur: (<_Cellule valeur={Secteur.labelSecteur} />),
        action: (
            <>
                <div className="flex justify-center space-x-5">
                    <MdEdit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => getSecteurById(Secteur.id)}
                    />
                    <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(Secteur.id)}
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
                    title={"Liste des Secteurs"}
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
                <div className="modal-content rounded-lg shadow-lg px-5 py-2 max-w-lg w-full md:w-2/3 lg:w-2/3 relative" style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                    <div className="flex justify-between">
                        <h2 className="text-xl mt-2 font-semibold">{dialogType === 'editSecteur' ? 'Modifier un Secteur' : 'Ajouter un Secteur'}</h2>
                        <button onClick={closeModal} className="close-button text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>
                    <hr className='py-2' />

                    <div className=''>
                        <_TextInput
                            type="text"
                            name="labelSecteur"
                            placeholder="Secteur ..."
                            value={formDatas.labelSecteur}
                            onChange={handleChange}
                            labelLabel="Label Secteur"
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <_BtnText
                            text="Enregistrer"
                            onClick={dialogType === 'editSecteur' ? handleEdit : handleAdd}
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
                    dialogType === 'deleteSecteur'
                        ? handleDeleteConfirm
                        : dialogType === 'editSecteur'
                            ? handleEditConfirm
                            : handleAddConfirm
                }
                title={
                    dialogType === 'deleteSecteur'
                        ? deleteSecteurMessageType
                        : dialogType === 'editSecteur'
                            ? editSecteurMessageType
                            : addSecteurMessageType
                }
                message={
                    dialogType === 'deleteSecteur'
                        ? deleteSecteurMessage
                        : dialogType === 'editSecteur'
                            ? editSecteurMessage
                            : addSecteurMessage
                }
            />
        </>
    )

}

export default Secteur