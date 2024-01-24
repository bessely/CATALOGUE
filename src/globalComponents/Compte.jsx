import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormPassUser from '../pages/utilisateur/component/FormPassUser';
import FormUtilisateur from '../pages/utilisateur/component/FormUtilisateur';
import { Info } from '../services/CustomToast';
import { changePassWord, updateUtilisateur } from '../services/Utilisateur';
import { setCurrentUtilisateur, setModalCompte, setformErreur } from '../store/Utilisateurs/Utilisateur';
import Modal from './Modal';

/**
 * MODALE DE GESTION DU COMPE DE L'UTILISATEUR CONNECTE
 * COMPOSANT AUTONONE
 * IL CONTIENT LE FORMULAIRE DE MODIFICATION DES INFOS DU COMPTE DE L'UTILISATEUR CONNECTE [FormUtilisateur.jsx]
 * IL CONTIENT LE FORMULAIRE DE MODIFICATION DU PASSWORD DE L'UTILISATEUR CONNECTE [FormPassUser.jsx]
 **/
function Compte() {
  const { modalCompte,currentUtilisateur, formErreur } = useSelector((state) => state.utilisateurs);
  const { listAgenceOptions } = useSelector((state) => state.agences);
  const Dispacth = useDispatch();
  /** Pendant la saisi dans le formulaire d'un Utilisateur
     * @évènement onChange
     */
  const captureSaisie = (e) => {
    const { id, value } = e.target;
    Dispacth(setCurrentUtilisateur({ ...currentUtilisateur, [id]: value })); //<- sauvegardes des champs du formulaire
    Dispacth(setformErreur({ ...formErreur, [id]: "" }));
  };

  /** Renseigne les selections dans le state de l'acteur en cours(currentActor) de creation ou de modification
   *@param {string} typelist= {pays, groupe; statusjuri}
   *@param {object} item reviens avec l'element selectionné 
   * @function     
   */
  const setSelection = (item) => {
    Dispacth(setCurrentUtilisateur({ ...currentUtilisateur, [item.typeList]: item }));
    Dispacth(setformErreur({ ...formErreur, [item.typeList]: "" }));
  };

  /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
   * @param {array} data les champs du formulaire à valider
   * @function
   */
  const validation = (form) => {
    var erreur = {};
    const regexmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (form === "pwsd") {
      if (!currentUtilisateur.OLD_PASSWORD || currentUtilisateur.OLD_PASSWORD === "" || currentUtilisateur.OLD_PASSWORD.length <= 1) {
        erreur.OLD_PASSWORD = "Vous devez saisir votre mot de passe actuel !";
      }
      if (!currentUtilisateur.NEW_PASSWORD2 || currentUtilisateur.NEW_PASSWORD2 === "" || currentUtilisateur.NEW_PASSWORD2.length < 4) {
        erreur.NEW_PASSWORD2 = "Erreur sur la confirmation du mot de passe !";
      }
      if (currentUtilisateur.NEW_PASSWORD !== currentUtilisateur.NEW_PASSWORD2) {
        erreur.NEW_PASSWORD2 = "les 2 mots de passe sont différents !";
      }
      return erreur;
    }
    if (!currentUtilisateur.STR_UTIFIRSTNAME || currentUtilisateur.STR_UTIFIRSTNAME === "" || currentUtilisateur.STR_UTIFIRSTNAME.length <= 1) {
      erreur.STR_UTIFIRSTNAME = "Erreur sur le nom !";
    }
    if (!currentUtilisateur.STR_UTILASTNAME || currentUtilisateur.STR_UTILASTNAME === "" || currentUtilisateur.STR_UTILASTNAME.length <= 1) {
      erreur.STR_UTILASTNAME = "Erreur sur le Prenom !";
    }
    if (!currentUtilisateur.STR_UTILOGIN || currentUtilisateur.STR_UTILOGIN.length <= 1) {
      erreur.STR_UTILOGIN = "Erreur sur le UID !";
    }
    if (!currentUtilisateur.STR_UTIMATRICULE || currentUtilisateur.STR_UTIMATRICULE === "" || currentUtilisateur.STR_UTIMATRICULE.length <= 1) {
      erreur.STR_UTIMATRICULE = " Erreur sur le matricule ! ";
    }
    if (!regexmail.test(String(currentUtilisateur.STR_UTIMAIL).toLowerCase())) {
      erreur.STR_UTIMAIL = " Erreur sur le mail ! ";
    }
    if (currentUtilisateur.STR_UTIPHONE && currentUtilisateur.STR_UTIPHONE.length < 8) {
      erreur.STR_UTIPHONE = " Erreur sur le format du téléphone ! ";
    }
    if (!currentUtilisateur.AGENCE) {
      erreur.AGENCE = " Sélectionnez une agence SVP ! ";
    }
    return erreur;
  };

  /** soumission du formulaire de creation d'utilisateur après correction sauf en cas de suppression
   *  @évènement onClick
   */
  const handleSubmit = (e) => {
    let errorlog = {};
    e.preventDefault();
    errorlog = validation();
    Dispacth(setformErreur(errorlog));
    if (Object.keys(errorlog).length === 0) {  //si plus ou pas d'erreur  
      Dispacth(updateUtilisateur(currentUtilisateur));
    }
    else {
      Info.fire({ title: "Corrigez les erreurs SVP !" });
    }
  };

  const handleSubmitPwd = (e) => {
    e.preventDefault();
    let errorlog = {};
    errorlog     = validation("pwsd");
    Dispacth(setformErreur(errorlog));
    if (Object.keys(errorlog).length === 0) {  //si plus ou pas d'erreur  
      Dispacth(changePassWord(currentUtilisateur));
    }
    else {
      Info.fire({ title: "Corrigez les erreurs SVP !" });
    }
  };
  
  return (
    <Modal
      modaleSate       = {modalCompte}
      setModalSate     = {setModalCompte}
      OnActionBtnClick = {handleSubmit}
    >
      <div className='d-flex flex-wrap justify-content-between rounded'>
        <p>Mes identifiants</p>
        <FormUtilisateur
          handleSubmit       = {handleSubmit}
          captureSaisie      = {captureSaisie}
          formErreur         = {formErreur}
          currentUtilisateur = {currentUtilisateur}
          setSelection       = {setSelection}
          listAgenceOptions  = {listAgenceOptions}
          className          = 'col-12 mb-3'
          btnTitle           = 'Mettre à jour'
          formType           = 'compte'
        />
        <br />
        <br />
        <p>Mon mot de passe</p>
        <FormPassUser
          handleSubmitPwd    = {handleSubmitPwd}
          captureSaisie      = {captureSaisie}
          formErreur         = {formErreur}
          currentUtilisateur = {currentUtilisateur}
          className          = 'col-12 mb-3'
        />
      </div>
    </Modal>
  )
}

export default Compte