import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAGINATION } from "../globalComponents/Pagination";
import { MODALPROFILDEFAULTSTATE, setCheckProfil, setModalProfil, } from "../store/Profil/Profil.js";
import { Danger, Info, Success } from "./CustomToast.js";
import { APINAMESPACE } from "./globalConstante.js";
import { getCurrentPath, getThisInLocalstore } from "./globalFunction.js";
import { BASEURL } from "./serveur.js";

/** PROFIL REDUCEUR [STATER] SYNAPSE GROUPE
 * !!CENTRALISATION DES APPEL XHR VERS LES API PROFIL
 *@bessely
 *@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
 *         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
 */

/**CHARGEMENT DES PROFILS */
export const loadDataProfilList = createAsyncThunk("profilList/fetchAll",
        async (data, { dispatch, getState }) => {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_SOCID"      , ""               );
                        bodyFormData.append("search[value]" , data.search ?? "");
                        bodyFormData.append("start"         , data.start  ?? 0 );
                        bodyFormData.append("length"        , data.length ?? 10);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/listProfile`, {
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion",});
                        return error.message;
                }
        }
);

/**
 * CHARGEMENT D'UN PROFIL DONNÉE
 * */
export const getDataProfil = createAsyncThunk("profil/fetchOne",
        async (idProfil) => {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_PROID", idProfil);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/getProfile`, {
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        return response;
                } catch (error) {Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion",});
                        return error.message;
                }
        }
);

/**RECHERCHE MANUELLE DANS LA LISTE DES PROFILS SELON LES PARAMETRES DE RECHERCHE
 * @évènement onClick
 */
export const searchProfil = createAsyncThunk("profilSearch/fetchAll",
        async (searchParam) => {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_SOCID"      , ""                       );
                        bodyFormData.append("search[value]" , searchParam.search ?? "" );
                        bodyFormData.append("start"         , searchParam.start  ?? 0  );
                        bodyFormData.append("length"        , searchParam.length ?? 250);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/listProfile`, {
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion ",});
                        return error.message;
                }
        }
);

/** SOUMISSION DU FORMULAIRE DE CREATION D1 PROFIL
 *
 * @param {array} data données du formulaire
 * @function
 */
export const createProfil = createAsyncThunk("createProfil",
        async (data, { dispatch, getState }) => {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("STR_PRONAME"       , data.STR_PRONAME       );
                        bodyFormData.append("STR_PRODESCRIPTION", data.STR_PRODESCRIPTION);
                        bodyFormData.append("STR_PROTYPE"       , data.STR_PROTYPE       );
                        bodyFormData.append("LG_SOCID",getThisInLocalstore("loginUtilisateur").lg_SOCIEGE_ID);
                        bodyFormData.append("LG_UTITOKEN",getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/createProfile`, {
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(createSwitchProfilPrivilege(response.data[0].LG_PROID));
                                Success.fire({ title: response.desc_statut });
                        } else {
                                Danger.fire({ title: response.desc_statut });
                        }
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion",});
                        return error.message;
                }
        }
);

/** MODIFICATION D'PROFIL
 * @param {array} data données du formulaire
 * */
export function updateProfil(data) {
        return async function updateAgenceThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("STR_PRONAME"       , data.STR_PRONAME             );
                        bodyFormData.append("LG_PROID"          , data.LG_PROID                );
                        bodyFormData.append("STR_PRODESCRIPTION", data.STR_PRODESCRIPTION      );
                        bodyFormData.append("STR_PROTYPE"       , data.STR_PROTYPE             );
                        bodyFormData.append("LG_SOCID"          , data.SOCIETE.value           );
                        bodyFormData.append("LG_UTITOKEN",getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/updateProfile`, {
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(loadDataProfilList({ start: 0, listParPage: PAGINATION.listParPage })); //<- rechargement des data
                                dispatch(setModalProfil(MODALPROFILDEFAULTSTATE)); //<- fermeture de la modale de modification
                                Success.fire({ title: "Correctement mis à jour !" });
                                return;
                        }
                        if (response.code_statut === "0") {
                                Danger.fire({ title: response.desc_statut });
                                return;
                        }
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion.11",});
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion.",});
                        return error.message;
                }
        };
}

/** SUPPRESSION D'UN PROFIL */
export function deleteProfil(LG_PROID, STR_UTITOKEN) {
        return async function deleteProfilThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_PROID", LG_PROID);
                        bodyFormData.append("STR_UTITOKEN",getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/deleteProfile`, {
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(loadDataProfilList({ start: 0, listParPage: PAGINATION.listParPage })); //<- rechargement des data
                                Success.fire({ title: "Suppression effectuée !" });
                        } else {
                                Danger.fire({ title: "Echec de la suppression veuillez réessayer." });
                        }
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion",});
                        return error.message;
                }
        };
}

