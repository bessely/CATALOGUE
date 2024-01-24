import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { CustumSelectStyl } from '../../../globalComponents/CustumSelectStyl';
import { getCurrentPath } from '../../../globalComponents/Main';
import { getRapproFromDraft, listEnteteRapprochement, loadDataListOperation, setCurrentCompte, listEnteteRappValid, showAllOrOneFileLo } from '../../../store/Rapprochements/Rapprochement';
import { PAGINATION } from '../../../globalComponents/Pagination';

/**LE COMPOSANT DES COMPTES CORRESPONDANTS
 * @return JSX
*/
function CompteList() {
    const dispatch       = useDispatch();
    const { listCompte } = useSelector(state => state.rapprochements);

    /** Renseigne les selections dans le state des rapprochements renseigne le compte selectionné
     *@param {object} item reviens avec l'element selectionné
     *@function
    */
    const getOperation =(item) => {
      dispatch(setCurrentCompte({[item.typeList]: item})); // sauvegarde du compte courant
      if (getCurrentPath() === "Rapprochement") {
        dispatch(listEnteteRapprochement([])); // tentative de Chargement des rapprochements en attente de validation //{LG_SCCID:item.value}
        dispatch(loadDataListOperation({ state: "0", startMvt: 0, startMtx: 0 })); // tentative de Chargement des operations //{LG_SCCID:item.value}
        dispatch(getRapproFromDraft([])); //  tentative de Chargement des rapprochements en brouillons //{LG_SCCID:item.value}
      }
      if (getCurrentPath() === "Validation") {
        dispatch(listEnteteRapprochement([]));
        // dispatch(loadDataListOperation({ state: "1", startMvt: 0, startMtx: 0 }));
      }
      if (getCurrentPath() === "Derapprochement") {
        dispatch(listEnteteRappValid([]));
        // dispatch(loadDataListOperation({ state: "1", startMvt: 0, startMtx: 0 }));
      }
      if (getCurrentPath() === "Recherche") {
        // dispatch(listEnteteRappValid([]));
        // dispatch(loadDataListOperation({ state: "1", startMvt: 0, startMtx: 0 }));
      }
      if (getCurrentPath() === "Fichier") {
        dispatch(showAllOrOneFileLo({ DtDeb: "", DtFin: "", start: 0, listParPage: PAGINATION.listParPage }));
      }
    };

  return (
    <div id="listname" className="col-6">
        <label className="ml-1 mb-0" htmlFor="listname">La liste des comptes</label>
        {
          listCompte?.length > 0 ?
            <Select 
              className   = "mb-1"
              id          = "COMPTE"
              placeholder = "Selectionnez un compte"
              styles      = {CustumSelectStyl}
              onChange    = {(e)=>getOperation(e)}
              options     = {listCompte}
          />
          :
            <Select 
              className   = "mb-1"
              id          = "COMPTE"
              placeholder = "Selectionnez un compte"
              value       = ""
              styles      = {CustumSelectStyl}
              options     = {[{}]}
          />
        }
    </div>
  )
}

export default CompteList