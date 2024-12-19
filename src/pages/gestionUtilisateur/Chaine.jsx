import { useState } from "react";
import { _EnTete } from "../../components/_Entete"
import { _BtnIcon, _BtnText } from "../../components/_Bouton";
import { FaPlus, FaCheck } from 'react-icons/fa';
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from 'react-modal';
import { _TextInput, _IntInput } from "../../components/_Input";
import _ConfirmationDialog from "../../components/_ConfirmationDialog";
import { addNotify, errorNotify } from "../../components/Notification/ToastUtil";
import _Table from "../../components/_Table";
import { useEffect } from "react";
import { _Cellule, _CellulePhoto } from "../../components/_Cellule";
import _UploadImage from "../../components/_UploadImage";
import api from "../../api";
Modal.setAppElement('#root');

function Chaine() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [Chaine, setChaine] = useState([]);
    const [dialogType, setDialogType] = useState(null);
    const [selectedChaine, setSelectedChaine] = useState(null);
    const [selectedChaineId, setSelectedChaineId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const initialFormState = {
        labelChaine: '',
        nbrsOperateur: ''
    }
    const [formDatas, setFormDatas] = useState(initialFormState);

    const deleteChaineMessage = "Voulez-vous vraiment supprimer ce Chaine ?"
    const deleteChaineMessageType = "Confirmation de Suppression"

    const addChaineMessage = "Voulez-vous vraiment ajouter ce Chaine ?"
    const addChaineMessageType = "Confirmation d'ajout"

    const editChaineMessage = "Voulez-vous vraiment modifier ce Chaine ?"
    const editChaineMessageType = "Confirmation de modification"

    useEffect(() => {
        fetchChaine()
    }, [])

    const fetchChaine = async () => {
        try {
            const response = await api.get(`/Chaines`)
            setChaine(response.data);
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
        setSelectedChaine(null)
    }
    const handleOpenDialog = (type) => {
        setDialogType(type);
        setDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogType(null);
        setSelectedChaine(null);
        setSelectedChaineId(null)
        closeModal()
    }

    const handleAdd = (e) => {
        handleOpenDialog('addChaine')
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
            dataObject["nbrsOperateur"] = parseFloat(formDatas.nbrsOperateur)
            
            const response = await api.post(`/Chaines`, JSON.stringify(dataObject))
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
            await fetchChaine()
        } catch (error) {
            errorNotify({ message: error.response.data.message });
            handleCloseDialog();
        }
    }

    const handleDelete = async (ChaineId) => {
        handleOpenDialog('deleteChaine')
        setSelectedChaineId(ChaineId)
    }

    const handleDeleteConfirm = async () => {
        try {
            const response = await api.delete(`/Chaines/${selectedChaineId}`)
            addNotify({ message: response.data.message })
            handleCloseDialog()
            await fetchChaine()
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
        }

    }

    const handleEdit = async (ChaineId) => {
        handleOpenDialog('editChaine')
    }

    const getChaineById = async (ChaineId) => {
        setDialogType('editChaine')
        await openModal();
        setSelectedChaineId(ChaineId)
        const response = await api.get(`/Chaines/${ChaineId}`)
        setFormDatas({
            labelChaine: response.data.labelChaine,
            nbrsOperateur: response.data.nbrsOperateur,
        })
    }

    const handleEditConfirm = async () => {
        try {
            const dataObject = formDatas;
            dataObject["nbrsOperateur"] = parseFloat(formDatas.nbrsOperateur)

            const response = await api.patch(`/Chaines/${selectedChaineId}`, JSON.stringify(dataObject))
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
            closeModal()
        }
        await fetchChaine();
    }


    const columns = [
        { Header: "Numero", accessor: "numero", className: "text-center" },
        { Header: "Chaine", accessor: "chaine", className: "text-center" },
        { Header: "Nombre opérateur", accessor: "nbrsOperateur", className: "text-center" },
        { Header: "Action", accessor: "action", className: "text-center" },

    ];

    const dataTable = Chaine.map((Chaine, index) => ({
        numero: (<_Cellule valeur={index + 1} />),
        chaine: (<_Cellule valeur={Chaine.labelChaine} />),
        nbrsOperateur: (<_Cellule valeur={Chaine.nbrsOperateur} />),
        action: (
            <>
                <div className="flex justify-center space-x-5">
                    <MdEdit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => getChaineById(Chaine.id)}
                    />
                    <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(Chaine.id)}
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
                    title={"Liste des Chaines"}
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
                        <h2 className="text-xl mt-2 font-semibold">{dialogType === 'editChaine' ? 'Modifier un Chaine' : 'Ajouter un Chaine'}</h2>
                        <button onClick={closeModal} className="close-button text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>
                    <hr className='py-2' />

                    <div className=''>
                        <_TextInput
                            type="text"
                            name="labelChaine"
                            placeholder="Chaine ..."
                            value={formDatas.labelChaine}
                            onChange={handleChange}
                            labelLabel="Label Chaine"
                        />
                        <_IntInput
                            name="nbrsOperateur"
                            placeholder="Nombre opérateur ..."
                            value={formDatas.nbrsOperateur}
                            onChange={handleChange}
                            labelLabel="Nombre opérateur"
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <_BtnText
                            text="Enregistrer"
                            onClick={dialogType === 'editChaine' ? handleEdit : handleAdd}
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
                    dialogType === 'deleteChaine'
                        ? handleDeleteConfirm
                        : dialogType === 'editChaine'
                            ? handleEditConfirm
                            : handleAddConfirm
                }
                title={
                    dialogType === 'deleteChaine'
                        ? deleteChaineMessageType
                        : dialogType === 'editChaine'
                            ? editChaineMessageType
                            : addChaineMessageType
                }
                message={
                    dialogType === 'deleteChaine'
                        ? deleteChaineMessage
                        : dialogType === 'editChaine'
                            ? editChaineMessage
                            : addChaineMessage
                }
            />
        </>
    )

}

export default Chaine