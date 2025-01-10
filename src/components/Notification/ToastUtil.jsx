import { toast } from 'react-toastify';

export const addNotify = ({ message }) => {
    toast.success(message);
};

export const warningNotify = ({ message }) => {
    toast.warn(message);
};

export const errorNotify = ({ message }) => {
    toast.error(message);
};

export const checkNotify = ({ message }) => {
    toast.info(message, {
        autoClose: 20000,
        position: 'top-left'
    });
};
