import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION } from "../../globalComponents/Pagination";
import { Danger, Info } from "../../services/CustomToast.js";
import { doConnexion, getDataUtilisateur, loadDataUtilisateurList, searchUtilisateur } from "../../services/Utilisateur.js";
import { STATUS } from "../../services/globalConstante.js";
import { getCurrentPath, getThisInLocalstore, purgeStrorage, writeThisInLocalstore } from "../../services/globalFunction.js";
import { BASEROOT } from "../../services/serveur.js";

/** UTILISATEUR REDUCEUR [STATER] SYNAPSE GROUPE
* !!CENTRALISATION DES STATES UTILISATEUR
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

export const MODALUTILISATEURDEFAULTSTATE       = { open: false, mode: "", title: "", button: "", inputstate: "", btnclass: "btn btn-primary my-2 text-18 col-4" };
export const MODALUTILISATEURLOCKUP             = { open: false, mode: "", size: "xx", title: "Long période d'inactivité détectée", button: true, buttonName: "Toujours là !!!", btnclass: "btn btn-block btn-danger shadow" };
export const CURRENTUTILISATEURDEFAULTSATE      = [{ LG_UTIID: "", STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN: "", AGENCE: [{}] }];
export const MODALPROFILUTILISATEURDEFAULTSTATE = { open: false, mode: "creation", size: "profil", title: "Choisissez un profil", button: false, };
export const MODALCOMPTEUTILISATEURDEFAULTSTATE = { open: false, mode: "modification", size: "compte", title: "Mon Compte", button: false, };
const initialState = {
        UtilisateurList    : [],
        loginUtilisateur   : [],
        currentUtilisateur : CURRENTUTILISATEURDEFAULTSATE,
        currentProfile     : "",
        pagination         : PAGINATION,
        formErreur         : [],
        modalUtilisateur   : MODALUTILISATEURDEFAULTSTATE,
        modalProfile       : MODALPROFILUTILISATEURDEFAULTSTATE,
        modalCompte        : MODALCOMPTEUTILISATEURDEFAULTSTATE,
        modalLockFrame     : MODALUTILISATEURLOCKUP,
        fileImg            : [],
        searchParam        : { choix: "", utilisateur: "", type: "" },
        status             : { utilisateur: STATUS.LOADING },
        menu               : [],
        subMenuState       : {},
};

export const UtilisateurSlice = createSlice({
        name: "utilisateurs",
        initialState,
        reducers: {
                setUtilisateurList    (state, action) { state.UtilisateurList    = action.payload; },
                setLoginUtilisateur   (state, action) { state.loginUtilisateur   = action.payload; },
                setCurrentUtilisateur (state, action) { state.currentUtilisateur = action.payload; },
                setCurrentProfile     (state, action) { state.currentProfile     = action.payload; },
                setPagination         (state, action) { state.pagination         = action.payload; },
                setformErreur         (state, action) { state.formErreur         = action.payload; },
                setFileImg            (state, action) { state.fileImg            = action.payload; },
                setModalUtilisateur   (state, action) { state.modalUtilisateur   = action.payload; },
                setModalProfile       (state, action) { state.modalProfile       = action.payload; },
                setModalCompte        (state, action) { state.modalCompte        = action.payload; },
                setStatus             (state, action) { state.status             = action.payload; },
                setMenu               (state, action) { state.menu               = action.payload; },
                setSubMenuState       (state, action) { state.subMenuState       = action.payload; },
                setmodalLockFrame     (state, action) { state.modalLockFrame     = action.payload; },
        },
        extraReducers: (builder) => {
                builder
                        .addCase(loadDataUtilisateurList.pending, (state, action) => {
                                state.status.utilisateur = STATUS.LOADING;
                        })
                        .addCase(loadDataUtilisateurList.fulfilled, (state, action) => {
                                if (getCurrentPath()==="Audit") {
                                        if (action.payload.recordsTotal > 0) {
                                                let userListOpt = [];
                                                action.payload.data.map((item) => {
                                                        return userListOpt.push({
                                                                label    : item.STR_UTIFIRSTLASTNAME!=="" ? item.STR_UTIFIRSTLASTNAME : item.STR_UTILOGIN,
                                                                value    : item.LG_UTIID,
                                                                agence   : item.LG_AGEID,
                                                                mail     : item.STR_UTIMAIL,
                                                                phone    : item.STR_UTIPHONE,
                                                                login    : item.STR_UTILOGIN,
                                                                typeList : "USER",
                                                        });
                                                });
                                                state.UtilisateurList = userListOpt;
                                        }
                                }else{
                                        if (action.payload.recordsTotal > 0) {
                                                state.UtilisateurList = action.payload.data; // !<- PUBLICATION DE LA LISTE DES: UTILISATEURS DANS LE STORE
                                                state.pagination =
                                                {
                                                        listParPage     : PAGINATION.listParPage,
                                                        currentPage     : state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination
                                                        changePageClick : false,
                                                        listLenght      : action.payload.recordsFiltered,
                                                        nbrPage         : Math.ceil(action.payload.recordsFiltered / PAGINATION.listParPage)
                                                };
                                        } else {
                                                state.UtilisateurList = [];
                                                if (action.meta.arg.search !== undefined) { //pendant la recherche : vu que c'est le memem endpoint 
                                                        Info.fire({ title: "Aucun utilisateur trouvé !!!" });
                                                } else {
                                                        Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" });
                                                }
                                        }
                                        state.status = { ...state.status, utilisateur: STATUS.SUCCESS };
                                }
                        })
                        .addCase(loadDataUtilisateurList.rejected, (state, action) => {
                                state.status.utilisateur = STATUS.ERROR;
                                Danger.fire({ title: "Désolé ! La liste des utilisateurs n'a pas pu être chargée" });
                        })
                        .addCase(getDataUtilisateur.fulfilled, (state, action) => {
                                if (action.payload.code_statut === "1") {
                                        let currenAgence = {
                                                label    : action.payload.LG_AGEDESCRIPTION,
                                                value    : action.payload.LG_AGEID,
                                                typeList : "AGENCE",
                                        };
                                        state.currentUtilisateur        = action.payload; // !<- PUBLICATION DU CHARGEMENT DE L'UTILISATEUR EN COURS DANS LE STORE
                                        state.currentUtilisateur.AGENCE = currenAgence;
                                } else {
                                        Danger.fire({ title: "Ce utilisateur est introuvable !" });
                                }
                        })
                        .addCase(searchUtilisateur.pending, (state, action) => {
                                state.status.utilisateur = STATUS.LOADING;
                        })
                        .addCase(searchUtilisateur.fulfilled, (state, action) => {
                                if (action.payload.code_statut === "" || action.payload.code_statut === "1") {
                                        if (action.payload.data.length > 0) {
                                                var searchParam = action.meta.arg;
                                                var result = action.payload.data.filter(item => { // !!! je fais un filtre sur les resultats selon les options selectionnées
                                                        return (searchParam.choix !== "" && searchParam.type === "" && searchParam.utilisateur === "") ?  // !recherche classic seulement dans la zone de recherche 
                                                                action.payload.data // !<- je balance tt le resultats
                                                        :
                                                                null
                                                });
                                                if (result.length > 0) {
                                                        state.status = { ...state.status, utilisateur: STATUS.SUCCESS };
                                                        state.UtilisateurList = result; // !<- PUBLICATION DE LA LISTE DES: UTILISATEURS DANS LE STORE
                                                } else {
                                                        state.status = { ...state.status, utilisateur: STATUS.ERROR };
                                                        state.UtilisateurList = []; // !<- pas de resultat 
                                                        Info.fire({ title: "Désolé ! Aucun résultat trouvé !" });
                                                }
                                                state.pagination = {
                                                        listParPage: PAGINATION.listParPage,
                                                        currentPage: state.pagination.changePageClick ? state.pagination.currentPage : 0,  // !si rechargement ou chargement simple des data currentPage=0 sinon currentPage reste par defaut la page designée l'hors du click sur la pâgination 
                                                        changePageClick: false,
                                                        listLenght: action.payload.recordsTotal,
                                                        nbrPage: Math.ceil(result ?? 0 / PAGINATION.listParPage)
                                                };
                                        } else { // !<- pas de resultat  
                                                Info.fire({ title: "Désolé ! Aucun résultat trouvé !" });
                                                state.status.utilisateur = STATUS.ERROR;
                                                state.UtilisateurList = [];
                                        }
                                } else {
                                        state.UtilisateurList = [];
                                        state.status = { ...state.status, utilisateur: STATUS.ERROR };
                                        Info.fire({ title: "Désolé ! Aucun résultat trouvé !" });
                                }
                        })
                        //doConnexion
                        .addCase(doConnexion.fulfilled, (state, action) => {
                                if (action.payload.code_statut === "1") {
                                        purgeStrorage();
                                        state.loginUtilisateur = action.payload;
                                        writeThisInLocalstore(action.payload, "loginUtilisateur");
                                        if (action.payload.dataPro?.length >= 2) {
                                                // ouverture de la modale de selection de profile
                                                state.modalProfile = { open: true, size: "profil" };
                                                return;
                                        }
                                        if (action.payload.dataPro === undefined || action.payload.dataPro?.length===1 ) {
                                                // prise en compte du seul profil dans le state et redirection 
                                                writeThisInLocalstore(action.payload.lg_PROFIL_ID, "currentProfile");
                                                Info.fire({ title: "Bienvenue " + getThisInLocalstore("loginUtilisateur")?.str_FIRST_LAST_NAME });
                                                setTimeout(() => {
                                                        window.location.href = BASEROOT;
                                                }, 1000);
                                                return;
                                        }
                                } else {
                                        state.loginUtilisateur = [];
                                        purgeStrorage();
                                        if (action.payload.code_statut === "0") {
                                                Danger.fire({ title: action.payload.desc_statut });
                                        }else{ 
                                                Danger.fire({ title: "Le serveur est injoingnable ! vérifier votre connexion" }); 
                                        }
                                }
                        })
                        //doConnexion
                        .addCase(searchUtilisateur.rejected, (state, action) => {
                                state.status.utilisateur = STATUS.ERROR;
                                Danger.fire({ title: "Désolé ! La liste des utilisateurs n'a pas pu être chargée" });
                        });
        },
});

export const { setModalCompte, setmodalLockFrame, setUtilisateurList, setCurrentUtilisateur, setCurrentProfile, setLoginUtilisateur, setMenu, setMenuSate, setSubMenuState, setPagination, setformErreur, setFileImg, setModalUtilisateur, setModalProfile, status, menu } = UtilisateurSlice.actions;
export default UtilisateurSlice.reducer;


