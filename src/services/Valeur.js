import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAGINATION } from "../globalComponents/Pagination";
import { MODALTYPELISTEDEFAULTSTATE, setCurrentTypeListe, setModalTypeListe } from "../store/Valeur/Valeur";
import { Danger, Success } from "./CustomToast";
import { APINAMESPACE } from "./globalConstante";
import { getThisInLocalstore } from "./globalFunction";
import { BASEURL } from "./serveur";


/** TYPELISTE [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES APPEL XHR VERS LES API AGENCE
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/


/**CHARGEMENT DES OU TYPELISTES */
export const loadDataTypeListeList = createAsyncThunk('TypeListeList/fetchAll', async (data) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("search[value]", data.search ?? ""      );
                bodyFormData.append("start"       , data.start ?? 0        );
                bodyFormData.append("length"      , data.listParPage ?? 10);
                var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/listTypeliste`, {
                        method : 'POST',
                        body   : bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                return error.message;
        }
});

/**RECHERCHE MANUELLE DANS LA LISTE DES TYPELISTES SELON LES PARAMETRES DE RECHERCHE
 * @évènement keyDown sur la zone de recherche
 */
export const searchTypeListe = createAsyncThunk('typelisteSearch/fetchAll', async (searchParam) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("search[value]", searchParam.search ?? "");
                bodyFormData.append("start"       , searchParam.start ?? 0);
                bodyFormData.append("length"      , searchParam.listParPage ?? 10);
                var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/listTypeliste`, {
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

/** CHARGEMENT D'UN TYPELISTE SPECIFIÉ */
export function getDataTypeListe(idTypeListe) {
        return async function getDataTypeListeThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_TYLID", idTypeListe);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/getTypeListe`, {
                                method : 'POST',
                                body   : bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(setCurrentTypeListe(response));// !<- PUBLICATION DU CHARGEMENT DE L'TYPELISTE EN COURS DANS LE STORE   
                                return;
                        }
                        if (response.code_statut!==undefined && parseInt(response.code_statut) >= 2) {
                                Danger.fire({title: response.desc_statut});
                                return;
                        }
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion."});
                        return response;
                } catch (error) {
                        Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                        return error.message;
                }
        };
}

/** SOUMISSION DU FORMULAIRE DE CREATION D1 TYPELISTE
 * @param {array} data données du formulaire
 * @function 
 */ 
export function createTypeListe(data) {
        return async function sendDataCrudAgenceThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("STR_TYLNAME", data.STR_TYLNAME);
                        bodyFormData.append("STR_TYLDESCRIPTION", data.STR_TYLDESCRIPTION);
                        bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/createTypeliste`, {
                                method : 'POST',
                                body   : bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(setModalTypeListe(MODALTYPELISTEDEFAULTSTATE));
                                dispatch(setModalTypeListe({ open: true, mode: "modification", size: "xl", title: data.STR_TYLDESCRIPTION, button: true, buttonName: "Modifier", inputstate: "", btnclass: "btn btn-primary" }));
                                dispatch(setCurrentTypeListe({ LG_TYLID: response.data[0].LG_TYLID, STR_TYLNAME: data.STR_TYLNAME, STR_TYLDESCRIPTION: data.STR_TYLDESCRIPTION }));
                                dispatch(loadDataTypeListeList({ start: 0, listParPage: PAGINATION.listParPage }));
                                Success.fire({ title: "Type liste crée avec succès ! \n Remplissez maintenant quelques valeurs pour cette liste" });
                        } else {
                                Danger.fire({ title: "Echec de la création veuillez réessayer." });
                        }
                        return response;
                }catch (error) {
                        Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                        return error.message;
                }
        };
}

/** MODIFICATION D'TYPELISTE 
 * @param {array} data données du formulaire
 * */
export function updateTypeListe(data) {
        return async function updateUtilisateeurThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("STR_TYLNAME", data.STR_TYLNAME  );
                        bodyFormData.append("STR_TYLDESCRIPTION" , data.STR_TYLDESCRIPTION  );
                        bodyFormData.append("LG_TYLID", data.LG_TYLID  );
                        bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/updateTypeliste`, {
                                method : 'POST',
                                body   : bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(loadDataTypeListeList({ start: 0, listParPage: PAGINATION.listParPage }));   //<- rechargement des data
                                dispatch(setModalTypeListe(MODALTYPELISTEDEFAULTSTATE)); //<- fermeture de la modale de modification
                                dispatch(loadDataTypeListeList({ start: 0, listParPage: PAGINATION.listParPage }));
                                Success.fire({ title: "Correctement mis à jour !" });
                        } else {
                                Danger.fire({ title: "Echec de la modification veuillez réessayer." });
                        }
                        return response;
                } catch (error) {
                        Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                        return error.message;
                }
        };
}

/** SUPPRESSION D'UN TYPELISTE */
export function deleteTypeListe(LG_TYLID) {
        return async function deleteUtilisateurThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_TYLID", LG_TYLID);
                        bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/deleteTypeliste`, {
                                method : 'POST',
                                body   : bodyFormData
                        });
                        const response = await res.json();
                        console.log(response);
                        if (response.code_statut === "1") {
                                dispatch(loadDataTypeListeList({ start: 0, listParPage: PAGINATION.listParPage }));   //<- rechargement des data
                                Success.fire({title: "Suppression effectuée !"}); 
                        } else {
                                Danger.fire({title: response.desc_statut}); 
                        }
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                        return error.message;
                }
        };
}

export const getCurrentProfile = () => {
        let profile    = getCurrentlProfilId();
        let profilList = getAllProfilUtilisateur();
        for (let index = 0; index < profilList.length; index++) {
                if (profilList[index].lg_PROFIL_ID === profile) {
                        return profilList[index];
                }
        }
};

export const getLoginUtilisateur = () => {
        return getThisInLocalstore("loginUtilisateur");
};

export const getAllProfilUtilisateur = () => {
        return getThisInLocalstore("loginUtilisateur").dataPro;
};

export const getCurrentlProfilId = () => {
        return getThisInLocalstore("currentProfile");
};


