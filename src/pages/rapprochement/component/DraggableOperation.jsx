import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatLargeLabel, getCurrentPath } from '../../../globalComponents/Main';
import { BASEROOT } from '../../../services/serveur';
import { NewRapprochementRow, countOperationRow, fireModalSweetAlert, formatBydevise, makeClipboardObject, makeHtmlRepresentation, setCurrentDraggableItem, setModalMoveRappro } from '../../../store/Rapprochements/Rapprochement';

/**UN COMPOSANT D'OPERATION DANS LA ZONE EN HAUT 
 * @param {string} typeOpe = mirroirActive || NostroActive
 * @return JSX
*/
function DraggableOperation({ typeOpe }) {
  const dispatch = useDispatch();
  const { operations, status, rowRapprochement, html, clipboard } = useSelector(state => state.rapprochements);

  /**PENDANT LE DRAG */
  const handletDragStart = (e, data) => {
    if (rowRapprochement.length === 0) {
      dispatch(NewRapprochementRow(e));
    }
    e.target.className = e.target.className + " coteneurdrag";  // J'ajoute au composant selectionné la classe css de effet de disparition sur le dom
    dispatch(setCurrentDraggableItem(data)); // sauvegarde des data en cours de drag
    e.target.addEventListener('dragend', handleDragCancel); // J'ecoute sur ce composant l'evenement de relachement
    dispatch(countOperationRow({ typeOpe })); // je declenche mon compteur de ligne d'operations
  };

  /**Quand on relache le DRAG */
  const handleDragCancel = ({ target }) => {
    dispatch(setCurrentDraggableItem([]));  // je libere la variable qui porte les données de l'object qui vient d'etre relacher
    target.className = String(target.className).split(" coteneurdrag")[0]; // le composant réaparrait sur le dom car je retir la classe qui le masquait au moment du drag
    target.removeEventListener('dragend', handleDragCancel); // je retire l'évènement de relachement que j'avais rattaché préalablement
    dispatch(countOperationRow({ typeOpe })); // je declenche mon compteur de ligne d'operations
  };

  /**Quand fait un double click sur ce composant */
  const handleDblClick = (e, data) => {
    if (e) { // e sera definie seulement pour la version du composant concernée par l'action en cours
      dispatch(makeClipboardObject({ data: data.data, typeOpe }));
      dispatch(makeHtmlRepresentation({ data: data.data, typeOpe }));
      setTimeout(() => {
        dispatch(fireModalSweetAlert(html, clipboard));
      }, 200);
    }
  };

  /**Quand on fait un click sur ce composant */
  const  handleClick = async (e, data) => {
    if (e && e.ctrlKey) {  //CTRL+CLICK 
      if (rowRapprochement.length === 0) { // si la sexion de rapprochement est vide
        dispatch(NewRapprochementRow(e)); // je rajoute une ligne de rapprochement dans la section des rapprochements
      }
      dispatch(setCurrentDraggableItem(data));
      dispatch(setModalMoveRappro({ open: true, mode:"", size: "moveRappro", title: "Déplacer un rapprochement à la ligne indiquée", button:true,  buttonName:"Déplacer l'opération", inputstate: "", btnclass: "btn-block btn btn-primary" }));
    }
  };

  return (
    status.operation === "loading" ?
      <div className="text-center">
        <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /> <br />
        <span>Chargement des opération en cours...</span>
      </div>
      :
      status.operation !== "waiting" && operations.dataMvt?.length > 0 ?
        typeOpe === 'miroirActive' ?
          operations.dataMvt.map((data, index) => {
            return (
              data.state !== "hidden" ?
              <>
                  <div
                    key                   = {"opeRow_miroirActive_" + index}
                    id                    = {"opeRow_miroirActive_" + index}
                    draggable             = "true"
                    onDragStart           = {(e) => { (getCurrentPath() !=="Validation" && getCurrentPath() !=="Derapprochement") && handletDragStart(e, { data, index, typeOpe, component: "operation" }) }}
                    onDoubleClick         = {(e) => { handleDblClick(e, { data, typeOpe }) }}
                    onClick               = {(e) => { (getCurrentPath() !=="Validation" && getCurrentPath() !=="Derapprochement") && handleClick(e, { data, index, typeOpe, component: "operation" }) }}
                    data                  = {data}
                    type                  = "miroirActive"
                    className             = "card coteneurcompt opeRow_miroirActive"
                    title                 = "Double click pour voir les détails de l'opération"
                  >
                    <small key={"mvtnbr"   + index} className='w-60 small-8' >{index + 1}</small>
                    <small key={"mvtnbrX1" + index} className='w-150 compteitem text-center py-1 px-1 align-self-stretch'>{data.DT_MVTDATEDOPE === '' ? 'XXXXXXXXXXXX': data.DT_MVTDATEDOPE}</small>
                    <small key={"mvtnbrX2" + index} className='w-150 compteitem text-center py-1 px-1 align-self-stretch'>{data.DT_MVTDATEVAL === '' ? 'XXXXXXXXXXXX' : data.DT_MVTDATEVAL}</small>
                    <small key={"mvtnbrX3" + index} className='w-300 compteitem text-center py-1 px-1 align-self-stretch' title={data.STR_MVTLIBELLE === '' ? 'XXXXXXXXXXXX' : data.STR_MVTLIBELLE}>{data.STR_MVTLIBELLE === '' ? 'XXXXXXXXXXXX' : formatLargeLabel(25, data.STR_MVTLIBELLE)}</small>
                    <small key={"mvtnbrX4" + index} className='w-150 compteitem text-center py-1 px-1 align-self-stretch'>{data.STR_MVTREFDOPE === '' ? 'XXXXXXXXXXXX' : data.STR_MVTREFDOPE}</small>
                    <small key={"mvtnbrX5" + index} className='w-150 compteitem text-center py-1 px-1 align-self-stretch'>{data.STR_MVTREFRELAT === '' ? 'XXXXXXX' : data.STR_MVTREFRELAT}</small>
                    <small key={"mvtnbrX6" + index} className='w-200 compteitem text-center py-1 px-1 align-self-stretch comptcenter'>{data.STR_MVTCREDIT === '' ? 'XXXXXXXXXXXX' : formatBydevise(data.STR_MVTCREDIT,"") + " " + data.STR_MTXDEVI}</small>
                    <small key={"mvtnbrX7" + index} className='w-60  compteitem text-center py-1 px-1 align-self-stretch'>{data.STR_MVTSENS === '' ? 'XXXXXXXXXXXX' : data.STR_MVTSENS}</small>
                  </div>
              </>
                : null
            )
          })
          : // typeOpe==='nostroActive'
          operations.dataMtx.map((data, index) => {
            return (
              data.state !== "hidden" ?
                <>
                  <div
                    key                   = {"opeRow_nostroActive_" + index}
                    id                    = {"opeRow_nostroActive_" + index}
                    draggable             = "true"
                    onDragStart           = {(e) => { getCurrentPath() !=="Validation" && handletDragStart(e, { data, index, typeOpe, component: "operation" }) }}
                    onDoubleClick         = {(e) => { handleDblClick(e, { data, typeOpe }) }}
                    onClick               = {(e) => { getCurrentPath() !=="Validation" && handleClick(e, { data, index, typeOpe, component: "operation" }) }}
                    data                  = {data}
                    type                  = "nostroActive"
                    className             = "card coteneurcompt opeRow_nostroActive"
                    title                 = "Double click pour voir les détails de l'opération"
                  >
                    <small key={"mtxnbr" + index} className='w-60 small-8' >{index + 1}</small>
                    <small key={"mtxnbrY1" + index} className='w-150 compteitem text-center py-1 px-1 align-self-stretch'>{data.DT_MTXDATEDOPE === '' ? 'XXXXXXXXXXXX' : data.DT_MTXDATEDOPE}</small>
                    <small key={"mtxnbrY2" + index} className='w-150 compteitem text-center py-1 px-1 align-self-stretch'>{data.DT_MTXDATEVAL === '' ? 'XXXXXXXXXXXX' : data.DT_MTXDATEVAL}</small>
                    <small key={"mtxnbrY3" + index} className='w-300 compteitem text-center py-1 px-1 align-self-stretch' title={data.STR_MTXLIBELLE === '' ? 'XXXXXXXXXXXX' : data.STR_MTXLIBELLE}>{data.STR_MTXLIBELLE === '' ? 'XXXXXXXXXXXX' : formatLargeLabel(25, data.STR_MTXLIBELLE)}</small>
                    <small key={"mtxnbrY4" + index} className='w-150 compteitem text-center py-1 px-1 align-self-stretch'>{data.STR_MTXREFDOPE === '' ? 'XXXXXXXXXXXX' : data.STR_MTXREFDOPE}</small>
                    <small key={"mtxnbrY5" + index} className='w-150 compteitem text-center py-1 px-1 align-self-stretch'>{data.STR_MTXREFRELAT === '' ? 'XXXXXXX' : data.STR_MTXREFRELAT}</small>
                    <small key={"mtxnbrY6" + index} className='w-200 compteitem text-center py-1 px-1 align-self-stretch comptcenter'>{data.STR_MTXCREDIT === '' ? 'XXXXXXXXXXXX' : formatBydevise(data.STR_MTXCREDIT, "") + " " + data.STR_MTXDEVI}</small>
                    <small key={"mtxnbrY7" + index} className='w-60  compteitem text-center py-1 px-1 align-self-stretch'>{data.STR_MTXSENS === '' ? 'XXXXXXXXXXXX' : data.STR_MTXSENS}</small>
                  </div>
                </>
                : null
            )
          })
        :
        <div className="text-center mt-5 p-0" >
          <img src={BASEROOT+"assets/img/empty-animate.svg"} className="m-0 p-0" height="200" alt="loader" />
          <p className='p-0 m-0 text-muted'>Pas d'opération</p>
        </div>
  )
}
export default DraggableOperation;