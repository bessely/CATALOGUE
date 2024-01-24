import Swal from 'sweetalert2';
import { playSond } from './globalFunction';
import { BASEROOT } from './serveur';
export const Success = Swal.mixin({
    toast             : true,
    position          : 'top-end',
    showConfirmButton : false,
    showCloseButton   : true,
    timer             : 6000,
    timerProgressBar  : true,
    background        : '#154d3b',
    color             : '#fff',
    icon              : 'success',
    iconColor         : '#fff',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        playSond(BASEROOT+"assets/audio/new-notification-138807.mp3"); //success
    }
});

export const Danger = Swal.mixin({
    toast             : true,
    position          : 'top-end',
    showConfirmButton : false,
    showCloseButton   : true,
    timer             : 6000,
    timerProgressBar  : true,
    background        : '#F7021E',
    color             : '#fff',
    icon              : 'error',
    iconColor         : '#fff',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        playSond(BASEROOT+"assets/audio/system-error-notice-132470.mp3"); //error sond
    }
});

export const DangerBottom = Swal.mixin({
    toast             : true,
    position          : 'bottom-start',
    showConfirmButton : false,
    showCloseButton   : true,
    timer             : 6000,
    timerProgressBar  : true,
    background        : '#F7021E',
    color             : '#fff',
    icon              : 'error',
    iconColor         : '#fff',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        playSond(BASEROOT+"assets/audio/system-error-notice-132470.mp3"); //error sond
    }
});

export const Info = Swal.mixin({
    toast             : true,
    position          : 'top-end',
    showConfirmButton : false,
    showCloseButton   : true,
    timer             : 6000,
    timerProgressBar  : true,
    background        : '#0F405D',
    color             : '#fff',
    icon              : 'info',
    iconColor         : '#fff',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        playSond(BASEROOT+"assets/audio/wrong-answer-129254.mp3"); //success
    }
}); 