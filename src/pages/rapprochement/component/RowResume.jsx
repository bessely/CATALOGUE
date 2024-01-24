import TotalSectionRes from './TotalSectionRes';
import ResumeBox from './ResumeBox';

/**
 * LE CONTENU D'UNE LIGNE DE RAPPROCHEMENT : CE COMPOSANT REPRESENTE UNE LIGNE ENTIERE DE RAPPROCHEMENT | LA VERSION LITE DE RowRapprochement
 * @param {array} data données de cette ligne  
 * @param {integer} row le numero de la ligne
 */
function RowResume({row}){
  return (
    <div  className="activeRow" id={"rowRapro_"+row}>
        <small  className="m-0  p-0 badge counte">{row+1}</small>  
        <ResumeBox id={"ResRowMiroirActive_"+row} row={row} typeOpe="miroirActive" />
        <TotalSectionRes  id={"rowTotal_"+row} row={row}  />
        <ResumeBox id={"ResRowNostroActive_"+row} row={row} typeOpe="nostroActive" />
        <small  className="m-0  p-0 badge counte">{row+1}</small>
    </div>
  ) 
}

export default RowResume