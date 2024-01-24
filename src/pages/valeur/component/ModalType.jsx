import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErreurObject from '../../../globalComponents/ErreurObject';
import Modal from '../../../globalComponents/Modal';
import { Info } from '../../../services/CustomToast';
import { createTypeListe, updateTypeListe } from '../../../services/Valeur';
import { setCurrentTypeListe, setModalTypeListe, setformErreur } from '../../../store/Valeur/Valeur';
import ValeurList from '../ValeurListe';
import ModalListe from './ModalListe';

/**
 * MODAL DES LISTES DE VALEUR
 * SERT A MODIFIE ET CONSULTER LES DETAILS DE LA TYPE LISTE
 * ELLE CONTIENT LA LISTE DES TYPES LISTES
 */
function ModalTypeListe() {
    const { modalTypeListe, currentTypeListe, formErreur } = useSelector((state) => state.typelistes);
    const Dispacth = useDispatch();
    useEffect(() => { Dispacth(setformErreur([])); }, [Dispacth]);
    /** Pendant la saisi dans le formulaire d'un Utilisateur
     * @évènement onChange
     */
    const captureSaisie = (e) => {
        const { id, value } = e.target;
        Dispacth(setCurrentTypeListe({ ...currentTypeListe, [id]: value })); //<- sauvegardes des champs du formulaire
        Dispacth(setformErreur({ ...formErreur, [id]: "" }));
    };

    /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
     * @param {array} data les champs du formulaire à valider
     * @function
     */
    const validation = () => {
        var erreur = {};
        if (!currentTypeListe.STR_TYLNAME || currentTypeListe.STR_TYLNAME === "" || currentTypeListe.STR_TYLNAME.length <= 1) {
            erreur.STR_TYLNAME = "Erreur sur le libellé";
        }
        if (!currentTypeListe.STR_TYLDESCRIPTION || currentTypeListe.STR_TYLDESCRIPTION === "" || currentTypeListe.STR_TYLDESCRIPTION.length <= 1) {
            erreur.STR_TYLDESCRIPTION = "Erreur sur la Description!";
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
        if (Object.keys(errorlog).length === 0) {  //si plus ou pas d'erreur  code_statut
            if (modalTypeListe.mode === "creation") {
                Dispacth(createTypeListe(currentTypeListe));
            }
            if (modalTypeListe.mode === "modification") {
                Dispacth(updateTypeListe(currentTypeListe));
            }
        }else {
            Info.fire({ title: "Corrigez les erreurs SVP !" });
        }
    };

    return (
        <Modal
            modaleSate       = {modalTypeListe}
            setModalSate     = {setModalTypeListe}
            OnActionBtnClick = {handleSubmit}
        >
            <div className='border border-primary rounded p-3 mb-3 register-modal'>
                <form>
                    <div className="form-row mb-2">
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_TYLNAME">LIBELLÉ </label> <small className="text-danger">*</small>
                            <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_TYLNAME" value={currentTypeListe.STR_TYLNAME ?? ""} placeholder="Entrer un libellé" />
                            <ErreurObject>{formErreur.STR_TYLNAME}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_TYLDESCRIPTION">DESCRIPTION</label> <small className="text-danger">*</small>
                            <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_TYLDESCRIPTION" value={currentTypeListe.STR_TYLDESCRIPTION ?? ""} placeholder="Entrer une Description" />
                            <ErreurObject>{formErreur.STR_TYLDESCRIPTION}</ErreurObject>
                        </div>
                    </div>
                </form>
            </div>
            <div className={modalTypeListe.mode === "creation" || currentTypeListe.LG_TYLID === undefined ? "widget-content widget-content-area br-6 d-none" : "widget-content widget-content-area br-6"}>
                <ValeurList />
            </div>
            <ModalListe />
        </Modal>
    )
}

export default ModalTypeListe