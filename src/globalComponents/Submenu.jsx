import React from 'react';
import { useSelector } from 'react-redux';
import { BASEROOT } from '../services/serveur';

/** LE SOUS MENU QUI S'AFFICHE DANS LE MENU
 * @param {String} state L'etat du sous menu
 * @returns JSX
 */
function Submenu({ state }) {
const { menu } = useSelector((state) => state.utilisateurs);
    return (
        <div id="compact_submenuSidebar" className={"" + state === "active" ? "submenu-sidebar ps show" : "submenu-sidebar ps"} >
            {
                menu.map((item, index) => {
                    return (
                        <div key={"SubmenuTop" + index} className={"" + item.state === "active" ? "submenu show" : "submenu"} >
                            <div className="menu-title">
                                <h3>{item.title}</h3>
                            </div>
                            <ul className="submenu-list" >
                            {
                                item.submenuList.length > 0 ?
                                    item.submenuList.map((item, key) => {
                                        return (
                                            <li key={"Submenu" + key} >
                                                {
                                                    BASEROOT === "/" ?
                                                        <a href={item.link}> {item.name} </a>
                                                        :
                                                        <a href={"/convergence" + item.link}> {item.name} </a>
                                                }
                                            </li>
                                        );
                                    })
                                    :
                                    ""
                            }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Submenu