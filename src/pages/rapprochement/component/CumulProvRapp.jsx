import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentPath } from '../../../globalComponents/Main';
import { sommeCumulee, getSoldeCurrentCompte,formatBydevise} from '../../../store/Rapprochements/Rapprochement';

/**LE COMPOSANT QUI AFFICHE LE SOLDE PROVISOIRE DE LA LISTE DES OPERATIONS
 * @return JSX
*/
function CumulProvRapp(typeOpe) {
  const { operations, currentCompte, listCompte, rowRapprochement, rowResRapprochement } = useSelector((state) => state.rapprochements);
  useEffect(() => {
    const triggerCumul = (operations, currentCompte, listCompte,{typeOpe}) => {
      // sommeCumulee("miroirActive", operations.dataMvt, "operation");
      // sommeCumulee("nostroActive", operations.dataMtx, "operation");
      if (operations !==undefined ) {
          if (typeOpe==="miroirActive") {
            let total     = 0;
            let soldeProv = 0;
            let elmt      = {};
            if (currentCompte!==undefined && currentCompte?.COMPTE?.MIROIR === currentCompte?.COMPTE?.NOSTRO) { // si le solde miroir est égal au solde nostro
              if (getCurrentPath() === "Validation" || getCurrentPath() ==="Derapprochement") {
                elmt           = document.getElementsByClassName('CumulProvRapp')[0]; //On animera le composant a chaque fois que ya un changement
                soldeProv      = getSoldeCurrentCompte("STR_SCCSOLDEMIR", currentCompte, listCompte) + ((operations.sumMtxMnt - sommeCumulee("nostroActive", rowResRapprochement)) * (-1)) + ((operations.sumMvtMnt - sommeCumulee("miroirActive", rowResRapprochement)) * (-1));
                total          = formatBydevise(soldeProv, "");
                elmt.innerHTML = total;
                elmt.className = elmt.className + " slide-in-blurred-left";
                setTimeout(() => {
                  elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                }, 1000);
              }
              if (getCurrentPath() === "Rapprochement") {
                elmt           = document.getElementsByClassName('CumulProvRapp')[0];
                if (currentCompte.COMPTE !== undefined) {
                  soldeProv      = getSoldeCurrentCompte("STR_SCCSOLDEMIR", currentCompte, listCompte) + ((operations.sumMtxMnt - sommeCumulee("nostroActive", rowRapprochement)) * (-1)) + ((operations.sumMvtMnt - sommeCumulee("miroirActive", rowRapprochement)) * (-1));
                  total          = formatBydevise(soldeProv, "");
                  elmt.innerHTML = total;
                  elmt.className = elmt.className + " slide-in-blurred-left";
                  setTimeout(() => {
                    elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                  }, 1000);
                }else{
                  elmt.innerHTML = 0;
                }
              }
            }else{
              if (getCurrentPath() === "Validation" || getCurrentPath() === "Derapprochement") {
                elmt           = document.getElementsByClassName('CumulProvRapp')[1]; //On animera le composant a chaque fois que ya un changement
                soldeProv      = getSoldeCurrentCompte("STR_SCCSOLDENOS", currentCompte, listCompte) + (operations.sumMvtMnt - sommeCumulee(typeOpe, rowResRapprochement));
                total          = formatBydevise(soldeProv, "");
                elmt.innerHTML = total;
                elmt.className = elmt.className + " slide-in-blurred-left";
                setTimeout(() => {
                  elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                }, 1000);
              }
              if (getCurrentPath() === "Rapprochement") {
                elmt             = document.getElementsByClassName('CumulProvRapp')[1]; //On animera le composant a chaque fois que ya un changement
                if (currentCompte.COMPTE !== undefined) {
                  soldeProv      = getSoldeCurrentCompte("STR_SCCSOLDENOS", currentCompte, listCompte) + (operations.sumMvtMnt - sommeCumulee(typeOpe, rowRapprochement));
                  console.log(soldeProv);
                  total          = formatBydevise(soldeProv, "");
                  elmt.innerHTML = total;
                  elmt.className = elmt.className + " slide-in-blurred-left";
                  setTimeout(() => {
                    elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                  }, 1000);
                }else{
                  elmt.innerHTML = 0;
                }
              }
            }
          }
          if (typeOpe==="nostroActive") {
            let total = 0;
            let soldeProv = 0;
            let elmt = {};
            if (currentCompte.COMPTE !== undefined && currentCompte?.COMPTE?.MIROIR === currentCompte?.COMPTE?.NOSTRO) { // si le solde miroir est égal au solde nostro
              if (getCurrentPath() === "Validation" || getCurrentPath() === "Derapprochement") {
                elmt           = document.getElementsByClassName('CumulProvRapp')[1]; //On animera le composant a chaque fois que ya un changement
                soldeProv      = getSoldeCurrentCompte("STR_SCCSOLDENOS", currentCompte, listCompte) + ((operations.sumMvtMnt - sommeCumulee("miroirActive", rowResRapprochement)) * (-1)) + ((operations.sumMtxMnt - sommeCumulee("nostroActive", rowResRapprochement)) * (-1));
                total          = formatBydevise(soldeProv, "");
                elmt.innerHTML = total;
                elmt.className = elmt.className + " slide-in-blurred-left";
                setTimeout(() => {
                  elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                }, 1000);
              }
              if (getCurrentPath() === "Rapprochement") {
                elmt           = document.getElementsByClassName('CumulProvRapp')[1];
                soldeProv      = getSoldeCurrentCompte("STR_SCCSOLDENOS", currentCompte, listCompte) + ((operations.sumMvtMnt - sommeCumulee("miroirActive", rowRapprochement)) * (-1)) + ((operations.sumMtxMnt - sommeCumulee("nostroActive", rowRapprochement)) * (-1));
                total          = formatBydevise(soldeProv, "");
                elmt.innerHTML = total;
                elmt.className = elmt.className + " slide-in-blurred-left";
                setTimeout(() => {
                  elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                }, 1000);
              }
            } else {
              if (getCurrentPath() === "Validation" || getCurrentPath() === "Derapprochement") {
                elmt           = document.getElementsByClassName('CumulProvRapp')[0]; //On animera le composant a chaque fois que ya un changement
                soldeProv      = getSoldeCurrentCompte("STR_SCCSOLDEMIR", currentCompte, listCompte) + (operations.sumMtxMnt - sommeCumulee(typeOpe, rowResRapprochement));
                total          = formatBydevise(soldeProv, "");
                elmt.innerHTML = total;
                elmt.className = elmt.className + " slide-in-blurred-left";
                setTimeout(() => {
                  elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                }, 1000);
              }
              if (getCurrentPath() === "Rapprochement") {
                elmt           = document.getElementsByClassName('CumulProvRapp')[0]; //On animera le composant a chaque fois que ya un changement
                if (currentCompte.COMPTE !== undefined) {
                  soldeProv      = getSoldeCurrentCompte("STR_SCCSOLDEMIR", currentCompte, listCompte) + (operations.sumMtxMnt - sommeCumulee(typeOpe, rowRapprochement));
                  total          = formatBydevise(soldeProv, "");
                  elmt.innerHTML = total;
                  elmt.className = elmt.className + " slide-in-blurred-left";
                  setTimeout(() => {
                    elmt.className = String(elmt.className).split(" slide-in-blurred-left")[0];
                  }, 1000);
                }else{
                  elmt.innerHTML = 0;
                }
              }
            }
          }
      }else{
                  document.getElementsByClassName('CumulProvRapp')[0].innerHTML="0.0";
                  document.getElementsByClassName('CumulProvRapp')[1].innerHTML="0.0";
      }
    };
    triggerCumul(operations, currentCompte,listCompte,typeOpe);
  }, [operations, rowRapprochement, rowResRapprochement, currentCompte, listCompte, typeOpe]);

  return (
    <div className='col d-flex flex-column text-center py-0 pr-5 m-0'>
      <h4 className='fs-4 font-weight-bolder CumulProvRapp p-0 m-0  mt-1'>0.0</h4>
      <small className='fs-5 font-weight-bolder col m-0 p-0'>Solde rapproché provisoire</small>
    </div>
  )
}

export default CumulProvRapp