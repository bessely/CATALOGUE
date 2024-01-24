
/** TYPELISTE REDUCEUR [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES STATES TYPELISTE
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION } from "../../globalComponents/Pagination";
import { Danger, Info } from "../../services/CustomToast";
import { getDataListe, loadDataListe, searchListe } from "../../services/ValeurListe";
import { STATUS } from "../../services/globalConstante";

export const MODALLISTEDEFAULTSTATE       = { open: false, mode: "", title: "", button: "", inputstate: "", btnclass: "btn btn-primary my-2 text-18 col-4" };
export const CURRENTLISTEDEFAULTSATE      = { LG_LSTID: "", STR_LSTOTHERVALUE2: "", STR_LSTOTHERVALUE1: "", STR_LSTOTHERVALUE: "",STR_LSTVALUE: "",STR_LSTDESCRIPTION: "", LG_TYLID:"", LG_SOCID:"", TYPE:[{}], SOCIETE:[{}]};
const initialState = {
        ListListe        : [],
        loginUtilisateur : [],
        currentListe     : CURRENTLISTEDEFAULTSATE,
        currentProfile   : "",
        pagination       : PAGINATION,
        formErreur       : [],
        modalListe       : MODALLISTEDEFAULTSTATE,
        fileImg          : [],
        searchParam      : { choix: "", liste: "", type: "" },
        status           : { liste: STATUS.LOADING },
        subMenuState     : {},
        listDevise       : [],
};

export const ListeSlice = createSlice({
        name: "ListListes",
        initialState,
        reducers: {
                setListListe          (state, action) { state.ListListe      = action.payload; },
                setCurrentListe       (state, action) { state.currentListe   = action.payload; },
                setPagination         (state, action) { state.pagination     = action.payload; },
                setformErreur         (state, action) { state.formErreur     = action.payload; },
                setFileImg            (state, action) { state.fileImg        = action.payload; },
                setModalListe         (state, action) { state.modalListe     = action.payload; },
                setStatus             (state, action) { state.status         = action.payload; },
                setSubMenuState       (state, action) { state.subMenuState   = action.payload; },
                setlistDevise         (state, action) { state.listDevise     = action.payload; },
        },
        extraReducers: (builder) => {
                builder
                        .addCase(loadDataListe.pending, (state, action) => {
                                state.status.liste = STATUS.LOADING;
                        })
                        .addCase(loadDataListe.fulfilled, (state, action) => {
                                if (action.payload.recordsTotal > 0) {
                                        state.ListListe  = action.payload.data; // !<- PUBLICATION DE LA LISTE DES: LISTES DANS LE STORE
                                } else {
                                        state.ListListe = [];
                                        if (action.meta.arg.search!==undefined) { //pendant la recherche : vu que c'est le meme endpoint 
                                                Info.fire({title: "Aucune liste trouvée !!!"}); 
                                        }else{
                                                // console.log("extraReducers");
                                                // Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                                        }
                                }
                                state.pagination = {
                                        listParPage     : PAGINATION.listParPage,
                                        currentPage     : state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination
                                        changePageClick : false,
                                        listLenght      : action.payload.recordsTotal ?? 0,
                                        nbrPage         : Math.ceil(action.payload.recordsTotal / PAGINATION.listParPage)
                                };
                                state.status = { ...state.status, liste: STATUS.SUCCESS };
                        })
                        .addCase(loadDataListe.rejected, (state, action) => {
                                state.status.liste = STATUS.ERROR;
                                Danger.fire({title: "Désolé ! La liste des Listes n'a pas pu être chargée"}); 
                        })
                        .addCase(getDataListe.fulfilled, (state, action) => {
                                if (action.payload.code_statut === "1") {
                                        let currenType  = {
                                                label    : action.payload.STR_TYLDESCRIPTION,
                                                value    : action.payload.LG_TYLID,
                                                typeList : "TYPE",
                                        };
                                        state.currentListe      = action.payload; // !<- PUBLICATION DU CHARGEMENT DE L'LISTE EN COURS DANS LE STORE
                                        state.currentListe.TYPE = currenType;    // !<- PUBLICATION DU CHARGEMENT DE L'PROFIL EN COURS DANS LE STORE
                                        let currenSociete  = {
                                                label   : action.payload.STR_SOCDESCRIPTION,
                                                value   : action.payload.LG_SOCID,
                                                profile : "SOCIETE",
                                        }; 
                                        state.currentListe         = action.payload;
                                        state.currentListe.SOCIETE = currenSociete; 
                                }
                        })
                        .addCase(searchListe.pending, (state, action) => {
                                state.status.liste = STATUS.LOADING;
                        })
                        .addCase(searchListe.fulfilled, (state, action) => {
                                if (action.payload.recordsTotal > 0) {
                                        state.ListListe  = action.payload.data; // !<- PUBLICATION DE LA LISTE DES: LISTES DANS LE STORE
                                } else {
                                        state.ListListe = [];
                                        if (action.meta.arg.search!==undefined) { //pendant la recherche : vu que c'est le meme endpoint 
                                                Info.fire({title: "Aucune liste trouvée !!!"}); 
                                        }else{
                                                // console.log("extraReducers");
                                                // Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                                        }
                                }
                                state.pagination = {
                                        listParPage     : PAGINATION.listParPage,
                                        currentPage     : state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination
                                        changePageClick : false,
                                        listLenght      : action.payload.recordsTotal ?? 0,
                                        nbrPage         : Math.ceil(action.payload.recordsTotal / PAGINATION.listParPage)
                                };
                                state.status = { ...state.status, liste: STATUS.SUCCESS };
                        })
                        .addCase(searchListe.rejected, (state, action) => {
                                state.status.liste = STATUS.ERROR;
                                Danger.fire({title: "Désolé ! La liste des Listes n'a pas pu être chargée"}); 
                        });
        },
});

export const { setlistDevise, setListListe, setCurrentListe, setCurrentProfile, setLoginUtilisateur, setMenu, setMenuSate, setSubMenuState, setPagination, setformErreur, setFileImg, setModalListe, setModalProfile, status, menu } = ListeSlice.actions;
export default ListeSlice.reducer;


