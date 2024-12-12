import { useState } from "react";
import { _EnTete } from "../../components/_Entete"
import { _BtnIcon, _BtnText } from "../../components/_Bouton";
import { FaPlus, FaCheck } from 'react-icons/fa';
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from 'react-modal';
import { _TextInput } from "../../components/_Input";
import Select from 'react-select';
import _ConfirmationDialog from "../../components/_ConfirmationDialog";
import { addNotify, errorNotify } from "../../components/Notification/ToastUtil";
import axios from "axios";
import config from '../../../config.json'
import _Table from "../../components/_Table";
import { useEffect } from "react";
import { _Cellule, _CellulePhoto } from "../../components/_Cellule";
import _UploadImage from "../../components/_UploadImage";
import { data } from "react-router-dom";
Modal.setAppElement('#root');

function Poste() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [Poste, setPoste] = useState([]);
    const [dialogType, setDialogType] = useState(null);
    const [selectedPoste, setSelectedPoste] = useState(null);
    const [selectedPosteId, setSelectedPosteId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const initialFormState = {
        labelPoste: '',
    }
    const [formDatas, setFormDatas] = useState(initialFormState);

    const deletePosteMessage = "Voulez-vous vraiment supprimer ce poste ?"
    const deletePosteMessageType = "Confirmation de Suppression"

    const addPosteMessage = "Voulez-vous vraiment ajouter ce poste ?"
    const addPosteMessageType = "Confirmation d'ajout"

    const editPosteMessage = "Voulez-vous vraiment modifier ce poste ?"
    const editPosteMessageType = "Confirmation de modification"

    useEffect(() => {
        fetchPoste()
    }, [])

    const fetchPoste = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${config.API_HOST}/Postes`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })

            setPoste(response.data);

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
        setSelectedPoste(null)
    }
    const handleOpenDialog = (type) => {
        setDialogType(type);
        setDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogType(null);
        setSelectedPoste(null);
        setSelectedPosteId(null)
    }

    const handleAdd = (e) => {
        handleOpenDialog('addPoste')
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
            const response = await axios.post(`${config.API_HOST}/Postes`, JSON.stringify(dataObject), {
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
            await fetchPoste()
        } catch (error) {
            errorNotify({ message: error.response.data.message });
            handleCloseDialog();
        }
    }

    const handleDelete = async (PosteId) => {
        handleOpenDialog('deletePoste')
        setSelectedPosteId(PosteId)
    }

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${config.API_HOST}/Postes/${selectedPosteId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })

            addNotify({ message: response.data.message })
            handleCloseDialog()
            await fetchPoste()
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
        }

    }

    const handleEdit = async (PosteId) => {
        handleOpenDialog('editPoste')
    }

    const getPosteById = async (PosteId) => {
        setDialogType('editPoste')
        await openModal();
        setSelectedPosteId(PosteId)
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_HOST}/Postes/${PosteId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },

        })

        setFormDatas({
            labelPoste: response.data.labelPoste,
        })
    }

    const handleEditConfirm = async () => {
        try {
            const token = localStorage.getItem('token');

            const dataObject = formDatas;
            const response = await axios.patch(`${config.API_HOST}/Postes/${selectedPosteId}`, JSON.stringify(dataObject), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
            closeModal()
        }
        await fetchPoste();
    }


    const columns = [
        { Header: "Numero", accessor: "numero" },
        { Header: "Poste", accessor: "Poste" },
        { Header: "Action", accessor: "action", className: "text-center" },

    ];

    const dataTable = Poste.map((Poste, index) => ({
        numero: (<_Cellule valeur={index + 1} />),
        Poste: (<_Cellule valeur={Poste.labelPoste} />),
        action: (
            <>
                <div className="flex justify-center space-x-5">
                    <MdEdit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => getPosteById(Poste.id)}
                    />
                    <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(Poste.id)}
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
                    title={"Liste des Postes"}
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
                        <h2 className="text-xl mt-2 font-semibold">{dialogType === 'editPoste' ? 'Modifier un poste' : 'Ajouter un poste'}</h2>
                        <button onClick={closeModal} className="close-button text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>
                    <hr className='py-2' />

                    <div className=''>
                        <_TextInput
                            type="text"
                            name="labelPoste"
                            placeholder="poste ..."
                            value={formDatas.labelPoste}
                            onChange={handleChange}
                            labelLabel="Label poste"
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <_BtnText
                            text="Enregistrer"
                            onClick={dialogType === 'editPoste' ? handleEdit : handleAdd}
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
                    dialogType === 'deletePoste'
                        ? handleDeleteConfirm
                        : dialogType === 'editPoste'
                            ? handleEditConfirm
                            : handleAddConfirm
                }
                title={
                    dialogType === 'deletePoste'
                        ? deletePosteMessageType
                        : dialogType === 'editPoste'
                            ? editPosteMessageType
                            : addPosteMessageType
                }
                message={
                    dialogType === 'deletePoste'
                        ? deletePosteMessage
                        : dialogType === 'editPoste'
                            ? editPosteMessage
                            : addPosteMessage
                }
            />
        </>
    )

}

export default Poste