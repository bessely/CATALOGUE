import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Info } from "../../../globalComponents/CustomToast";
import { getCurrentPath } from '../../../globalComponents/Main';
import Pagination from '../../../globalComponents/Pagination';
import { formatBydevise, getSoldeCurrentCompte, getSoldeCurrentDateSoldeCompte, loadDataListOperation, searchDataListOperation, setPaginationMtx, setPaginationMvt } from '../../../store/Rapprochements/Rapprochement';
import CumulProvRapp from './CumulProvRapp';
import CumulSuspens from './CumulSuspens';
import DraggableOperation from './DraggableOperation';
import Title from './Title';

/**LE COMPOSANT DES OPERATIONS
 * CONTIENT LA LISTE DES OPERATIONS, LES INPUTS DE RECHERCHE DANS LES OPERATIONS LA SECTION DES MONTANTS CUMULÉS
 * @return JSX
*/
function OperationZone() {
  const [saisie, setSaisie]             = useState({mtx:"",mvt:""});
  const [cible, setCible]               = useState("");
  const dispatch                        = useDispatch();
  const { currentCompte, operationsCount, listCompte, paginationMvt, paginationMtx, listParPage } = useSelector(state => state.rapprochements);

  /**La saisie dans le input de recherche 
   * @évènement onChange
  */
  const saisieEnCours = (e) => {
    let {value, id } = e.target;
    setCible(id);
    setSaisie({...saisie,[id]: value});
  };

  /**manipulation des touches pendant la recherche
  * @évènement onKeyUp
  */
  const handleKeyUp = (e) => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "Enter" || e.key === "Tab") {
        setCible(e.target.id);
        if (currentCompte?.COMPTE) {
          if (saisie[cible].length === 0) {
            dispatch(loadDataListOperation({ state: "0" })); // tentative de Chargement des operations //{LG_SCCID:item.value}
          }else{
            if (saisie[cible] !== "" && (e.key === "Enter" || e.key === "Tab" || e.key === "Backspace")) {
              dispatch(searchDataListOperation({ LG_SCCID: currentCompte.COMPTE.value, compteType: cible, search: "%" + saisie[cible] + "%", start: 0 }));
            } else {
              dispatch(loadDataListOperation({ state: "0" })); // tentative de Chargement des operations //{LG_SCCID:item.value}
            }
          }
        }else{
            if (e.key === "Enter") {
              Info.fire({ title: "Sélectionnez d'abord un compte." });
            }else{}
        }
    }else{
      if (currentCompte?.COMPTE && e.type === "click" && e.screenX >= 428 && saisie[cible].length > 0) { // le client a cliquer sur la croix de suppression de contenu dans la zone de recherche
        dispatch(loadDataListOperation({ state: "0" })); // tentative de Chargement des operations //{LG_SCCID:item.value}
      }
      if (!currentCompte?.COMPTE) { Info.fire({ title: "Sélectionnez d'abord un compte." });}
    }
  };

  const soldeCompte = (columnOpe) => {
    if (currentCompte?.COMPTE) {
      let solde = getSoldeCurrentCompte(columnOpe, currentCompte, listCompte);
      return formatBydevise(solde, "");
    }
    return "0.0";
  };

  /**pagination
   * @évènement onClick
   */
  const handlePageChange = ({selected},cible) => {
    if (cible === "nostroActive") {
      dispatch(setPaginationMtx({ ...paginationMtx, currentPage: (selected), changePageClick: true }));
      dispatch(setPaginationMvt({ ...paginationMvt, changePageClick: true }));
      dispatch(loadDataListOperation({ state: "0", startMvt: parseInt(paginationMvt.currentPage) * parseInt(listParPage) , startMtx: parseInt(selected) * parseInt(listParPage) }));
    }
    if (cible === "miroirActive") {
      dispatch(setPaginationMvt({ ...paginationMvt, currentPage: (selected), changePageClick: true }));
      dispatch(setPaginationMtx({ ...paginationMtx, changePageClick: true }));
      dispatch(loadDataListOperation({ state: "0", startMvt: parseInt(selected) * parseInt(listParPage), startMtx: parseInt(paginationMtx.currentPage) * parseInt(listParPage) }));
    }
  };

  const dateSoldeCompte = (columnOpe) => {
    if (currentCompte?.COMPTE) {
      return  getSoldeCurrentDateSoldeCompte(columnOpe, currentCompte, listCompte);
    }
    return "";
  };

  if (getCurrentPath() === "Validation" || getCurrentPath() === "Derapprochement") {
    return (
      <div className="sticky bg-white">
        <div className="d-flex flex-row justify-content-between">
          <div>
            <h4 className="fs-3 col m-0 pl-1 py-0 text-muted">Nos Opérations</h4> <p className='col m-0 pl-1 py-0 text-muted'><small>Mirroir</small></p>
          </div>
          <div>
            <h4 className="fs-3 col m-0 pr-1 text-muted">Leurs Opérations</h4> <p className='col m-0 pl-3 py-0 text-muted'><small>Nostro</small></p>
          </div>
        </div>

        <div className="card d-flex flex-column p-2 mx-0 mt-1" style={{ maxHeight: "350px", overflow: "auto" }} >
          {/* rechercher */}
          <div className="d-flex flex-row">
            <div className="d-flex flex-row col m-0 p-0">
              <input key="searchmvt" style={{ maxHeight: '30px', borderRadius: "4px" }} id="mvt" onClick={handleKeyUp} onKeyUp={handleKeyUp} onChange={saisieEnCours} value={saisie.mvt} type="search" className="col card m-1 form-control form-control-sm" placeholder='Rechercher dans nos opérations' />
              <small id="DATESOLDEMIROIRE" className='col-2 align-self-center text-center'></small>
              <h4 id="SOLDEMIROIRE" className='col text-center mr-2 my-1 text-monospace bg-primary px-3 shadow-sm' style={{ maxHeight: '30px', borderRadius: "4px" }}>0</h4>
            </div>
            <div className="d-flex flex-row col m-0 p-0">
              <input key="searchmtx" style={{ maxHeight: '30px', borderRadius: "4px" }} id="mtx" onClick={handleKeyUp} onKeyUp={handleKeyUp} onChange={saisieEnCours} value={saisie.mtx} type="search" className="col card m-1 form-control form-control-sm" placeholder='Rechercher dans leurs opérations' />
              <small id="DATESOLDENOSTRO" className='col-2 align-self-center  text-center'></small>
              <h4 id="SOLDENOSTRO" className='col text-center  mr-2 my-1 text-monospace bg-primary px-3 shadow-sm' style={{ maxHeight: '30px', borderRadius: "4px" }}>0</h4>
            </div>
          </div>
          {/* rechercher */}

          {/* entete d'opération' */}
          <div className="d-flex flex-row">
            <Title key="entetemvt" typeOpe="mvt" />
            <Title key="entetemtx" typeOpe="mtx" />
          </div>
          {/* entete d'opération' */}
          {/* opérations */}
          <div className="d-flex flex-row">
            <div className="card col mb-0 m-1 p-2 d-flex flex-column" style={{ backgroundColor: "#E2E6EA", height: "250px", overflow: "auto" }} >
              <small key="nbrRowmvt">{operationsCount[0].miroirActive + " ligne(s) / " + operationsCount[0].totalMiroir}</small>
              <DraggableOperation key="row_ope_miroirActive_modal" typeOpe="miroirActive" />
            </div>
            <div className="card col mb-0 m-1 p-2 d-flex flex-column" style={{ backgroundColor: "#E2E6EA", height: "250px", overflow: "auto" }} >
              <small key="nbrRowmtx">{operationsCount[0].nostroActive + " ligne(s) / " + operationsCount[0].totalNostro}</small>
              <DraggableOperation key="row_ope_nostroActive_modal" typeOpe="nostroActive" />
            </div>
          </div> 
          {/* opérations */}
        </div>
        {/* la pagination */}
        <div className='d-flex justify-content-between mt-2 p-0'>
          <Pagination
            onClick   = {(e) => handlePageChange(e, "miroirActive")}
            nbrPage   = {paginationMvt.nbrPage}
            forcePage = {paginationMvt.currentPage}
          />
          <Pagination
            onClick   = {(e) => handlePageChange(e, "nostroActive")}
            nbrPage   = {paginationMtx.nbrPage}
            forcePage = {paginationMtx.currentPage}
          />
        </div>
        {/* la pagination */}
        {/* Zone d'operation cumullé */}
        <div className="d-flex flex-row justify-content-between bg-light rounded border border-primary">
          <CumulProvRapp key="cumulsuspmvt" typeOpe="miroirActive" />
          <CumulSuspens key="CumulSuspensmvt" typeOpe="miroirActive" />
          <CumulProvRapp key="CumulSuspensmtx" typeOpe="nostroActive" />
          <CumulSuspens key="cumulsuspmtx" typeOpe="nostroActive" />
        </div>
        {/* Zone d'operation cumullé */}
      </div>
    )
  }else{
    return (
      <div className="sticky bg-white">
        <div className="d-flex flex-row justify-content-between">
          <div>
            <h4 className="fs-3 col m-0 pl-1 py-0 text-muted">Nos Opérations</h4> <p className='col m-0 pl-1 py-0 text-muted'><small>Mirroir</small></p>
          </div>
          <div>
            <h4 className="fs-3 col m-0 pr-1 text-muted">Leurs Opérations</h4> <p className='col m-0 pl-3 py-0 text-muted'><small>Nostro</small></p> 
          </div>
        </div>

        <div className="card d-flex flex-column p-2 mx-0 mt-1" style={{ maxHeight: "480px", overflow: "auto" }} >
          {/* rechercher */}
          <div className="d-flex flex-row">
            <div className="d-flex flex-row col m-0 p-0">
              <input key="searchmvt" style={{ maxHeight: '30px', borderRadius: "4px" }} id="mvt" onClick={handleKeyUp} onKeyUp={handleKeyUp} onChange={saisieEnCours} value={saisie.mvt} type="search" className="col card m-1 form-control form-control-sm" placeholder='Rechercher dans nos opérations' />
              {
                currentCompte?.COMPTE ?
                  <>
                    <small className='col-2 align-self-center text-center'>{"Solde au " + dateSoldeCompte("DT_SCCSOLDMIROIR")}</small>
                    <h4 className='col text-center mr-2 my-1 text-monospace bg-primary px-3 shadow-sm' style={{ maxHeight: '30px', borderRadius: "4px" }}>{soldeCompte("STR_SCCSOLDEMIR")}</h4>
                  </>
                  :
                  null
              }
            </div>
            <div className="d-flex flex-row col m-0 p-0">
              <input key="searchmtx" style={{ maxHeight: '30px', borderRadius: "4px" }} id="mtx" onClick={handleKeyUp} onKeyUp={handleKeyUp} onChange={saisieEnCours} value={saisie.mtx} type="search" className="col card m-1 form-control form-control-sm" placeholder='Rechercher dans leurs opérations' />
              {
                currentCompte?.COMPTE ?
                  <>
                    <small className='col-2 align-self-center  text-center'>{"Solde au " + dateSoldeCompte("DT_SCCSOLDNOSTRO")}</small>
                    <h4 className='col text-center  mr-2 my-1 text-monospace bg-primary px-3 shadow-sm' style={{ maxHeight: '30px', borderRadius: "4px" }}>{soldeCompte("STR_SCCSOLDENOS")}</h4>
                  </>
                  :
                  null
              }
            </div>
          </div>
          {/* rechercher */}

          {/* entete d'opération' */}
          <div className="d-flex flex-row">
            <Title key="entetemvt" typeOpe="mvt" />
            <Title key="entetemtx" typeOpe="mtx" />
          </div>
          {/* entete d'opération' */}
          {/* opérations */}
          <div className="d-flex flex-row">
            <div className="card col mb-0 m-1 p-2 d-flex flex-column" style={{ backgroundColor: "#E2E6EA", height: "380px", overflow: "auto" }} >
              <small key="nbrRowmvt">{operationsCount[0].miroirActive + " ligne(s) / " + operationsCount[0].totalMiroir}</small>
              <DraggableOperation key="row_ope_miroirActive" typeOpe="miroirActive" />
            </div>
            <div className="card col mb-0 m-1 p-2 d-flex flex-column" style={{ backgroundColor: "#E2E6EA", height: "380px", overflow: "auto" }} >
              <small key="nbrRowmtx">{operationsCount[0].nostroActive + " ligne(s) / " + operationsCount[0].totalNostro}</small>
              <DraggableOperation key="row_ope_nostroActive" typeOpe="nostroActive" />
            </div>
          </div>
          {/* opérations */}
        </div>
        <div className='d-flex justify-content-between mt-2 p-0'>
          {/* la pagination */}
          <Pagination
            onClick   = {(e) => handlePageChange(e, "miroirActive")}
            nbrPage   = {paginationMvt.nbrPage}
            forcePage = {paginationMvt.currentPage}
          />
          <Pagination
            onClick   = {(e) => handlePageChange(e, "nostroActive")}
            nbrPage   = {paginationMtx.nbrPage}
            forcePage = {paginationMtx.currentPage}
          />
          {/* la pagination */}
        </div>
        {/* la pagination */}
        {/* Zone d'operation cumullé */}
        <div className="d-flex flex-row justify-content-between bg-light rounded border border-primary">
          <CumulProvRapp key="cumulsuspmvt" typeOpe="miroirActive" />
          <CumulSuspens key="CumulSuspensmvt" typeOpe="miroirActive" />
          <CumulProvRapp key="CumulSuspensmtx" typeOpe="nostroActive" />
          <CumulSuspens key="cumulsuspmtx" typeOpe="nostroActive" />
        </div>
        {/* Zone d'operation cumullé */}
      </div>
    )
  }
}

export default OperationZone