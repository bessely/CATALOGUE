import React from 'react';
import CompteList from './CompteList';
import CorrespondantList from './CorrespondantList';

/** LA SECTION DES LISTES TT EN HAUT DE LA PAGE RAPPROCHEMENT 
 * @returns JSX
 */
function ListeZone() {
  return (
      <div className="rounded border border-light d-flex justify-content-between my-3 py-4" style={{ backgroundColor:"rgb(224, 230, 237)" }} >
        <CorrespondantList />
        <CompteList />
      </div>
  )
}

export default ListeZone