import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErreurObject from '../../../globalComponents/ErreurObject';
import Modal from '../../../globalComponents/Modal';
import { createAgence, updateAgence } from '../../../services/Agence';
import { Info } from "../../../services/CustomToast";
import { setCurrentAgence, setModalAgence, setformErreur } from '../../../store/Agences/Agence';
function ModalAgence() {
    const { modalAgence, currentAgence, formErreur } = useSelector((state) => state.agences);
    const dispatch     = useDispatch();
    
    /** Pendant la saisi dans le formulaire d'un agence
     * @évènement onChange
     */
    const captureSaisie = (e) => {
        const { id, value } = e.target;
        dispatch(setCurrentAgence({ ...currentAgence, [id]: value })); //<- sauvegardes des champs du formulaire
        dispatch(setformErreur({ ...formErreur, [id]: "" }));
    };

    /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
     * @param {array} data les champs du formulaire à valider
     * @function
     */
    const validation = () => {
        var erreur    = {};
        const regexmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!currentAgence.STR_AGECODE || currentAgence.STR_AGECODE === "" || currentAgence.STR_AGECODE.length <= 1) {
            erreur.STR_AGECODE ="Erreur sur le code !";
        }
        if (!currentAgence.STR_AGECODEBCEAO || currentAgence.STR_AGECODEBCEAO === "" || currentAgence.STR_AGECODEBCEAO.length <= 1) {
            erreur.STR_AGECODEBCEAO ="Erreur sur le code BCEAO !";
        }
        if (currentAgence.STR_AGEDESCRIPTION && currentAgence.STR_AGEDESCRIPTION.length <= 1) {
            erreur.STR_AGEDESCRIPTION = " Erreur sur la description ! ";
        }
        if (!currentAgence.STR_AGELOCALISATION || currentAgence.STR_AGELOCALISATION === "" || currentAgence.STR_AGELOCALISATION.length <= 3) {
            erreur.STR_AGELOCALISATION = " Erreur sur la localisation ! ";
        }
        if (currentAgence.STR_AGEBP && currentAgence.STR_AGEBP.length <= 1) {
            erreur.STR_AGEBP = "Erreur sur l'adresse postale ! ";
        }
        if (!regexmail.test(String(currentAgence.STR_AGEMAIL).toLowerCase())) {
            erreur.STR_AGEMAIL = "Erreur sur le mail ! ";
        }
        if (!currentAgence.STR_AGEPHONE || currentAgence.STR_AGEPHONE === "" || currentAgence.STR_AGEPHONE.length <= 8) {
            erreur.STR_AGEPHONE = "Erreur sur le format du téléphone ! ";
        }
        if (!currentAgence.STR_VILLE || currentAgence.STR_VILLE === "" || currentAgence.STR_VILLE.length <= 3) {
            erreur.STR_VILLE = "Erreur sur la ville ! ";
        }
        if (currentAgence.STR_AGELONGITUDE && currentAgence.STR_AGELONGITUDE.length < 3) {
            erreur.STR_AGELONGITUDE = "Erreur sur la longitude ! ";
        }
        if (currentAgence.STR_AGELATITUDE && currentAgence.STR_AGELATITUDE.length < 3) {
            erreur.STR_AGELONGITUDE = "Erreur sur la latitude ! ";
        }
        return erreur;
    };

    /** soumission du formulaire de creation d'agence après correction sauf en cas de suppression
     *  @évènement onClick
     */
    const handleSubmit = (e) => {
        let errorlog = {};
        e.preventDefault();
        errorlog = validation();
        dispatch(setformErreur(errorlog));
        if (Object.keys(errorlog).length === 0){  //si plus ou pas d'erreur  
            if (modalAgence.mode === "creation") {
                dispatch(createAgence(currentAgence));
            }
            if (modalAgence.mode === "modification") {
                dispatch(updateAgence(currentAgence));
            }
        }else {
            Info.fire({title: "Corrigez les erreurs SVP !"}); 
        }
    };
    return (
        <Modal
            modaleSate       = {modalAgence}
            setModalSate     = {setModalAgence}
            OnActionBtnClick = {handleSubmit}
        >
            <div className='border border-primary rounded p-3 register-modal shadow'>
                <form>
                    <div className="form-row mb-2">
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGECODE">Code agence</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGECODE"  value={currentAgence.STR_AGECODE??""} placeholder="Code de l'agence" />
                            <ErreurObject>{formErreur.STR_AGECODE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6"> 
                            <label htmlFor="STR_AGECODEBCEAO">Code BCEAO agence</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGECODEBCEAO"  value={currentAgence.STR_AGECODEBCEAO??""} placeholder="Code BCEAO de l'agence" />
                            <ErreurObject>{formErreur.STR_AGECODEBCEAO}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-12">
                            <label htmlFor="STR_AGEDESCRIPTION">Description</label>
                            <textarea  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGEDESCRIPTION" value={currentAgence.STR_AGEDESCRIPTION??""} placeholder="Une brève description de l'agence" />
                            <ErreurObject>{formErreur.STR_AGEDESCRIPTION}</ErreurObject>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_VILLE">Ville</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_VILLE" value={currentAgence.STR_VILLE??""} placeholder="Ville ou commune de l'agence" />
                            <ErreurObject>{formErreur.STR_VILLE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGELOCALISATION">Localisation</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGELOCALISATION" value={currentAgence.STR_AGELOCALISATION ?? ""} placeholder="Localisation dans la ville (Commune, Quartier, Secteur, etc.)" />
                            <ErreurObject>{formErreur.STR_AGELOCALISATION}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGELONGITUDE">Longitude</label>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGELONGITUDE"  value={currentAgence.STR_AGELONGITUDE ?? ""} placeholder="Coordonnées GPS de la longitude sur la carte" />
                            <ErreurObject>{formErreur.STR_AGELONGITUDE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGELATITUDE">Latitude</label>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGELATITUDE" value={currentAgence.STR_AGELATITUDE ?? ""} placeholder="Coordonnées GPS de la latitude sur la carte" />
                            <ErreurObject>{formErreur.STR_AGELATITUDE}</ErreurObject>
                        </div>
                    </div>

                    <div className="form-row mb-2">
                    <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGEBP">Boite postale</label>
                            <input  onChange={captureSaisie} type="phone" className="form-control mb-1" id="STR_AGEBP" value={currentAgence.STR_AGEBP ?? ""} placeholder="La boite postale de l'agence" />
                            <ErreurObject>{formErreur.STR_AGEBP}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGEPHONE">Téléphone</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="phone" className="form-control mb-1" id="STR_AGEPHONE" value={currentAgence.STR_AGEPHONE ?? ""} placeholder="+000 00 00 00 00 00 (Indicatif + Numéro)" />
                            <ErreurObject>{formErreur.STR_AGEPHONE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-12">
                            <label htmlFor="STR_AGEMAIL">Email</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGEMAIL" value={currentAgence.STR_AGEMAIL ?? ""} placeholder="exemplemail@mail.com" />
                            <ErreurObject>{formErreur.STR_AGEMAIL}</ErreurObject>
                        </div>
                    </div>

                </form>

            </div>
        </Modal>
    )
}

export default ModalAgence