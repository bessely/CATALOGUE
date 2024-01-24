import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../globalComponents/Modal';
import { Info } from '../../../services/CustomToast';
import { createUtilisateur, updateUtilisateur } from '../../../services/Utilisateur';
import { setCurrentUtilisateur, setModalUtilisateur, setformErreur } from '../../../store/Utilisateurs/Utilisateur';
import FormUtilisateur from './FormUtilisateur';

function ModalUtilisateur(){
    const { modalUtilisateur, currentUtilisateur, formErreur } = useSelector((state) => state.utilisateurs);
    const { listAgenceOptions }                                = useSelector((state) => state.agences);
    const Dispacth                                             = useDispatch();
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
    const validation = () => {
        var erreur = {};
        const regexmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!currentUtilisateur.STR_UTIFIRSTNAME || currentUtilisateur.STR_UTIFIRSTNAME === "" || currentUtilisateur.STR_UTIFIRSTNAME.length <= 1) {
            erreur.STR_UTIFIRSTNAME = "Erreur sur le nom !";
        }
        if (!currentUtilisateur.STR_UTILASTNAME || currentUtilisateur.STR_UTILASTNAME === "" || currentUtilisateur.STR_UTILASTNAME.length <= 1) {
            erreur.STR_UTILASTNAME = "Erreur sur le Prenom !";
        }

        if (!currentUtilisateur.STR_UTILOGIN  || currentUtilisateur.STR_UTILOGIN.length <= 1) {
            erreur.STR_UTILOGIN = "Erreur sur le UID !";
        }

        if (!currentUtilisateur.STR_UTIMATRICULE || currentUtilisateur.STR_UTIMATRICULE === "" || currentUtilisateur.STR_UTIMATRICULE.length <= 1) {
            erreur.STR_UTIMATRICULE = " Erreur sur le matricule ! ";
        }
        if (!regexmail.test(String(currentUtilisateur.STR_UTIMAIL).toLowerCase())) {
            erreur.STR_UTIMAIL = " Erreur sur le mail ! ";
        }
        if (currentUtilisateur.STR_UTIPHONE && currentUtilisateur.STR_UTIPHONE.length <= 8) {
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
        if (Object.keys(errorlog).length === 0){  //si plus ou pas d'erreur  
            if (modalUtilisateur.mode === "creation"){
                Dispacth(createUtilisateur(currentUtilisateur));
            }
            if (modalUtilisateur.mode === "modification"){
                Dispacth(updateUtilisateur(currentUtilisateur));
            }
        }
        else {
            Info.fire({ title: "Corrigez les erreurs SVP !" });
        }
    };
    return (
        <Modal
            modaleSate       = {modalUtilisateur}
            setModalSate     = {setModalUtilisateur}
            OnActionBtnClick = {handleSubmit}
        >
            <FormUtilisateur
                captureSaisie      = {captureSaisie}
                formErreur         = {formErreur}
                currentUtilisateur = {currentUtilisateur}
                setSelection       = {setSelection}
                listAgenceOptions  = {listAgenceOptions}
            /> 
        </Modal>
    )
}

export default ModalUtilisateur