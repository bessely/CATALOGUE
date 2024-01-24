import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION } from "../../globalComponents/Pagination";
import { Danger, Info } from "../../services/CustomToast";
import { loadDataTypeListeList, searchTypeListe } from "../../services/Valeur";
import { STATUS } from "../../services/globalConstante";


/** TYPELISTE REDUCEUR [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES STATES TYPELISTE
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

export const MODALTYPELISTEDEFAULTSTATE   = { open: false, mode: "", title: "", button: "", inputstate: "", btnclass: "btn btn-primary my-2 text-18 col-4" };
export const CURRENTTYPELISTEDEFAULTSATE  = { LG_TYLID: "", STR_TYLDESCRIPTION: "", STR_TYLNAME: "", TYPE: [{}] }; 
const initialState = {
        TypeListeList        : [],
        loginUtilisateur     : [],
        listTypeListeOptions : [],
        currentTypeListe     : CURRENTTYPELISTEDEFAULTSATE,
        currentProfile       : "",
        pagination           : PAGINATION,
        formErreur           : [],
        modalTypeListe       : MODALTYPELISTEDEFAULTSTATE,
        fileImg              : [],
        searchParam          : { choix: "", typeliste: "", type: "" },
        status               : { typeliste: STATUS.LOADING },
        subMenuState         : {},
        LG_TYLID             : "",
        test                 : false
};

export const TypoeListeSlice = createSlice({
        name: "typelistes",
        initialState,
        reducers: {
                setTypeListeList     (state, action) { state.TypeListeList    = action.payload; },
                setCurrentTypeListe  (state, action) { state.currentTypeListe = action.payload; },
                setPagination        (state, action) { state.pagination       = action.payload; },
                setformErreur        (state, action) { state.formErreur       = action.payload; },
                setFileImg           (state, action) { state.fileImg          = action.payload; },
                setModalTypeListe    (state, action) { state.modalTypeListe   = action.payload; },
                setModalType         (state, action) { state.modalType        = action.payload; },
                setStatus            (state, action) { state.status           = action.payload; },
                setLgtylid           (state, action) { state.LG_TYLID         = action.payload; },
                setSubMenuState      (state, action) { state.subMenuState     = action.payload; },
        },
        extraReducers: (builder) => {
                builder
                        .addCase(loadDataTypeListeList.pending, (state, action) => {
                                state.status.typeliste = STATUS.LOADING;
                        })
                        .addCase(loadDataTypeListeList.fulfilled, (state, action) => {
                                if (action.payload.recordsTotal > 0) {
                                        let list = [];
                                        action.payload.data.map((item) => {
                                                return  list.push({
                                                        label    : item.STR_TYLDESCRIPTION,
                                                        value    : item.LG_TYLID,
                                                        typeList : "TYPE",
                                                });
                                        });
                                        state.listTypeListeOptions = list;
                                        state.TypeListeList = action.payload.data; // !<- PUBLICATION DE LA LISTE DES: TYPELISTES DANS LE STORE
                                        state.pagination =
                                        {
                                                listParPage     : PAGINATION.listParPage,
                                                currentPage     : state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination
                                                changePageClick : false,
                                                listLenght      : action.payload.recordsTotal,
                                                nbrPage         : Math.ceil(action.payload.recordsTotal / PAGINATION.listParPage)
                                        };
                                } else {
                                        state.TypeListeList = [];
                                        if (action.meta.arg.search!==undefined) { //pendant la recherche : vu que c'est le memem endpoint 
                                                Info.fire({title: "Aucun typeliste trouvé !!!"}); 
                                        }else{
                                                Danger.fire({title: "Le serveur est injoingnable ! vérifier votre connexion"}); 
                                        }
                                }
                                state.status = { ...state.status, typeliste: STATUS.SUCCESS };
                        })
                        .addCase(loadDataTypeListeList.rejected, (state, action) => {
                                state.status.typeliste = STATUS.ERROR;
                                Danger.fire({title: "Désolé ! La liste des typelistes n'a pas pu être chargée"}); 
                        })
                        .addCase(searchTypeListe.pending, (state, action) => {
                                state.status.typeliste = STATUS.LOADING;
                        })
                        .addCase(searchTypeListe.fulfilled, (state, action) => {
                                if (action.payload.code_statut === "" || action.payload.code_statut === "1") {
                                        if (action.payload.data.length > 0) {
                                                var searchParam = action.meta.arg;
                                                // !!! je fais un filtre sur les resultats selon les options selectionnées
                                                var result = action.payload.data.filter(item => {
                                                        return (searchParam.choix !== "" && searchParam.type === "" && searchParam.typeliste === "") ? //!<-  il sagit d'une recherche classic  :
                                                                 action.payload.data // je balance tt le resultats
                                                        :
                                                                null
                                                });
                                                if (result.length > 0) {
                                                        state.status = { ...state.status, typeliste: STATUS.SUCCESS };
                                                        state.TypeListeList = result; // !<- PUBLICATION DE LA LISTE DES: TYPELISTES DANS LE STORE
                                                } else {
                                                        state.status = { ...state.status, typeliste: STATUS.ERROR };
                                                        state.TypeListeList = []; // !<- pas de resultat 
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
                                                Info.fire({ title: "Désolé ! Aucun résultat trouvé !" });
                                                state.status.typeliste = STATUS.ERROR;
                                                state.TypeListeList = [];
                                        }
                                } else {
                                        state.TypeListeList = [];
                                        state.status = { ...state.status, typeliste: STATUS.ERROR };
                                        Info.fire({ title: "Désolé ! Aucun résultat trouvé !" });
                                }
                        })
                        .addCase(searchTypeListe.rejected, (state, action) => {
                                state.status.typeliste = STATUS.ERROR;
                                Danger.fire({title: "Désolé ! La liste des typelistes n'a pas pu être chargée"}); 
                        });
        },
});

export const { setTypeListeList, setCurrentTypeListe,setLgtylid, setCurrentProfile, setLoginUtilisateur, setMenu, setMenuSate, setSubMenuState, setPagination, setformErreur, setFileImg, setModalTypeListe, setModalProfile, status, menu } = TypoeListeSlice.actions;
export default TypoeListeSlice.reducer;


