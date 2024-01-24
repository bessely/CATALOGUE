
/** TYPELISTE [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES APPEL XHR VERS LES API LISTVALEUR
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAGINATION } from "../globalComponents/Pagination";
import { MODALLISTEDEFAULTSTATE, setModalListe, setlistDevise } from "../store/Valeur/ValeurListe";
import { Danger, Success } from "./CustomToast";
import { APINAMESPACE } from "./globalConstante";
import { getThisInLocalstore } from "./globalFunction";
import { BASEURL } from "./serveur";

/**CHARGEMENT DES LISTES */
export const loadDataListe = createAsyncThunk('loadDataListe/fetchAll', async (data) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("search[value]"     , ""                          );
                bodyFormData.append("STR_LSTVALUE"      , data.STR_LSTVALUE ?? ""     );
                bodyFormData.append("STR_LSTOTHERVALUE" , data.STR_LSTOTHERVALUE ?? "");
                bodyFormData.append("LG_TYLID"          , data.id                     );
                bodyFormData.append("start"             , data.start ?? 0             );
                bodyFormData.append("length"            , data.listParPage ?? 50      );
                var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/showAllOrOneListe`, {
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

/**RECHERCHE MANUELLE DANS LA LISTE DES LISTES SELON LES PARAMETRES DE RECHERCHE
 * @évènement keyDown sur la zone de recherche
 */
export const searchListe = createAsyncThunk('listeSearch/fetchAll', async (searchParam) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("search[value]"     , searchParam.search ?? ""     );
                bodyFormData.append("STR_LSTVALUE"      , "%"                          );
                bodyFormData.append("STR_LSTOTHERVALUE" , "%"                          );
                bodyFormData.append("LG_TYLID"          , searchParam.id               );
                bodyFormData.append("start"             , searchParam.start ?? 0       );
                bodyFormData.append("length"            , searchParam.listParPage ?? 5 );
                var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/showAllOrOneListe`, {
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

/** CHARGEMENT D'UN LISTE SPECIFIÉ */
export const getDataListe = createAsyncThunk('typeliste/fetchOne', async (idListe) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_LSTID", idListe);
                var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/getListe`, {
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


/** SOUMISSION DU FORMULAIRE DE CREATION D1 LISTE
 * @param {array} data données du formulaire
 * @function 
 */
export function CreateListe(data,typelisteid) {
        return async function sendDataCrudAgenceThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append('LG_SOCID', getThisInLocalstore("loginUtilisateur").lg_SOCIEGE_ID);
                        bodyFormData.append("LG_TYLID", getState().typelistes.currentTypeListe.LG_TYLID === "" ? typelisteid : getState().typelistes.currentTypeListe.LG_TYLID); //recupéré l'id du nouveau typeliste creer ou l'ancien 
                        bodyFormData.append("STR_LSTDESCRIPTION", data.STR_LSTDESCRIPTION);
                        bodyFormData.append("STR_LSTVALUE", data.STR_LSTVALUE);
                        bodyFormData.append("STR_LSTOTHERVALUE", data.STR_LSTOTHERVALUE);
                        bodyFormData.append("STR_LSTOTHERVALUE1", data.STR_LSTOTHERVALUE1);
                        bodyFormData.append("STR_LSTOTHERVALUE2", data.STR_LSTOTHERVALUE2);
                        bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/createListe`, {
                                method : 'POST',
                                body   : bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(loadDataListe({ start: 0, listParPage: PAGINATION.listParPage , id: getState().typelistes.currentTypeListe.LG_TYLID === "" ? typelisteid : getState().typelistes.currentTypeListe.LG_TYLID}));   //<- rechargement des data
                                dispatch(setModalListe(MODALLISTEDEFAULTSTATE)); //<- fermeture de la modale de modification
                                Success.fire({ title: "Liste ajoutée avec succès !" });
                        } else {
                                Danger.fire({ title: "Echec de la création veuillez réessayer." });
                        }
                        return response;
                }
                catch (error) {
                        Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                        return error.message;
                }
        };
}

/** MODIFICATION D'LISTE 
 * @param {array} data données du formulaire
 * */
export function updateListe(data) {
        return async function updateUtilisateeurThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_LSTID", data.LG_LSTID);
                        bodyFormData.append("LG_SOCID", data.SOCIETE.value);
                        bodyFormData.append("LG_TYLID", getState().typelistes.currentTypeListe.LG_TYLID);
                        bodyFormData.append("STR_LSTDESCRIPTION", data.STR_LSTDESCRIPTION);
                        bodyFormData.append("STR_LSTVALUE", data.STR_LSTVALUE);
                        bodyFormData.append("STR_LSTOTHERVALUE", data.STR_LSTOTHERVALUE);
                        bodyFormData.append("STR_LSTOTHERVALUE1", data.STR_LSTOTHERVALUE1);
                        bodyFormData.append("STR_LSTOTHERVALUE2", data.STR_LSTOTHERVALUE2);
                        bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/updateListe`, {
                                method : 'POST',
                                body   : bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(loadDataListe({ start: 0, listParPage: PAGINATION.listParPage , id: getState().typelistes.currentTypeListe.LG_TYLID}));   //<- rechargement des data
                                dispatch(setModalListe(MODALLISTEDEFAULTSTATE)); //<- fermeture de la modale de modification
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

/** SUPPRESSION D'UN LISTE */
export function deleteListe(LG_LSTID) {
        return async function deleteUtilisateurThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_LSTID", LG_LSTID);
                        bodyFormData.append("STR_UTITOKEN", getThisInLocalstore("loginUtilisateur").token);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/deleteListe`, {
                        method : 'POST',
                        body   : bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                Success.fire({title: "Correctement supprimé !"});
                                dispatch(loadDataListe({ start: 0, listParPage: PAGINATION.listParPage, id: getState().typelistes.currentTypeListe.LG_TYLID}));   //<- rechargement des data
                        } else {
                                Danger.fire({title: "Echec de la suppression veuillez réessayer."}); 
                        }
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                        return error.message;
                }
        };
}

export function getListDevise(LG_TYLID){
        return async function listDeviseThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_TYLID", LG_TYLID);
                        var res = await fetch(`${BASEURL}${APINAMESPACE.TYPELISTE}/listDevise`, {
                                method: 'POST',
                                body: bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                let list = [];
                                // list.push({
                                //         label: "Selectionner une devise",
                                //         value: "%",
                                //         typeList: "DEVISE",
                                // });
                                response.data.map(item => {
                                        return list.push({
                                                label    : item.STR_LSTDESCRIPTION,
                                                value    : item.LG_LSTID,
                                                typeList : "DEVISE",
                                        });
                                });
                                dispatch(setlistDevise(list));
                        } else {
                                Danger.fire({ title: "Echec du chargement de la liste des devises." });
                        }
                        return response;
                } catch (error) {
                        Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                        return error.message;
                }
        };
}


