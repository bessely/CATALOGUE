import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from "../../globalComponents/Container";
import NavBar from "../../globalComponents/NavBar";
import { PAGINATION } from "../../globalComponents/Pagination";
import { loadDataAgenceList } from '../../services/Agence';
import { setCurrentAgence, setformErreur, setModalAgence } from '../../store/Agences/Agence';
import ListAgence from './component/ListAgence';
import ModalAgence from './component/ModalAgence';

function Agence() {  
  const [saisie, setSaisie] = useState("");
  const dispatch            = useDispatch();
  
  /**La saisie dans le input de recherche 
   * @évènement onChange
  */
  const saisieEnCours = (e) => {
    setSaisie(e.target.value);
  };

  /**manipulation des touches pendant la recherche
  * @évènement onKeyUp
  */
  const handleKeyUp = (e) => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key ==="Enter") {
        if (saisie!=="") {
          dispatch(loadDataAgenceList({ search: "%"+saisie+"%", start: 0, listParPage: PAGINATION.listParPage }));
        }else{
          dispatch(loadDataAgenceList({ search: saisie, start: 0, listParPage: PAGINATION.listParPage }));
        }
    }
  };

  return (
    <div>
      <NavBar />
      <Container >
        <div className="layout-px-spacing">
          {/* CONTENT AREA */}
          <div className="col-12  layout-top-spacing" id="cancel-row">
            <div className="row card component-card_9 p-3" >

              {/* ZONE DE RECHERCHE */}
              <div className="form card d-flex flex-wrap flex-row justify-content-between mb-3 p-3" style={{ backgroundColor: "#e0e6ed" }} >
                <div className="col-8 m-0 field-wrapper input">
                  <input type="search" onChange={saisieEnCours} onKeyUp={handleKeyUp} value={saisie} className="form-control" id="search" aria-describedby="emailHelp1" placeholder="Rechercher une agence : saisissez un mot clé" />
                  <small id="emailHelp1" className="form-text text-muted">Taper sur la touche Enter pour demarrer la recherche.</small>
                </div>
                <button className="col-2 btn btn-outline-primary m-0 p-0  btn-lg" 
                        onClick={(e)=>
                          {
                            e.preventDefault()
                            dispatch(setCurrentAgence([]))
                            dispatch(setformErreur([]))
                            dispatch(setModalAgence({ open: true, mode:"creation", size: "xl", title: "Nouvelle Agence", button:true,  buttonName:"Enregistrer", inputstate: "", btnclass: "btn btn-primary" }))}
                          }
                > Nouvelle agence
                </button>
              </div>
              {/* ZONE DE RECHERCHE */}

              <div className="widget-content widget-content-area br-6">
                <ListAgence />
              </div>

            </div>
          </div>
          {/* CONTENT AREA */}
        </div>
      </Container>
      <ModalAgence/>
    </div>
  )
}

export default Agence;