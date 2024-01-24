import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentPath } from '../../../globalComponents/Main';
import {sommeCumulee,formatBydevise} from '../../../store/Rapprochements/Rapprochement';

/**LE COMPOSANT QUI AFFICHE LA SOMME DES MONTANT EN SUSPENS
 * @return JSX
*/
function CumulSuspens(typeOpe) {
  const { operations, rowRapprochement, rowResRapprochement } = useSelector((state) => state.rapprochements);
  useEffect(() => {
    const triggerCumul = (operations,{typeOpe}) => {
      let total= 0;
      let elmt = {};
      if (operations !==undefined && operations.dataMtx?.length>=1 && operations.dataMvt?.length>=1) {
        if (typeOpe === "miroirActive") { // si ya un rapprochement l'animation sera faite du coté ou le rapprochement a eu lieu
                elmt           = document.getElementsByClassName('cumulSuspend')[0];
                if (getCurrentPath() === "Validation" || getCurrentPath() === "Derapprochement") {
                  total = operations.sumMvtMnt - sommeCumulee(typeOpe, rowResRapprochement); //sommeCumulee(typeOpe,operations.dataMvt,"operation");
                  total = formatBydevise(total, "");
                  elmt.innerHTML = total;
                  elmt.className = elmt.className + " slide-in-blurred-left";
                  setTimeout(() => { // retrai de la classe d'animation apres x sde
                    elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                  }, 1000);
                }
                console.log();
                if (getCurrentPath() === "Rapprochement") {
                  total          = operations.sumMvtMnt - sommeCumulee(typeOpe, rowRapprochement); //sommeCumulee(typeOpe,operations.dataMvt,"operation");
                  total = formatBydevise(total, "");
                  elmt.innerHTML = total;
                  elmt.className = elmt.className + " slide-in-blurred-left";
                  setTimeout(() => { // retrai de la classe d'animation apres x sde
                    elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                  }, 1000);
                }
        }
        if (typeOpe === "nostroActive") { // si ya un rapprochement l'animation sera faite du coté ou le rapprochement a eu lieu
                elmt           = document.getElementsByClassName('cumulSuspend')[1];
                if (getCurrentPath() === "Validation" || getCurrentPath() === "Derapprochement") {
                  total = operations.sumMtxMnt - sommeCumulee(typeOpe, rowResRapprochement);
                  total = formatBydevise(total, "");
                  elmt.innerHTML = total;
                  elmt.className = elmt.className + " slide-in-blurred-left";
                  setTimeout(() => { // retrai de la classe d'animation apres x sde
                    elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                  }, 1000);
                }
                if (getCurrentPath() === "Rapprochement") {
                  total = operations.sumMtxMnt - sommeCumulee(typeOpe, rowRapprochement); //sommeCumulee(currentDraggableItem?.typeOpe,operations.dataMtx,"operation");
                  total          = formatBydevise(total,"");
                  elmt.innerHTML = total;
                  elmt.className = elmt.className + " slide-in-blurred-left";
                  setTimeout(() => { // retrai de la classe d'animation apres x sde
                    elmt.className =  String(elmt.className).split(" slide-in-blurred-left")[0];
                  }, 1000);
                }
        }
      }else{
                document.getElementsByClassName('cumulSuspend')[0].innerHTML="0.0";
                document.getElementsByClassName('cumulSuspend')[1].innerHTML="0.0";
      }
    };
    triggerCumul(operations,typeOpe);
  }, [rowRapprochement,rowResRapprochement,operations,typeOpe]);

  return (
    <div className='col d-flex flex-column text-center py-0 pr-5 m-0 pr-5'>
      <h3 className='fs-4 font-weight-bolder cumulSuspend p-0 m-0'>0.0</h3>
      <small className='fs-5 font-weight-bolder col'>Somme des montants en suspens</small>
    </div>
  )
}

export default CumulSuspens