/**
 * CHARGEMENT DES SOCIETE DANS CREATION DE PROFIL
 *
 **/
export const listSocieteOptions = createAsyncThunk("profilList/fetchAll",
        async (data) => {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_SOCID"     , ""                        );
                        bodyFormData.append("search[value]", data.search ?? ""         );
                        bodyFormData.append("start"        , data.start ?? 0           );
                        bodyFormData.append("length"       , data.listParPage ?? 100000);
                        bodyFormData.append("STR_UTITOKEN",getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.SOCIETE}/listSociete`, {
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion",});
                        return error.message;
                }
        }
);

/** SOUMISSION DU FORMULAIRE DE CREATION D1 PROFILPRIVILEGE
 *
 * @param {string} LG_PROID id du profil
 * @function
 **/
export const createSwitchProfilPrivilege = createAsyncThunk("createSwitchProfilPrivilege",
        async (LG_PROID, { dispatch, getState }) => {
                let tabChecked = localStorage.getItem("tabChecked")? localStorage.getItem("tabChecked"): "[]";
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_PROID", LG_PROID  );
                        bodyFormData.append("LG_PRIID", tabChecked); //<- tableau des id des privilèges selectionnés | deja stringifié au sortir du localstorage
                        bodyFormData.append("STR_UTITOKEN",getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/switchPrivilege`,{
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(loadDataProfilList({ start: 0, listParPage: PAGINATION.listParPage })); //<- rechargement des data
                                dispatch(setModalProfil(MODALPROFILDEFAULTSTATE)); //<- fermeture de la modale de modification
                                Success.fire({ title: response.desc_statut });
                        }
                        if (response.code_statut === "0") {
                                Danger.fire({ title: response.desc_statut });
                        }
                        return response;
                } catch (error) {
                        Danger.fire({title:"Une erreur inconnue est survenue durant l'assosiation des provilèges au profil.",});
                        return error.message;
                }
        }
);

/** ASSOCIASION DU PROFIL A UN USER
 *
 * @param {string} LG_PROID id du profil
 * @function
 **/
export const bindProfilToUser = createAsyncThunk("bindProfilUser",
        async (LG_UTIID, { dispatch, getState }) => {
                let tabChecked = localStorage.getItem("tabChecked")? localStorage.getItem("tabChecked"): "[]";
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_PROID", tabChecked);
                        bodyFormData.append("LG_UTIID", LG_UTIID  );
                        bodyFormData.append("STR_UTITOKEN",getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/createProfiluser`,{
                                method : "POST",
                                body   : bodyFormData,
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(setModalProfil(MODALPROFILDEFAULTSTATE));
                                Success.fire({ title: response.desc_statut });
                        }
                        if (response.code_statut === "0") {
                                Danger.fire({ title: response.desc_statut });
                        }
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion",});
                        return error.message;
                }
        }
);

/**Rattacher les profil au compte */
export const bindProfilToCompte = createAsyncThunk("bindProfilToCompte",
        async (data, { dispatch, getState }) => {
                let tabChecked = localStorage.getItem("tabChecked") ? localStorage.getItem("tabChecked") : "[]";
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_SCCID",getState().corsocietes.currentInputCompte.LG_SCCID);
                        bodyFormData.append("LG_PROID", tabChecked);
                        bodyFormData.append("STR_UTITOKEN",getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/createProfilAcc`,{
                                        method : "POST",
                                        body   : bodyFormData,
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(setModalProfil(MODALPROFILDEFAULTSTATE));
                                Success.fire({ title: response.desc_statut });
                        }
                        if (response.code_statut === "0") {
                                Danger.fire({ title: response.desc_statut });
                        }
                        return response;
                } catch (error) {
                        Danger.fire({title:"Erreur l'hors de l'enregistrement. Veuillez réessayer un peu plus tard.",});
                        return error.message;
                }
        }
);

