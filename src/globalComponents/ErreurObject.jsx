import React from 'react';

/**
 * LE COMPOSANT QUI AFFICHE LES ERREURS SOUS LES CHAMPS DE SAISIE
 * @param {JSX} children
*/
function ErreurObject({children}) {
    if (children!=="" && children!==undefined) {
        return (
            <div className=" mt-1">
                <span className="badge badge-danger w-100">
                    <small className="small-10 font-weight-bold mt-0">{children}</small>
                </span>
            </div>
        )
    }
}

export default ErreurObject