
/** 
 * !!STATER DE PROJET REACT [SYNAPSE GROUPE]
* 
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
**/
import React, { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from './globalComponents/CustomLoader';
// import SessionTimeOut from "./globalComponents/SessionTimeOut";
import RoutesApp from "./routes/Routes";
import { pageSurveillance } from "./services/Utilisateur";
import { getCurrentPath, packageJSON } from "./services/globalFunction";
import { Store } from "./store/Store";

/**
 * Le Fichier Assembleur denotre Application
 * @returns App [STATER]
 */
function App() {
  useEffect(() => {
    console.log(`[ Bienvenue sur ${packageJSON.name.toLocaleUpperCase()}@${packageJSON.version} - ${packageJSON.description} ]`); // la page courante
    console.log("La page en cours : " + getCurrentPath()); // la page courante
    toast.configure();
    if (process.env.NODE_ENV==="production") {
      console.log   = function() {}; // desactive tous les console.log en production
      console.error = function() {}; // desactive tous les console.error en production
      console.warn  = function() {}; // desactive tous les console.warn en production
    }
    if (getCurrentPath() !== "Connexion" && getCurrentPath() !== "Forget" && getCurrentPath() !== "PageNotFound") {
      //LES FONCTION DE PROTECTION DE LA SESSION EN COURS
      // sessionSurveillance();
      pageSurveillance(getCurrentPath());
    }
  }, []);
  return (
    <Provider store={Store}>
      {
        getCurrentPath() !== "Connexion" && getCurrentPath() !== "Forget" && getCurrentPath() !== "PageNotFound" ? 
          <>
            {/* TOUS CES COMPOSANTS SONT DISPONIBLES DE FACON GLOBAL DANS L'APPLICATION*/}
            {/* <Compte /> */}
            {/* <SessionTimeOut /> */}
            <CustomLoader/>
          </>
        :
          null
      }
      <Suspense fallback={<CustomLoader mode="Suspense"/>}>
        <RoutesApp/>
      </Suspense>
    </Provider>
  );
}

export default App;
