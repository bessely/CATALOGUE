import React, { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BASEROOT } from '../services/serveur';

//lazy loading permet de charger les composants uniquement au besoin  { ça rend l'appli plus lentes en principe mais plus performante et moin groumande en memoire mais une fois builder la lenteur est imperceptible pour le client}
const Agence          = lazy(() => import("../pages/agence/Agence"));
const Dashboard       = lazy(() => import("../pages/dashboard/Dashboard"));
function RoutesApp() {
    return (
        <Router basename={BASEROOT}>
            <Routes>
                <Route path = "/"                element={<Dashboard       />} />
                <Route path = "/Agence"          element={<Agence          />} />
            </Routes>
        </Router>
    )
}

export default RoutesApp