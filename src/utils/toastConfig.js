import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
};

// Fonction pour afficher une notification de succès
export const showSuccessToast = (message, title) => {
    toastr.success(message, title);
};

// Fonction pour afficher une notification d'erreur
export const showErrorToast = (message, title) => {
    toastr.error(message, title);
};

// Fonction pour afficher une notification d'avertissement
export const showWarningToast = (message, title) => {
    toastr.warning(message, title);
};

// Fonction pour afficher une notification d'information
export const showInfoToast = (message, title) => {
    toastr.info(message, title);
};
