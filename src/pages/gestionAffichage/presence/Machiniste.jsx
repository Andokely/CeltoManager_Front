
import { _BtnIcon } from "../../../components/_Bouton";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Piquage from "./Piquage";
import _Machiniste from "./_Machiniste";

const Machiniste = () => {
    const navigate = useNavigate();


    return (
        <>
            <div className="flex w-full space-x-2 py-1 px-1">
                <div className="flex w-full py-1 px-1 gap-2">
                    {Array.from({ length: 12 }, (_, i) => (
                        <div key={i} className="flex flex-col w-full">
                            <div className="py-2 mb-2 font-bold flex rounded-t-lg justify-center items-center w-full"
                                style={{ backgroundColor: ('var(--primary-3'), color: ('var(--text-color') }}>
                                CHAINE {i + 1}
                            </div>
                            <_Machiniste labelSecteur={"MACHINISTE"} chaine={`${i + 1}`} />
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