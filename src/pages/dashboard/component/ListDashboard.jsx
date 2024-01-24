import React from 'react';
import { useSelector } from 'react-redux';
import { formatBydevise } from '../../../store/Rapprochements/Rapprochement';
import { BASEROOT } from '../../../services/serveur';
var  suspensx = [];

/**
 * CHART LISTE
 * @param {String} map Le nom de la map
 * @param {String} text Le texte du titre
 * @param {String} colum1 Le nom de la colonne 1
 * @param {String} colum2 Le nom de la colonne 2
 */
function ListDashboard({ map, text , colum1, colum2}) {
  const { suspensAncMtx, suspensAncMvt, mntSuspImpMvt, mntSuspImpMtx, status } = useSelector((state) => state.dashboard);
  if (map ==="Mvt ancien") {
    suspensx = suspensAncMvt;
  }
  if (map === "Mtx ancien") {
    suspensx = suspensAncMtx;
  }
  if (map === "Mvt importatnt") {
    suspensx = mntSuspImpMvt;
  }
  if (map === "Mtx importatnt") {
    suspensx = mntSuspImpMtx;
  }
  console.log(suspensx !== undefined && suspensx.length >= 1);
  // console.log(status.dashboard);
  return (
        <div className="col-3 p-3">
          <div className='statbox widget border border-primary rounded box box-shadow p-1'>
              <h6 className='text-muted'>{text}</h6>
              <div className="table-responsive">
                <ul className="list-group">
                  {
                      status.dashboard === "loading" ?
                        <div className='text-center mx-auto'>
                          <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" />
                        </div>
                        : //!status.dashboard==="success" ?
                        suspensx !== undefined && suspensx.length>=1  ?
                          suspensx.map((item, index) => {
                            return (
                              <li className="list-group-item list-group-item-action d-flex flex-row flex-wrap justify-content-between m-0 p-0" key={"suspensAnc" + index}>
                                <span className='col-1 font-weight-bold'>{index + 1}</span>
                                {
                                  colum1!=="" ?
                                    <span className='col-5 text-right font-weight-bold'>{String(item[colum1])}</span>
                                  :
                                    null
                                }
                                {
                                  colum2 !== "" ?
                                    <span className='col text-right font-weight-bold'>{formatBydevise(item[colum2],"")}</span>
                                    :
                                    null
                                }
                              </li>
                            )
                          })
                          : // !!suspensAnc.length<=0 
                          <span className="text-center mx-auto">
                            <img src={BASEROOT+"assets/img/emptybag.jpg"} className="m-0 p-0" height="220" alt="loader" />
                            <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucune donnée pour le moment !!!</small>
                          </span>
                  }
                </ul>
              </div>
            </div>
        </div>
  )
}

export default ListDashboard