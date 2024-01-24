import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Danger } from '../services/CustomToast';
import { doDisConnexion, menuDispose } from '../services/Utilisateur';
import { getThisInLocalstore } from '../services/globalFunction';
import { BASEROOT } from '../services/serveur';
import { setCurrentProfile, setLoginUtilisateur, setMenu, setSubMenuState } from '../store/Utilisateurs/Utilisateur';
import Submenu from './Submenu';
import UserSectionBottom from './UserSectionBottom';

/** LE MENU ET LE SOUMENU APP IL CONTIENT AUSSI LA SECTION DE L'UTILISATEUR EN BAS DE MENU
 * @returns JSX
 */
function Menu() {
    const { menu, subMenuState, currentProfile } = useSelector((state) => state.utilisateurs);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoginUtilisateur(getThisInLocalstore("loginUtilisateur")));
        dispatch(setCurrentProfile(getThisInLocalstore("currentProfile")));
        if (currentProfile!=="") {
            dispatch(menuDispose(currentProfile));
        }else{
            if (getThisInLocalstore("currentProfile")!=="") {
                dispatch(menuDispose(getThisInLocalstore("currentProfile")));
            }else{
                Danger.fire("Vous n'avez pas de profil, Déconnexion en cours.");
                setTimeout(() => {
                    dispatch(doDisConnexion());
                }, 1000);
            }
        }
    }, [currentProfile,dispatch]);

    /** Au Click sur un menu 
     * @event : OnClick
     * @param  key  {integer}: Le numero d'ordre du menu sur lequel on a cliqué
     */
    const handleMenuClick = (e,key) => {
        e.preventDefault();
        let Newmenu   = [...menu];
        for (let index = 0; index < menu.length; index++) {
                if (index === key) {
                    if (Newmenu[index].link!=="") {
                        if (BASEROOT === "/") {
                            window.location.href = Newmenu[index].link;
                        }else{
                            window.location.href = BASEROOT + Newmenu[index].link;
                        }
                    }else{
                        //sans doute que c'est un menu qui comporte des sous-menu  ? dans ce cas on active les sous-menus pour ce menu
                        dispatch(setSubMenuState("active"));
                        Newmenu[index]  = {...Newmenu[index],state:"active"};
                    }
                }else { // click hors champs : on cache tts les menus
                    Newmenu[index]  = {...Newmenu[index],state:"hide"};
                }
        }
        dispatch(setMenu(Newmenu)); 
    };
    
    return (
        <div className="sidebar-wrapper sidebar-noneoverflow sidebar-theme" data-spy="scroll" data-target="#navSection" data-offset="100">
            <nav id="compactSidebar">
                <div className="theme-logo">
                    <a href={BASEROOT}>
                        <img src="CLIENT_LOGO.png" className="navbar-logo" alt="logo" />
                    </a>
                </div>
                <ul className="menu-categories">
                    {
                        menu.length > 0 ?
                            menu.map((item, key) => {
                                return (
                                    <li className={"" + item.state === "active" ? "menu active" : "menu"} key={"Menu" + key} >
                                        <a onClick={(e) => { handleMenuClick(e,key) }} id={item.state} href={item.link ? item.link : ""} data-active={item.state ? "true" : "false"} className="menu-toggle">
                                            <div className="base-menu">
                                                <div className="base-icons">
                                                    {
                                                        item.svg ?
                                                            <i className={item.svg +" fs-4 text-white font-weight-lighter"}  />
                                                        :
                                                            <i className={"far fa-question fs-4 text-white font-weight-lighter"} />
                                                    }
                                                </div>
                                            </div>
                                        </a>
                                        <div className="tooltip"><span>{item.title}</span></div>
                                    </li>
                                );
                            })
                            : //loarder dans le menu
                            <li className="active menu" >
                                <a id="defaultmenu" href="##" data-active="true" className="text-center mx-auto d-block">
                                    <div className="spinner-border loader-lg text-white"></div>
                                </a>
                            </li>
                    }
                </ul>
                {/* section bottom side bar */}
                <div className="sidebar-bottom-actions">
                    <div className="external-links">
                        <a rel="noreferrer" target="_blank" href={BASEROOT+"documentation/Guide utilisateur Convergence V1.2.pdf"}>
                            <i className={"far fa-book-open-cover fs-4 text-warning font-weight-lighter"} />
                            <div className="tooltip"><span>Guide d'utilisation</span></div>
                        </a>
                    </div>
                    <UserSectionBottom />
                </div>
                {/* section bottom side bar */}
            </nav>
            <Submenu state={subMenuState} />
        </div>
    )
}

export default Menu