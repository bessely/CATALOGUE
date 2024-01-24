import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatBydevise, makeClipboardObject, makeHtmlRepresentation, fireModalSweetAlert } from '../../../store/Rapprochements/Rapprochement';
import { getCurrentPath, getThisInLocalstore } from '../../../globalComponents/Main';

/**
 * UNE OPERATION DE RAPPROCHEMENT
 * @param {data} {data : le donnée d'un operation, typeOpe: miroir ou nostro ,index : de l'operation ,row: la num de la ligne parent} données de cette ligne  
 */
function RapprochementResItem({data}) {
  const dispatch = useDispatch();
  const { clipboard, html } = useSelector(state => state.rapprochements);
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

    const signMark = (sens) => {
      if (sens==="D") {
        return "-"; //'<span className="badge badge-danger"></span>';
      }
      if (sens==="C") {
        return "+"; 
      }
    };

    const classMatch = () =>{
      if (getCurrentPath() === "Recherche" && (getThisInLocalstore("refMatch") === data.data.STR_MVTREFTRANSAC || getThisInLocalstore("refMatch") === data.data.STR_MTXREFTRANSAC )) {
        return "oneOpeRes oneOpeResMacthSearc";
      } else {
        return "oneOpeRes";
      }
    }

    if (data?.typeOpe==="miroirActive") {
      return (
          <div
                id            = {data.typeOpe+"_"+data.row+"_"+data.index}
                onDoubleClick = {(e) => {handleDblClick(e, { data })}}
                className     = {classMatch()+" w-120 card"}
          >
            <small>{data.data.DT_MVTDATEDOPE === '' ? 'vide' : (String(data.data.DT_MVTDATEDOPE)).split(' ')[0]}</small>
            <small>{data.data.STR_MVTCREDIT === '' ? 'vide' : signMark(data.data.STR_MVTSENS)+" "+formatBydevise(parseFloat(data.data.STR_MVTCREDIT),"")+ " " + data.data.STR_MTXDEVI}</small>
          </div>
      )
    }

    if (data?.typeOpe==="nostroActive") {
      return (
            <div
                  id            = {data.typeOpe+"_"+data.row+"_"+data.index}
                  onDoubleClick = {(e) => {handleDblClick(e, { data })}}
                  className     = {classMatch() + " w-120 card"}
            >
            <small>{data.data.DT_MTXDATEDOPE === '' ? 'vide' : (String(data.data.DT_MTXDATEDOPE)).split(' ')[0]}</small>
            <small>{data.data.STR_MTXCREDIT === '' ? 'vide' : signMark(data.data.STR_MTXSENS)+" "+(formatBydevise(parseFloat(data.data.STR_MTXCREDIT),"")) + " " + data.data.STR_MTXDEVI}</small>
          </div>
      )
    }
}

export default RapprochementResItem;