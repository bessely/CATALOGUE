import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { CustumSelectStyl } from '../../../globalComponents/CustumSelectStyl';
import { PAGINATION } from '../../../globalComponents/Pagination';
import { loadDataSocieteCorrList, setCurrentOptCorrList} from '../../../store/Societe/SocieteCorrespondante';
import { loadDataListSoccompte,setOperations,setListCompte, getcritereOrdre} from '../../../store/Rapprochements/Rapprochement';

/**LE COMPOSANT DES CORRESPONDANTS 
 * @return JSX
*/
function CorrespondantList() {
  const dispatch             = useDispatch();
  const {societeOptCorrList} = useSelector(state => state.corsocietes);
  useEffect(() => {
      dispatch(loadDataSocieteCorrList({ start: 0, listParPage: PAGINATION.listParPage }));
      dispatch(getcritereOrdre());
  }, [dispatch]);

  /** Renseigne les selections dans le state des rapprochement reseigne le correspondant selectionné
   * @param {object} item reviens avec l'element selectionné 
   * @function
   */
  const loadCompte = (item) => {
    dispatch(setCurrentOptCorrList({[item.typeList]: item}));
    dispatch(setOperations([]));
    dispatch(setListCompte([]));
    dispatch(loadDataListSoccompte({LG_CORID:item.value})); // chargement des comptes societe
  };
  return (
    <div id="listname" className="col-6">
      <label className="ml-1 mb-0" htmlFor="listname">La liste des correspondants</label>
      <Select 
            className   = "mb-1"
            id          = "CORRESPONDANT"
            placeholder = "Selectionnez un correspondant"
            styles      = {CustumSelectStyl}
            onChange    = {loadCompte}
            options     = {societeOptCorrList} // cette list est ; dans le use effect  //loadDataSocieteCorrList()
      />
    </div>
  )
}
export default CorrespondantList