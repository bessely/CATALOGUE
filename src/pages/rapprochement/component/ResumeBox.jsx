import { useSelector } from 'react-redux';
import RapprochementResItem from './RapprochementResItem';

/**
 * ! UNE SECTION DE RAPPROCHEMENT  SOIT NOSTRO OU MIROIR
 * @param {string} typeOpe === le type de l'operation voulu dans cette section {miroir ou nostro}
 * @param {integer} row    === le numero de la ligne a laquel appartien cette operation
 */
function ResumeBox({ row, typeOpe}) {
  const { rowResRapprochement } = useSelector(state => state.rapprochements);
  return (
    <>
      <div
        style     = {{ maxHeight: "150px", overflow: "auto" }}
        className = " emptyResumeBox border col card "
        id        = {"ROW_" + typeOpe + "_" + row}
      >
        {
          rowResRapprochement[row][typeOpe].map((data, index) => {
            return (<RapprochementResItem key={"OP" + typeOpe + index} data={{ data, index, typeOpe, row }} />)
          })
        }
      </div>
    </>
  )
}

export default ResumeBox;