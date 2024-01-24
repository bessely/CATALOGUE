import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalProfile from '../pages/connexion/component/ModalProfile';
import { doDisConnexion, getCurrentProfile, getDataUtilisateur, getLoginUtilisateur, lockSession, popUpProfil } from '../services/Utilisateur';
import { BASEROOT } from '../services/serveur';
import { setCurrentUtilisateur, setModalCompte, setformErreur, setmodalLockFrame } from '../store/Utilisateurs/Utilisateur';

/** 
 * SECTION DE DECONNEXION D'UN USERP
 * CONTIENT LES ELEMENTS SUIVANTS:
 * LE BOUTON DE DECONNEXION D'UN USER
 * LE BOUTON DE PERMUTATION DE PROFIL DANS LE CAS OU LE USER CONNECTE EN A PLUSIEURS
 * LE BOUTON DE VERROUILLAGE DE SESSION
 * LA MODAL DE VERROUILLAGE DE SESSION [ModalProfile]
 * @returns JSX
 */
function UserSectionBottom() {
    const dispatch      = useDispatch();
    const { loginUtilisateur, modalLockFrame, modalCompte } = useSelector((state) => state.utilisateurs);
    return (
        <div className="dropdown user-profile-dropdown">
            <div className="dropdown-toggle user" id="userProfileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="far fa-house-user fs-3 text-light font-weight-lighter" />
            </div>
            <div className="dropdown-menu position-absolute" aria-labelledby="userProfileDropdown" style={{ backgroundColor:"#212122"}}>
                <div className="dropdown-inner">
                    <div className="user-profile-section">
                        <div className="media mx-auto">
                            <i className="far fa-user-shield fs-5 mr-2 text-warning font-weight-lighter" />
                            <div className="media-body">
                                <h5 className='text-white'>{getLoginUtilisateur()?.str_FIRST_LAST_NAME}</h5>
                                <p>{getCurrentProfile()?.STR_PRODESCRIPTION}</p>
                            </div>
                        </div>
                    </div>
                    {
                        loginUtilisateur.dataPro!==undefined && loginUtilisateur.dataPro.length >=2 ?
                            <div role="button" className="ml-4 mb-3 dropdown-item text-white font-weight-lighter" onClick={(e) => { dispatch(popUpProfil(e)) }}>
                                <i className="far fa-user-shield fs-4 mr-2 text-warning font-weight-lighter" />
                                <small> Basculer sur un autre profil </small>
                            </div>
                        : // pour les utilisateurs a 1 seul profil on affiche pas cette section
                        null
                    }
                    <div role="button" className="ml-4 mb-3 dropdown-item text-white font-weight-lighter" onClick={(e) => {
                            e.preventDefault();
                            dispatch(getDataUtilisateur());
                            dispatch(setformErreur([]))
                            dispatch(setModalCompte({ ...modalCompte, open: true, size: "xl", btnclass: "d-none" }));
                            dispatch(setCurrentUtilisateur([{ LG_UTIID: "", STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN: "", AGENCE: [{}] }]));
                        }} >
                        <i className="far fa-shield fs-4 mr-2 text-warning font-weight-lighter" />
                        <small> Mon compte </small>
                    </div>

                    <div role="button" className="ml-4 mb-3 dropdown-item text-white font-weight-lighter" onClick={(e) => {
                            dispatch(setmodalLockFrame({ ...modalLockFrame, open: true, size: "session" }));
                            dispatch(lockSession(e));
                        }} >
                        <i className="far fa-shield-keyhole fs-4 mr-2 text-warning font-weight-lighter" />
                        <small> Verrouillé </small>
                    </div>

                    <div role="button" className="ml-4 mb-3 dropdown-item text-danger font-weight-lighter" onClick={(e) => {
                        dispatch(doDisConnexion(BASEROOT+"Connexion"))
                    }} >
                        <i className="far fa-arrow-up-left-from-circle mr-2 text-danger font-weight-lighter" />
                        <small> Déconnexion </small>
                    </div>

                </div>
            </div>
            <ModalProfile/>
        </div>
    )
}

export default UserSectionBottom