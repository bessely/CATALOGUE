import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../../globalComponents/Container';
import NavBar from '../../globalComponents/NavBar';
import { PAGINATION } from "../../globalComponents/Pagination";
import { loadDataTypeListeList } from '../../services/Valeur';
import { setCurrentTypeListe, setModalTypeListe } from '../../store/Valeur/Valeur';
import { setformErreur } from '../../store/Valeur/ValeurListe';
import ListTypeListe from './component/ListTypeListe';
import ModalTypeListe from './component/ModalType';

/** TYPELISTE [CONVERGENCE] SYNAPSE GROUPE
  **/
function TypeListe() {
  const [saisie, setSaisie] = useState("");
  const dispatch = useDispatch();
  
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
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "Enter") {
      if (saisie !== "") {
        dispatch(loadDataTypeListeList({ search: "%" + saisie + "%", start: 0, listParPage: PAGINATION.listParPage }));
      }
      else {
        dispatch(loadDataTypeListeList({ search: saisie, start: 0, listParPage: PAGINATION.listParPage }));
      }
    }
  };

  return (
    <div>
      <NavBar title="Liste des Valeurs" />
      <Container >
        <div className="layout-px-spacing">
          {/* CONTENT AREA */}
          <div className="row card component-card_9 p-3 mt-3 mx-0 mb-0" >
              {/* ZONE DE RECHERCHE */}
              <div className="card d-flex flex-wrap flex-row justify-content-between mb-3 p-3" style={{ backgroundColor: "#e0e6ed" }} >
                <div className="col-8 m-0">
                  <input type="search" onChange={saisieEnCours} onKeyUp={handleKeyUp} value={saisie} className="form-control" id="search" aria-describedby="emailHelp1" placeholder="Rechercher d'un TypeListe: saisissez un mot clé" />
                  <small id="emailHelp1" className="form-text text-muted">Taper sur la touche Enter pour demarrer la recherche.</small>
                </div>
                <button className="col-2 btn btn-outline-primary m-0 p-0  btn-lg"
                  onClick={(e) => {
                    dispatch(setModalTypeListe({ open: true, mode: "creation", size: "xl", title: "Nouvel TypeListe", button: true, buttonName: "Enregistrer", inputstate: "", btnclass: "btn btn-primary" }));
                    dispatch(setCurrentTypeListe([]));
                    dispatch(setformErreur([]))
                  }}
                >Nouvelle liste
                </button>
              </div>
              {/* ZONE DE RECHERCHE */}
              <div className="widget-content widget-content-area br-6">
                <ListTypeListe />
              </div>
          </div>
          {/* CONTENT AREA */}
        </div>
      </Container>
      <ModalTypeListe />
    </div>
  )
}

export default TypeListe;