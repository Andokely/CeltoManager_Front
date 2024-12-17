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

function Role() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState([]);
    const [dialogType, setDialogType] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const initialFormState = {
        labelRole: '',
    }
    const [formDatas, setFormDatas] = useState(initialFormState);

    const deleteRoleMessage = "Voulez-vous vraiment supprimer ce rôle ?"
    const deleteRoleMessageType = "Confirmation de Suppression"

    const addRoleMessage = "Voulez-vous vraiment ajouter ce rôle ?"
    const addRoleMessageType = "Confirmation d'ajout"

    const editRoleMessage = "Voulez-vous vraiment modifier ce rôle ?"
    const editRoleMessageType = "Confirmation de modification"

    useEffect(() => {
        fetchRole()
    }, [])

    const fetchRole = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${config.API_HOST}/roles`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })

            setRole(response.data);

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
        setSelectedRole(null)
    }
    const handleOpenDialog = (type) => {
        setDialogType(type);
        setDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogType(null);
        setSelectedRole(null);
        setSelectedRoleId(null);
        closeModal()
    }

    const handleAdd = (e) => {
        handleOpenDialog('addRole')
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
            const response = await axios.post(`${config.API_HOST}/roles`, JSON.stringify(dataObject), {
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
            await fetchRole()
        } catch (error) {
            errorNotify({ message: error.response.data.message });
            handleCloseDialog();
        }
    }

    const handleDelete = async (roleId) => {
        handleOpenDialog('deleteRole')
        setSelectedRoleId(roleId)
    }

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${config.API_HOST}/roles/${selectedRoleId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })

            addNotify({ message: response.data.message })
            handleCloseDialog()
            await fetchRole()
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
        }

    }

    const handleEdit = async (roleId) => {
        handleOpenDialog('editRole')
    }

    const getRoleById = async (roleId) => {
        setDialogType('editRole')
        await openModal();
        setSelectedRoleId(roleId)
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_HOST}/roles/${roleId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },

        })

        setFormDatas({
            labelRole: response.data.labelRole,
        })
    }

    const handleEditConfirm = async () => {
        try {
            const token = localStorage.getItem('token');

            const dataObject = formDatas;
            const response = await axios.patch(`${config.API_HOST}/roles/${selectedRoleId}`, JSON.stringify(dataObject), {
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
        await fetchRole();
    }


    const columns = [
        { Header: "Numero", accessor: "numero" },
        { Header: "Role", accessor: "role" },
        { Header: "Action", accessor: "action", className: "text-center" },

    ];

    const dataTable = role.map((role, index) => ({
        numero: (<_Cellule valeur={(index + 1).toString()} />),
        role: (<_Cellule valeur={role.labelRole} />),
        action: (
            <>
                <div className="flex justify-center space-x-5">
                    <MdEdit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => getRoleById(role.id)}
                    />
                    <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(role.id)}
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
                    title={"Liste des roles"}
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
                        <h2 className="text-xl mt-2 font-semibold">{dialogType === 'editRole' ? 'Modifier un rôle' : 'Ajouter un rôle'}</h2>
                        <button onClick={closeModal} className="close-button text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>
                    <hr className='py-2' />

                    <div className=''>
                        <_TextInput
                            type="text"
                            name="labelRole"
                            placeholder="Rôle ..."
                            value={formDatas.labelRole}
                            onChange={handleChange}
                            labelLabel="Label rôle"
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <_BtnText
                            text="Enregistrer"
                            onClick={dialogType === 'editRole' ? handleEdit : handleAdd}
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
                    dialogType === 'deleteRole'
                        ? handleDeleteConfirm
                        : dialogType === 'editRole'
                            ? handleEditConfirm
                            : handleAddConfirm
                }
                title={
                    dialogType === 'deleteRole'
                        ? deleteRoleMessageType
                        : dialogType === 'editRole'
                            ? editRoleMessageType
                            : addRoleMessageType
                }
                message={
                    dialogType === 'deleteRole'
                        ? deleteRoleMessage
                        : dialogType === 'editRole'
                            ? editRoleMessage
                            : addRoleMessage
                }
            />
        </>
    )

}

export default Role