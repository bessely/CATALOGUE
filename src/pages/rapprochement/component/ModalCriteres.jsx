import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flatpickr from "react-flatpickr";
import Modal from '../../../globalComponents/Modal';
import {Info, Danger} from "../../../globalComponents/CustomToast";
import {setModalcriteres, setCriteres, setRsmcriteres,fireAutoRapro,saveCriteresHistorique, setDatescritere, clearDate} from '../../../store/Rapprochements/Rapprochement'; 
import { BASEROOT } from '../../../services/serveur';

/**LA MODAL DES CRITERES DE RAPPROCHEMENT AUTOMATIQUE */
function ModalCriteres() {
    const { criteres, Listcriteres, modalcriteres, rsmcriteres, datescritere } = useSelector((state) => state.rapprochements);
    const dispacth     = useDispatch();

  /** soumission du rapprochement automatique
   *  @évènement onClick
   */
  const handleSubmit = (e) => {
    let temoin=0;
    criteres.map((item,x) => {
      if (item[Object.keys(item)[0]]==="") { //je verifie s'il y a tjrs des critères vides (non selectionnés)
        temoin++;
      }
      return true;
    });
    if (temoin===criteres.length) {
      Danger.fire({ title: "Selectionnez au moins un critère." });
    }else{
      Info.fire({ title: "Rapprochement automatique en cours ..." });
      dispacth(saveCriteresHistorique([])); //sauvegarde de l'historique des critères
      dispacth(fireAutoRapro([]));// lancement du rapprochement automatique
    }
  };

/** soumission du rapprochement automatique
 *  @évènement onClick
 */
  const handleDateChange = (selectedDate,id) => {
    if (selectedDate.length > 0 && id!== "") {
      let dateX   = JSON.parse(JSON.stringify(datescritere));
      dateX[id]   = selectedDate[0].toLocaleDateString("fr");
      dispacth(setDatescritere(dateX));
    }
  };
  
  /** A la selection d'un critère
   *  @évènement onClick
   */
  const handleClick = (e) => {
    let $this           = e.target;
    let idDeducted      = $this.htmlFor;
    let checkbox        = document.getElementById(idDeducted);
    let newChekBoxState = !checkbox.checked;
    checkbox.checked    = newChekBoxState;
      addOrRmvCriteres( JSON.parse($this.getAttribute('data-critere')),newChekBoxState );
      writeInResumeSection( JSON.parse($this.getAttribute('data-critere')),newChekBoxState);
  };
  
  /** La selection des critères par non de variable
   *  @évènement onClick
   */
  const addOrRmvCriteres = (critere,state) => {
    let newCritere = JSON.parse(JSON.stringify(criteres)); // <- permet une copy fidele de l'ancien array || [...criteres] <- peu fiable pour ce cas
    criteres.map((item,x) => {
      if (Object.keys(item)[0]===critere.str_Lstothervalue) { // pour le critere qu'on vient de cocher
        newCritere[x][critere.str_Lstothervalue] = state ? "1" : "0";
      }
      return true;
    });
    dispacth( setCriteres( newCritere ) );
  };

  /** La selection des critères par description
   *  @évènement onClick
   */
  const writeInResumeSection =  (critere,state) => {
    let selection = JSON.parse(JSON.stringify(rsmcriteres)); // <- permet une copy fidele de l'ancien array || [...rsmcriteres] <- peu fiable pour ce cas
    rsmcriteres.map((item,x) => {
      if (Object.keys(item)[0]===critere.str_Lstdescription) { // pour le critere qu'on vient de cocher
        selection[x][critere.str_Lstdescription] = state ? critere.str_Lstdescription : "";
      }
      return true;
    });
    dispacth( setRsmcriteres( selection ) );
  };

  useEffect(() => {
    /**
     * reselection de tous les critères en une fois [rappel de l'historique des critères précendement selectionné]
   * @returns  void
   */
    const checkedCritereFromHistory = () => {
      if (modalcriteres.open) { //a l'ouverture de la modal critères
        let checkboxList = document.getElementsByClassName("criteres");
        for (let x = 0; x < criteres.length; x++) {
          if (Object.values(criteres[x])[0] === "1") {
            checkboxList[x].checked = true;
          }
        }
      }
    }      
      checkedCritereFromHistory()
  }, [modalcriteres, criteres]);  

  return (
      <Modal
          modaleSate       = {modalcriteres}
          setModalSate     = {setModalcriteres}
          OnActionBtnClick = {handleSubmit}
      >
          <small className='m-0 p-0'>Cocher des critères</small>
          <div className='border border-primary rounded p-3 register-modal'>
              {
                Listcriteres.length > 0 ?
                  Listcriteres.map((item,x)=>{
                      return (
                        <>
                          <div key={"globalinp_critere_"+x}  className="form-group mb-0 mx-2">
                            <div className="form-check pl-0" key={"globalinp_critere_s" + x}>
                              <div className="custom-control custom-checkbox checkbox-info" key={"globalinp_critere_ss" + x}>
                                <input type="checkbox" data-critere={JSON.stringify(item)} className="criteres custom-control-input" id={"ckd" + x} key={"check " + x} />
                                <label  onClick={(e)=>{handleClick(e)}} data-critere={JSON.stringify(item)} className="critereslabel custom-control-label" htmlFor={"ckd"+x} key={"checkLab " + x} >{item.str_Lstdescription}</label>
                              </div>
                            </div>
                          </div>
                          {
                            Listcriteres.length-1 === x ? 
                              <div className="form-group mb-0 mx-0">
                                    <hr className='p-0 my-2' />
                                    <label htmlFor="basicFlatpickr">Date d'opération</label>
                                    <div className="form-group mb-0 d-flex">
                                        <Flatpickr
                                            className        = {"form-control col-6 flatpickr flatpickr-input mr-1"}
                                            options          = {{altFormat: "Y-m-d" ,dateFormat: "d-m-Y", time_24hr: true}}    //enableTime: true,
                                            value            = {""}
                                            id               = "DT_MVTDATEDOPEDEB"
                                            placeholder      = "Début"
                                            onChange         = {(e) => {handleDateChange(e,"DT_MVTDATEDOPEDEB")}}
                                        />
                                        <Flatpickr
                                            className        = {"form-control col-6 flatpickr flatpickr-input active"}
                                            options          = {{altFormat: "Y-m-d" ,dateFormat: "d-m-Y", time_24hr: true}}  
                                            value            = {""}
                                            id               = "DT_MVTDATEDOPEFIN"
                                            placeholder      = "Fin"
                                            onChange         = {(e) => {handleDateChange(e,"DT_MVTDATEDOPEFIN")}}
                                        />
                                    </div>
                                    <small role="button" className='float-right fs-5' onClick={(e) => dispacth(clearDate(["DT_MVTDATEDOPEDEB","DT_MVTDATEDOPEFIN"]))}>vider les dates d'opération</small>
                                    <hr className='p-0 my-3' />
                                    <label htmlFor="basicFlatpickr">Date de valeur</label>
                                    <div className="form-group mb-0 d-flex">
                                        <Flatpickr
                                            className        = {"form-control col-6 flatpickr flatpickr-input mr-1"}
                                            options          = {{altFormat: "Y-m-d" ,dateFormat: "d-m-Y", time_24hr: true}}
                                            value            = {""}
                                            id               = "DT_MVTDATEVALDEB"
                                            placeholder      = "Début"
                                            onChange         = {(e) => {handleDateChange(e,"DT_MVTDATEVALDEB")}}
                                        />
                                        <Flatpickr
                                            className        = {"form-control col-6 flatpickr flatpickr-input"}
                                            options          = {{altFormat: "Y-m-d" ,dateFormat: "d-m-Y", time_24hr: true}}
                                            value            = {""}
                                            id               = "DT_MVTDATEVALFIN"
                                            placeholder      = "Fin"
                                            onChange         = {(e) => {handleDateChange(e,"DT_MVTDATEVALFIN")}}
                                        />
                                    </div>
                                    <small role="button" className='float-right fs-5' onClick={(e) => dispacth(clearDate(["DT_MVTDATEVALDEB", "DT_MVTDATEVALFIN"]))}>vider les dates de valeur</small>
                              </div>
                            : 
                            null
                          }
                        </>
                      )
                  })
                :
                <div className='text-center'><img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /></div>
              }
          </div>
      </Modal>
  )
}

export default ModalCriteres