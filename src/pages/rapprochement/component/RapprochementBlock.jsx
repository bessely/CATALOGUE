import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DraggableRapprochement from './DraggableRapprochement';
import {setRowRapprochement,setOperations} from '../../../store/Rapprochements/Rapprochement'; 
import { DangerBottom } from '../../../globalComponents/CustomToast';

/**
 * ! UNE SECTION DE RAPPROCHEMENT  SOIT NOSTRO OU MIROIR
 * @param {string} typeOpe === le type de l'operation voulu dans cette section {miroir ou nostro}
 * @param {integer} row    === le numero de la ligne a laquel appartien cette operation
 */
function RapprochementBlock({typeOpe, row}) {

  const dispatch = useDispatch();
  const { currentDraggableItem, rowRapprochement, operations } = useSelector(state => state.rapprochements);

  /**
   * Quand on entre dans ce composant avec un elmt en drag
   * */
  const handleDragEnter=(e)=>{
      if (e) { // existe seulemnt pour la version de l'élmt concerné par le drag { faut savoir que se composant est multiple sur le front}
        e.target.addEventListener('dragleave', handleDragLeave); // qd on quitte ce composant je veux lancer la fonction handleDragLeave()
        e.target.addEventListener('drop', handleDragLeave); // quand on depose un obj sur ce composant je lance handleDragLeave()
        if (currentDraggableItem.data) { //si les données de l'lement draggué contiennent un tableau data
          if (typeOpe===currentDraggableItem.typeOpe) { // si on est sur la section des miroirs ou des nostros et que les données à deposer contiennent un elmt miroir ou nostro
              if (e.target?.className?.includes('rapprosectionempty') ) {  // ce style que je m'apprete à appliquer doit agir seulment sur l'element courant( le parents non ces enfants) celui qui porte cette classe 'rapprosectionempty'
                  e.target.className = e.target.className+" fireActiveRowGood"; // je rends la zone verte
                  return;
              }
          }else{
            if (e.target?.className?.includes('rapprosectionempty') ) {
              e.target.className = e.target.className+" fireActiveRowBad"; // sinon la zone devient rouge
            }
          }
        }
      }
  };

  /** 
   * Au relachement de l'element draggué sur ce composant
   * Ajoute l'operation en cours dans ma liste des rapprochements en cours [row] dans la ligne spécifiée dans lE NOSTRO ou LE MIRROIR [typeOpe]
   * */
  const handleOnDrop=(e, row)=>{
    if (e && currentDraggableItem.data){ // je m'assure d'être bien sur la version html du composant et qu'il ait elmt en train d'être draggué
      if (typeOpe==="miroirActive" && currentDraggableItem.data.LG_MVTID && currentDraggableItem.data.STR_MTXDEVI && e.target) { // e.target est null pour les elmts non concernés par le drop
        if (checkIfSameDevise(currentDraggableItem.data.STR_MTXDEVI) && sheckDoublonInRapproRow(currentDraggableItem,typeOpe)) {
            addOperation(row,typeOpe);
            return;
        }
      }
      if (typeOpe==="nostroActive" && currentDraggableItem.data.LG_MTXID && currentDraggableItem.data.STR_MTXDEVI && e.target) {
        if (checkIfSameDevise(currentDraggableItem.data.STR_MTXDEVI) && sheckDoublonInRapproRow(currentDraggableItem,typeOpe)) {
          addOperation(row,typeOpe);
          return;
        }
      }
    }
  };

  /** 
   * Qd on quitte ce composant avec un elmt dragguer en main 
   * */
  const handleDragLeave=(e)=>{
    if (e?.target?.className?.includes('rapprosectionempty') ) { // ce style que je m'apprete à appliquer doit agir seulment sur l'element parent celui qui porte cette classe 'rapprosectionempty'
      //réinitialisation du style de ce composant
      e.target.className = String(e.target.className).split("fireActiveRowGood")[0];
      e.target.className = String(e.target.className).split("fireActiveRowBad")[0];
    }
  };

  /**
   * Ajoute une opération à une ligne de rapprochement
   * @param {int} row la ligne de provenance de ce composant
   * @param {string} operation : le type d'opération 
   * */
  const addOperation = (row, operation) => {
      let newList = JSON.parse(JSON.stringify(rowRapprochement)); // <- permet une copy fidele de l'ancien array || [...rowRapprochement] <- peu fiable pour ce cas
      newList[row][operation].push(currentDraggableItem.data);
      dispatch(setRowRapprochement(newList));
      removeOperation();
  };
  /**
   * Vérifie s'il n'y à pas de doublons dans toutes les opération en cours de rapprochement sauf qd il sagit d'une permutation de rapprochement 
   * @param {Object} data {typeOpe:le type d'operation de l'object, row:sa ligne de provenance, data: les données de l'operation} : les données de l'opération en cours de drag
   * @param {string} operation : le type d'opération
   * */
  const sheckDoublonInRapproRow = (data, operation) => {
    let newList = JSON.parse(JSON.stringify(rowRapprochement)); 
    if (operation==="miroirActive") {
      for (let ii = 0; ii < newList.length; ii++) {
        for (let zz = 0; zz < newList[ii][operation].length; zz++) {
            if (newList[ii][operation][zz].LG_MVTID===data.data.LG_MVTID && data.component==="operation" ) {
              DangerBottom.fire({ title: "Désolé ! Opération dupliquée à la ligne "+(ii+1) +" opération "  +(zz+1)});
              targetDuplicate(operation,ii,zz);
              return false;
            }
            if (newList[ii][operation][zz].LG_MVTID===data.data.LG_MVTID && data.component==="rapprochement" ) {
              swapItem(data);
              return false;
            }
        }
      }
    }

    if (operation==="nostroActive") {
      for (let ii = 0; ii < newList.length; ii++) {
        for (let zz = 0; zz < newList[ii][operation].length; zz++) {
            if (newList[ii][operation][zz].LG_MTXID===data.data.LG_MTXID && data.component==="operation" ) {
              DangerBottom.fire({ title: "Désolé ! Opération dupliquée à la ligne "+(ii+1) +" opération "  +(zz+1)});
              targetDuplicate(operation,ii,zz);
              return false;
            }
            if (newList[ii][operation][zz].LG_MTXID===data.data.LG_MTXID && data.component==="rapprochement" ) {
              swapItem(data);
              return false;
            }
        }
      }
    }
    return true;
  };

  /** 
   * Permute les operations cad supprime une operation dans sa ligne de provenance et l'ajoute dans la ligne du composant recepteur
   * @param {Object} data {typeOpe:le type d'operation de l'object, component:l e type de composant, row:sa ligne de provenance, data: les données de l'operation} : les données de l'opération en cours de drag
   * */
  const swapItem = async (data)=>{
    if (data.component==="rapprochement") {
      let newListx= await removeRapprochement(data);
      if (newListx) {
          newListx[row][data.typeOpe].push(data.data);
          dispatch(setRowRapprochement(newListx)); // J'applique la maj du state en un seul endroit avec les nvelles opérations
          return true;
      }
    }
    return false;
  };

  /** 
   * Retire lemlt qui doit etre retiré et retourne un nvo state sans l'elmt
   * @param {Object} data {typeOpe:le type d'operation de l'object, row:sa ligne de provenance, data: les données de l'operation} : les données de l'opération en cours de drag   
   * */
  const  removeRapprochement = async (data) => {
    let newList = JSON.parse(JSON.stringify(rowRapprochement)); // <- permet une copy fidele de l'ancien array || [...rowRapprochement] <- peu fiable pour ce cas
    let copynewrom=[];
      if ( data.typeOpe==="miroirActive") {
        for (let zz = 0; zz <  newList[data.row][data.typeOpe].length; zz++) {
          if (newList[data.row][data.typeOpe][zz].LG_MVTID!==data.data.LG_MVTID) { // je reconstitue la liste sans l'elmt a supprimé juste pour cette ligne d'operations
            copynewrom.push(newList[data.row][data.typeOpe][zz]); // cet tableau contient tous les elmts a concerver
          }
        }
      }
      if ( data.typeOpe==="nostroActive") {
        for (let zz = 0; zz <  newList[data.row][data.typeOpe].length; zz++) {
          if ( newList[data.row][data.typeOpe][zz].LG_MTXID!==data.data.LG_MTXID) { // je reconstitue la liste sans l'elmt a supprimé juste pour cette ligne d'operations
            copynewrom.push(newList[data.row][data.typeOpe][zz]); // cet tableau contient tous les elmts a concerver
          }
        }
      }
      newList[data.row][data.typeOpe]=copynewrom; // je met a jour ma nouvelle ligne d'operation en ayant pris soin de retirer l'operation demandé
      return newList;
  };

  /**
   * Retire l'opération (EN HAUT) qui vient de descendre dans la liste des rapprochements (EN BAS)
   * Ce que je fais c'est  que  je crée une nvelle colonne [state]=="hidden" pour les opérations qui doivent etre masquées dans la liste du HAUT
   * */
  const removeOperation = () => {
    let newList = JSON.parse(JSON.stringify(operations)); // <- permet une copy fidele de l'ancien array || [...rowRapprochement] <- peu fiable pour ce cas
    if (currentDraggableItem.typeOpe==="miroirActive") {
      if (newList.dataMvt[currentDraggableItem.index].LG_MVTID===currentDraggableItem.data.LG_MVTID ) {
        newList.dataMvt[currentDraggableItem.index].state="hidden"; // colonne [state]=="hidden" masquage des données
      }
    }
    
    if (currentDraggableItem.typeOpe==="nostroActive") {
      if (newList.dataMtx[currentDraggableItem.index].LG_MTXID===currentDraggableItem.data.LG_MTXID ) {
        newList.dataMtx[currentDraggableItem.index].state="hidden"; // colonne [state]=="hidden" masquage des données
      }
    }
    dispatch(setOperations(newList));
  };
  
  /**
   * Ajoute puis retire  une animation CSS sur l'opéra duppliqué
   * @param {string} typeOpe le type d'operation de l'object
   * @param {integer} row : la lign de l'operation dupliquée
   * @param {integer} index : sa position dans la ligne
   * */
  const targetDuplicate = (typeOpe,row,index)=>{
    let elmt = document.getElementById(typeOpe+"_"+row+"_"+index);
    elmt.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    elmt.className     = elmt.className+" color-blink"; //Ajoute la classe
    setTimeout(() => { // puis retir la classe
      elmt.className = String(elmt.className).split(" color-blink")[0]; 
    }, 4000);
  };

  /**Compte le nbre d'opération dans la ligne donnée 
   * @param {integer} row : la ligne d'operation
   * @param {string} typeOpe le type d'operation de l'object
   **/
  const countOperation = (row, typeOpe) => {
    return rowRapprochement[row][typeOpe].length;
  };

  /** Verifie que les 2 dernières opéations sont de la meme devise sur la meme ligne sans distinction de type d'operation
   * Cad que si dans la section Nostro une opération est deposée elle doit etre de la meme devise que les autres operations présentent dans la meme ligne Nostro ou Miroire
   */
  const checkIfSameDevise = (devisEntrant) => { 
    if (rowRapprochement[row][typeOpe].length===0 ) { // !nous somme a la premières opération de rapprochement donc  execute directement le processus suivant qd tt est okay
      if (rowRapprochement[row].nostroActive.length >0 && typeOpe==="miroirActive") { // verification dans les cellules opposées
        if (rowRapprochement[row].nostroActive[0].STR_MTXDEVI !== devisEntrant) {
          DangerBottom.fire({ title: "Attention ! Les devises de cette ligne sont en " +rowRapprochement[row].nostroActive[0].STR_MTXDEVI});
          return false;
        }
      }
      if (rowRapprochement[row].miroirActive.length >0 && typeOpe==="nostroActive") { // verification dans les cellules opposées
        if (rowRapprochement[row].miroirActive[0].STR_MTXDEVI !== devisEntrant) {
          DangerBottom.fire({ title: "Attention ! Les devises de cette ligne sont en " +rowRapprochement[row].miroirActive[0].STR_MTXDEVI});
          return false;
        }
      }
      return true;
    }
    if (rowRapprochement[row].miroirActive.length >0 && typeOpe==="miroirActive") { // verification dans les memes cellules
      if (rowRapprochement[row].miroirActive[0].STR_MTXDEVI !== devisEntrant) {
        DangerBottom.fire({ title: "Attention ! Les devises de cette section sont en " +rowRapprochement[row].miroirActive[0].STR_MTXDEVI});
        return false;
      }
    }
    if (rowRapprochement[row].nostroActive.length >0 && typeOpe==="nostroActive") { // verification dans les memes cellules
      if (rowRapprochement[row].nostroActive[0].STR_MTXDEVI !== devisEntrant) {
        DangerBottom.fire({ title: "Attention ! Les devises de cette section sont en " +rowRapprochement[row].nostroActive[0].STR_MTXDEVI});
        return false;
      }
    }
    if (rowRapprochement[row].nostroActive.length >0 && typeOpe==="miroirActive") { // verification dans les cellules opposées que les divses sont les memes
      if (rowRapprochement[row].nostroActive[0].STR_MTXDEVI !== devisEntrant) {
        DangerBottom.fire({ title: "Attention ! Les devises de cette ligne sont en " +rowRapprochement[row].nostroActive[0].STR_MTXDEVI});
        return false;
      }
    }
    if (rowRapprochement[row].miroirActive.length >0 && typeOpe==="nostroActive") { // verification dans les cellules opposées que les divses sont les memes
      if (rowRapprochement[row].miroirActive[0].STR_MTXDEVI !== devisEntrant) {
        DangerBottom.fire({ title: "Attention ! Les devises de cette ligne sont en " +rowRapprochement[row].miroirActive[0].STR_MTXDEVI});
        return false;
      }
    }
    return true;
  };
  
  /**
   * Verfie que le sens des operations sont correctes 
   */
  // const checkIfSameSens = (sens)=>{
  //     if (rowRapprochement[row][typeOpe].length===0 ) {
  //       if (rowRapprochement[row].nostroActive.length >0 && typeOpe==="miroirActive") { // verification dans les cellules opposées
  //         if (rowRapprochement[row].nostroActive[0].STR_MTXSENS === sens) {
  //           DangerBottom.fire({ title: "Attention ! Le sens de cette opération doit être "+(rowRapprochement[row].nostroActive[0].STR_MTXSENS ==="D" ? "C": "D" ) });
  //           return false;
  //         }
  //       }
  //       if (rowRapprochement[row].miroirActive.length >0 && typeOpe==="nostroActive") { // verification dans les cellules opposées
  //         if (rowRapprochement[row].miroirActive[0].STR_MVTSENS === sens) {
  //           DangerBottom.fire({ title: "Attention ! Le sens de cette opération doit être "+(rowRapprochement[row].miroirActive[0].STR_MTXSENS ==="D" ? "C": "D" ) });
  //           return false;
  //         }
  //       }
  //       return true;
  //     }
  //     // verification dans les operations d'une meme cellule que les sens sont les memes 
  //     if (rowRapprochement[row].miroirActive.length > 0 && typeOpe==="miroirActive") { // verification dans les miroir si l'operation miroir sont du meme sens
  //       if (rowRapprochement[row].miroirActive[0].STR_MVTSENS !== sens) {
  //         DangerBottom.fire({ title: "Attention ! Le sens de cette opération doit être "+(rowRapprochement[row].miroirActive[0].STR_MVTSENS)});
  //         return false;
  //       }
  //     }
  //     if (rowRapprochement[row].nostroActive.length > 0 && typeOpe==="nostroActive") { // verification dans les nostro si l'operation nostro sont du meme sens
  //       if ( rowRapprochement[row].nostroActive[0].STR_MTXSENS !== sens) {
  //         DangerBottom.fire({ title: "Attention ! Le sens de cette opération doit être "+(rowRapprochement[row].nostroActive[0].STR_MTXSENS)});
  //         return false;
  //       }
  //     }
  //     // verification dans les operations des cellules opposées que les sens sont différents
  //     if (rowRapprochement[row].nostroActive.length >0 && typeOpe==="miroirActive") { // verification dans les miroir si l'operation nostro sont du sens opposé
  //       if (rowRapprochement[row].nostroActive[0].STR_MTXSENS === sens) {
  //         DangerBottom.fire({ title: "Attention ! Le sens de cette opération doit être "+(rowRapprochement[row].nostroActive[0].STR_MTXSENS ==="D" ? "C": "D" ) });
  //         return false;
  //       }
  //     }
  //     if (rowRapprochement[row].miroirActive.length >0 && typeOpe==="nostroActive") { // verification dans les nostro si l'operation miroir sont du sens opposé
  //       if (rowRapprochement[row].miroirActive[0].STR_MVTSENS === sens) {
  //         DangerBottom.fire({ title: "Attention ! Le sens de cette opération doit être "+(rowRapprochement[row].miroirActive[0].STR_MTXSENS ==="D" ? "C": "D" ) });
  //         return false;
  //       }
  //     }
  //   return true;
  // };

  // retour le sens de la d'une section d'opération
  // const checkSens = () =>{
  //   if (typeOpe==="nostroActive") {
  //       return rowRapprochement[row][typeOpe][0].STR_MTXSENS;
  //   }
  //   if (typeOpe==="miroirActive") {
  //     return rowRapprochement[row][typeOpe][0].STR_MVTSENS;
  //   }
  // };

  return (
    <>
      <div
          style       = {{ maxHeight: "150px", overflow: "auto"}}
          droppable   = "true"
          onDragEnter = {currentDraggableItem ? (e) => handleDragEnter (e, row) : null}
          onDrop      = {currentDraggableItem ? (e) => handleOnDrop(e, row) : null}
          onDragOver  = {currentDraggableItem ? (e) => e.preventDefault() : null}
          className   = " rapprosectionempty border col card "
          id          = {"ROW_"+typeOpe+"_"+row}
      >
          { rowRapprochement[row][typeOpe].length ?
              <>
                <div key={"ROW_"+row} className="oneOpeTitleRow badge counter">{countOperation(row,typeOpe)} </div>
              </>
            :
              <small className='pulsate-fwd inviteRapro'>Déplacer une opération vers cette zone pour demarrer un rapprochement manuellement</small>
          }
          {
            rowRapprochement[row]?.[typeOpe]?.map((data, index) => {
              return(<DraggableRapprochement  key={"OP"+typeOpe+index} data={{data, index, typeOpe, row}} />)
            })
          }
      </div>
    </>
  )
}

export default RapprochementBlock;