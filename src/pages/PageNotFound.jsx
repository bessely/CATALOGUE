import React from 'react';
import { packageJSON } from '../services/globalFunction';
import { BASEROOT } from '../services/serveur';

function PageNotFound() {
    return (
        <div className="not-found-wrap text-center m-0 p-0">
            <img src="APP_LOGO.png" width="150" className="navbar-logo" alt="logo" /> <br />
            <h1 className='text-muted'>{`${packageJSON.name.toLocaleUpperCase()} version ${packageJSON.version}`}</h1>
            <img width="550" className="m-0 p-0" src={BASEROOT + "assets/img/404-error-lost-in-space-animate.svg"} alt={404} />
            <p className="mb-5 text-muted text-18">Désolé ! Vous avez tenté d'accéder à une page qui n'exite pas encore sur notre serveur.</p>
            <a className="btn btn-lg btn-primary btn-rounded" href={BASEROOT}>Retouner vers le catalogue</a>
        </div>
    )
}

export default PageNotFound