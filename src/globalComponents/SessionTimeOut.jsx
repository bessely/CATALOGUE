import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUtilisateur, doDisConnexion, lockSession, doUnlock, setmodalLockFrame, getVerrouillageState } from '../store/Utilisateurs/Utilisateur';
import { getCurrentPath } from "./Main";
import Modal from './Modal';
import { BASEROOT } from "../services/serveur";

/**
 * MODAL DE VEROUILLAGE DE SESSION + GESTION DE TEMPS D'INACTIVITE
 * COMPOSANT AUTONONE
 */
function SessionTimeOut() {
  const timeout                   = 1000 * 300 ; // 5 minutes temps d'inactivité avant la déconnexion
  const promptTimeout             = 1000 * 120; // 2 minutes délais de deconnexion afficher dans la modal d'avertissement de temps d'inactivité atteint
  const progressTimesShow         = 60; // A quel moment enclencher la deconnexion imminente par rapport au promptTimeout icii qd il reste 60 secondes
  const { modalLockFrame }        = useSelector((state) => state.utilisateurs);
  const { loader }                = useSelector(state => state.rapprochements);
  const dispatch                  = useDispatch();
  var progresstime                = "";
  const [remaining, setRemaining] = useState(0);
  const onPrompt = () => {
    // onPrompt will be called after the timeout value is reached
    // All events are disabled while the prompt is active. 
    // If the user wishes to stay active, call the `reset()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    if (loader.open) {
      setRemaining(0);
      handleStillHere();
    }else{
      dispatch(lockSession());
      setRemaining(promptTimeout);
    }
    // progressBar(promptTimeout);
  };
  
  const onIdle = () => {
    // onIdle will be called after the promptTimeout is reached.
    // In this case 30 seconds. Here you can close your prompt and 
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.
    if (loader.open) {
      setRemaining(0);
      handleStillHere();
    } else {
      dispatch(setmodalLockFrame({ ...modalLockFrame, open: false }));
      setRemaining(0);
      dispatch(doDisConnexion(BASEROOT+"Connexion"));
    }
  };
  
  const onActive = () => {
    // onActive will only be called if `reset()` is called while `isPrompted()` 
    // is true. Here you will also want to close your modal and perform
    // any active actions. 
    // setOpen({ ...open, open: false });
    setRemaining(0);
  };

  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive
  });

  const handleStillHere = () => {
    clearInterval(progresstime);
    activate();
  };

  const doUnloock = (e) => {
    e.preventDefault();
    let password = document.getElementById("password");
    dispatch(doUnlock({ STR_UTIPASSWORD: password.value }));
  };

  // const progressBar = (promptTimeout) => {
  //   setTimeout(() => {
  //     const progress = document.querySelector('.progress-bar');
  //     let rem = (Math.ceil(getRemainingTime() / 1000));
  //     console.log(promptTimeout);
  //     if (rem > 0) {
  //       const width = ((100 * rem) / promptTimeout) * 1000;
  //       progress.style.width = `${width}%`;
  //       progresstime = setTimeout(() => {
  //         progressBar(promptTimeout);
  //       }, 1000);
  //     } else {
  //       return () => { clearInterval(progresstime); };
  //     }
  //   }, (getRemainingTime()) - ((progressTimesShow*1000)-100)); // 50ms de décalage pour éviter les erreurs de calcul du a la non apparution  de la progresse bar
  // };

  const showPassword = (e) => {
    e.preventDefault();
    let input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  useEffect(() => {
    if (!loader.open && getCurrentPath() !== "Connexion" && getCurrentPath() !== "Forget" && getCurrentPath() !== "PageNotFound") {
      dispatch(getVerrouillageState());
    }
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }
    }, 1000);
    return () => { clearInterval(interval); };
  }, [getRemainingTime, isPrompted, dispatch, loader.open]);

  return (
    <Modal
      modaleSate       = {modalLockFrame}
      setModalSate     = {setmodalLockFrame}
      OnActionBtnClick = {handleStillHere}
    >
        <div className="form-container outer">
          <div className="form-form">
            <div className="form-form-wrap">
              <div className="form-container d-flex flex-wrap justify-content-center">
                <div className="form-content">
                  <h1>CONVERGENCE</h1>
                  <p >Session verrouillée ! </p>
                <i className="far fa-lock-keyhole font-weight-lighter" style={{fontSize:"170px"}} />
                  <p >{getLoginUtilisateur()?.str_FIRST_LAST_NAME}</p>
                  {
                      (remaining > 0) && (remaining <= progressTimesShow) ?
                        <div className="border border-dashed border-danger card bg-light p-3 shadow">
                          <p className=" text-center font-italic font-weight-bold mb-3">Vous êtes sur le point d'être déconnecté après un certain temps d'inactivité détectée.</p>
                          <p className=" text-center">déconnexion automatique dans  <span className="text-danger font-weight-bold">{remaining} </span> secondes ...</p>
                          {/* <div className="progress br-30">
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{ width: '100%' }} />
                          </div> */}
                        </div>
                      :
                      <form onSubmit={(e) => { dispatch(doUnloock(e)) }} autoComplete="off" className="text-left">
                        <div className="form">
                          <div id="password-field" className="field-wrapper input mb-2">
                            <div className="d-flex justify-content-between">
                              <label htmlFor="password">MOT DE PASSE</label>
                              <a href="###" onClick={(e => { dispatch(doDisConnexion(BASEROOT+"Forget")) })} className="forgot-pass-link">Mot de pass oublié?</a>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x={3} y={11} width={18} height={11} rx={2} ry={2} /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            <input autoComplete="off" id="password" name="password" type="password" className="form-control" placeholder="Mot de passe" />
                            <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" id="toggle-password" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx={12} cy={12} r={3} /></svg>
                          </div>
                          <div className="d-sm-flex justify-content-between">
                            <div className="field-wrapper">
                              <button type="submit" className="btn btn-primary" value>Déverrouillé</button>
                            </div>
                          </div>
                        </div>
                        <div className="division mb-0 ">
                          <small className='text-muted font-weight-bold'> ©  SYNAPSE GROUPE  </small>
                        </div>
                      </form>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    </Modal>
  )
}

export default SessionTimeOut