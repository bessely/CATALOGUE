
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErreurObject from '../../../globalComponents/ErreurObject';
import Modal from '../../../globalComponents/Modal';
import { PAGINATION } from '../../../globalComponents/Pagination';
import { Info } from '../../../services/CustomToast';
import { loadDataTypeListeList } from '../../../services/Valeur';
import { CreateListe, updateListe } from '../../../services/ValeurListe';
import { setCurrentListe, setModalListe, setformErreur } from '../../../store/Valeur/ValeurListe';

function ModalListe(){
    const Dispacth = useDispatch();
    useEffect(() => { Dispacth(loadDataTypeListeList({ start: 0, listParPage: PAGINATION.listParPage })); }, [Dispacth]); 
    const { modalListe, currentListe, formErreur } = useSelector((state) => state.listes);
    const { currentTypeListe } = useSelector ((state) => state.typelistes);

    const captureSaisie = (e) => {
        const { id, value } = e.target;
        Dispacth(setCurrentListe({ ...currentListe, [id]: value })); //<- sauvegardes des champs du formulaire
        Dispacth(setformErreur({ ...formErreur, [id]: "" }));
    };

    /** Renseigne les selections dans le state de l'acteur en cours(currentActor) de creation ou de modification
      *@param {string} typelist= {pays, groupe; statusjuri}
      *@param {object} item reviens avec l'element selectionné 
      *@function
     */
     // eslint-disable-next-line
    const setSelection = (item) => {
        Dispacth(setCurrentListe({ ...currentListe, [item.typeList]: item }));
        Dispacth(setformErreur({ ...formErreur, [item.typeList]: "" }));
        console.log(item.typeList);
    };

    /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
     * @param {array} data les champs du formulaire à valider
     * @function
     */
    const validation = () => {
        var erreur = {};
        if (!currentListe.STR_LSTDESCRIPTION || currentListe.STR_LSTDESCRIPTION === "" || currentListe.STR_LSTDESCRIPTION.length <= 1) {
            erreur.STR_LSTDESCRIPTION = "Erreur sur la Description";
        }
        if (!currentListe.STR_LSTVALUE || currentListe.STR_LSTVALUE === "" || currentListe.STR_LSTVALUE.length <= 1) {
            erreur.STR_LSTVALUE = "Erreur sur Valeur";
        }
        if (!currentListe.STR_LSTOTHERVALUE || currentListe.STR_LSTOTHERVALUE === "" || currentListe.STR_LSTOTHERVALUE.length <= 1) {
            erreur.STR_LSTOTHERVALUE = "Erreur sur Autre Valeur";
        }
        if (!currentListe.STR_LSTOTHERVALUE1 || currentListe.STR_LSTOTHERVALUE1 === "" || currentListe.STR_LSTOTHERVALUE1.length <= 1) {
            erreur.STR_LSTOTHERVALUE1 = "Erreur sur Autre Valeur 1!";
        }    
        if (!currentListe.STR_LSTOTHERVALUE2 || currentListe.STR_LSTOTHERVALUE2 === "" || currentListe.STR_LSTOTHERVALUE2.length <= 1) {
            erreur.STR_LSTOTHERVALUE2 = "Erreur sur Autre Valeur 2";
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
            if (modalListe.mode === "creation"){
                // alert(currentTypeListe.LG_TYLID)
                Dispacth(CreateListe(currentListe, currentTypeListe.LG_TYLID));
            }
            if (modalListe.mode === "modification"){
                Dispacth(updateListe(currentListe));
            }
        }else {
            Info.fire({ title: "Corrigez les erreurs SVP !" });
        }
    };


    return (
        <Modal
            modaleSate       = {modalListe}
            setModalSate     = {setModalListe}
            OnActionBtnClick = {handleSubmit}
        >
            <div className='border border-primary rounded p-3 register-modal shadow'>
                <form>
                    <div className="form-row mb-2">
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_LSTVALUE">VALEUR </label> <small className="text-danger">*</small>
                            <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_LSTVALUE" value={currentListe.STR_LSTVALUE ?? ""} placeholder="Entrer Sur la Valeur" />
                            <ErreurObject>{formErreur.STR_LSTVALUE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_LSTDESCRIPTION">DESCRIPTION</label> <small className="text-danger">*</small>
                            <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_LSTDESCRIPTION" value={currentListe.STR_LSTDESCRIPTION ?? ""} placeholder="Entrer la Description" />
                            <ErreurObject>{formErreur.STR_LSTDESCRIPTION}</ErreurObject>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_LSTOTHERVALUE">AUTRE VALEUR </label> <small className="text-danger">*</small>
                            <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_LSTOTHERVALUE" value={currentListe.STR_LSTOTHERVALUE ?? ""} placeholder="Entrer Autre Valeur" />
                            <ErreurObject>{formErreur.STR_LSTOTHERVALUE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_LSTOTHERVALUE1">AUTRE VALEUR1 </label> <small className="text-danger">*</small>
                            <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_LSTOTHERVALUE1" value={currentListe.STR_LSTOTHERVALUE1 ?? ""} placeholder="Entrer Autre Valeur 1" />
                            <ErreurObject>{formErreur.STR_LSTOTHERVALUE1}</ErreurObject>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                    </div>
                    <div className="form-row mb-2">
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_LSTOTHERVALUE2">AUTRE VALEUR 2 </label> <small className="text-danger">*</small>
                            <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_LSTOTHERVALUE2" value={currentListe.STR_LSTOTHERVALUE2 ?? ""} placeholder="Entrer Autre Valeur 2" />
                            <ErreurObject>{formErreur.STR_LSTOTHERVALUE2}</ErreurObject>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ModalListe