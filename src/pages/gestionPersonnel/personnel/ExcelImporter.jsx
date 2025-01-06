import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import api from '../../../api';
import { _BtnText } from '../../../components/_Bouton';
import { FaCheck } from 'react-icons/fa';
import { _EnTete } from '../../../components/_Entete';
import { _LoadingFull } from '../../../components/_Loading';
import { addNotify } from '../../../components/Notification/ToastUtil';



function ExcelImporter() {
    const [excelData, setExcelData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });
                
                setExcelData(parsedData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const enregistrer = async () => {
        if (excelData.length > 0) {
            setIsLoading(true);
            try {
                for (let i = 0; i < excelData.length; i++) {
                    const row = excelData[i];
                    if (row && row[0] && row[1] && row[2] && row[3]) {
                        const personnel = {
                            matricule: row[0],
                            nom: row[1],
                            prenoms: row[3],
                            poste: row[2],
                            salaire: 100,
                        };

                        await new Promise((resolve) => setTimeout(resolve, 500));

                        await api.post(`/personnels`, JSON.stringify(personnel));
                    }
                }
                console.log("Toutes les données ont été enregistrées avec succès.");
            } catch (error) {
                console.error("Erreur lors de l'enregistrement des données :", error);
            } finally {
                setIsLoading(false);
                addNotify({ message: "Personnel(s) crée(s) avec succès" })
            }
        } else {
            console.log("Aucune donnée trouvée.");
        }
    };


    const headers = ["Matricule", "Nom", "Poste", "Prénoms"]


    return (
        <div className='px-4'>
            <div>
                {
                    isLoading ? (
                        <_LoadingFull />
                    ) : (
                        ""
                    )
                }
            </div>
            <div className='flex justify-between px-5'>

                <input
                    style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
                    className='p-2 rounded-lg'
                    type="file" accept=".xlsx" onChange={handleFileUpload} />


                <_BtnText
                    text="Enregistrer"
                    onClick={enregistrer}
                    variant="primary"
                    icon={FaCheck}
                    iconPosition="left"
                    className='fixed bottom-8 right-8'
                />
            </div>
            <hr className='my-3' />

            <div className='p-3 rounded-lg' style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                {excelData.length > 0 && (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    {headers.map((cell) => (
                                        <th className='px-10 border' style={{ borderColor: 'var(--border-color)' }}>{cell}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {excelData.slice(0).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td className='px-10 border' style={{ borderColor: 'var(--border-color)' }}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}

export default ExcelImporter;


// {
//     "matricule": "string",
//     "nom": "string",
//     "prenoms": "string",
//     "adresse": "string",
//     "telephone": "string",
//     "embauche": "2025-01-04T06:49:39.928Z",
//     "debauche": "2025-01-04T06:49:39.928Z",
//     "salaire": 0,
//     "categorie": "string",
//     "poste": "string",
//     "chaine": "string",
//     "secteur": "string",
//     "lienPhoto": "string",
//     "po": "Unknown Type: int"
//   }