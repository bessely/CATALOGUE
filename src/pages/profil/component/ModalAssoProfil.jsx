import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Modal from '../../../globalComponents/Modal';
import { Danger } from '../../../services/CustomToast';
import { getCurrentPath, getThisInLocalstore } from '../../../services/globalFunction';
import { bindProfilToCompte, bindProfilToUser, collectProfilChecked } from '../../../services/profil';
import { BASEROOT } from '../../../services/serveur';
import { setModalAssoProfil, } from '../../../store/Profil/Profil';

function ModalAssoProfil() {
  const dispacth = useDispatch();
  const { status, profilList, modalAssoProfil } = useSelector(state => state.profils);
  const { currentUtilisateur } = useSelector(state => state.utilisateurs);

  /** A la selection d'un profil
   *  @évènement onChange
   */
  const handleChange = (e) => {
      let $this           = e.target;
      let idDeducted      = $this.htmlFor;
      let checkbox        = document.getElementById(idDeducted);
      let newChekBoxState = !checkbox.checked;
      checkbox.checked    = newChekBoxState;
      collectProfilChecked();
  };

  /** soumission du rapprochement automatique
   *  @évènement onClick
   */
  const handleSubmit = (e) => {
    let tabChecked = getThisInLocalstore("tabChecked") ? getThisInLocalstore("tabChecked") : [];
    if (tabChecked.length===0) {
      Danger.fire({ title: "Selectionnez au moins un profil." });
    }else{
      if (getCurrentPath() === "Utilisateur") {
        dispacth(bindProfilToUser(currentUtilisateur[0]?.LG_UTIID));
      }
      if (getCurrentPath() === "Societe") {
        dispacth(bindProfilToCompte());
      }
      dispacth(setModalAssoProfil({ ...modalAssoProfil,open:false}));
    }
  };

  return (
    <Modal
        modaleSate       = {modalAssoProfil}
        setModalSate     = {setModalAssoProfil}
        OnActionBtnClick = {handleSubmit}
    >
      <div className="widget-content widget-content-area br-6">
          <div className="table-responsive">
            <table id="zero-config" className="table dt-table-hover table-striped table table-center mb-3" role="grid" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th className='text-center'>DESCRIPTION</th>
                  <th className='text-center'>LIBELLE</th>
                  <th className='text-center'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  status.profil === "loading" ?
                    <tr ><td colSpan="7" className="text-center text-20"> <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /> </td></tr>
                    : //!status.profil==="success" ?
                    profilList.length > 0 ?
                      profilList.map((item, x) => {
                        return (
                          <tr className='text-center' key={"profilList" + x}>
                            <td>{item.STR_PRODESCRIPTION}</td>
                            <td>{item.STR_PRONAME}</td>
                            <td>
                              <div className="btn-group" role="group" aria-label="Basic example">
                                <ReactTooltip />
                                <div key={"globalinp_profil_" + x} className="form-group mb-0 mx-2">
                                  <div className="form-check pl-0">
                                    <div className="custom-control custom-checkbox checkbox-info">
                                      {/* onChange={(e) => { handleChange(e) }} */}
                                      <input type="checkbox" data-id={item.LG_PROID} data-profil={JSON.stringify(item)} className="profil custom-control-input" id={"ckd_pro" + x} />
                                      <label onClick={(e) => { handleChange(e) }} data-id={item.LG_PROID} data-profil={JSON.stringify(item)} className="profil_label custom-control-label" htmlFor={"ckd_pro" + x}></label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                      : // !!profilList.length<=0 
                      <tr>
                        <td colSpan="7" className="text-center text-20">
                          <span className="text-center mx-auto">
                            <img src={BASEROOT+"assets/img/empty-animate.svg"} className="m-0 p-0" height="220" alt="loader" />
                            <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucun profil trouvé !!!</small>
                          </span>
                        </td>
                      </tr>
                }
              </tbody>
            </table>
          </div>
      </div>
    </Modal>
  )
}

export default ModalAssoProfil