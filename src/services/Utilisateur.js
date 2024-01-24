import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAGINATION } from "../globalComponents/Pagination";
import { getCurrentPath, getThisInLocalstore, purgeStrorage, writeThisInLocalstore } from "../services/globalFunction";
import { BASEROOT, BASEURL } from "../services/serveur.js";
import { MODALCOMPTEUTILISATEURDEFAULTSTATE, MODALUTILISATEURDEFAULTSTATE, MODALUTILISATEURLOCKUP, setCurrentProfile, setLoginUtilisateur, setMenu, setModalCompte, setModalProfile, setModalUtilisateur, setmodalLockFrame } from "../store/Utilisateurs/Utilisateur.js";
import { Danger, Info, Success } from "./CustomToast.js";
import { APINAMESPACE } from "./globalConstante.js";

/** UTILISATEUR [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES APPEL XHR VERS LES API UTILISATEUR
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

/**CHARGEMENT DES OU UTILISATEURS */
export const loadDataUtilisateurList = createAsyncThunk('loadDataUtilisateurList/fetchAll', async (data) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                bodyFormData.append("LG_AGEID", "");
                bodyFormData.append("LG_PROID", "");
                bodyFormData.append("LG_SOCID", "");
                bodyFormData.append("search_value", data.search ?? "");
                bodyFormData.append("start", data.start ?? 0);
                bodyFormData.append("length", data.listParPage ?? 100);
                var res = await fetch(`${BASEURL}${APINAMESPACE.UTILISATEUR}/listUtilisateur`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/**RECHERCHE MANUELLE DANS LA LISTE DES UTILISATEURS SELON LES PARAMETRES DE RECHERCHE
 * @évènement keyDown sur la zone de recherche
 */
export const searchUtilisateur = createAsyncThunk('utilisateurSearch/fetchAll', async (searchParam) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                bodyFormData.append("LG_AGEID", "");
                bodyFormData.append("LG_PROID", "");
                bodyFormData.append("LG_SOCID", "");
                bodyFormData.append("search_value", (searchParam.search ?? ""));
                bodyFormData.append("start", searchParam.start ?? 0);
                bodyFormData.append("length", searchParam.listParPage ?? 100);
                var res = await fetch(`${BASEURL}${APINAMESPACE.UTILISATEUR}/listUtilisateur`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/** CHARGEMENT D'UN UTILISATEUR SPECIFIÉ */
export const getDataUtilisateur = createAsyncThunk('utilisateur/fetchOne', async (idUtilisateur) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_UTIID", idUtilisateur ?? getThisInLocalstore("loginUtilisateur").token);
                var res = await fetch(`${BASEURL}${APINAMESPACE.UTILISATEUR}/getUtilisateur`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/** SOUMISSION DU FORMULAIRE DE CREATION D1 UTILISATEUR
 * @param {array} data données du formulaire
 * @function 
 */
export const createUtilisateur = createAsyncThunk('createUtilisateur', async (data,{ dispatch, getState }) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_UTIMATRICULE", data.STR_UTIMATRICULE);
                bodyFormData.append("STR_UTIFIRSTNAME", data.STR_UTIFIRSTNAME);
                bodyFormData.append("STR_UTILASTNAME", data.STR_UTILASTNAME);
                bodyFormData.append("STR_UTIPHONE", data.STR_UTIPHONE);
                bodyFormData.append("STR_UTIPHONE", data.STR_UTIPHONE);
                bodyFormData.append("STR_UTIMAIL", data.STR_UTIMAIL);
                bodyFormData.append("STR_UTIUID", data.STR_UTILOGIN);
                bodyFormData.append("LG_AGEID", data.AGENCE.value);
                bodyFormData.append("STR_UTIPIC", data.STR_UTIPIC ?? null);
                bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                // if (getState().currentUtilisateur.fileImg) {
                //         bodyFormData.append("file", getState().utilisateurs.fileImg); //<- les fichiers
                // }
                var res = await fetch(`${BASEURL}${APINAMESPACE.UTILISATEUR}/createUtilisateur`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                if (response.code_statut === "1") {
                        dispatch(loadDataUtilisateurList({ start: 0, listParPage: PAGINATION.listParPage }));   //<- rechargement des data
                        dispatch(setModalUtilisateur(MODALUTILISATEURDEFAULTSTATE)); //<- fermeture de la modale de modification
                        Success.fire({ title: "Utilisateur crée avec succès !" });
                } else {
                        Danger.fire({ title: "Echec de la création veuillez réessayer." });
                }
                return response;
        }
        catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/** MODIFICATION D'UTILISATEUR 
 * @param {array} data données du formulaire
 * */
export const updateUtilisateur = createAsyncThunk('updateUtilisateur', async (data, { dispatch, getState }) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_UTIID", data.LG_UTIID);
                bodyFormData.append("STR_UTIMATRICULE", data.STR_UTIMATRICULE);
                bodyFormData.append("STR_UTIFIRSTNAME", data.STR_UTIFIRSTNAME);
                bodyFormData.append("STR_UTILASTNAME", data.STR_UTILASTNAME);
                bodyFormData.append("STR_UTIPHONE", data.STR_UTIPHONE);
                bodyFormData.append("STR_UTIMAIL", data.STR_UTIMAIL);
                bodyFormData.append("STR_UTIUID", data.STR_UTILOGIN);
                bodyFormData.append("LG_AGEID", data.AGENCE.value);
                bodyFormData.append("STR_UTIETAT", "Activé");
                bodyFormData.append("STR_UTIPIC", data.STR_UTIPIC ?? null);
                bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                // if (getState().currentUtilisateur.fileImg) {
                //         bodyFormData.append("file", getState().utilisateurs.fileImg); //<- les fichiers
                // }}
                var res = await fetch(`${BASEURL}${APINAMESPACE.UTILISATEUR}/updateUtilisateur`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                if (response.code_statut === "1") {
                        dispatch(loadDataUtilisateurList({ start: 0, listParPage: PAGINATION.listParPage }));   //<- rechargement des data
                        dispatch(setModalUtilisateur(MODALUTILISATEURDEFAULTSTATE)); //<- fermeture de la modale de modification
                        Success.fire({ title: "Correctement mis à jour !" });
                } else {
                        Danger.fire({ title: "Echec de la modification veuillez réessayer." });
                }
                return response;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/** SUPPRESSION D'UN UTILISATEUR */ 
export const deleteUtilisateur = createAsyncThunk('deleteUtilisateur', async (LG_UTIID, { dispatch, getState }) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_UTIID", LG_UTIID);
                bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                var res = await fetch(`${BASEURL}${APINAMESPACE.UTILISATEUR}/deleteUtilisateur`, {
                                method : 'POST',
                                body   : bodyFormData
                });
                const response = await res.json();
                if (response.code_statut === "1") {
                        dispatch(loadDataUtilisateurList({ start: 0, listParPage: PAGINATION.listParPage }));   //<- rechargement des data
                        Success.fire({ title: "Suppression effectuée !" });
                } else {
                        Danger.fire({ title: "Echec de la suppression veuillez réessayer." });
                }
                return response;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/** CONNEXION D'UN UTILISATEUR 
 * @param data {object} = {STR_UTILOGIN:loggin user,STR_UTIPASSWORD: le mot de passe utilisateur}
*/
export const doConnexion = createAsyncThunk('utilisateur/connect', async (data) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_UTILOGIN", data.STR_UTILOGIN);
                bodyFormData.append("STR_UTIPASSWORD", data.STR_UTIPASSWORD);
                var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/doconnexion`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/** DEVEROUILLAGE D'UNE SESSION UTILISATEUR */
export const doUnlock = createAsyncThunk('utilisateur/unlock', async (data, { dispatch, getState }) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_UTITOKEN", getLoginUtilisateur()?.token);
                bodyFormData.append("STR_UTIPASSWORD", data.STR_UTIPASSWORD);
                var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/doconnexionunlock`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                if (response.code_statut === "1" && response.desc_statut === "Utilisateur deverrouillé") {
                        dispatch(setmodalLockFrame(MODALUTILISATEURLOCKUP));
                } else {
                        Danger.fire({ title: "mot de passe non reconnu !" });
                }
                return response;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/** VEROUILLAGE D'UNE SESSION UTILISATEUR */
export const lockSession = createAsyncThunk('utilisateur/lockSession', async (data, { dispatch, getState }) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_UTITOKEN", getLoginUtilisateur()?.token);
                var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/doconnexionlock`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                if (response.code_statut === "1" && response.desc_statut ==="Utilisateur verrouillé") {
                        dispatch(setmodalLockFrame({ ...(getState().utilisateurs.modalLockFrame), open: true, size: "session" }));
                }
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return error.message;
        }
});

/** DECONNEXION D'UN UTILISATEUR */
export const doDisConnexion = createAsyncThunk('utilisateur/doDisConnexion', async (landingPage) => {
        // e.preventDefault();
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/dodisconnect`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                await res.json();
                purgeStrorage();
                window.location.href = landingPage ? landingPage : BASEROOT+"Connexion";
                return;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                purgeStrorage();
                window.location = landingPage ? landingPage : BASEROOT+"Connexion";
                return;
        }
});

/** RECOVER PASSWORD D'UN UTILISATEUR */
export const revoverPassWord = createAsyncThunk('utilisateur/revoverPassWord', async (STR_UTILOGIN) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_UTIID", STR_UTILOGIN!==undefined ? STR_UTILOGIN : getThisInLocalstore("loginUtilisateur").token);
                var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/ReinitialiseMDP`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                let reponse = await res.json();
                if (reponse.code_statut === "1") {
                        purgeStrorage();
                        Info.fire({ title: "Consultez vos mails !!!" });
                        setTimeout(() => {
                                window.location.href = BASEROOT+"Connexion";
                        }, 3000);
                }
                return;
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return;
        }
});

/** REMPLACER LE PASSWORD D'UN UTILISATEUR */
export const changePassWord = createAsyncThunk('utilisateur/changePassWord', async (data, { dispatch, getState }) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                bodyFormData.append("OLD_PASSWORD", data.OLD_PASSWORD);
                bodyFormData.append("NEW_PASSWORD", data.NEW_PASSWORD);
                var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/changePassword`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                let reponse = await res.json();
                if (reponse.code_statut === "1") {
                        Success.fire({ title: "Mot de passe modifié avec succès" });
                        dispatch(setModalCompte(MODALCOMPTEUTILISATEURDEFAULTSTATE));
                        return;
                }
                Danger.fire({ title: "Une erreur est survenue. Veuillez réessayer" });
        } catch (error) {
                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                return;
        }
});

/** CHARGEMENT DES INFOS DE L'UTILISATEUR CONNECTE POUR VOIR L'ETAT DE VERROUILLAGE DE SA SESSION */
export const getVerrouillageState = () => {
        return async function asyncGetVerthunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_UTIID", getThisInLocalstore("loginUtilisateur")?.token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.UTILISATEUR}/getUtilisateur`, {
                                method: 'POST',
                                body: bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1" && response.STR_UTIETAT === "lock") {
                                dispatch(setmodalLockFrame({ ...(getState().utilisateurs.modalLockFrame), open: true, size: "session" }));
                        }
                        return response;
                } catch (error) {
                        Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                        return error.message;
                }
        };
};

export const getCurrentProfile = () => {
        let profile = getCurrentlProfilId();
        let profilList = getAllProfilUtilisateur();
        for (let index = 0; index < profilList?.length; index++) {
                if (profilList[index].lg_PROFIL_ID === profile) {
                        return profilList[index];
                }
        }
        return [];
};

/**
 * RETOURN L'UTILISATEUR EN LIGNE DEPUIS LA LOCAKSTORAGE
 * @returns [USER]
 */
export const getLoginUtilisateur = () => {
        return (getThisInLocalstore("loginUtilisateur") ? getThisInLocalstore("loginUtilisateur") : false);
};
/**
 * RETOURNE L'ID DU PROFIL DE L'UTILISATEUR EN LIGNE DEPUIS LA LOCAKSTORAGE
 * @returns USER_PRFIL_IG
 */
export const getAllProfilUtilisateur = () => {
        if (getThisInLocalstore("loginUtilisateur")?.dataPro) {
                return getThisInLocalstore("loginUtilisateur").dataPro 
        }
        return getCurrentlProfilId();
};

export const getCurrentlProfilId = () => {
        return (getThisInLocalstore("currentProfile") ? getThisInLocalstore("currentProfile") : false);
};

/** AFFICHE LA POP UP DES PROFILES */
export const popUpProfil = (e) => {
        return async function popUpProfilUtilisateurThunk(dispatch, getState) {
                e.preventDefault();
                dispatch(setModalProfile({ open: true, size: "profil" }));
        };
};

/** CHANGER DE PROFIL A CHAUD 
 *  @param e {event} l'évenement javascript
 *  @param profil_ID {string} l'identifiant du profil selectionné
*/
export const switchProfil = (e, profil_ID) => {
        return async function switchProfil(dispatch, getState) {
                dispatch(setCurrentProfile(profil_ID));
                dispatch(setModalProfile({ open: false, size: "profil" }));
                if (profil_ID !== undefined) {
                        writeThisInLocalstore(profil_ID, "currentProfile");
                        if (getCurrentPath() === "Connexion") {
                                Info.fire({ title: "Bienvenue " + getThisInLocalstore("loginUtilisateur")?.str_FIRST_LAST_NAME });
                                setTimeout(() => {
                                        window.location.href = BASEROOT;
                                }, 1000);
                        } else {
                                menuDestroy();
                                dispatch(menuDispose(profil_ID));
                                Info.fire({ title: "Permutation vers le profil '" + getCurrentProfile()?.STR_PRODESCRIPTION + "' éffectué ! " });
                                setTimeout(() => {
                                        redirectToPremierLienAutorise();
                                }, 1000);
                        }
                }
        };
};

/** EMPECHE UN UTILISATEUR NON CONNECTÉ D'AVOIR ACCES A L'APP*/
export const sessionSurveillance = () => {
        if (!getLoginUtilisateur()) {
                window.location.href = BASEROOT+"Connexion";
        }
};


/** PLACE LE MENU DANS Le STATE 
 * @param  LG_PROID [string] le id du profile dont le menu doit etre mis en place
*/
export const menuDispose = (LG_PROID) => {
        return async function asyncMenuDispose(dispatch, getState) {
                //A lA 1ère connexion 
                if (LG_PROID !== undefined && LG_PROID !== null && LG_PROID !== "" && LG_PROID !== 0 && getThisInLocalstore("loginUtilisateur")?.groupmenu === undefined) {
                        try {
                                var bodyFormData = new FormData();
                                bodyFormData.append("LG_PROID", LG_PROID);
                                bodyFormData.append("STR_UTITOKEN", getState().utilisateurs.loginUtilisateur.token);
                                var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/generemenu`, {
                                        method : 'POST',
                                        body   : bodyFormData
                                });
                                const response = await res.json();
                                if (response?.data[0]?.groupmenu[0]?.menu?.length>0) {
                                        let menuList = response.data[0].groupmenu;
                                        dispatch(setLoginUtilisateur({ ...getState().utilisateurs.loginUtilisateur, groupmenu: menuList }));
                                        writeThisInLocalstore(getState().utilisateurs.loginUtilisateur, "loginUtilisateur");
                                        if (menuList) {
                                                dispatch(setMenu(menuList[0].menu));
                                                return;
                                        }
                                }else{;
                                        Danger.fire({ title: "Désolé ! , Vous ne disposez pas encore de droit sur les fonctionnalités. Consulter un administrateur pour vos droits sur les menus de l'application. Déconnexion en cours..." });
                                        setTimeout(() => {
                                                dispatch(doDisConnexion());
                                        }, 5000);
                                }
                                return response;
                        } catch (error) {
                                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                                return error.message;
                        }
                } else {
                        //changement de profile à chaud (en étant déja connecté)
                        if (LG_PROID !== undefined && LG_PROID !== null && LG_PROID !== "") {
                                let menuList = getThisInLocalstore("loginUtilisateur")?.groupmenu[0]?.menu;
                                if (menuList) {
                                        dispatch(setMenu(menuList));
                                        return;
                                }
                        }
                        //else
                        Danger.fire({ title: "Désolé ! , Vous ne disposez pas encore de droit sur les fonctionnalités. Consulter un administrateur pour vos droits sur les menus de l'application. Déconnexion en cours..." });
                        setTimeout(() => {
                                dispatch(doDisConnexion());
                        }, 5000);
                }
        };
};
        
/** DESTRUCTION DU MENU EN LOCALSTORAGE*/
export const menuDestroy = () => {
        let oldUser = getThisInLocalstore("loginUtilisateur");
        delete oldUser.groupmenu;
        writeThisInLocalstore(oldUser, "loginUtilisateur");
        return;
};

/** 
 * SURVEILLANCE D'ACCES AU MENU DEMANDER
 * 
*/
export const pageSurveillance = (page) => {
        let menuAutorise = getThisInLocalstore("loginUtilisateur")?.groupmenu !==undefined ? getThisInLocalstore("loginUtilisateur")?.groupmenu[0]?.menu : false;
        if (menuAutorise) {
                let menuApplati  = [];
                for (let index = 0; index < menuAutorise.length; index++) {
                        if (menuAutorise[index].link!=="") {
                                menuApplati.push(menuAutorise[index].link);
                        }
                        if (menuAutorise[index].submenuList.length > 0) {
                                for (let j = 0; j < menuAutorise[index].submenuList.length; j++) {
                                        if (menuAutorise[index].submenuList[j].link!=="") {
                                                menuApplati.push(menuAutorise[index].submenuList[j].link);
                                        }
                                }
                        }
                }
                var result = menuApplati.filter(item => {
                        return item.split("/")[1] === page;
                });
                if (result.length === 0) {
                        window.location.href = BASEROOT+"PageNotFound"; //redirection vers l page not fond
                        Danger.fire({ title: "Vous n'avez pas accèes à cette partie de l'application." });
                        return;
                }
        }
        return;
};

/** 
 * REDIRECTION VERS UNE PAGE AUTORISEE
 * 
*/
export const redirectToPremierLienAutorise = () => {
        let menuApplati = [];
        let menuAutorise = getThisInLocalstore("loginUtilisateur").groupmenu !== undefined ? getThisInLocalstore("loginUtilisateur")?.groupmenu[0]?.menu : false;
        if (menuAutorise) {
                for (let index = 0; index < menuAutorise.length; index++) {
                        if (menuAutorise[index].link !== "") {
                                menuApplati.push(menuAutorise[index].link);
                        }
                        if (menuAutorise[index].submenuList.length > 0) {
                                for (let j = 0; j < menuAutorise[index].submenuList.length; j++) {
                                        if (menuAutorise[index].submenuList[j].link !== "") {
                                                menuApplati.push(menuAutorise[index].submenuList[j].link);
                                        }
                                }
                        }
                }
                if (menuApplati.length > 0) {
                        if (BASEROOT==="/") {
                                window.location.href = menuApplati[0];
                                return;
                        }
                        //En mode serveur apache
                        window.location.href = "/convergence"+menuApplati[0];
                        return;
                }
        }
        if (BASEROOT==="/") {
                return "/Connexion";
        }
        //En mode serveur apache
        return "convergence/Connexion";
};


