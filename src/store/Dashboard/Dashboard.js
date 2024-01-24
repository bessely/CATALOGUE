import { createSlice } from "@reduxjs/toolkit";
import { listProject } from "../../services/Dashboard.js";
import { STATUS } from "../../services/globalConstante.js";

/** DASHBOARD [CONVERGENCE] SYNAPSE GROUPE
* !!CENTRALISATION DES STATES DU DASHBOARD
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

export const MODALDASHBOARDDEFAULTSTATE = { open: false, mode:"creation", size: "xl", title: "APPNAME", button:false,  buttonName:"Enregistrer", inputstate: "", btnclass: "btn btn-primary" };
const initialState = {
  status          : { dashboard: STATUS.SUCCESS },
  modalModule     : MODALDASHBOARDDEFAULTSTATE,
  modalAccess     : MODALDASHBOARDDEFAULTSTATE,
  currentModule   : [],
  currentAccess   : {id:"",password:""},
  projectList     : [],
};

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setProjectList        (state, action) { state.projectList        = action.payload; },
    setModalModule        (state, action) { state.modalModule        = action.payload; },
    setModalAccess        (state, action) { state.modalAccess        = action.payload; },
    setCurrentModule      (state, action) { state.currentModule      = action.payload; },
    setCurrentAccess      (state, action) { state.currentAccess      = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProject.pending, (state, action) => {
          state.status.dashboard = STATUS.LOADING;
      })
      .addCase(listProject.fulfilled, (state, action) => {
        if (action.payload!==undefined ) {
          console.log(action.payload);
          state.status.dashboard = STATUS.SUCCESS;
          state.projectList      = action.payload?.data
        }
      })
      .addCase(listProject.rejected, (state, action) => {
            state.status.dashboard = STATUS.ERROR;
            state.projectList      = []
      });
  },
});
export const { setProjectList, setModalModule, setCurrentModule, setCurrentAccess, setModalAccess } = DashboardSlice.actions;
export default DashboardSlice.reducer;


