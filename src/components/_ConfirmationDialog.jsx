import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

function _ConfirmationDialog({ open, onClose, onConfirm, title, message }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: 'var(--primary-1)',
                    borderRadius: '10px',
                    padding: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                    color: 'var(--text-color)'
                }
            }}
        >
            <DialogTitle sx={{ color: 'var(--text-color)' }}>{title}</DialogTitle>
            <DialogContent sx={{ color: 'var(--text-color)' }}>
                {message}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Button onClick={onClose} sx={{ backgroundColor: "gray", color: '#FFFFFF' }}>
                    Annuler
                </Button>
                <Button onClick={onConfirm} sx={{ backgroundColor: "green", color: '#FFFFFF' }}>
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default _ConfirmationDialog;
