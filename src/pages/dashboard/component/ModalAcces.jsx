import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../globalComponents/Modal';
import { setCurrentAccess, setModalAccess } from '../../../store/Dashboard/Dashboard';

/**
 * LA MODAL D'AFFICHAGE DES  ACCES (IL VIDE LES ACCES UNE FOIS LA MODALE FERME)
 * @returns JSX
 */
function ModalAcces() {
    const {modalAccess, currentAccess} = useSelector(state => state.dashboard);
    useEffect(()=>{
        if (!modalAccess.open) { //SI MODAL FERMEE
            setCurrentAccess({})  //VIDAGE LES ACCES
        }
    },[modalAccess.open]) // S'EFFECTUE A CHAQUE FOI Qu'UNE MODAL ACCES EST OUVERTE OU FERMEE
    return (
        <Modal
            modaleSate   = {modalAccess}
            setModalSate = {setModalAccess}
        >
            <div className="d-flex flex-wrap">
                {
                    <>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary" type="button" id="button-addon1">Identifiant</button>
                            </div>
                            <input type="text" className="form-control" defaultValue={currentAccess?.STR_PROJUSERDEFAULT??""} />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary" type="button" id="button-addon1">Mot de p...</button>
                            </div>
                            <input type="text" className="form-control" defaultValue={currentAccess?.STR_PROJPASS??""} />
                        </div>
                    </>
                }
            </div>
        </Modal>
    )
}

export default ModalAcces