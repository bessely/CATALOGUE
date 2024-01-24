import { useDispatch, useSelector } from 'react-redux';
import ErreurObject from '../../../globalComponents/ErreurObject';
import Modal from '../../../globalComponents/Modal';
import { Info } from "../../../services/CustomToast";
import { collectProfilChecked, createProfil, createSwitchProfilPrivilege, updateProfil } from '../../../services/profil';
import { setCurrentProfil, setModalProfil, setformErreur } from '../../../store/Profil/Profil';
import ListProfilPrivilege from './ListProfilPrivilege';

/**
 * LE COMPOSANT MODAL DE CREATION OU DE MODIFICATION D'UN PROFIL
 * CONTIENT LE FORMULAIRE DE CREATION OU DE MODIFICATION D'UN PROFIL ET LA LISTE DES PRIVILEGES (LES MENUS)
**/
function ModalProfil() {
    const { modalProfil, currentProfil, formErreur } = useSelector((state) => state.profils);
    const Dispacth = useDispatch();

    /** Pendant la saisi dans le formulaire d'un Profil
     * @évènement onChange
     **/
    const captureSaisie = (e) => {
        const { id, value } = e.target;
        Dispacth(setCurrentProfil({ ...currentProfil, [id]: value })); //<- sauvegardes des champs du formulaire
        Dispacth(setformErreur({ ...formErreur, [id]: "" }));
    }; 

    /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
     * @param {array} data les champs du formulaire à valider
     * @function
     **/
    const validation = () => {
        var erreur = {};
        if (currentProfil.STR_PROTYPE && currentProfil.STR_PROTYPE.length <= 1) {
            erreur.STR_PROTYPE = " Erreur sur le Type'! ";
        }
        if (!currentProfil.SOCIETE) {
            erreur.SOCIETE = " Sélectionnez une Société SVP ! ";
        }
        if (!currentProfil.STR_PRODESCRIPTION || currentProfil.STR_PRODESCRIPTION === "" || currentProfil.STR_PRODESCRIPTION.length <= 1) {
            erreur.STR_PRODESCRIPTION = " Erreur sur la Description ! ";
        }
        if (!currentProfil.STR_PRONAME || currentProfil.STR_PRONAME === "" || currentProfil.STR_PRONAME.length <= 1) {
            erreur.STR_PRONAME = " Erreur sur le Libélé ! ";
        }
        return erreur;
    };

    /** soumission du formulaire de creation de profil après correction sauf en cas de suppression
     *  @évènement onClick
     **/
    const handleSubmit = (e) => {
        e.preventDefault();
        let errorlog = {};
        errorlog     = validation();
        Dispacth(setformErreur(errorlog));
        if (Object.keys(errorlog).length === 0) {  //si plus ou pas d'erreur 
            if (modalProfil.mode === "creation") {
                Dispacth(createProfil(currentProfil)); //on gère en meme temps la création du privilège
                return;
            }
            if (modalProfil.mode === "modification") {
                collectProfilChecked();
                Dispacth(updateProfil(currentProfil));
                Dispacth(createSwitchProfilPrivilege(currentProfil.LG_PROID));
            }
        }else {
            Info.fire({ title: "Corrigez les erreurs SVP !" });
        }
    };

    return (
        <Modal
            modaleSate       = {modalProfil}
            setModalSate     = {setModalProfil}
            OnActionBtnClick = {handleSubmit}
        >
            <div className='border border-primary rounded p-3 register-modal shadow'  >
                <div className='form-row mb-2 mx-0 border border-ligth rounded p-3' style={{ backgroundColor: 'rgba(88, 115, 229, 0.1)' }}>
                    <div className="form-group mb-0 col-md-6">
                        <label htmlFor="STR_PRONAME">LIBELLE</label> <small className="text-danger">*</small>
                        <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_PRONAME" value={currentProfil.STR_PRONAME ?? ""} placeholder="Entrer le nom du profil" />
                        <ErreurObject>{formErreur.STR_PRONAME}</ErreurObject>
                    </div>
                    <div className="form-group mb-0 col-md-6">
                        <label htmlFor="STR_PRODESCRIPTION">DESCRIPTION</label> <small className="text-danger">*</small>
                        <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_PRODESCRIPTION" value={currentProfil.STR_PRODESCRIPTION ?? ""} placeholder="Entrer la description du profil" />
                        <ErreurObject>{formErreur.STR_PRODESCRIPTION}</ErreurObject>
                    </div>
                    <div className="form-group mb-0 col-md-12">
                        <label>Type</label>
                        <select className='form-control' onChange={captureSaisie} id="STR_PROTYPE" value={currentProfil.STR_PROTYPE}>
                            <option value="">Sélectionner un type de profil</option>
                            <option value="Système">Système</option>
                            <option value="Métier">Métier</option>
                        </select>
                        <ErreurObject>{formErreur.STR_SOCFORMATSWIFT}</ErreurObject>
                    </div>
                </div>
                <ListProfilPrivilege />
            </div>
        </Modal>
    )
}

export default ModalProfil