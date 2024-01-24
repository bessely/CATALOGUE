import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DangerBottom } from "../../../globalComponents/CustomToast";
import Modal from '../../../globalComponents/Modal';
import { countOperationRow, formatBydevise, setModalMoveRappro, setOperations, setRowRapprochement } from '../../../store/Rapprochements/Rapprochement';
/**
 * LA MODALE DE DEPLACEMENT D'UNE OPERATION DANS UNE LIGNE DE RAPPROCHEMENT  SE DECLENCHE PAR UN CTRl + CLICK SUR UNE OPERATION SUR UN  COMPOSANT D'OPERATION [DraggableOperation]
 * @returns JSX
 */
function ModalMoveRappro() {
    const { modalMoveRappro, rowRapprochement, currentDraggableItem, operations, currentCompte } = useSelector((state) => state.rapprochements);
    const dispatch     = useDispatch();

  /** soumission du rapprochement automatique
   *  @évènement onClick
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    let row = document.getElementById('RowDepRappro');
    DropInRapprochement(e, row.value);
    setTimeout(() => {
      dispatch(setModalMoveRappro({...modalMoveRappro,open: false}));
    }, 300);
  };

  /** 
 * Ajoute l'operation en cours dans ma liste des rapprochements en cours [row] dans la ligne spécifiée dans lE NOSTRO ou LE MIRROIR [typeOpe]
 * */
  const DropInRapprochement = (e, row) => {
    if (currentDraggableItem.data) {
      // je m'assure d'être bien sur la version html du composant et qu'il ait elmt en train d'être draggué
      if (currentDraggableItem.typeOpe === "miroirActive" && currentDraggableItem.data.LG_MVTID && currentDraggableItem.data.STR_MTXDEVI) { // e.target est null pour les elmts non concernés par le drop
        if (checkIfSameDevise(currentDraggableItem.data.STR_MTXDEVI, row) && sheckDoublonInRapproRow(currentDraggableItem, currentDraggableItem.typeOpe, row)) {
          addOperation(row, currentDraggableItem.typeOpe);
          return;
        }
      }

      if (currentDraggableItem.typeOpe === "nostroActive" && currentDraggableItem.data.LG_MTXID && currentDraggableItem.data.STR_MTXDEVI) {
        if (checkIfSameDevise(currentDraggableItem.data.STR_MTXDEVI, row) && sheckDoublonInRapproRow(currentDraggableItem, currentDraggableItem.typeOpe, row)) {
          addOperation(row, currentDraggableItem.typeOpe);
          return;
        }
      }
    }
  };

  /**
   * Vérifie s'il n'y à pas de doublons dans toutes les opération en cours de rapprochement sauf qd il sagit d'une permutation de rapprochement 
   * @param {Object} data {typeOpe:le type d'operation de l'object, row:sa ligne de provenance, data: les données de l'operation} : les données de l'opération en cours de drag
   * @param {string} operation : le type d'opération
   * */
  const sheckDoublonInRapproRow = (data, operation, row) => {
    let newList = JSON.parse(JSON.stringify(rowRapprochement));
    if (operation === "miroirActive") {
      for (let ii = 0; ii < newList.length; ii++) {
        for (let zz = 0; zz < newList[ii][operation].length; zz++) {
          if (newList[ii][operation][zz].LG_MVTID === data.data.LG_MVTID && data.component === "operation") {
            DangerBottom.fire({ title: "Désolé ! Opération dupliquée à la ligne " + (ii + 1) + " opération " + (zz + 1) });
            targetDuplicate(operation, ii, zz);
            return false;
          }
          if (newList[ii][operation][zz].LG_MVTID === data.data.LG_MVTID && data.component === "rapprochement") {
            swapItem(data, row);
            return false;
          }
        }
      }
    }

    if (operation === "nostroActive") {
      for (let ii = 0; ii < newList.length; ii++) {
        for (let zz = 0; zz < newList[ii][operation].length; zz++) {
          if (newList[ii][operation][zz].LG_MTXID === data.data.LG_MTXID && data.component === "operation") {
            DangerBottom.fire({ title: "Désolé ! Opération dupliquée à la ligne " + (ii + 1) + " opération " + (zz + 1) });
            targetDuplicate(operation, ii, zz);
            return false;
          }
          if (newList[ii][operation][zz].LG_MTXID === data.data.LG_MTXID && data.component === "rapprochement") {
            swapItem(data, row);
            return false;
          }
        }
      }
    }
    return true;
  };
  
  /** Verifie que les 2 dernières opéations sont de la meme devise sur la meme ligne sans distinction de type d'operation
   * Cad que si dans la section Nostro une opération est deposée elle doit etre de la meme devise que les autres operations présentent dans la meme ligne Nostro ou Miroire
   */
  const checkIfSameDevise = (devisEntrant, row) => {
    if (rowRapprochement[row][currentDraggableItem.typeOpe].length === 0) { // !nous somme a la premières opération de rapprochement donc  execute directement le processus suivant qd tt est okay
      if (rowRapprochement[row].nostroActive.length > 0 && currentDraggableItem.typeOpe === "miroirActive") { // verification dans les cellules opposées
        if (rowRapprochement[row].nostroActive[0].STR_MTXDEVI !== devisEntrant) {
          DangerBottom.fire({ title: "Attention ! Les devises de cette ligne sont en " + rowRapprochement[row].nostroActive[0].STR_MTXDEVI });
          return false;
        }
      }
      if (rowRapprochement[row].miroirActive.length > 0 && currentDraggableItem.typeOpe === "nostroActive") { // verification dans les cellules opposées
        if (rowRapprochement[row].miroirActive[0].STR_MTXDEVI !== devisEntrant) {
          DangerBottom.fire({ title: "Attention ! Les devises de cette ligne sont en " + rowRapprochement[row].miroirActive[0].STR_MTXDEVI });
          return false;
        }
      }
      return true;
    }
    if (rowRapprochement[row].miroirActive.length > 0 && currentDraggableItem.typeOpe === "miroirActive") { // verification dans les memes cellules
      if (rowRapprochement[row].miroirActive[0].STR_MTXDEVI !== devisEntrant) {
        DangerBottom.fire({ title: "Attention ! Les devises de cette section sont en " + rowRapprochement[row].miroirActive[0].STR_MTXDEVI });
        return false;
      }
    }
    if (rowRapprochement[row].nostroActive.length > 0 && currentDraggableItem.typeOpe === "nostroActive") { // verification dans les memes cellules
      if (rowRapprochement[row].nostroActive[0].STR_MTXDEVI !== devisEntrant) {
        DangerBottom.fire({ title: "Attention ! Les devises de cette section sont en " + rowRapprochement[row].nostroActive[0].STR_MTXDEVI });
        return false;
      }
    }
    if (rowRapprochement[row].nostroActive.length > 0 && currentDraggableItem.typeOpe === "miroirActive") { // verification dans les cellules opposées que les divses sont les memes
      if (rowRapprochement[row].nostroActive[0].STR_MTXDEVI !== devisEntrant) {
        DangerBottom.fire({ title: "Attention ! Les devises de cette ligne sont en " + rowRapprochement[row].nostroActive[0].STR_MTXDEVI });
        return false;
      }
    }
    if (rowRapprochement[row].miroirActive.length > 0 && currentDraggableItem.typeOpe === "nostroActive") { // verification dans les cellules opposées que les divses sont les memes
      if (rowRapprochement[row].miroirActive[0].STR_MTXDEVI !== devisEntrant) {
        DangerBottom.fire({ title: "Attention ! Les devises de cette ligne sont en " + rowRapprochement[row].miroirActive[0].STR_MTXDEVI });
        return false;
      }
    }
    return true;
  };

  /**
   * Ajoute une opération à une ligne de rapprochement
   * @param {integer}} row sa ligne de provenance de ce composant
   * @param {string} operation : le type d'opération 
   * */
  const addOperation = (row, operation) => {
    let newList = JSON.parse(JSON.stringify(rowRapprochement)); // <- permet une copy fidele de l'ancien array || [...rowRapprochement] <- peu fiable pour ce cas
    newList[row][operation].push(currentDraggableItem.data);
    dispatch(setRowRapprochement(newList));
    removeOperation();
  };
  
  /**
   * Retire l'opération (EN HAUT) qui vient de descendre dans la liste des rapprochements (EN BAS)
   * Ce que je fais c'est  que  je crée une nvelle colonne [state]=="hidden" pour les opérations qui doivent etre masquées dans la liste du HAUT
   * */
  const removeOperation = () => {
    let newList = JSON.parse(JSON.stringify(operations)); // <- permet une copy fidele de l'ancien array || [...operations] <- peu fiable pour ce cas
    if (currentDraggableItem.typeOpe === "miroirActive") {
      if (newList.dataMvt[currentDraggableItem.index].LG_MVTID === currentDraggableItem.data.LG_MVTID) { //verification supplementaire pour voir si je manipul effectivement le bon objet
        newList.dataMvt[currentDraggableItem.index].state = "hidden"; // colonne [state]=="hidden" masquage des données
      }
    }

    if (currentDraggableItem.typeOpe === "nostroActive") {
      if (newList.dataMtx[currentDraggableItem.index].LG_MTXID === currentDraggableItem.data.LG_MTXID) { //verification supplementaire pour voir si je manipul effectivement le bon objet
        newList.dataMtx[currentDraggableItem.index].state = "hidden"; // colonne [state]=="hidden" masquage des données
      }
    }
    dispatch(setOperations(newList));
    dispatch(countOperationRow({ typeOpe:currentDraggableItem.typeOpe }));
  };

  /**
   * Ajoute puis retire  une animation CSS sur l'opéra duppliqué
   * @param {string} typeOpe le type d'operation de l'object
   * @param {integer} row : la lign de l'operation dupliquée
   * @param {integer} index : sa position dans la ligne
   * */
  const targetDuplicate = (typeOpe, row, index) => {
    let elmt = document.getElementById(typeOpe + "_" + row + "_" + index);
    elmt.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    elmt.className = elmt.className + " color-blink"; //Ajoute la classe

    setTimeout(() => { // puis retir la classe
      elmt.className = String(elmt.className).split(" color-blink")[0];
    }, 4000);
  };

  /** 
   * Permute les operations cad supprime une operation dans sa ligne de provenance et l'ajoute dans la ligne du composant recepteur
   * @param {Object} data {typeOpe:le type d'operation de l'object, row:sa ligne de provenance, data: les données de l'operation} : les données de l'opération en cours de drag
   * */
  const swapItem = async (data, row) => {
    //row: represente la ligne de ce composant: celui qui recois la nouvelle opération : e.target de l'venement onDrop
    if (data.component === "rapprochement") {
      let newListx = await removeRapprochement(data);
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
  const removeRapprochement = async (data) => {
    let newList = JSON.parse(JSON.stringify(rowRapprochement)); // <- permet une copy fidele de l'ancien array || [...rowRapprochement] <- peu fiable pour ce cas
    let copynewrom = [];
    if (data.typeOpe === "miroirActive") {
      for (let zz = 0; zz < newList[data.row][data.typeOpe].length; zz++) {
        if (newList[data.row][data.typeOpe][zz].LG_MVTID !== data.data.LG_MVTID) { // je reconstitue la liste sans l'elmt a supprimé juste pour cette ligne d'operations
          copynewrom.push(newList[data.row][data.typeOpe][zz]); // cet tableau contient tous les elmts a concerver
        }
      }
    }

    if (data.typeOpe === "nostroActive") {
      for (let zz = 0; zz < newList[data.row][data.typeOpe].length; zz++) {
        if (newList[data.row][data.typeOpe][zz].LG_MTXID !== data.data.LG_MTXID) { // je reconstitue la liste sans l'elmt a supprimé juste pour cette ligne d'operations
          copynewrom.push(newList[data.row][data.typeOpe][zz]); // cet tableau contient tous les elmts a concerver
        }
      }
    }

    newList[data.row][data.typeOpe] = copynewrom; // je met a jour ma nouvelle ligne d'operation en ayant pris soin de retirer l'operation demandé
    return newList;
  };

  /**
   * Retoune un composant styliser qui contient les données détaillées de l'opération en cours
   * @returns JSX
   */
  const renderOpeDetail = () => {
    if (currentDraggableItem.typeOpe === "miroirActive") {
      return (
        <div className="p-0 m-0 bg-light text-center card oneOpe ">
            <small className="text-muted">N° Compte Nostro  : <span className="text-danger"> {currentCompte.COMPTE.NOSTRO}  </span></small> 
            <small className="text-muted">N° Compte Miroir :  <span className="text-danger"> {currentCompte.COMPTE.MIROIR} </span></small>  
            <small className="text-muted">Référence relative : <span className="text-danger"> {currentDraggableItem.data.STR_MVTREFRELAT} </span></small> 
            <small className="text-muted">Référence de la transaction :  <span className="text-danger">{currentDraggableItem.data.STR_MVTREFTRANSAC} </span></small>
            <small className="text-muted">Date de l'opération :  <span className="text-danger">{currentDraggableItem.data.DT_MVTDATEDOPE} </span></small>
            <small className="text-muted">Date de validation  :  <span className="text-danger">{currentDraggableItem.data.DT_MVTDATEVAL} </span></small>
            <small className="text-muted">Référence de l'opération :  <span className="text-danger">{currentDraggableItem.data.STR_MVTREFDOPE} </span></small>
            <small className="text-muted">Montant de l'opération :  <span className="text-danger">{formatBydevise(currentDraggableItem.data.STR_MVTCREDIT,"") +" "+ currentDraggableItem.data.STR_MTXDEVI} </span></small>
            <small className="text-muted">Sens de l'opération :  <span className="text-danger"> {currentDraggableItem.data.STR_MVTSENS} </span></small>
            <small className="text-muted">Libellé de l'opération :  <span className="text-danger"> {currentDraggableItem.data.STR_MVTLIBELLE}</span></small>
            <small className="text-muted">Devise :  <span className="text-danger text-right"> {currentDraggableItem.data.STR_MTXDEVI} </span></small>
        </div>
      );
    }

    if (currentDraggableItem.typeOpe === "nostroActive"){
      return (
        <div className="p-0 m-0 bg-light text-center card oneOpe ">
            <small className="text-muted">N° Compte Nostro  : <span className="text-danger"> {currentCompte.COMPTE.NOSTRO}  </span></small> 
            <small className="text-muted">N° Compte Miroir :  <span className="text-danger"> {currentCompte.COMPTE.MIROIR} </span></small> 
            <small className="text-muted">Référence relative : <span className="text-danger"> {currentDraggableItem.data.STR_MTXREFRELAT} </span></small> 
            <small className="text-muted">Référence de la transaction :  <span className="text-danger">{currentDraggableItem.data.STR_MTXREFTRANSAC} </span></small>
            <small className="text-muted">Date de l'opération :  <span className="text-danger">{currentDraggableItem.data.DT_MTXDATEDOPE} </span></small>
            <small className="text-muted">Date de validation  :  <span className="text-danger">{currentDraggableItem.data.DT_MTXDATEVAL} </span></small>
            <small className="text-muted">Référence de l'opération :  <span className="text-danger">{currentDraggableItem.data.STR_MTXREFDOPE} </span></small>
            <small className="text-muted">Montant de l'opération :  <span className="text-danger">{formatBydevise(currentDraggableItem.data.STR_MTXCREDIT,"")+" "+ currentDraggableItem.data.STR_MTXDEVI} </span></small>
            <small className="text-muted">Sens de l'opération :  <span className="text-danger"> {currentDraggableItem.data.STR_MTXSENS} </span></small>
            <small className="text-muted">Libellé de l'opération :  <span className="text-danger"> {currentDraggableItem.data.STR_MTXLIBELLE}</span></small>
            <small className="text-muted">Devise :  <span className="text-danger text-right"> {currentDraggableItem.data.STR_MTXDEVI} </span></small>
        </div>
      );
    }
  };

  

  return (
      <Modal
          modaleSate       = {modalMoveRappro}
          setModalSate     = {setModalMoveRappro}
          OnActionBtnClick = {handleSubmit}
      >
          <small >Déplacer ce rapprochement à la ligne selectionnée ?</small>
          <div className='register-modal mt-2' id="ctrlClickModal">
            {
                  modalMoveRappro.open && renderOpeDetail()
            }
            <select className='form-control form-control-sm mt-2' id='RowDepRappro'  >
                {
                  rowRapprochement.map((item,x) => {
                    return (<option key={"rowXdep_"+x} value={x}>{"ligne "+(x+1)}</option>)
                  })
                }
            </select>
          </div>
      </Modal>
  )
}

export default ModalMoveRappro