import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Info } from '../../../globalComponents/CustomToast';
import { countOperationRow, fireModalSweetAlert, formatBydevise, makeClipboardObject, makeHtmlRepresentation, setCurrentDraggableItem, setOperations, setRowRapprochement } from '../../../store/Rapprochements/Rapprochement';

/**
 * UNE OPERATION DE RAPPROCHEMENT
 * @param {data} {data : le donnée d'un operation, typeOpe: miroir ou nostro ,index : de l'operation ,row: la num de la ligne parent} données de cette ligne  
 */
function DraggableRapprochement({data}) {
    const dispatch               = useDispatch();
  const { rowRapprochement, operations, clipboard, html }   = useSelector(state => state.rapprochements);
    /**PENDANT LE DRAG */
    const handletDragStart = (e, data) => {
      e.target.className= e.target.className+" coteneurdrag";
      data.data.component="rapprochement";
      dispatch(setCurrentDraggableItem(data.data));
      e.target.addEventListener('dragend', handleGragEnd);
    };

    /**Quand on relache le DRAG */
    const handleGragEnd = ({target}) => {
      dispatch(setCurrentDraggableItem([]));
      target.className = String(target.className).split(" coteneurdrag")[0];
    };

    /**Quand fait un double click sur ce composant */
    const handleDblClick = (e, data) => {
      if (e) { // e sera definie seulement pour la version du composant concernée par l'action en cours
        dispatch(makeClipboardObject({ data: data.data.data, typeOpe: data.data.typeOpe }));
        dispatch(makeHtmlRepresentation({ data: data.data.data, typeOpe: data.data.typeOpe }));
        setTimeout(() => {
          dispatch(fireModalSweetAlert(html, clipboard));
        }, 200);
      }
    };

    /** Quand supprime ce composant */
    const closeButtonTrigger = (e, data) =>{
      let typeOpe = data.typeOpe;  
      let row     = data.row;  
      if (e.target) {
        let newList = JSON.parse(JSON.stringify(rowRapprochement)); // <- permet une copy fidele de l'ancien array || [...rowRapprochement] <- peu fiable pour ce cas
        let copynewrom=[];
          if ( typeOpe==="miroirActive") {
            for (let zz = 0; zz <  newList[row][typeOpe].length; zz++) {
              if (newList[row][typeOpe][zz].LG_MVTID!==data.data.LG_MVTID) { // je reconstitue la liste sans l'elmt a supprimé juste pour cette ligne d'operations
                copynewrom.push(newList[row][typeOpe][zz]); // cet tableau contient tous les elmts a concerver
              }
            }
          }

          if (typeOpe==="nostroActive") {
            for (let zz = 0; zz <  newList[row][typeOpe].length; zz++) {
              if ( newList[row][typeOpe][zz].LG_MTXID!==data.data.LG_MTXID) { // je reconstitue la liste sans l'elmt a supprimé juste pour cette ligne d'operations
                copynewrom.push(newList[row][typeOpe][zz]); // cet tableau contient tous les elmts a concerver
              }
            }
          }

          animateDeletedItem(row,data.index,typeOpe);
          setTimeout(() => { // le temps que l'animation s'execute
            newList[row][typeOpe]=copynewrom; // je met a jour ma nouvelle ligne d'operation en ayant pris soin de retirer l'operation demandé
            dispatch(setRowRapprochement(newList)); // J'applique la maj du state en un seul endroit avec les nvelles opérations
            recoverData();
            dispatch(countOperationRow({typeOpe}));
          }, 500);
          setTimeout(() => { // le temps que l'animation s'execute
            dispatch(countOperationRow({typeOpe}));
          }, 1000);
      }
    };

    /**Restore une operation supprimée de la liste des rapprochements vers la liste des opérations en HAUT */
    const recoverData = () => {
      let newList   = JSON.parse(JSON.stringify(operations)); // <- permet une copy fidele de l'ancien array || [...operations] <- peu fiable pour ce cas
      let temoin    = false;
      if ( data.typeOpe==="miroirActive") {
        for (let zz = 0; zz <  newList.dataMvt.length; zz++) {
          if (newList.dataMvt[zz].LG_MVTID===data.data.LG_MVTID) { // je recherche l'opération concernée
            newList.dataMvt[zz].state=""; // réaffichage des données
            dispatch(setOperations(newList));
            targetDuplicate("miroirActive",zz);
            Info.fire({ title: "l'opération miroir a été restaurée à la ligne "+(zz+1) });
            temoin=true;
            break;
          }
        }
      }

      if ( data.typeOpe==="nostroActive") {
        for (let zz = 0; zz <  newList.dataMtx.length; zz++) {
          if (newList.dataMtx[zz].LG_MTXID===data.data.LG_MTXID) { // je recherche l'opération concernée
            newList.dataMtx[zz].state=""; // réaffichage des données 
            dispatch(setOperations(newList));     
            targetDuplicate("nostroActive",zz);
            Info.fire({ title: "l'opération nostro a été restaurée à la ligne "+(zz+1) });
            temoin=true;
            break;
          }
        }
      }
      // si l'opération à faire réapparaitre n'a pas été retrouvée dans la liste [sans doute que le l'user a déclenché une recherche dans la zone des operations]
      if (!temoin) { 
        // dans ce cas je dépose la nouvelle opération a la fin
        newList[data.typeOpe].push(data.data);
        dispatch(setRowRapprochement(newList));
      }
    };

    /**Ajoute puis retire  une animation CSS sur l'opération en suppression */
    const animateDeletedItem = (row, index, operation) => {
      let elmt = document.getElementById(operation + "_" + row + "_" + index);
      elmt.className = elmt.className + " bg-transparent slide-out-bck-center";
      setTimeout(() => { // le temps que l'animation s'execute
        elmt.className = String(elmt.className).split(" bg-transparent slide-out-bck-center")[0];
      }, 500);
    };

    /**
     * Ajoute puis retire  une animation CSS sur l'opéra duppliqué
     * @param {string} typeOpe le type d'operation de l'object
     * @param {integer} row : la lign de l'operation dupliquée
     * @param {integer} index : sa position dans la ligne
     * */
    const targetDuplicate = (typeOpe,index)=>{
      setTimeout(() => {
        let elmt = document.getElementById("opeRow_"+typeOpe+"_"+index);
        elmt.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
        elmt.className     = elmt.className+" color-blink"; //Ajoute la classe
        setTimeout(() => { // puis retir la classe
          elmt.className = String(elmt.className).split(" color-blink")[0]; 
        }, 4000);
      }, 1000);
    };

    const signMark = (sens) => {
      if (sens==="D") {
        return "-"; //'<span className="badge badge-danger"></span>';
      }
      if (sens==="C") {
        return "+"; 
      }
    };

    if (data?.typeOpe==="miroirActive") {
      return (
          <div
                id            = {data.typeOpe+"_"+data.row+"_"+data.index}
                draggable     = "true"
                onDoubleClick = {(e) => {handleDblClick(e, { data })}}
                className     = {data.data?.STR_RAPPROCOMMENT!==undefined ? "oneOpeRes w-120 card" : "oneOpe w-120 card"}
                onDragStart   = {(e) => { handletDragStart(e, { data }) }} data={data} type="mvt"
                role          ="button"
          >
            {
              data.data?.STR_RAPPROCOMMENT!==undefined ?
                null
              :
              <svg key={"RP_NUM_MIR_"+data.row+"_"+data.index} onClick={(e) => { closeButtonTrigger(e,data) }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" role="button" className="badge counter feather feather-x-circle">
                  <circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
              </svg>
            }
            <small>{data.data.DT_MVTDATEDOPE === '' ? 'vide' : (String(data.data.DT_MVTDATEDOPE)).split(' ')[0]}</small>
            <small>{data.data.STR_MVTCREDIT === '' ? 'vide' : signMark(data.data.STR_MVTSENS) +" "+ formatBydevise(parseFloat(data.data.STR_MVTCREDIT),"") + " " + data.data.STR_MTXDEVI}</small>
          </div>
      )
    }

    if (data?.typeOpe==="nostroActive") {
      return (
          <div
                  id            = {data.typeOpe+"_"+data.row+"_"+data.index}
                  draggable     = "true"
                  onDoubleClick = {(e) => { handleDblClick(e, { data })}}
                  className     = {data.data?.STR_RAPPROCOMMENT!==undefined ? "oneOpeRes w-120 card" : "oneOpe w-120 card"}
                  onDragStart   = {(e) => { handletDragStart(e, { data }) }} data={data} type="mtx"
                  role          ="button"
          >
            {
              data.data?.STR_RAPPROCOMMENT!==undefined ?
                null
              :
                <svg key={"RP_NUM_MIR_"+data.row+"_"+data.index} onClick={(e) => { closeButtonTrigger(e,data) }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" role="button" className="badge counter feather feather-x-circle">
                  <circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
                </svg>
            }
            {/* <span key={"RP_NUM_NOS_"+data.row+"_"+data.index} className="oneOpeTitle badge counter">{data.index+1}</span> */}
            <small>{data.data.DT_MTXDATEDOPE === '' ? 'vide' : (String(data.data.DT_MTXDATEDOPE)).split(' ')[0]}</small>
            <small>{data.data.STR_MTXCREDIT === '' ? 'vide' : signMark(data.data.STR_MTXSENS) +" "+ (formatBydevise(parseFloat(data.data.STR_MTXCREDIT),"")) + " " + data.data.STR_MTXDEVI}</small>
          </div>
      )
    }
}

export default DraggableRapprochement