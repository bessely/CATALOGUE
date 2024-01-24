import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION } from "../../globalComponents/Pagination";
import { Danger, Info } from "../../services/CustomToast";
import { loadDataPisteAuditList } from "../../services/PisteAudit";
import { STATUS } from "../../services/globalConstante";

/** PISTEAUDITE [CONVERGENCE]
* !!CENTRALISATION DES STATES PISTEAUDITE
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

export const CURRENTPISTEAUDITEDEFAULTSATE = [{ LG_AGEID: "", STR_AGECODE: "", STR_AGECODEBCEAO: "", STR_AGEDESCRIPTION: "", STR_AGELOCALISATION: "", STR_AGEBP: "", STR_AGEMAIL: "", STR_AGEPHONE: "", STR_VILLE: "", STR_AGELONGITUDE: "", STR_AGELATITUDE: "" }];
const initialState = {
        pisteAuditList        : [],
        listPisteAuditOptions : [],
        currentPisteAudit     : CURRENTPISTEAUDITEDEFAULTSATE,
        pagination            : PAGINATION,
        formErreur            : [],
        fileImg               : [],
        searchParam           : { choix: "", pisteaudite: "", type: "" },
        status                : { pisteaudite: STATUS.LOADING },
        selectedUser          : "",
};

export const PisteAuditSlice = createSlice({
        name: "pisteaudites",
        initialState,
        reducers: {
                setPisteAuditList    (state, action) { state.pisteAuditList    = action.payload; },
                setCurrentPisteAudit (state, action) { state.currentPisteAudit = action.payload; },
                setPagination        (state, action) { state.pagination        = action.payload; },
                setformErreur        (state, action) { state.formErreur        = action.payload; },
                setFileImg           (state, action) { state.fileImg           = action.payload; },
                setStatus            (state, action) { state.status            = action.payload; },
                setSelectedUser      (state, action) { state.selectedUser      = action.payload; },
        },
        extraReducers: (builder) => {
                builder
                        .addCase(loadDataPisteAuditList.pending, (state, action) => {
                                state.status.pisteaudite = STATUS.LOADING;
                        })
                        .addCase(loadDataPisteAuditList.fulfilled, (state, action) => {
                                if (action.payload?.data?.length > 0) {
                                        state.pisteAuditList = action.payload.data; // !<- PUBLICATION DE LA LISTE DES: PISTEAUDITES DANS LE STORE
                                        state.pagination =
                                        {
                                                listParPage     : PAGINATION.listParPage,
                                                currentPage     : state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination
                                                changePageClick : false,
                                                listLenght      : action.payload.data.length,
                                                nbrPage         : Math.ceil(action.payload.recordsTotal / PAGINATION.listParPage)
                                        };
                                } else {
                                        state.pisteAuditList = [];
                                        if (action.meta?.arg?.search !== undefined) {
                                                Info.fire({ title: "Aucune piste d'audite trouvée" });
                                        } else {
                                                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                                        }
                                        state.pagination =
                                        {
                                                listParPage     : PAGINATION.listParPage,
                                                currentPage     : 0,
                                                changePageClick : false,
                                                listLenght      : 0,
                                                nbrPage         : 0
                                        };
                                }
                                state.status = { ...state.status, pisteaudite: STATUS.SUCCESS };
                        })
                        .addCase(loadDataPisteAuditList.rejected, (state, action) => {
                                state.status.pisteaudite = STATUS.ERROR;
                                Danger.fire({ title: "Désolé ! La liste des pisteaudites n'a pas pu être chargée" });
                        })
        },
});

export const { setSelectedUser, setPisteAuditList, setCurrentPisteAudit, setPagination, setformErreur, setFileImg, status } = PisteAuditSlice.actions;
export default PisteAuditSlice.reducer;