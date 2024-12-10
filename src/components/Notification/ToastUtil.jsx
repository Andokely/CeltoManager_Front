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
