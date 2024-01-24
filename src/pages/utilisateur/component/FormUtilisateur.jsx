import React from 'react';
import Select from 'react-select';
import ErreurObject from '../../../globalComponents/ErreurObject';
import { CustumSelectStyl } from '../../../services/CustumSelectStyl';

function FormUtilisateur({ handleSubmit,captureSaisie, formErreur, currentUtilisateur, setSelection, listAgenceOptions, className, btnTitle, formType }) {
  if (formType==="compte") {
    return (
      <div className={"border border-primary rounded p-3 register-modal shadow " + className}>
        <h6><span className='text-muted'>AGENCE :</span> {currentUtilisateur?.AGENCE?.label ?? ""}</h6>
        {/* {JSON.stringify(currentUtilisateur)} */}
        <form>
          <div className="form-row mb-2">
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTIFIRSTNAME">Nom </label> <small className="text-danger">*</small>
              <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTIFIRSTNAME" value={currentUtilisateur.STR_UTIFIRSTNAME ?? ""} placeholder="Nom de l'utilisateur" />
              <ErreurObject>{formErreur.STR_UTIFIRSTNAME}</ErreurObject>

            </div>
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTILASTNAME">Prénoms</label> <small className="text-danger">*</small>
              <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTILASTNAME" value={currentUtilisateur.STR_UTILASTNAME ?? ""} placeholder="Prénoms de l'utilisateur" />
              <ErreurObject>{formErreur.STR_UTILASTNAME}</ErreurObject>
            </div>

          </div>
          <div className="form-row mb-2">
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTILOGIN">UID</label> <small className="text-danger">*</small>
              <input disabled onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTILOGIN" value={currentUtilisateur.STR_UTILOGIN ?? ""} placeholder="UID de l'utilisateur" />
              <ErreurObject>{formErreur.STR_UTILOGIN}</ErreurObject>
            </div>
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_AGELONGITUDE">Matricule</label><small className="text-danger">*</small>
              <input disabled onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTIMATRICULE" value={currentUtilisateur.STR_UTIMATRICULE ?? ""} placeholder="Matricule d'utilisateur" />
              <ErreurObject>{formErreur.STR_UTIMATRICULE}</ErreurObject>
            </div>
          </div>
          <div className="form-row mb-2">
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_VILLE">Email</label> <small className="text-danger">*</small>
              <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTIMAIL" value={currentUtilisateur.STR_UTIMAIL ?? ""} placeholder="exemplemail@mail.com" />
              <ErreurObject>{formErreur.STR_UTIMAIL}</ErreurObject>
            </div>
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTIPHONE">Téléphone</label>
              <input onChange={captureSaisie} type="phone" className="form-control mb-1" id="STR_UTIPHONE" value={currentUtilisateur.STR_UTIPHONE ?? ""} placeholder="+000 00 00 00 00 00 (Indicatif + Numéro)" />
              <ErreurObject>{formErreur.STR_UTIPHONE}</ErreurObject>
            </div>

            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTIPIC">Logo</label>
              <input onChange={captureSaisie} type='text' className="form-control mb-1" id="STR_UTIPIC" value={currentUtilisateur.STR_UTIPIC ?? ""} placeholder="Entrer le Logo" />
              <ErreurObject>{formErreur.STR_UTIPIC}</ErreurObject>
            </div>
          </div>
          {
            btnTitle !== undefined && btnTitle.length > 0 ? <button onClick={(e) => { handleSubmit(e) }} className='btn btn-lg btn-outline-success float-right col-4'>{btnTitle}</button> : null
          }
        </form>

      </div>
    )
  }else{
    return (
      <div className={"border border-primary rounded p-3 register-modal shadow " + className}>
        <form>
          <div className="form-row mb-2">
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTIFIRSTNAME">Nom </label> <small className="text-danger">*</small>
              <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTIFIRSTNAME" value={currentUtilisateur.STR_UTIFIRSTNAME ?? ""} placeholder="Nom de l'utilisateur" />
              <ErreurObject>{formErreur.STR_UTIFIRSTNAME}</ErreurObject>

            </div>
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTILASTNAME">Prénoms</label> <small className="text-danger">*</small>
              <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTILASTNAME" value={currentUtilisateur.STR_UTILASTNAME ?? ""} placeholder="Prénoms de l'utilisateur" />
              <ErreurObject>{formErreur.STR_UTILASTNAME}</ErreurObject>
            </div>

          </div>
          <div className="form-row mb-2">
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTILOGIN">UID</label> <small className="text-danger">*</small>
              <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTILOGIN" value={currentUtilisateur.STR_UTILOGIN ?? ""} placeholder="UID de l'utilisateur" />
              <ErreurObject>{formErreur.STR_UTILOGIN}</ErreurObject>

            </div>
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_VILLE">Email</label> <small className="text-danger">*</small>
              <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTIMAIL" value={currentUtilisateur.STR_UTIMAIL ?? ""} placeholder="exemplemail@mail.com" />
              <ErreurObject>{formErreur.STR_UTIMAIL}</ErreurObject>
            </div>
          </div>
          <div className="form-row mb-2">
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="LG_AGEID">Agence</label><small className="text-danger">*</small>
              <Select className="mb-1" id="AGENCE"
                placeholder="Recherchez une agence"
                styles={CustumSelectStyl}
                value={currentUtilisateur.AGENCE ?? [{}]}
                onChange={setSelection}
                options={listAgenceOptions}
              />
              <ErreurObject>{formErreur.AGENCE}</ErreurObject>
            </div>
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_AGELONGITUDE">Matricule</label><small className="text-danger">*</small>
              <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_UTIMATRICULE" value={currentUtilisateur.STR_UTIMATRICULE ?? ""} placeholder="Matricule d'utilisateur" />
              <ErreurObject>{formErreur.STR_UTIMATRICULE}</ErreurObject>
            </div>
          </div>
          <div className="form-row mb-2">
            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTIPHONE">Téléphone</label>
              <input onChange={captureSaisie} type="phone" className="form-control mb-1" id="STR_UTIPHONE" value={currentUtilisateur.STR_UTIPHONE ?? ""} placeholder="+000 00 00 00 00 00 (Indicatif + Numéro)" />
              <ErreurObject>{formErreur.STR_UTIPHONE}</ErreurObject>
            </div>

            <div className="form-group mb-0 col-md-6">
              <label htmlFor="STR_UTIPIC">Logo</label>
              <input onChange={captureSaisie} type='text' className="form-control mb-1" id="STR_UTIPIC" value={currentUtilisateur.STR_UTIPIC ?? ""} placeholder="Entrer le Logo" />
              <ErreurObject>{formErreur.STR_UTIPIC}</ErreurObject>
            </div>
          </div>
        </form>

      </div>
    )
  }

}

export default FormUtilisateur