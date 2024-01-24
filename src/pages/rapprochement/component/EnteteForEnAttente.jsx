import React from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { BASEROOT } from '../../../services/serveur';
/**
 * COMPOSANT D'AFFICHAGE DES ENTETES EN ATTENTE DE VALIDATION OU DES ENTETES REJETEES
 * @param {function} loadRapprochement
 * @param {function} move
 * @param {string} column
 * @returns 
 */
function EnteteForEnAttente({ loadRapprochement, move, column }) {
  const { listEntete, status } = useSelector(state => state.rapprochements);
  return (
    status.waiting === "loading" ?
      <div className='d-flex col mt-3 m-0 p-0 flex-column justify-content-center'>
        <img src={BASEROOT+"assets/img/preloader.svg"} height="50" alt="loader" /> <br />
        <p className='mx-auto text-center'>{"Chargement des entêtes d'operérations ... "}</p>
      </div>
      :
      listEntete?.[column]?.length > 0 ?
          <div className='entetecomponent mx-auto overflow-hidden p-3 col' key={"entetetRappro1" + column}>
              {
                column==="rejet" ?
                <ReactTooltip />
                :
                null                         
              } 
              <div key={"left"+column} onClick={(e) => { move("left", column) }} id={"navigateentetechoise" + column + "left"} style={{display:"none"}} className={"navigateentetechoise"}><span>{"<"}</span></div>
              <div id={"entetesection"+column} className='entetecomponent mx-auto overflow-hidden p-3 my-0 col'>
                {
                  listEntete?.[column].map((data, row) => {
                    return (
                      <>
                        <div data-tip={column==="rejet" ? "CTRL + clique pour supprimer":null} data-background-color={column==="rejet" ? "red":null} key={"enteteitem_" + row + column} className={column === "rejet" ? "entetechoiserejet" : "entetechoise"} onClick={(e) => { loadRapprochement(e,data.LG_RAPPROID,column, data) }}>
                          {data.LG_UTIUPDATED}
                          &nbsp; | &nbsp;
                          {data.DT_RAPPROCREATEDFULL.charAt(0).toUpperCase()+ data.DT_RAPPROCREATEDFULL.slice(1) } {/** 1st letter in uppercase */}                       
                        </div>
                      </>
                    )
                  })
                }
              </div>
              <div key={"right" + column} onClick={(e) => { move("right", column) }} id={"navigateentetechoise" + column + "right"} style={{ display: "none" }} className={"navigateentetechoise"}><span>{">"}</span></div>
          </div>
        :
        <div className='d-flex flex-column mt-3 mx-auto p-3 justify-content-center text-center'>
          <img src={BASEROOT+"assets/img/empty-animate.svg"} height="180" alt="loader" />
          {
            column === 'attente' ?
              <p> Pas d'opérations en attente de validation pour l'instant ... </p>
            :
              <p> Pas d'opérations rejetées pour l'instant ... </p>
          }
        </div>
  )
}

export default EnteteForEnAttente