import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config.json'
import { addNotify, errorNotify } from './Notification/ToastUtil';
import { saveAs } from 'file-saver';

const _UploadImage = ({ oldImage, userId, onImageChange }, ref) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file.name);
            setPreview(URL.createObjectURL(file));
            onImageChange(file.name);
        }
    };

    const handleEditImage = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`${config.API_HOST}/users/${userId}`, JSON.stringify({ photo: image }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },

            })
            addNotify({ message: "Votre profil a été mis à jour avec succès !" });
        } catch (error) {
            const message = error.response?.data?.message || "Une erreur s'est produite";
            errorNotify({ message });
        }
    }

    React.useImperativeHandle(ref, () => ({
        handleEditImage: handleEditImage
    }));

    return (
        <div className='mb-4'>
            <div className='py-2 '>
                <input
                    style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}
                    className='p-2 rounded-lg'
                    type="file" id="image" accept="image/*" onChange={handleImageChange} />
            </div>
            {preview ? (
                <div className='flex justify-center py-5 rounded-lg' style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}>
                    <img src={preview} alt="Prévisualisation" className='w-[200px] h-[200px] rounded-full' />
                </div>
            ) : (
                <div className='flex justify-center py-5 rounded-lg' style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}>
                    <img src={oldImage} alt="oldImage" className='w-[200px] h-[200px] rounded-full' />
                </div>
            )}
        </div>
    );
}

export default React.forwardRef(_UploadImage);
