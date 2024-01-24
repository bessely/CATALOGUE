import React from 'react';
import ErreurObject from '../../../globalComponents/ErreurObject';

function FormPassUser({ handleSubmitPwd, captureSaisie, formErreur, currentUtilisateur, className }) {
  return (
    <div className={"border border-danger rounded p-3 register-modal shadow " + className}>
      <form>
        <div className="form-row mb-2">
          <div className="form-group mb-0 col">
            <label htmlFor="OLD_PASSWORD">Le mot de passe actuel </label> <small className="text-danger">*</small>
            <input onChange={captureSaisie} autoComplete="current-password" type="password" className="form-control mb-1" id="OLD_PASSWORD" value={currentUtilisateur.OLD_PASSWORD ?? ""} placeholder="Le mot de passe actuel" />
            <ErreurObject>{formErreur.OLD_PASSWORD}</ErreurObject>
          </div>

          <div className="form-group mb-0 col">
            <label htmlFor="NEW_PASSWORD">Le nouveau mot de passe </label> <small className="text-danger">*</small>
            <input onChange={captureSaisie}  autoComplete="new-password" type="password" className="form-control mb-1" id="NEW_PASSWORD" value={currentUtilisateur.NEW_PASSWORD ?? ""} placeholder="Le nouveau mot de passe" />
            <ErreurObject>{formErreur.NEW_PASSWORD}</ErreurObject>
          </div>

          <div className="form-group mb-0 col">
            <label htmlFor="NEW_PASSWORD2">Confirmé le nouveau </label> <small className="text-danger">*</small>
            <input onChange={captureSaisie} autoComplete="new-password" type="password" className="form-control mb-1" id="NEW_PASSWORD2" value={currentUtilisateur.NEW_PASSWORD2 ?? ""} placeholder="Confirmé le nouveau" />
            <ErreurObject>{formErreur.NEW_PASSWORD2}</ErreurObject>
          </div>
        </div>
        <button onClick={(e) => { handleSubmitPwd(e) }} className='btn btn-lg btn-outline-danger float-right'>Remplacer mon mot de passe</button>
      </form>
    </div>
  )
}

export default FormPassUser