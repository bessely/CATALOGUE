import React from 'react';

import { useSelector } from 'react-redux';
import { sommeCumulee, formatBydevise } from '../../../store/Rapprochements/Rapprochement';
import RowResume from './RowResume';
import { BASEROOT } from '../../../services/serveur';

/**
 * LA ZONE DE RESUME DES OPERATION RAPOPROCHEES EN ATTENTE DE VALIDATION
*/
function ResumeZone() {
  const { rowResRapprochement, status } = useSelector(state => state.rapprochements);
  const cumuleColonne = (typeOpe) => {
    if (rowResRapprochement.length > 0) {
      let total = sommeCumulee(typeOpe, rowResRapprochement);
      return formatBydevise(total, ""); //rowResRapprochement[rowRes].Rappro[0][typeOpe][0].STR_MTXDEVI
    }
    return "{...}";
  };

  return (
    <>
      <div key="cointainerResRappro" className="card rapprochementzone" >
          {
            status.waitingX === "loading" ?
                <div className='d-flex flex-column col- mt-3 m-0 p-0 justify-content-center'>
                  <img src={BASEROOT+"assets/img/preloader.svg"} className='mx-auto' height="200" alt="loader" />
                  <p className='text-center'>Chargement des operérations ... </p>
                </div>
              :
                rowResRapprochement.length > 0 ?
                  rowResRapprochement.map((data, row) => {
                    // ! TRES IMPORTANT key={"rowRappro"+(row-rowRapprochement.length)} pour permettre un prepend facson JS cad le nouvel elmt vas s'affiché en haut
                    return (
                      <>
                        {
                          row === 0 ? // pour afficher cette partie une seule fois mais à la fin 
                            <div className='d-flex col-12 mt-3 m-0 p-0 flex-row justify-content-center'>
                              <h5 key="totalcolresmvt" id="opeTotalResMiroirActiveGlobal" className="py-2 px-3 my-0 font-weight-bold text-dark text-monospace"> {cumuleColonne("miroirActive")} </h5>
                              <hr />
                              <h5 key="totalcolresmtx" id="opeTotalResNostroActiveGlobal" className="py-2 px-3 my-0 font-weight-bold text-dark text-monospace"> {cumuleColonne("nostroActive")} </h5>
                            </div>
                            :
                            null
                        }                      
                        <RowResume key={"rowResRappro" + (row) + "_" + row} row={row} />
                        {
                          row === rowResRapprochement.length - 1 ? // pour afficher cette partie une seule fois mais à la fin 
                            <div className='d-flex col-12 mt-3 m-0 p-0 flex-row justify-content-center'>
                              <h5 key="totalcolresmvt" id="opeTotalResMiroirActiveGlobal" className="py-2 px-3 my-0 font-weight-bold text-dark text-monospace"> {cumuleColonne("miroirActive")} </h5>
                              <hr />
                              <h5 key="totalcolresmtx" id="opeTotalResNostroActiveGlobal" className="py-2 px-3 my-0 font-weight-bold text-dark text-monospace"> {cumuleColonne("nostroActive")} </h5>
                            </div>
                            :
                            null
                        }
                      </>
                    );
                  })
                :
                  null
          }
        </div>
    </>
  )
}

export default ResumeZone