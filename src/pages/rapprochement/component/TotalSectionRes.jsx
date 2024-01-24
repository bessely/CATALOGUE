import React from 'react';
import { useSelector } from 'react-redux';
import { totalMontantRow } from '../../../store/Rapprochements/Rapprochement';

/**
 * LA SECTION TOTAL DES OPERATIONS DANS UNE LIGNE DE RAPPROCHEMENT
 * Qd on depose une opération sur cette section je declenche une procedure de suppression de cette operation  pour la ligne concernée
 * @param {integer} row c'est le numero de la lgine en cours'
 */
function TotalSectionRes({row}) {
  const { rowResRapprochement } = useSelector(state => state.rapprochements);
  return (
    <div     className='d-flex col-2 m-0 p-0 flex-row justify-content-center'>
      <small id={"opeResTotalmiroirActive_"+row} className="border-right text-right align-self-center py-4 px-1 col-12 my-0 font-weight-bold text-danger text-monospace opeTotalmiroirActive"> {totalMontantRow("miroirActive",rowResRapprochement[row])} </small>
      <small id={"opeResTotalnostroActive_"+row} className="border-left  text-left align-self-center py-4 px-1 col-12 my-0 font-weight-bold text-danger text-monospace opeTotalnostroActive" > {totalMontantRow("nostroActive",rowResRapprochement[row])} </small>
    </div>
  )
}

export default TotalSectionRes;