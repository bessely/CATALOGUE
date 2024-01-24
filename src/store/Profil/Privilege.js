import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PAGINATION } from "../../globalComponents/Pagination";
import { Danger, Info } from "../../services/CustomToast.js";
import { BASEURL } from "../../services/serveur.js";

/** PROFILPRIVILEGE [CONVERGENCE]
* !!CENTRALISATION DES STATES PROFILPRIVILEGE
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

export const STATUS = Object.freeze({
        SUCCESS: 'success',
        ERROR: 'error',
        LOADING: 'loading',
});

const APINAMESPACE = Object.freeze({
        PROFILPRIVILEGE: "/ConfigurationManager",
});
const MODALPROFILPRIVILEGEDEFAULTSTATE = { open: false, mode: "creation", size: "xl", title: "Nouvelle Profile Privilège", button: true, buttonName: "Enregistrer", inputstate: "", btnclass: "btn btn-primary" };
const CURRENTPROFILPRIVILEGEDEFAULTSATE = [{ LG_PRIID: "", STR_PRIDESCRIPTION: "", STR_PRIKIND: "", STR_PRINAME: "" }];
const initialState = {
        profilPrivilegeList    : [],
        currentProfilPrivilege : CURRENTPROFILPRIVILEGEDEFAULTSATE,
        pagination             : PAGINATION,
        formErreur             : [],
        modalProfilPrivilege   : MODALPROFILPRIVILEGEDEFAULTSTATE,
        fileImg                : [],
        searchParam            : { choix: "", profilPrivilege: "", type: "" },
        status                 : { profilPrivilege: STATUS.LOADING },
};

export const ProfilSlice = createSlice({
        name: "profilprivileges",
        initialState,
        reducers: {
                setProfilPrivilegeList   (state, action) { state.profilPrivilegeList    = action.payload; },
                setCurrentProfilPrivilege(state, action) { state.currentProfilPrivilege = action.payload; },
                setModalProfilPrivilege  (state, action) { state.modalProfilPrivilege   = action.payload; },
                setPagination            (state, action) { state.pagination             = action.payload; },
                setformErreur            (state, action) { state.formErreur             = action.payload; },
                setFileImg               (state, action) { state.fileImg                = action.payload; },
                setStatus                (state, action) { state.status                 = action.payload; },
        },
        extraReducers: (builder) => {
                builder
                        .addCase(loadDataProfilPrivilegeList.pending, (state, action) => {
                                state.status.profilPrivilege = STATUS.LOADING;
                        })
                        .addCase(loadDataProfilPrivilegeList.fulfilled, (state, action) => {
                                if (action.payload.recordsTotal > 0) {
                                        state.profilPrivilegeList = action.payload.data; // !<- PUBLICATION DE LA LISTE DES: PROFILPRIVILEGES DANS LE STORE
                                } else {
                                        state.profilPrivilegeList = [];
                                        if (action.meta.arg.search !== undefined) {
                                                Info.fire({ title: "Aucun profil Privilège (menu) trouvée" });
                                        } else {
                                                Danger.fire({ title: "La liste des privilèges (menus) n'a pas pu être chargée." });
                                        }
                                }
                                state.status = { ...state.status, profilPrivilege: STATUS.SUCCESS };
                        })
                        .addCase(loadDataProfilPrivilegeList.rejected, (state, action) => {
                                state.status.profilPrivilege = STATUS.ERROR;
                                Danger.fire({ title: "Désolé ! La liste des privilèges n'a pas pu être chargée" });
                        });
        },
});

/**
 * CHARGEMENT PRIVILEGES OU MENUS 
 * 
*/
export const loadDataProfilPrivilegeList = createAsyncThunk('profilPrivilege/fetchAll', async (data) => {
        try {
                var bodyFormData = new FormData();
                bodyFormData.append("STR_PRITYPE", "");
                bodyFormData.append("STR_PRIKIND", "");
                bodyFormData.append("LG_PROID", data.LG_PROID ?? "");
                bodyFormData.append("search[value]", data.search ?? "");
                bodyFormData.append("start", 0);
                bodyFormData.append("length", 2500);
                var res = await fetch(`${BASEURL}${APINAMESPACE.PROFILPRIVILEGE}/listPrivilegeQuick`, {
                                method : 'POST',
                                body   : bodyFormData
                });
                const response = await res.json();
                return response;
        } catch (error) {
                Danger.fire({ title: "Impossible de charger la liste des privilèges! vérifier votre connexion" });
                return error.message;
        }
});

/**
 * DECOCHER TOUS LES PROFILS PRIVILEGE EN UNE FOIS MAIS DIRECTEMENT DANS LE STATE PRINCIPALE DE LA LISTE DES PROFILS
 **/
export const initProfilState = createAsyncThunk('initProfilState/function', async (data, { dispatch, getState }) => {
        let profil = JSON.parse(JSON.stringify(getState().profilprivileges.profilPrivilegeList));
        profil.map((item) => {
                item.checked = item.LG_PRIID === "1" ? true : false; // le menu  CONVERGENCE est tjrs cocher par defaut
                return item;
        });
        dispatch(setProfilPrivilegeList(profil));
});

export const { setProfilPrivilegeList, setModalProfilPrivilege, setCurrentProfilPrivilege, setPagination, setformErreur, setFileImg, status } = ProfilSlice.actions;
export default ProfilSlice.reducer;


