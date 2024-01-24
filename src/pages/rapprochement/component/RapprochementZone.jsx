import React from 'react';
import { useSelector } from 'react-redux';
import { formatBydevise, sommeCumulee } from '../../../store/Rapprochements/Rapprochement';
import EnteteZoneRapprochement from './EnteteZoneRapprochement';
import RowRapprochement from './RowRapprochement';

/**
 * UNE LIGNE DE RAPPROCHEMENT
*/
function RapprochementZone() {
  const {rowRapprochement} = useSelector(state => state.rapprochements);
  const cumuleColonne      = (typeOpe)=>{
    if (rowRapprochement[0][typeOpe].length>0) {
      let total = sommeCumulee(typeOpe,rowRapprochement);
      return formatBydevise(total,""); //rowRapprochement[0][typeOpe][0].STR_MTXDEVI
    }
    return "{...}";
  };

  return (
        <div key="cointainerrappro" className="card rapprochementzone" >
                <EnteteZoneRapprochement/>
                {
                  rowRapprochement.length > 0  ?
                    rowRapprochement.map((data,row) => {
                      // ! TRES IMPORTANT key={"rowRappro"+(row-rowRapprochement.length)} pour permettre un prepend façon JS cad le nouvel elmt vas s'affiché en haut
                      return (
                        <>
                          {
                            row === 0 ? // pour afficher cette partie une seule fois mais à la fin  || c'ets la zone de cumule des montants des opérations rapprochées
                              <div className='d-flex col-12 mt-3 m-0 p-0 flex-row justify-content-center'>
                                  <h5 key="totalcolmvt" id="opeTotalmiroirActiveGlobal" className="py-2 px-3 my-0 font-weight-bold text-dark text-monospace"> {cumuleColonne("miroirActive") } </h5>
                                  <hr />
                                  <h5 key="totalcolmtx" id="opeTotalnostroActiveGlobal" className="py-2 px-3 my-0 font-weight-bold text-dark text-monospace"> {cumuleColonne("nostroActive") } </h5>
                              </div>
                            :
                            ""
                          }
                          <RowRapprochement key={"rowRappro"+(rowRapprochement.length-row)} row={row} data={data} />
                          {
                            row === rowRapprochement.length-1 ? // pour afficher cette partie une seule fois mais à la fin  || c'ets la zone de cumule des montants des opérations rapprochées
                              <div className='d-flex col-12 mt-3 m-0 p-0 flex-row justify-content-center'>
                                  <h5 key="totalcolmvt" id="opeTotalmiroirActiveGlobal" className="py-2 px-3 my-0 font-weight-bold text-dark text-monospace"> {cumuleColonne("miroirActive") } </h5>
                                  <hr />
                                  <h5 key="totalcolmtx" id="opeTotalnostroActiveGlobal" className="py-2 px-3 my-0 font-weight-bold text-dark text-monospace"> {cumuleColonne("nostroActive") } </h5>
                              </div>
                            :
                            ""
                          }
                        </>
                      );
                    })
                  : 
                  ""
                }
        </div>
  )
}

export default RapprochementZone