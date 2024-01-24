import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doConnexion } from '../../services/Utilisateur';
import { packageJSON, purgeStrorage } from '../../services/globalFunction';
import { BASEROOT } from '../../services/serveur';
import ModalProfile from './component/ModalProfile';

function Connexion() {
    // const style = {
    //         backgroundImage    : `url(assets/img/20943673.png)`,
    //         backgroundPosition : 'bottom right',
    //         backgroundSize     : '600px',
    //         backgroundRepeat   : 'no-repeat' //cahierBack_1.jpg
    //     };
    const dispatch = useDispatch();
    useEffect(() => {
        purgeStrorage();
    },[]);
    const showPassword = (e) => {
        e.preventDefault();
        let input = document.getElementById("password");
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    };

    const doConnexionx = (e) => {
        e.preventDefault();
        let username= document.getElementById("username");
        let password= document.getElementById("password");
        dispatch(doConnexion({STR_UTILOGIN:username.value,STR_UTIPASSWORD:password.value}));
    };
    
    return (
        <div className="form-container outer bg-dark">
            <div className="form-form">
                <div className="form-form-wrap">
                    <div className="form-container">
                        <div className="form-content shadow">
                            <img src="APP_LOGO.png" width="150" className="navbar-logo" alt="logo" />
                            <h1>{packageJSON?.name}</h1>
                            <p >{packageJSON?.description}</p>
                            <form onSubmit={(e)=>{doConnexionx(e)}} className="text-left">
                                <div className="form">
                                    <div id="username-field" className="field-wrapper input">
                                        <label htmlFor="username">IDENTIFIANT UTILISATEUR</label>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                                        <input id="username" name="username" type="text" className="form-control" placeholder="Identifiant utilisateur" />
                                    </div>
                                    <div id="password-field" className="field-wrapper input mb-2">
                                        <div className="d-flex justify-content-between">
                                            <label htmlFor="password">MOT DE PASSE</label>
                                            <a href={BASEROOT + "Forget"} className="forgot-pass-link">Mot de passe oublié ?</a>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x={3} y={11} width={18} height={11} rx={2} ry={2} /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                        <input id="password" name="password" type="password" className="form-control" placeholder="Mot de passe" />
                                        <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" id="toggle-password" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx={12} cy={12} r={3} /></svg>
                                    </div>
                                    <div className="d-sm-flex justify-content-between">
                                        <div className="field-wrapper">
                                            <button type="submit" className="btn btn-primary">Connexion</button>
                                        </div>
                                    </div>
                                    <div className="division mb-0 ">
                                        <small className='text-muted font-weight-bold'> ©  SYNAPSE GROUPE  </small><br />
                                        <small className='text-muted font-weight-bold'> {"Version "+packageJSON.version} </small>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ModalProfile/>
        </div>
    )
}

export default Connexion