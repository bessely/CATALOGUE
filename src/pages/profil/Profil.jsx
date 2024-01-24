import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from "../../globalComponents/Container";
import NavBar from "../../globalComponents/NavBar";
import { PAGINATION } from "../../globalComponents/Pagination";
import { loadDataProfilList } from '../../services/profil';
import { initProfilState, loadDataProfilPrivilegeList } from '../../store/Profil/Privilege';
import { setCurrentProfil, setModalProfil, setformErreur } from '../../store/Profil/Profil';
import ListProfil from './component/ListProfil';
import ModalProfil from './component/ModalProfil';

/**
 * LE COMPOSANT PRINCIPAL DE LA PAGES  PROFILS
*/
function Profil() {
  const [saisie, setSaisie]     = useState("");
  const dispatch                = useDispatch();

  useEffect(() => {
    dispatch(loadDataProfilList({ start: 0, listParPage: PAGINATION.listParPage }));
    dispatch(loadDataProfilPrivilegeList({ start: 0, listParPage: PAGINATION.listParPage }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  
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
        if (saisie!=="") 
        {
          dispatch(loadDataProfilList({ search: "%"+saisie+"%", start: 0, listParPage: PAGINATION.listParPage }));
        }else{
          dispatch(loadDataProfilList({ search: saisie, start: 0, listParPage: PAGINATION.listParPage }));
        }
    }
  };

  return (
    <div>
      <NavBar title="Profils" />
      <Container >
        <div className="layout-px-spacing">
          {/* CONTENT AREA */}
          <div className="col mx-0 mt-3 p-0" id="cancel-row">
            <div className="row card component-card_9 p-3" >
              {/* ZONE DE RECHERCHE */}
              <div className="form card d-flex flex-wrap flex-row justify-content-between mb-3 p-3" style={{ backgroundColor: "#e0e6ed" }} >
                <div className="col-8 m-0 field-wrapper input">
                  <input type="search" onChange={saisieEnCours} onKeyUp={handleKeyUp} value={saisie} className="form-control" id="search" aria-describedby="emailHelp1" placeholder="Rechercher un Profil : saisissez un mot clé" />
                  {/* eslint-disable-next-line react-hooks/exhaustive-deps */}
                  <small id="emailHelp1" className="form-text text-muted">Taper sur la touche Enter pour demarrer la recherche.</small>
                </div>
                <button className="col-2 btn btn-outline-primary m-0 p-0  btn-lg" 
                        onClick={(e)=>{
                            e.preventDefault()
                            dispatch(initProfilState())
                            dispatch(setCurrentProfil({LG_PROID: "", STR_PRONAME:"", STR_PRODESCRIPTION:"", STR_PROTYPE: "", SOCIETE: [{}] }))
                            dispatch(setformErreur([]))
                            dispatch(setModalProfil({ open: true, mode:"creation", size: "xl", title: "Nouveau Profil", button:true,  buttonName:"Enregistrer", inputstate: "", btnclass: "btn btn-primary" }))
                          }
                        }
                >       Nouveau Profil
                </button>
              </div>
              {/* ZONE DE RECHERCHE */}
              <div className="widget-content widget-content-area br-6">
                <ListProfil />
              </div>
            </div>
          </div>
          {/* CONTENT AREA */}
        </div>
      </Container>
      <ModalProfil/>
    </div>
  )
}

export default Profil;