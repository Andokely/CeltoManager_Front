import { _EnTete } from "../../../components/_Entete"
import { FaUserFriends } from "react-icons/fa";

function Personnel() {
    return (
        <>
            <div className="items-center flex justify-center">
                <_EnTete titre={"Personnel"} valeur={"Liste des personnels"} icone={<FaUserFriends />} color={"bg-green-500"} />
            </div>
        </>
    )
}

export default Personnel