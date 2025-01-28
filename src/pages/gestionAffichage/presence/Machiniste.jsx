
import { _BtnIcon } from "../../../components/_Bouton";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import _Machiniste from "./_Machiniste";
import api from "../../../api";

const Machiniste = () => {
    const navigate = useNavigate();
    const [chaine, setChaine] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/chaines`);
                setChaine(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <div className="flex w-full space-x-2 py-1 px-1">
                <div className="flex w-full py-1 px-1 gap-2">
                    {chaine.map((chaine, i) => (
                        <div key={i} className="flex flex-col w-full">
                            <div className="py-2 mb-2 font-bold flex rounded-t-lg justify-center items-center w-full"
                                style={{ backgroundColor: ('var(--primary-3'), color: ('var(--text-color') }}>
                                {chaine.labelChaine}
                            </div>
                            <_Machiniste labelSecteur={"MACHINISTE"} chaine={`${chaine.labelChaine.split(" ")[1]}`} />
                        </div>
                    ))}
                </div>

            </div>

            <_BtnIcon
                icon={IoMdArrowRoundBack}
                variant="primary"
                size="md"
                onClick={() => navigate("/affichage")}
                className="fixed bottom-8 right-8"
            />
        </>
    )
}

export default Machiniste