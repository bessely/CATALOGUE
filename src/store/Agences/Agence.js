import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION } from "../../globalComponents/Pagination";
import { getDataAgence, loadDataAgenceList, searchAgence } from "../../services/Agence.js";
import { Danger, Info } from "../../services/CustomToast.js";
import { STATUS } from "../../services/globalConstante.js";

/** AGENCE REDUCEUR [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES STATES AGENCE
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

export const MODALAGENCEDEFAULTSTATE = { open: false, mode:"creation", size: "xl", title: "Nouvelle Agence", button:true,  buttonName:"Enregistrer", inputstate: "", btnclass: "btn btn-primary" };
export const CURRENTAGENCEDEFAULTSATE= [ {LG_AGEID:"", STR_AGECODE:"", STR_AGECODEBCEAO:"", STR_AGEDESCRIPTION: "", STR_AGELOCALISATION:"", STR_AGEBP: "", STR_AGEMAIL:"", STR_AGEPHONE:"", STR_VILLE:"", STR_AGELONGITUDE:"", STR_AGELATITUDE:""} ];
const initialState = {
        agenceList        : [],
        listAgenceOptions : [],
        currentAgence     : CURRENTAGENCEDEFAULTSATE,
        pagination        : PAGINATION,
        formErreur        : [],
        modalAgence       : MODALAGENCEDEFAULTSTATE,
        fileImg           : [],
        searchParam       : { choix: "", agence: "", type: "" },
        status            : { agence: STATUS.LOADING },
};

export const AgenceSlice = createSlice({
        name: "agences",
        initialState,
        reducers: {
                setAgenceList   (state, action) { state.agenceList    = action.payload; },
                setCurrentAgence(state, action) { state.currentAgence = action.payload; },
                setPagination   (state, action) { state.pagination    = action.payload; },
                setformErreur   (state, action) { state.formErreur    = action.payload; },
                setFileImg      (state, action) { state.fileImg       = action.payload; },
                setModalAgence  (state, action) { state.modalAgence   = action.payload; },
                setStatus       (state, action) { state.status        = action.payload; },
        },
        extraReducers: (builder) => {
                builder
                        .addCase(loadDataAgenceList.pending, (state, action) => {
                                state.status.agence = STATUS.LOADING;
                        })
                        .addCase(loadDataAgenceList.fulfilled, (state, action) => {
                                if (action.payload.recordsTotal > 0) {
                                        let list = [];
                                        action.payload.data.map((item) => {
                                                return list.push({
                                                        label    : item.STR_AGEDESCRIPTION,
                                                        value    : item.LG_AGEID,
                                                        typeList : "AGENCE",
                                                });
                                        });
                                        state.listAgenceOptions=list;
                                        state.agenceList       = action.payload.data; // !<- PUBLICATION DE LA LISTE DES: AGENCES DANS LE STORE
                                        state.pagination       =
                                        {
                                                listParPage     : PAGINATION.listParPage,
                                                currentPage     : state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination
                                                changePageClick : false,
                                                listLenght      : action.payload.recordsTotal,
                                                nbrPage         : Math.ceil(action.payload.recordsTotal / PAGINATION.listParPage)
                                        };
                                } else {
                                        state.agenceList = [];
                                        if (action.meta.arg.search!==undefined) {
                                                Info.fire({title: "Aucune agence trouvée"});
                                        }else{
                                                Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                                        }
                                }
                                state.status = { ...state.status, agence: STATUS.SUCCESS };
                        })
                        .addCase(loadDataAgenceList.rejected, (state, action) => {
                                state.status.agence = STATUS.ERROR;
                                Danger.fire({title: "Désolé ! La liste des agences n'a pas pu être chargée"}); 
                        })
                        .addCase(getDataAgence.fulfilled, (state, action) => {
                                if (action.payload.code_statut === "1") {
                                        // !<- PUBLICATION DU CHARGEMENT DE L'AGENCE EN COURS DANS LE STORE
                                        state.currentAgence = action.payload.data[0];
                                        return; 
                                }
                                if (action.payload.code_statut!==undefined && parseInt(action.payload.code_statut) >= 2) {
                                        Danger.fire({title: action.payload.desc_statut});
                                        return; 
                                }
                                Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion."});
                        })
                        .addCase(searchAgence.pending, (state, action) => {
                                state.status.agence = STATUS.LOADING;
                        })
                        .addCase(searchAgence.fulfilled, (state, action) => {
                                if (action.payload.code_statut === "" || action.payload.code_statut === "1") {
                                        if (action.payload.data.length > 0) {
                                                var searchParam = action.meta.arg;
                                                var result = action.payload.data.filter(item => { // !!! je fais un filtre sur les resultats selon les options selectionnées
                                                        return(
                                                                (searchParam.choix !== "" && searchParam.type === "" && searchParam.agence === "") ? action.payload.data : null
                                                        )
                                                });
                                                if (result.length > 0) {
                                                        state.status = { ...state.status, agence: STATUS.SUCCESS };
                                                        state.agenceList = result; // !<- PUBLICATION DE LA LISTE DES: AGENCES DANS LE STORE
                                                } else {
                                                        state.status = { ...state.status, agence: STATUS.ERROR };
                                                        state.agenceList = []; // !<- pas de resultat 
                                                        Info.fire({title: "Désolé ! Aucun résultat trouvé !"}); 
                                                }
                                                state.pagination = {
                                                        listParPage: PAGINATION.listParPage,
                                                        currentPage: state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination 
                                                        changePageClick: false,
                                                        listLenght: action.payload.recordsTotal,
                                                        nbrPage: Math.ceil(result ?? 0 / PAGINATION.listParPage)
                                                };
                                        } else { // !<- pas de resultat  
                                                Info.fire({title: "Désolé ! Aucun résultat trouvé  !"}); 
                                                state.status.agence = STATUS.ERROR;
                                                state.agenceList = [];
                                        }
                                } else {
                                        state.agenceList = [];
                                        state.status = { ...state.status, agence: STATUS.ERROR };
                                        Info.fire({title: "Désolé ! Aucun résultat trouvé !"}); 
                                }
                        })
                        .addCase(searchAgence.rejected, (state, action) => {
                                state.status.agence = STATUS.ERROR;
                                Danger.fire({title: "Désolé ! La liste des agences n'a pas pu être chargée"}); 
                        });
        },
});

export const { setAgenceList, setCurrentAgence, setPagination, setformErreur, setFileImg, setModalAgence, status } = AgenceSlice.actions;
export default AgenceSlice.reducer;


