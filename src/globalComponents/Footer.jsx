import React from 'react';
import { packageJSON } from '../services/globalFunction';

/** LE PIED DE PAGE  CONTIEN LE COPYRIGHT ET LE LIEN VER LA PAGE DU CONSTRUCTEUR DE L'APPLICATION
 * @returns JSX
 */
function Footer() {
    const getFullYear = () => {
        return new Date().getFullYear();
    };
    return (
        <div className="footer-wrapper">
            <div className="footer-section f-section-1" />
            <div className="footer-section f-section-2">
                <p className='text-primary'> Copyright © {getFullYear()} <a className='text-primary' target="_blank" href="https://synapsegroupe.net/" rel="noreferrer"> SYNAPSE GROUPE </a> - [ {packageJSON.name} ], Version {packageJSON.version} All rights reserved.</p>
            </div>
        </div> 
    )
}
export default Footer