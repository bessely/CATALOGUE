import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../../globalComponents/Card';
import Modal from '../../../globalComponents/Modal';
import { setModalModule } from '../../../store/Dashboard/Dashboard';


/**
 * LA MODAL D'AFFICHAGE DES MODULES
 * @returns JSX
 */
function ModalModule() {
    const {modalModule, currentModule} = useSelector(state => state.dashboard);
    return (
        <Modal
            modaleSate   = {modalModule}
            setModalSate = {setModalModule}
        >
            <div className="d-flex flex-wrap mx-3 my-4">
                {
                    currentModule && currentModule?.map((item, index)=>{
                        return(<Card  key={"modalCard_"+index} data={item} mode="modal"/>)
                    })
                }
            </div>
        </Modal>
    )
}

export default ModalModule