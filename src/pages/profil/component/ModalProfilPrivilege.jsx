import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProfilPrivilege, updateProfilPrivilege, loadDataProfilPrivilegeList, setModalProfilPrivilege, setformErreur } from '../../../store/Profil/Privilege';
import { PAGINATION } from "../../../globalComponents/Pagination";
import Modal from '../../../globalComponents/Modal';
import { Info } from "../../../globalComponents/CustomToast";
import { CustumSelectStyl } from '../../../globalComponents/CustumSelectStyl';
import ErreurObject from '../../../globalComponents/ErreurObject';
import ProfilPrivilege from '../ProfilPrivilege';
import Select from 'react-select';

function ModalProfilPrivilege() {

    const dispatch = useDispatch();
    useEffect(() => { dispatch(loadDataProfilPrivilegeList({ start: 0, listParPage: PAGINATION.listParPage })); }, [dispatch]);
    const { currentProfilPrivilege, modalProfilPrivilege, setCurrentProfilPrivilege, formErreur } = useSelector((state) => state.profilprivileges);
    const { listSocieteOptions } = useSelector((state) => state.societes);
    const Dispacth = useDispatch();
    /** Pendant la saisi dans le formulaire d'un Profil
     * @évènement onChange
     */
    const captureSaisie = (e) => {
        const { id, value } = e.target;
        Dispacth(setCurrentProfilPrivilege({ ...currentProfilPrivilege, [id]: value })); //<- sauvegardes des champs du formulaire
        Dispacth(setformErreur({ ...formErreur, [id]: "" }));
    };

    /** Renseigne les selections dans le state de l'acteur en cours(currentActor) de creation ou de modification
     *@param {string} typeList= {pays, groupe; statusjuri}
     *@param {object} item reviens avec l'element selectionné 
     *@function
    */
    const setSelection = (item) => {
        Dispacth(setCurrentProfilPrivilege({ ...currentProfilPrivilege, [item.typeList]: item }));
        Dispacth(setformErreur({ ...currentProfilPrivilege, [item.typeList]: "" }));
    };

    /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
     * @param {array} data les champs du formulaire à valider
     * @function
     */
    const validation = () => {
        var erreur = {};
        if (currentProfilPrivilege.STR_PROTYPE && currentProfilPrivilege.STR_PROTYPE.length <= 1) {
            erreur.STR_PROTYPE = " Erreur sur le Type'! ";
        }
        if (!currentProfilPrivilege.SOCIETE) {
            erreur.SOCIETE = " Selectionnez une Société SVP ! ";
        }
        if (!currentProfilPrivilege.STR_PRODESCRIPTION || currentProfilPrivilege.STR_PRODESCRIPTION === "" || currentProfilPrivilege.STR_PRODESCRIPTION.length <= 1) {
            erreur.STR_PRODESCRIPTION = " Erreur sur la Description ! ";
        }
        if (!currentProfilPrivilege.STR_PRONAME || currentProfilPrivilege.STR_PRONAME === "" || currentProfilPrivilege.STR_PRONAME.length <= 1) {
            erreur.STR_PRONAME = " Erreur sur le Libélé ! ";
        }
        return erreur;
    };

    /** soumission du formulaire de creation de profil après correction sauf en cas de suppression
     *  @évènement onClick
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        let errorlog = {};
        errorlog     = validation();
        Dispacth(setformErreur(errorlog));
        if (Object.keys(errorlog).length === 0) {  //si plus ou pas d'erreur
            if (modalProfilPrivilege.mode === "creation") {
                Dispacth(createProfilPrivilege(currentProfilPrivilege));
            }
            if (modalProfilPrivilege.mode === "modification") {
                Dispacth(updateProfilPrivilege(currentProfilPrivilege));
            }
        }
        else {
            Info.fire({ title: "Corrigez les erreurs SVP !" });
        }
    };
    return (
        <Modal
            modaleSate={modalProfilPrivilege}
            setModalSate={setModalProfilPrivilege}
            OnActionBtnClick={handleSubmit}
        >
            <div className='border border-primary rounded p-3 register-modal shadow'>
                <form className='form-row mb-2'>
                    <div className="form-group mb-0 col-md-6">
                        <label htmlFor="STR_PRONAME">LIBELE</label> <small className="text-danger">*</small>
                        <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_PRONAME" value={currentProfilPrivilege.STR_PRONAME ?? ""} placeholder="Entrer Le LIBELE" />
                        <ErreurObject>{formErreur.STR_PRONAME}</ErreurObject>
                    </div>
                    <div className="form-group mb-0 col-md-6">
                        <label htmlFor="STR_PRODESCRIPTION">DESCRIPTION</label> <small className="text-danger">*</small>
                        <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_PRODESCRIPTION" value={currentProfilPrivilege.STR_PRODESCRIPTION ?? ""} placeholder="Entrer la description" />
                        <ErreurObject>{formErreur.STR_PRODESCRIPTION}</ErreurObject>
                    </div>
                    <div className="form-group mb-0 col-md-6">
                        <label>Type</label>
                        <select className='form-control' onChange={captureSaisie} id="STR_PROTYPE" value={currentProfilPrivilege.STR_PROTYPE}>
                            <option value="">Sélectionner une action</option>
                            <option value="Système">Système</option>
                            <option value="Métier">Métier</option>
                        </select>
                        <ErreurObject>{formErreur.STR_SOCFORMATSWIFT}</ErreurObject>
                    </div>
                    <div className="form-group mb-0 col-md-6">
                        <label htmlFor="LG_SOCID">Société</label><small className="text-danger">*</small>
                        <Select className="mb-1" id="SOCIETE"
                            placeholder = "Rechercher une Société"
                            styles      = {CustumSelectStyl}
                            value       = {currentProfilPrivilege.SOCIETE ?? [{}]}
                            onChange    = {setSelection}
                            options     = {listSocieteOptions}
                        />
                        <ErreurObject>{formErreur.SOCIETE}</ErreurObject>
                    </div>
                </form>
                <ProfilPrivilege />
            </div>
        </Modal>
    )
}

export default ModalProfilPrivilege