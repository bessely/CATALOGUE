import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAGINATION } from "../globalComponents/Pagination";
import { MODALAGENCEDEFAULTSTATE, setModalAgence } from "../store/Agences/Agence.js";
import { Danger, Success } from "./CustomToast.js";
import { APINAMESPACE } from "./globalConstante.js";
import { getThisInLocalstore } from "./globalFunction.js";
import { BASEURL } from "./serveur.js";

/** AGENCE [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES APPEL XHR VERS LES API AGENCE

*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

/**CHARGEMENT DES ENTREPRISES OU AGENCES */
export const loadDataAgenceList = createAsyncThunk('agenceList/fetchAll', async (data) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_SOCID"     , getThisInLocalstore("loginUtilisateur").lg_SOCIEGE_ID );
                bodyFormData.append("search[value]" , data.search ?? ""         );
                bodyFormData.append("start"         , data.start ?? 0           );
                bodyFormData.append("length"        , data.listParPage ?? 100);
                var res = await fetch(`${BASEURL}${APINAMESPACE.AGENCE}/listAgence`, {
                        method: 'POST',
                        body: bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"});
                return error.message;
        }
});

/** CHARGEMENT D'UNE ENTREPRISE DONNÉE */
export const getDataAgence = createAsyncThunk('agence/fetchOne', async (idAgence) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_AGEID", idAgence);
                var res = await fetch(`${BASEURL}${APINAMESPACE.AGENCE}/getAgence`, {
                        method: 'POST',
                        body: bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                return error.message;
        }
});

/**RECHERCHE MANUELLE DANS LA LISTE DES AGENCES SELON LES PARAMETRES DE RECHERCHE
 * @évènement onClick
 */
export const searchAgence = createAsyncThunk('agenceSearch/fetchAll', async (searchParam) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_SOCID"     , getThisInLocalstore("loginUtilisateur").lg_SOCIEGE_ID );
                bodyFormData.append("search[value]", searchParam.choix.trim()      );
                bodyFormData.append("start"        , searchParam.start ?? 0        );
                bodyFormData.append("length"       , searchParam.listParPage ?? 400);
                var res = await fetch(`${BASEURL}${APINAMESPACE.AGENCE}/listAgence`, {
                        method: 'POST',
                        body: bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                return error.message;
        }
});


/** SOUMISSION DU FORMULAIRE DE CREATION D1 AGENCE
 * @param {array} data données du formulaire
 * @function 
 */
export function createAgence(data) {
        return async function sendDataCrudAgenceThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("STR_AGECODE"         , data.STR_AGECODE                           );
                        bodyFormData.append("STR_AGECODEBCEAO"    , data.STR_AGECODEBCEAO                      );
                        bodyFormData.append("STR_AGEDESCRIPTION"  , data.STR_AGEDESCRIPTION                    );
                        bodyFormData.append("STR_AGELOCALISATION" , data.STR_AGELOCALISATION                   );
                        bodyFormData.append("STR_AGEBP"           , data.STR_AGEBP                             );
                        bodyFormData.append("STR_AGEMAIL"         , data.STR_AGEMAIL                           );
                        bodyFormData.append("STR_AGEPHONE"        , data.STR_AGEPHONE                          );
                        bodyFormData.append("STR_VILLE"           , data.STR_VILLE                             );
                        bodyFormData.append("STR_AGELONGITUDE"    , data.STR_AGELONGITUDE                      );
                        bodyFormData.append("STR_AGELATITUDE"     , data.STR_AGELATITUDE                       );
                        bodyFormData.append("LG_SOCID"     , getThisInLocalstore("loginUtilisateur").lg_SOCIEGE_ID );
                        bodyFormData.append("STR_UTITOKEN" , getThisInLocalstore("loginUtilisateur").token         );
                        var res = await fetch(`${BASEURL}${APINAMESPACE.AGENCE}/createAgence`, {
                                method: 'POST',
                                body: bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(loadDataAgenceList({ start: 0, listParPage: PAGINATION.listParPage }));   //<- rechargement des data
                                dispatch(setModalAgence(MODALAGENCEDEFAULTSTATE)); //<- fermeture de la modale de modification
                                Success.fire({title: "Agence crée avec succès !"}); 
                                return;
                        }
                        if (response.code_statut === "0") {
                                Danger.fire({title: response.desc_statut});
                                return; 
                        }
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion."});
                        return response;
                }
                catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                        return error.message;
                }
        };
}

/** MODIFICATION D'AGENCE 
 * @param {array} data données du formulaire
 * */
export function updateAgence(data) {
        return async function updateAgenceThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_AGEID"            , data.LG_AGEID                              );
                        bodyFormData.append("STR_AGECODE"         , data.STR_AGECODE                           );
                        bodyFormData.append("STR_AGECODEBCEAO"    , data.STR_AGECODEBCEAO                      );
                        bodyFormData.append("STR_AGEDESCRIPTION"  , data.STR_AGEDESCRIPTION                    );
                        bodyFormData.append("STR_AGELOCALISATION" , data.STR_AGELOCALISATION                   );
                        bodyFormData.append("STR_AGEBP"           , data.STR_AGEBP                             );
                        bodyFormData.append("STR_AGEMAIL"         , data.STR_AGEMAIL                           );
                        bodyFormData.append("STR_AGEPHONE"        , data.STR_AGEPHONE                          );
                        bodyFormData.append("STR_VILLE"           , data.STR_VILLE                             );
                        bodyFormData.append("STR_AGELONGITUDE"    , data.STR_AGELONGITUDE                      );
                        bodyFormData.append("STR_AGELATITUDE"     , data.STR_AGELATITUDE                       );
                        bodyFormData.append("LG_SOCID"     , getThisInLocalstore("loginUtilisateur").lg_SOCIEGE_ID );
                        bodyFormData.append("STR_UTITOKEN" , getThisInLocalstore("loginUtilisateur").token         );
                        var res = await fetch(`${BASEURL}${APINAMESPACE.AGENCE}/updateAgence`, {
                                method: 'POST',
                                body: bodyFormData
                        });
                        const response = await res.json();
                        if (response.code_statut === "1") {
                                dispatch(loadDataAgenceList({ start: 0, listParPage: PAGINATION.listParPage }));   //<- rechargement des data
                                dispatch(setModalAgence(MODALAGENCEDEFAULTSTATE)); //<- fermeture de la modale de modification
                                Success.fire({title: "Correctement mis à jour !"});
                                return; 
                        }
                        if (response.code_statut === "0") {
                                Danger.fire({title: response.desc_statut});
                                return; 
                        }
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion."});
                        return response;
                } catch (error) {
                        Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion."}); 
                        return error.message;
                }
        };
}

/** SUPPRESSION D'UN AGENCE */
export function deleteAgence(LG_ACTID,STR_UTITOKEN){
        return async function deleteAgenceThunk(dispatch, getState) {
                try {
                        var bodyFormData = new FormData();
                        bodyFormData.append("LG_AGEID"     , LG_ACTID                                   );
                        bodyFormData.append("STR_UTITOKEN" , getThisInLocalstore("loginUtilisateur").token );
                        var res = await fetch(`${BASEURL}${APINAMESPACE.AGENCE}/deleteAgence`, {
                                method: 'POST',
                                body: bodyFormData
                        });
                        const response = await res.json();
                        console.log(response);
                        if (response.code_statut === "1") {
                                dispatch(loadDataAgenceList({ start: 0, listParPage: PAGINATION.listParPage }));   //<- rechargement des data
                                Success.fire({title: "Suppression effectuée !"}); 
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


