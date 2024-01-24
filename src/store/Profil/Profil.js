import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION } from "../../globalComponents/Pagination";
import { Danger, Info } from "../../services/CustomToast.js";
import { STATUS } from "../../services/globalConstante.js";
import { getDataProfil, loadDataProfilList, searchProfil } from "../../services/profil.js";

/** PROFIL REDUCEUR [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES STATES PROFIL
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

export const MODALPROFILDEFAULTSTATE = { open: false, mode: "creation", size: "xl", title: "Nouveau Profil", button: true, buttonName: "Enregistrer", inputstate: "", btnclass: "btn btn-primary" };
export const CURRENTPROFILDEFAULTSATE = { LG_PROID: "", STR_PRONAME: "", STR_PRODESCRIPTION: "", STR_PROTYPE: "", SOCIETE: [{}] };
const initialState = {
        profilList      : [],
        currentProfil   : CURRENTPROFILDEFAULTSATE,
        pagination      : PAGINATION,
        formErreur      : [],
        modalProfil     : MODALPROFILDEFAULTSTATE,
        fileImg         : [],
        searchParam     : { choix: "", profil: "", type: "" },
        status          : { profil: STATUS.LOADING },
        LG_PROID        : "",
        tabChecked      : [],
        checkProfil     : [],
        modalAssoProfil : MODALPROFILDEFAULTSTATE,
};

export const ProfilSlice = createSlice({
        name: "profils",
        initialState,
        reducers: {
                setProfilList      (state, action) { state.profilList      = action.payload; },
                setCurrentProfil   (state, action) { state.currentProfil   = action.payload; },
                setPagination      (state, action) { state.pagination      = action.payload; },
                setformErreur      (state, action) { state.formErreur      = action.payload; },
                setFileImg         (state, action) { state.fileImg         = action.payload; },
                setModalProfil     (state, action) { state.modalProfil     = action.payload; },
                setStatus          (state, action) { state.status          = action.payload; },
                setLgproid         (state, action) { state.LG_PROID        = action.payload; },
                setTabChecked      (state, action) { state.tabChecked      = action.payload; },
                setCheckProfil     (state, action) { state.checkProfil     = action.payload; },
                setModalAssoProfil (state, action) { state.modalAssoProfil = action.payload; },
        },
        extraReducers: (builder) => {
                builder
                        .addCase(loadDataProfilList.pending, (state, action) => {
                                state.status.profil = STATUS.LOADING;
                        })
                        .addCase(loadDataProfilList.fulfilled, (state, action) => {
                                if (action.payload.recordsTotal > 0) {
                                        state.profilList = action.payload.data; // !<- PUBLICATION DE LA LISTE DES: PROFILS DANS LE STORE
                                        state.pagination =
                                        {
                                                listParPage     : PAGINATION.listParPage,
                                                currentPage     : state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination
                                                changePageClick : false,
                                                listLenght      : action.payload.recordsTotal,
                                                nbrPage         : Math.ceil(action.payload.recordsTotal / PAGINATION.listParPage)
                                        };
                                } else {
                                        state.profilList = [];
                                        if (action.meta.arg.search !== undefined) {
                                                Info.fire({ title: "Aucun profil trouvée" });
                                        } else {
                                                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                                        }
                                }
                                state.status = { ...state.status, profil: STATUS.SUCCESS };
                        })
                        .addCase(loadDataProfilList.rejected, (state, action) => {
                                state.status.profil = STATUS.ERROR;
                                Danger.fire({ title: "Désolé ! La liste des profils n'a pas pu être chargée" });
                        })
                        .addCase(getDataProfil.fulfilled, (state, action) => {
                                if (action.payload?.LG_PROID !== undefined) {
                                        // !<- PUBLICATION DU CHARGEMENT DE L'PROFIL EN COURS DANS LE STORE  
                                        let currenProfil = {
                                                label    : action.payload.STR_SOCDESCRIPTION,
                                                value    : action.payload.LG_SOCID,
                                                typeList : "SOCIETE",
                                        };
                                        state.currentProfil         = action.payload;
                                        state.currentProfil.SOCIETE = currenProfil;
                                } else {
                                        Danger.fire({ title: "Ce Profil semble être introuvable !" });
                                }
                                if (action.payload.code_statut !== undefined && parseInt(action.payload.code_statut) >= 2) {
                                        Danger.fire({ title: action.payload.desc_statut });
                                        return;
                                }
                        })
                        .addCase(searchProfil.pending, (state, action) => {
                                state.status.profil = STATUS.LOADING;
                        })
                        .addCase(searchProfil.fulfilled, (state, action) => {
                                if (action.payload.code_statut === "" || action.payload.code_statut === "1") {
                                        if (action.payload.data.length > 0) {
                                                var searchParam = action.meta.arg;
                                                var result = action.payload.data.filter(item => { // !!! je fais un filtre sur les resultats selon les options selectionnées
                                                        return(
                                                                (searchParam.choix !== "" && searchParam.type === "" && searchParam.profil === "") ?  action.payload.data : null 
                                                        )
                                                });
                                                if (result.length > 0) {
                                                        state.status = { ...state.status, profil: STATUS.SUCCESS };
                                                        state.profilList = result; // !<- PUBLICATION DE LA LISTE DES: PROFILS DANS LE STORE
                                                } else {
                                                        state.status = { ...state.status, profil: STATUS.ERROR };
                                                        state.profilList = []; // !<- pas de resultat 
                                                        Info.fire({ title: "Désolé ! Aucun résultat trouvé !" });
                                                }
                                                state.pagination = {
                                                        listParPage     : PAGINATION.listParPage,
                                                        currentPage     : state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination
                                                        changePageClick : false,
                                                        listLenght      : action.payload.recordsTotal,
                                                        nbrPage         : Math.ceil(result ?? 0 / PAGINATION.listParPage)
                                                };
                                        } else { // !<- pas de resultat  
                                                Info.fire({ title: "Désolé ! Aucun résultat trouvé  !" });
                                                state.status.profil = STATUS.ERROR;
                                                state.profilList = [];
                                        }
                                } else {
                                        state.profilList = [];
                                        state.status = { ...state.status, profil: STATUS.ERROR };
                                        Info.fire({ title: "Désolé ! Aucun résultat trouvé !" });
                                }
                        })
                        .addCase(searchProfil.rejected, (state, action) => {
                                state.status.profil = STATUS.ERROR;
                                Danger.fire({ title: "Désolé ! La liste des profils n'a pas pu être chargée" });
                        });
        },
});

export const { setProfilList, setCurrentProfil, setPagination, setformErreur, setModalAssoProfil, setCheckProfil, setFileImg, setModalProfil, setLgproid, status, setTabChecked } = ProfilSlice.actions;
export default ProfilSlice.reducer;


