import React, { useState } from 'react';
import axios from 'axios';

function _UploadImage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file.name)
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        console.log(image)
    };

    return (
        <div className='mb-4'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Sélectionner une image :</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                </div>
                {preview && (
                    <div>
                        <img src={preview} alt="Prévisualisation" className='w-[120px] h-[120px] rounded-full' />
                    </div>
                )}
                 <button type="button">Enregistrer</button>
            </form>
        </div>
    );
}

export default _UploadImage;
