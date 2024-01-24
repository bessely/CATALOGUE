import React from 'react';
import Container from "../../globalComponents/Container";
import ModalConfirmation from '../../globalComponents/ModalConfirmation';
import NavBar from "../../globalComponents/NavBar";
import EnteteZone from './component/EnteteZone';
import ListeZone from './component/ListeZone';
import ModalCriteres from './component/ModalCriteres';
import ModalMoveRappro from './component/ModalMoveRappro';
import OperationZone from './component/OperationZone';
import RapprochementZone from './component/RapprochementZone';
import ResumeZone from './component/ResumeZone';

/**
 * LE COMPOSANT PRINCIPAL DE LA PAGE RAPPROCHEMENT
 * @returns JSX
 */
function Rapprochement() {
    return (
        <>
            <NavBar/>
            <Container >
                <div className="layout-px-spacing">
                    <ListeZone/>
                    <hr className="bg-primary m-2"/>
                    <OperationZone/>
                    <br/>
                    <RapprochementZone/>
                    <br/>
                    <EnteteZone/>
                    <br/>
                    <ResumeZone/>
                </div>
            </Container>
            <ModalCriteres />
            <ModalConfirmation />
            <ModalMoveRappro />
        </>
    )
}
export default Rapprochement;