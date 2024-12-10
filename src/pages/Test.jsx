import { useState } from "react";
import { addNotify } from "../components/Notification/ToastUtil"
import _ConfirmationDialog from "../components/_ConfirmationDialog";

function Login() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };


    const test = () => {
        // alert('eeeeeeeeeeeeee')
        // handleOpenDialog()
        addNotify({ message: "Le Client a été ajouté avec succès" });

    }

    return (
        <>
            <button type="button" onClick={() => test()} className="bg-red-500 p-2">Test</button>
            
            <_ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                // onConfirm={handleConfirm}
                title="Confirmation"
                message="Êtes-vous sûr de vouloir continuer?"
            />
        </>
    )
}

export default Login