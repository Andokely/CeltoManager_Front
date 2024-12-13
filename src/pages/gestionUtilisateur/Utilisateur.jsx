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

function Utilisateur() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [dialogType, setDialogType] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const initialFormState = {
        pseudo: '',
        nom: '',
        email: '',
        motDePasse: '',
        role: '',
    }
    const [formDatas, setFormDatas] = useState(initialFormState);

    const deleteUserMessage = "Voulez-vous vraiment supprimer cet utilisateur ?"
    const deleteUserMessageType = "Confirmation de Suppression"

    const addUserMessage = "Voulez-vous vraiment ajouter cet utilisateur ?"
    const addUserMessageType = "Confirmation d'ajout"

    const editUserMessage = "Voulez-vous vraiment modifier cet utilisateur ?"
    const editUserMessageType = "Confirmation de modification"

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${config.API_HOST}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })

            setUsers(response.data.users);

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
        setSelectedUserId(null)
    }

    const handleAdd = (e) => {
        handleOpenDialog('addUser')
        console.log(formDatas)
    }

    const roles = [
        { idRole: 1, labelRole: 'Administrateur' },
        { idRole: 2, labelRole: 'Ressource humaine' },
        { idRole: 3, labelRole: 'Surveillant' },
        { idRole: 4, labelRole: 'Instructeur' },
        { idRole: 4, labelRole: 'Informaticien' },
    ];

    const optionsRoles = roles.map(role => ({
        value: role.labelRole,
        label: role.labelRole,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas({
            ...formDatas,
            [name]: value,
        });
    };

    const handleSelectedRole = (role) => {
        console.log(role)
        setSelectedRole(role)
        setFormDatas({
            ...formDatas,
            role: role.value,
        });
    };

    const handleAddConfirm = async () => {
        try {
            const dataObject = formDatas;
            const response = await axios.post(`${config.API_HOST}/users/register`, JSON.stringify(dataObject), {
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            handleCloseDialog();
            closeModal()
            addNotify({ message: response.data.message });
            await fetchUsers()
        } catch (error) {
            errorNotify({ message: error.response.data.message });
            handleCloseDialog();
        }
    }

    const handleDelete = async (userId) => {
        handleOpenDialog('deleteUser')
        setSelectedUserId(userId)
    }

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${config.API_HOST}/users/${selectedUserId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })

            addNotify({ message: response.data.message })
            handleCloseDialog()
            await fetchUsers()
        } catch (error) {
            errorNotify({ message: error.response.data.message })
            handleCloseDialog()
        }

    }

    const handleEdit = async (userId) => {
        handleOpenDialog('editUser')
    }

    const getUserById = async (userId) => {
        setDialogType('editUser')
        await openModal();
        setSelectedUserId(userId)
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_HOST}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },

        })

        setFormDatas({
            pseudo: response.data.user.pseudo,
            nom: response.data.user.nom,
            email: response.data.user.email,
            role: response.data.user.role,
        })
        setSelectedRole({
            value: response.data.user.role,
            label: response.data.user.role
        })
    }

    const handleEditConfirm = async () => {
        try {
            const token = localStorage.getItem('token');

            const dataObject = formDatas;
            const response = await axios.patch(`${config.API_HOST}/users/${selectedUserId}`, JSON.stringify(dataObject), {
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
        await fetchUsers();
    }


    const columns = [
        { Header: "Photo", accessor: "photo" },
        { Header: "Nom et prenom", accessor: "nom" },
        { Header: "Email", accessor: "email" },
        { Header: "Pseudo", accessor: "pseudo", className: "text-center" },
        { Header: "Rôle", accessor: "role", className: "text-center" },
        { Header: "Action", accessor: "action", className: "text-center" },
    ];

    const dataTable = users.map((user) => ({
        photo: (<_CellulePhoto valeur={user.photo} />),
        nom: (<_Cellule valeur={user.nom} />),
        email: (<_Cellule valeur={user.email} />),
        pseudo: (<_Cellule valeur={user.pseudo} />),
        role: (<_Cellule valeur={user.role} />),
        action: (
            <>
                <div className="flex justify-center space-x-5">
                    <MdEdit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => getUserById(user.id)}
                    />
                    <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(user.id)}
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
                    title={"Liste des utilisateurs"}
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
                        <h2 className="text-xl mt-2 font-semibold">{dialogType === 'editUser' ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h2>
                        <button onClick={closeModal} className="close-button text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>
                    <hr className='py-2' />

                    <div className='grid grid-cols-2 space-x-5'>
                        <_TextInput
                            type="text"
                            name="pseudo"
                            placeholder="Pseudo ..."
                            value={formDatas.pseudo}
                            onChange={handleChange}
                            labelLabel="Pseudo"
                        />
                        <_TextInput
                            type="text"
                            name="nom"
                            placeholder="Nom ..."
                            value={formDatas.nom}
                            onChange={handleChange}
                            labelLabel="Nom"
                        />
                    </div>
                    <div className='grid grid-cols-2 space-x-5'>
                        <_TextInput
                            type="text"
                            name="email"
                            placeholder="Email ..."
                            value={formDatas.email}
                            onChange={handleChange}
                            labelLabel="Email"
                        />
                        <div className='mb-5'>
                            <label htmlFor=""> Rôle</label>
                            <Select
                                className="basic-single mt-2"
                                classNamePrefix="select"
                                name="role"
                                options={optionsRoles}
                                placeholder="Selectionnez un ..."
                                value={selectedRole}
                                onChange={handleSelectedRole}
                                style={{ backgroundColor: 'var(--primary-1)' }}
                            />
                        </div>
                    </div>
                    <div className=''>
                        {/* <_TextInput
                            type={showPassword ? "text" : "password"}
                            name="email"
                            placeholder="Mot de passe ..."
                            // value={formDatas.labelModele}
                            // onChange={handleChange}
                            labelLabel="Mot de passe"
                        /> */}
                        {/* <_UploadImage /> */}
                        {
                            dialogType === 'editUser' ? ('') : (
                                <_TextInput
                                    type="text"
                                    name="motDePasse"
                                    placeholder="Confirmer mot de passe ..."
                                    value={formDatas.motDePasse}
                                    onChange={handleChange}
                                    labelLabel="Mot de passe"
                                />
                            )
                        }
                    </div>
                    <div className="mt-4 flex justify-end">
                        <_BtnText
                            text="Enregistrer"
                            onClick={dialogType === 'editUser' ? handleEdit : handleAdd}
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
                    dialogType === 'deleteUser'
                        ? handleDeleteConfirm
                        : dialogType === 'editUser'
                            ? handleEditConfirm
                            : handleAddConfirm
                }
                title={
                    dialogType === 'deleteUser'
                        ? deleteUserMessageType
                        : dialogType === 'editUser'
                            ? editUserMessageType
                            : addUserMessageType
                }
                message={
                    dialogType === 'deleteUser'
                        ? deleteUserMessage
                        : dialogType === 'editUser'
                            ? editUserMessage
                            : addUserMessage
                }
            />
        </>
    )

}

export default Utilisateur