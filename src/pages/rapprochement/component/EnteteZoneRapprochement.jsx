import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NewRapprochementRow} from '../../../store/Rapprochements/Rapprochement';
import MenuFlottant from './MenuFlottant';

function EnteteZoneRapprochement() {
  const dispatch        = useDispatch();
  const { rsmcriteres, statustRapp } = useSelector(state => state.rapprochements); 
  
  return (
    <div className='d-flex flex-column'>
      {/* zone d'affichage des critères choisis sous la modal des critères  */}
      {
          <>
            <div className='mb-3'>
            {
              statustRapp !== "" ?
                <small key={"resss"} className="badge badge-dark mr-2 shadow">{statustRapp}</small>
                :
                ""
            }
            {
              rsmcriteres.length > 0 ?
                rsmcriteres.map((item,x)=>{
                    return (
                              item[Object.keys(item)] === Object.keys(item)[0] ?  // les criteres non selectionné sont vides
                                  <small key={"criresu_"+x}  className="badge badge-dark mr-2 shadow">{item[Object.keys(item)]}</small>
                              :
                              ""
                    )
                })
              :
              ""
            }
            </div>
          </>
      }
      {/* zone d'affichage des critères choisis sous la modal des critères  */}
      {/* MENU FLOTTANT DE RACCOURCI  */}
        <MenuFlottant />
      {/* MENU FLOTTANT DE RACCOURCI  */}
      {/* section d'ajout d'une ligne  */}
      <div className="d-flex flex-row mx-0" >
        <div onClick={(e)=>{dispatch(NewRapprochementRow(e))}} className="card border border-dashed col mb-1 mx-0 p-1 d-flex flex-row justify-content-center" role="button" style={{ backgroundColor: "Rgba(226,230,234,.3)" , maxHeight: "600px", overflow: "auto" }} >
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8C92AB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx={12} cy={12} r={10} /><line x1={12} y1={8} x2={12} y2={16} /><line x1={8} y1={12} x2={16} y2={12} /></svg>
          <span className="pulsate-fwd ml-2">Ajouter une ligne de rapprochement</span>
        </div>
      </div>
      {/* section d'ajout d'une ligne  */}
    </div> 
  )
}

export default EnteteZoneRapprochement 