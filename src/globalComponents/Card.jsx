import React from 'react';
import { useDispatch } from 'react-redux';
import { Danger } from '../services/CustomToast';
import { LOGO_URL } from '../services/serveur';
import { setCurrentAccess, setCurrentModule, setModalAccess, setModalModule } from '../store/Dashboard/Dashboard';



/**
 * CARTE OU S'AFFICHE LES INFORMATIONS DE CHAQUE APPLICATIONS OU MODULE
 * @param {Object} data les données de l'application ou du module
 * @param {string} [mode="classic" || "modal"]  classic par defaut si mode n'est pas passser en props
 * @returns JSX
 */
function Card({data,mode="classic"}) {
    // const style = {
    //         backgroundImage    : `url(APP_LOGO.png)`,
    //         backgroundPosition : 'top right',
    //         backgroundSize     : '180px',
    //         backgroundRepeat   : 'no-repeat' //cahierBack_1.jpg
    //     };
    const dispacth = useDispatch();
    const openApp = (link)=>{
        if (link!=="" && link!==undefined) {
            window.open(link, '_blank'); //pour ouvrire dans un nouvel onglet
            return;
        }
        Danger.fire({title:"Lien de l'application non renseigné."});
    }

    if (mode==="modal") {
        return(
            <div key={data?.LG_PROJID} className="col-6 layout-spacing">
                <div className="widget widget-three">
                    <div className="widget-heading">
                        <h5>{data?.STR_PROJNOM??""}</h5>
                    </div>
                    <div className="widget-content">
                        <div className="order-summary">
                            {data?.STR_PROJDESC&&<p>{data?.STR_PROJDESC}</p>}
                            {
                                <>
                                    <button className='btn btn-block btn-outline-success' onClick={(e)=>{openApp(data?.STR_PROJLIEN)}}>Démarrer l'application</button>
                                    <button className='btn btn-block btn-outline-info'
                                        onClick={(e)=>{
                                            dispacth(setModalAccess({ open: true, mode:"creation", size: "commentaire", title:" Les accès pour "+data?.STR_PROJNOM+" | "+data?.STR_PROJDESC , button:false,  buttonName:"", inputstate: "", btnclass: "" })) //OUVERTURE DE LA MODAL DES ACCESS
                                            dispacth(setCurrentAccess(data)) // PUIS MISE EN MEMOIRE DES ACCESS DANS LE STATE CURRENTMODULE
                                        }}
                                    >
                                            Voir les accès
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div key={data?.GLPID}  className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 layout-spacing" >
            <div className="widget widget-three">
                <div className="widget-heading text-center">
                    <h5>{data?.GLPNOMPROJECT??""}</h5>
                    <img src={LOGO_URL+data?.GLPLOGO.toUpperCase()} width="80" className="navbar-logo" alt="logo" />
                </div>
                <div className="widget-content">
                    <div className="order-summary">
                        {data?.GLPDESCRIPTION&&<p>{data?.GLPDESCRIPTION}</p>}
                        {
                            data.data.length > 1 ? // !!SI CETTE APPLICATION A PLUSIEUR SOUS MODULES ALORS ON AFFICHE LE BOUTON DES MODULES (QUI OUVRE LA MODAL DES MODULES AU CLICK)
                            <div className="summary-list d-flex flex-column">
                                    <button className='btn btn-block btn-outline-success' 
                                        onClick={(e)=>{
                                            dispacth(setModalModule({ open: true, mode:"creation", size: "xl", title:data?.GLPNOMPROJECT+" | "+data?.GLPDESCRIPTION , button:false,  buttonName:"", inputstate: "", btnclass: "" })) // OUVERTURE DE LA MODAL DES MODULES
                                            dispacth(setCurrentModule(data.data)) // PUIS MISE EN MEMOIRE DES MODULES DANS LE STATE CURRENTMODULE
                                        }}
                                    >
                                        Voir les modules
                                    </button>
                            </div>
                            :
                            <>
                                    <button className='btn btn-block btn-outline-success' onClick={(e)=>{openApp(data.data[0]?.STR_PROJLIEN)}}>Démarrer l'application</button>
                                    <button className='btn btn-block btn-outline-info'
                                        onClick={(e)=>{
                                            dispacth(setModalAccess({ open: true, mode:"moveRappro", size: "commentaire", title:" Les accès pour "+data?.GLPNOMPROJECT+" | "+data?.GLPDESCRIPTION , button:false,  buttonName:"", inputstate: "", btnclass: "" })) // OUVERTURE DE LA MODAL DES ACCESS
                                            dispacth(setCurrentAccess(data.data[0])) // PUIS MISE EN MEMOIRE DES ACCESS DANS LE STATE CURRENTMODULE
                                        }}
                                    >
                                            Voir les accès
                                    </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card