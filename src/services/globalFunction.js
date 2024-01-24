import { MemoryRouter } from "react-router";
import { BASEURL } from "./serveur";

export const packageJSON = require("../../package.json");

/** CONSERVE UNE VARIABLE EN MEMOIRE LOCAL POUR QUELLE SOIT DISPONIBLE DANS TTE L'aPPLI
    @param {any} laVariable la variable ou constante  a mettre en memoire
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
 */
export function writeThisInLocalstore(laVariable, NomDeLaVariable) {
    localStorage.setItem(NomDeLaVariable, JSON.stringify(laVariable));
}

/** RECUPERER UNE VARIABLE DANS LE LOCAL STORAGE 
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
*/
export function getThisInLocalstore(NomDeLaVariable) {
    return (JSON.parse(localStorage.getItem(NomDeLaVariable)));
}
/** VIDER UNE MEMORE OU LE LOCAL STORAGE EN ENTIER 
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
*/
export function purgeStrorage(NomDeLaVariable) {
    if (NomDeLaVariable===undefined) {
        localStorage.clear();
    } else {
        localStorage.removeItem(NomDeLaVariable);
    }
    return true;
}

/** RECUPERER UN PARAMETRE SPECIFIQUE DANS l'URL 
    @param {string} sParam le nom de du parametre a recupérer dans l'url
*/
export function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
    return false;
}

/**RETOURNE LE DERNIER ELMENT DE LA BARRE D'ADRESSE [le nom du fichier en cours d'execusion]
 * 
 * @returns {string}
 */
export function getCurrentPath(){
    let pathname = window.location.pathname;
    return pathname.split("/").pop();
}

/**RETOURNE LA RACINE DE L'URL
 * 
 * @returns 
 */
export function getUrlOrigin() {
    return (window.location.protocol+"//"+window.location.hostname);
}

/**FORMATTEUR DE LIBELLE : dimininue la taille d'un text puis ajoute 3 points de suspension a la fin du caractère si et seulement si le text est superieur au nombre de caratere a retienir
 *@param {integer} maxCaract 
 *@param {string} label 
 * @returns {string}
 */
export function formatLargeLabel(maxCaract,label){
        if (label.length > maxCaract) {
            return label.toString().substring(0, maxCaract) + "..."
        }
        return label;
}

/**
 * FORMATE UNE DATE AU FORMAT xx-xx-XXXX vers une date  xx/xx/XXXX
 * @param {date} dateAformater 
 * @returns 
 */
export const formatDate = (dateAformater)=>{
    if (dateAformater!=="" && dateAformater!==undefined && dateAformater!=="") {
            let xxxx = dateAformater.split("-");
            return xxxx[2]+"/"+xxxx[1]+"/"+xxxx[0]
    }
    return ""
};

export const playSond = (data=BASEURL+"assets/audio/pop-39222.mp3") =>{
    if (packageJSON.useAlerte) {
        console.log(data);
        const audio = new Audio(data);
        audio.play();
    }
    return;
}

/**
 * VERIFIE QUE LE FICHIER IMG EXISTE BIEN A LA SOURCE OU RETOURNE UNE IMG PAR DEFAUT LE CAS ECHEANT
 * @param {*} imgLink  le lien vers l'image source
 * @param {*} defaultImgOnError le lien de l'image par defaut en cas d'echec de chargement
 */
export const TryToLoadImg = async (imgLink,defaultImgOnError="APP_LOGO.png") =>{
    try {
        const response = await fetch(imgLink);
        if (!response.ok) {
            return defaultImgOnError;
        }
        return imgLink;
    } catch (error) {
        console.error('Erreur :', error);
        return defaultImgOnError;
    }
}

export const TryToLoadImgX = async (imgLink, defaultImgOnError = "APP_LOGO.png") => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', imgLink);
        xhr.responseType = 'blob';

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(imgLink);
            } else {
                resolve(defaultImgOnError);
            }
        };

        xhr.onerror = () => {
            console.error('Erreur lors du chargement de l\'image');
            resolve(defaultImgOnError);
        };

        xhr.send();
    });
}


export const fileName = ()=>{
    console.log(__filename);
    console.log(__dirname);
    console.log(MemoryRouter);
}