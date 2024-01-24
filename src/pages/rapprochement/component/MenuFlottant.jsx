import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';
import { checkEgalite, checkForEmptyRowRppr, deleteRapproDraft, getCritereHistorique, getcritereRapprochement, printReport, renderRapproDraft, saveRapproAsDraft, saveRapproForValidation, setLoader, setModalcriteres } from '../../../store/Rapprochements/Rapprochement';

/**
 * BAAAAH CEST LA BARRE D'ACTION QUI APPARAIT DANS LA FENETTRE DES RAPPROCHEMENTS
 * @returns 
 */
function MenuFlottant() {
  const dispatch = useDispatch();
  const { rowDraftRapprochement, rowRapprochement } = useSelector(state => state.rapprochements);
  useEffect(()=>{
    ReactTooltip.rebuild()
  },[rowDraftRapprochement])
  /**TRANSFERT D'UN RAPPROCHEMENT D'UN ACTEUR EN VALIDATION
   * @param {object}  utilisateur 
   * @function
   */
  const sendForValidationConfirme = (utilisateur) => {
    if (checkForEmptyRowRppr(rowRapprochement)) {
      if (checkEgalite("true ou nbre ou n'importe quoi ici tant que c'est pas false ou undefined")) {
        Swal.fire({
          title: "Confirmez l'envoi pour validation ?",
          // text           : "Confirmez l'envoi pour validation ?",
          icon           : "warning",
          iconColor      : "red",
          focusConfirm   : false,
          buttonsStyling : true,
          customClass:
          {
            confirmButton : "btn-primary",
            cancelButton  : "btn-secondary",
          },
          // confirmButtonColor : '#d33',
          showCancelButton  : true,
          showCloseButton   : true,
          confirmButtonText : "Confirmer",
          cancelButtonText  : "Annuler",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(saveRapproForValidation(utilisateur.id));
          }
        });
      } else { dispatch(setLoader({ open: false, text: "..." })); }
    } else { dispatch(setLoader({ open: false, text: "..." })); }
  };
  return (
    <div id="raccourci" className="pulsate-fwd" role="button" >
      <ReactTooltip />
      <svg data-tip="Rapprochement automatique" onClick={(e) => {
          dispatch(getcritereRapprochement());
          dispatch(getCritereHistorique([]));
          dispatch(setModalcriteres({ open: true, mode: "", size: "critère", title: "Liste des critères de rapprochements automatiques", button: true, buttonName: "Demarrer Le rapprochement automatique", inputstate: "", btnclass: "btn-block btn btn-primary" }))
        }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="menu-raccourci menu-categories base-icons mr-3 feather feather-minimize-2"><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1={14} y1={10} x2={21} y2={3} /><line x1={3} y1={21} x2={10} y2={14} />
      </svg>
      <svg data-tip="Soumettre à la validation" onClick={(e) => { sendForValidationConfirme(e) }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="menu-raccourci mr-3 feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
      <svg data-tip="Mettre au brouillon" onClick={(e) => { dispatch(saveRapproAsDraft(e)) }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="menu-raccourci mr-3 feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
      <span className="dropdown">
        <svg role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-tip="Imprimer" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={rowDraftRapprochement?.BROUILLONS?.length > 0 ? "menu-raccourci mr-3 feather feather-printer dropdown-toggle" : "menu-raccourci feather feather-layers dropdown-toggle"}>
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x={6} y={14} width={12} height={8} />
        </svg>
        <div className="dropdown-menu dropdown-menu-lg-left">
          <span onClick={(e) => { dispatch(printReport("pdf")) }} className="dropdown-item text-danger">PDF</span>
          <span onClick={(e) => { dispatch(printReport("xls")) }} className="dropdown-item text-success">EXCEL</span>
        </div>
      </span>
      {
        rowDraftRapprochement?.BROUILLONS?.length > 0 ?
          <>
            <svg data-tip="Restaurer le brouillon" onClick={(e) => { dispatch(renderRapproDraft(e)) }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="menu-raccourci mr-3 feather feather-rotate-ccw"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
            <svg data-tip="Supprimer le brouillon" data-background-color="red" onClick={(e) => { dispatch(deleteRapproDraft(e)) }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="menu-raccourci feather feather-trash-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1={10} y1={11} x2={10} y2={17} /><line x1={14} y1={11} x2={14} y2={17} /></svg>
          </>
          :
          ""
      }
    </div>
  )
}

export default MenuFlottant