    import React from 'react';
import { getCurrentPath } from '../services/globalFunction';
    /** LA BARRE DES TITRES DE PAGE
     * @param {string} title titre de la page 
     * @returns JSX
     */
    function NavBar({title}) {
        return (
            <div className="header-container fixed-top" >
                <header className="header navbar navbar-expand-sm">
                    <ul className="navbar-item flex-row">
                        <li className="nav-item align-self-center page-heading">
                            <div className="page-header">
                                <div className="page-title">
                                    <h2>{title ?? getCurrentPath()}</h2>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {/* little menu trigger */}
                    <a href="xxx"  className="sidebarCollapse" data-placement="bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1={3} y1={12} x2={21} y2={12} /><line x1={3} y1={6} x2={21} y2={6} /><line x1={3} y1={18} x2={21} y2={18} /></svg>
                    </a>
                    {/* little menu trigger */}

                    {/* <NotificationSection /> */}
                </header>
            </div>
        )
    }

    export default NavBar