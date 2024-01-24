import React from 'react';

/**
 * LOADER
 * @param {state} loader state disponible dans le store rapprochements
 * @param {text} loader.text  texte à afficher
 * @param {boolean} loader.open affichage ou non du loader
 * 
 */
function CustomLoader({mode}) {
  let loader     = { open: false, text: "En attente du serveur...", spinner:"img"}
  if (mode==="Suspense") { // lorder de chargement de page | depends du comportement du composant <Suspense> de React dans App.js
    return(
        <div id="load_screen">
          <div className="loader">
            <div className="loader-content rotate-vert-center">
              <img src="CLIENT_LOGO.png" width="120" className="navbar-logo" alt="logo" />
            </div>
          </div>
        </div>
    )
  }
  return ( // lordeur de chargement de requete XHR à activer manuellement
    loader.open ?
      <div id="print_screen">
        <div className="loader">
          <div className="loader-content text-center">
            {
              loader.spinner === "img" ?
              <div className='tracking-in-expand'>
                <img src="CLIENT_LOGO.png" width="140" className="navbar-logo" alt="logo" />
              </div> 
              :
              <div className="spinner-border loader-lg text-primary align-self-center"></div> 
            }
            <br />
            <span className="text-center text-primary align-self-center font-weight-bolder">{loader.text}</span>
          </div>
        </div>
      </div>
    :
      null
  )
}

export default CustomLoader