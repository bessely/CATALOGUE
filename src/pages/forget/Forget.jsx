import React from 'react';
import { useDispatch } from 'react-redux';
import { revoverPassWord } from '../../services/Utilisateur';
import { BASEROOT } from '../../services/serveur';


function Forget() {
    const dispatch = useDispatch();
    const doForget = (e) => {
        e.preventDefault();
        let username = document.getElementById("username");
        dispatch(revoverPassWord(username.value));
    };
    return (
        <div className="form-container outer bg-dark">
            <div className="form-form">
                <div className="form-form-wrap">
                    <div className="form-container">
                        <div className="form-content shadow">
                            <h1 className='fs-3'>Mot de passe oublié !</h1>
                            <img src="APP_LOGO.png" width="150" className="navbar-logo" alt="logo" />
                            <p>Un nouveau mot de passe vous sera transmis sur votre mail.</p>
                            <form className="text-left" onSubmit={(e)=>{doForget(e)}}>
                                <div className="form">
                                    <div id="username-field" className="field-wrapper input">
                                        <label htmlFor="username">IDENTIFIANT UTILISATEUR</label>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} />
                                        </svg>
                                        <input id="username" name="username" type="text" className="form-control" placeholder="Saisissez votre identifiant d'utilisateur" />
                                    </div>
                                    <div className="d-sm-flex justify-content-between">
                                        <div className="field-wrapper">
                                            <button type="submit" className="btn btn-primary">Réinitialiser</button>
                                        </div>
                                    </div>
                                    <div className="division mb-0 ">
                                        <a href={BASEROOT + "Connexion"} className="text-muted forgot-pass-link">Se connecter ?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forget