/**chargement des profils d'1 compte utilisateur */
export const getBindProfilUser = createAsyncThunk("getBindProfilUser/fetchAll",
        async (LG_UTIID, { dispatch, getState }) => {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("search_value", ""      );
                        bodyFormData.append("LG_SOCID"    , ""      );
                        bodyFormData.append("LG_UTIID"    , LG_UTIID);
                        bodyFormData.append("STR_UTITOKEN",getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/listProfilequick`,{
                                        method : "POST",
                                        body   : bodyFormData,
                        });
                        const response = await res.json();
                        if (response.length >= 1) {
                                let checkboxList = document.getElementsByClassName("profil"); // liste des checkbox (profil) sur le DOM
                                let resumeCheckedProfil = [];
                                for (let x = 0; x < response.length; x++) {
                                        for (let index = 0; index < checkboxList.length; index++) {
                                                if (JSON.parse(checkboxList[index].getAttribute("data-profil")).LG_PROID === response[x].LG_PROID) {
                                                        checkboxList[index].checked = response[x].checkbox;
                                                        resumeCheckedProfil.push(response[x].LG_PROID);
                                                }
                                        }
                                }
                                localStorage.removeItem("tabChecked");
                                localStorage.setItem("tabChecked", JSON.stringify(resumeCheckedProfil));
                                dispatch(setCheckProfil(resumeCheckedProfil)); // mise à jour de la liste des profils rattachés au compte dans le state des profils selectionner pour le compte en cours au cas ou ya une modif
                        } else {
                                if (getState().profil.modalAssoProfil.open) {
                                        dispatch(setCheckProfil([]));
                                        Info.fire({title: "Pas encore de profils rattachés à cet utilisateur",});
                                }
                        }
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion",});
                        return error.message;
                }
        }
);

/**chargement des profils d'1 compte correspondant */
export const getBindProfil = createAsyncThunk("getBindProfil/fetchAll",
        async (LG_SCCID, { dispatch, getState }) => {
                if (LG_SCCID !== undefined) {
                        try {
                                var bodyFormData = new FormData();
                                bodyFormData.append("LG_PACID", LG_SCCID);
                                var res = await fetch(`${BASEURL}${APINAMESPACE.PROFIL}/getProfAcc`, {
                                        method : "POST",
                                        body   : bodyFormData,
                                });
                                const response = await res.json();
                                if (response.code_statut === "1") {
                                        let checkboxList = document.getElementsByClassName("profil"); // liste des checkbox (profil) sur le DOM
                                        let resumeCheckedProfil = [];
                                        for (let x = 0; x < response.Data.length; x++) {
                                                for (let index = 0; index < checkboxList.length; index++) {
                                                        if (JSON.parse(checkboxList[index].getAttribute("data-profil")).LG_PROID === response.Data[x].LG_PROID) {
                                                                checkboxList[index].checked = true;
                                                                resumeCheckedProfil.push(response.Data[x].LG_PROID);
                                                        }
                                                }
                                        }
                                        localStorage.removeItem("tabChecked");
                                        localStorage.setItem("tabChecked",JSON.stringify(resumeCheckedProfil));
                                        dispatch(setCheckProfil(resumeCheckedProfil)); // mise à jour de la liste des profils rattachés au compte dans le state des profils selectionner pour le compte en cours au cas ou ya une modif
                                } else {
                                        if (getState().corsocietes.modalAssoCompt.open) {
                                                dispatch(setCheckProfil([]));
                                                Info.fire({ title: "Pas encore de profils rattachés à ce compte" });
                                        }
                                }
                                return response;
                        } catch (error) {
                                Danger.fire({title:"Erreur l'hors du chargement des profils rattachés à ce compte."});
                                return error.message;
                        }
                }
        }
);

/**
 * RECUPERATION DE TT LES PROFILS PRIVILEGE COCHES DEPUIS LE DOM
 **/
export const collectProfilChecked = () => {
        localStorage.removeItem("tabChecked");
        let priv    = getCurrentPath() === "Utilisateur" || getCurrentPath() === "Societe" ? document.getElementsByClassName("profil") : document.getElementsByClassName("privileges_");
        let element = [];
        for (let index = 0; index < priv.length; index++) {
                if (priv[index].checked) {
                        element.push(priv[index].getAttribute("data-id"));
                }
        }
        localStorage.setItem("tabChecked", JSON.stringify(element));
        return element;
};

/**
 * DECOCHER TOUS LES PROFILS PRIVILEGE EN UNE FOIS DIRECTEMENT DEPUIS LE DOM
 * @param string classCssElmt la classe des elmts a décodé
 **/
export const uncheckAllProfil = (classCssElmt) => {
        let classs = classCssElmt;
        let priv = document.getElementsByClassName(classs);
        for (let index = 0; index < priv.length; index++) {
                priv[index].checked = false;
        }
        // localStorage.removeItem('tabChecked');
};
