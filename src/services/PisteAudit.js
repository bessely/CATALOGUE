import { createAsyncThunk } from "@reduxjs/toolkit";
import { Danger } from "./CustomToast";
import { APINAMESPACE } from "./globalConstante";
import { formatDate } from "./globalFunction";
import { BASEURL } from "./serveur";

/** PISTEAUDITE [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES APPEL XHR VERS LES API PISTEAUDIT
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

/**CHARGEMENT DES ENTREPRISES OU PISTEAUDITES */
export const loadDataPisteAuditList = createAsyncThunk('pisteauditeList/fetchAll', async (data) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("LG_UTIID"     , data.LG_UTIID    ?? "");
                bodyFormData.append("search[value]", data.search      ?? "");
                bodyFormData.append("STR_PISTYPE"  , data.STR_PISTYPE ?? "");
                bodyFormData.append("start"        , data.start       ?? 0 );
                bodyFormData.append("length"       , data.listParPage ?? 10);
                bodyFormData.append("DT_BEGIN", formatDate(data?.DT_BEGIN));
                bodyFormData.append("DT_END"  , formatDate(data?.DT_END  ));
                var res = await fetch(`${BASEURL}${APINAMESPACE.CONGIG}/listPiste`, {
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