import { createAsyncThunk } from "@reduxjs/toolkit";
import { Danger } from "./CustomToast.js";
import { APINAMESPACE } from "./globalConstante.js";
import { BASEURL } from "./serveur.js";

/** DASHBOARD [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES APPEL XHR VERS LES API DASHBORD
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

/**CHARGEMENT DU DASHBORD  */
export const listProject = createAsyncThunk('listProject/fetchAll', async (devise, { dispatch, getState }) => {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append("search[value]", "");
    var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/listProject`, {
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


