import { configureStore } from "@reduxjs/toolkit";
import agenceReducer from './Agences/Agence';
import dashboard from "./Dashboard/Dashboard";
import auditeReducer from './PisteAudit/PisteAudit';
import profilprivilegesReducer from './Profil/Privilege';
import profilReducer from './Profil/Profil';
import utilisateurReducer from './Utilisateurs/Utilisateur';
import typelisteReducer from './Valeur/Valeur';
import listeReducer from './Valeur/ValeurListe';

export const Store = configureStore ({
  reducer: {
    utilisateurs    :  utilisateurReducer,
    agences         :  agenceReducer,
    typelistes      :  typelisteReducer,
    profils         :  profilReducer,
    pisteaudites    :  auditeReducer, 
    listes          :  listeReducer,
    profilprivileges:  profilprivilegesReducer,
    dashboard       :  dashboard
  }
});
