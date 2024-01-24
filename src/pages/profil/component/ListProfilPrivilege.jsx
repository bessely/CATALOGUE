import React from 'react';
import { useSelector } from 'react-redux';
import { Danger } from '../../../services/CustomToast';
import { collectProfilChecked } from '../../../services/profil';
import { BASEROOT } from '../../../services/serveur';

/**
 * LE COMPOSANT LISTE DES PROFILS
*/
function ListProfilPrivilege() {
  const { profilPrivilegeList, status } = useSelector((state) => state.profilprivileges);

  /** A la selection d'un privilège on coche ou dechoche le checkbox puis on garde en memoire tt les id de privileges cochés
   *  @évènement onClick
   */
  const handleChange = (e) => {
    let $this           = e.target;
    let idDeducted      = $this.htmlFor;
    if ($this.getAttribute('data-id') !=="1") { // le menu groupe CONVERGENCE ne doit pas etre déchoché
      let checkbox        = document.getElementById(idDeducted);
      let newChekBoxState = !checkbox.checked;
      checkbox.checked    = newChekBoxState;
    }else{
      Danger.fire({ title: "Ce menu doit rester toujours coché." });
    }
    collectProfilChecked();
  };

  return (
    <div className="table-responsive">
      <table id="zero-config" className="table dt-table-hover table-striped table table-center mb-3" role="grid" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th className='text-center'>#</th>
            <th className='text-center'>DESCRIPTION</th>
            <th className='text-center'>LIBELLE</th>
            <th className='text-center'>CATEGORIE</th>
            <th className='text-center'>ETAT</th>
          </tr>
        </thead>
        <tbody>
          {
            status.profil === "loading" ?
              <tr ><td colSpan="7" className="text-center text-20"> <img src={BASEROOT + "assets/img/preloader.svg"} height="200" alt="loader" /> </td></tr>
              : //!status.profil==="success"  label="Check me out"?
              profilPrivilegeList.length > 0 ?
                profilPrivilegeList.map((item, index) => {
                  return (
                    <tr className='text-center' key={"profilList" + index}>
                      <td>{index + 1}</td>
                      <td>{item.STR_PRIDESCRIPTION}</td>
                      <td>{item.STR_PRIKIND}</td>
                      <td>{item.STR_PRINAME}</td>
                      <td>
                        <div className="form-group mb-0 mx-2">
                          <div className="form-check pl-0">
                            <div className="custom-control custom-checkbox checkbox-info">
                              <input checked={item.checked} onChange={(e) => { handleChange(e) }} data-id={item.LG_PRIID} type="checkbox" className="privileges_ custom-control-input" id={"ckd" + index} />
                              <label onClick={(e) => { handleChange(e) }} data-id={item.LG_PRIID} data-profil={JSON.stringify(item)} className="custom-control-label" htmlFor={"ckd" + index}></label>
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
                      <img src={BASEROOT + "assets/img/empty-animate.svg"} className="m-0 p-0" height="220" alt="loader" />
                      <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucun profil trouvé !!!</small>
                    </span>
                  </td>
                </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListProfilPrivilege