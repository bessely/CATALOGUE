import { useDispatch } from 'react-redux';
import { closeRowButtonTrigger, deleteOneRowRejetRapprochement } from '../../../store/Rapprochements/Rapprochement';
import RapprochementBlock from './RapprochementBlock';
import TotalSection from './TotalSection';

/**
 * LE CONTENU D'UNE LIGNE DE RAPPROCHEMENT : CE COMPOSANT REPRESENTE UNE LIGNE ENTIERE DE RAPPROCHEMENT
 * @param {array} data données de cette ligne  
 * @param {integer} row le numero de la ligne
 */
function RowRapprochement({row,data}){
  const dispatch   = useDispatch();

  return (
    <div  className="activeRow" id={"rowRapro_"+row}>
        <small  className="m-0  p-0 badge counte">{row+1}</small>
          <RapprochementBlock id={"rowMiroirActive_"+row} row={row} typeOpe="miroirActive" />
          <TotalSection  id={"rowTotal_"+row} row={row}  />
          <RapprochementBlock id={"rowNostroActive_"+row} row={row} typeOpe="nostroActive" />
        <small  className="m-0  p-0 badge counte">{row+1}</small>
        <button type="button" className="close m-1">
          <svg  onClick={(e) => { data.miroirActive.length>0 && data.nostroActive.length>0  ? dispatch(deleteOneRowRejetRapprochement({e,row,data})) : dispatch(closeRowButtonTrigger({e,row,data}))  }}  xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
            <circle  cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
          </svg>
        </button>
    </div>
  ) 
}

export default RowRapprochement