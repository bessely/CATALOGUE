import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';
import Pagination, { PAGINATION } from '../../../globalComponents/Pagination';
import { loadDataAgenceList } from '../../../services/Agence';
import { deleteUtilisateur, getDataUtilisateur, loadDataUtilisateurList } from '../../../services/Utilisateur';
import { getBindProfilUser, loadDataProfilList } from '../../../services/profil';
import { BASEROOT } from '../../../services/serveur';
import { setModalAssoProfil } from '../../../store/Profil/Profil';
import { setCurrentUtilisateur, setModalUtilisateur, setPagination, setformErreur } from '../../../store/Utilisateurs/Utilisateur';
import ModalAssoProfil from '../../profil/component/ModalAssoProfil';

function ListUtilisateur() {
    const { UtilisateurList, pagination, status } = useSelector((state) => state.utilisateurs);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDataAgenceList({ start: 0, listParPage: 10000 }));
        dispatch(loadDataUtilisateurList({ start: 0, listParPage: PAGINATION.listParPage }));
        dispatch(loadDataProfilList({ search: "%", start: 0, length: 1000 }))
    }, [dispatch]);

    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataUtilisateurList({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage }));
    };

    /**SUPPRESSION D'UN ACTEUR
     * @param {object}  utilisateur 
     * @function
     */
    const deleteUtilisateurConfirme = (utilisateur) => {
        Swal.fire({
            title          : utilisateur.name,
            text           : "Confirmez la suppression ?",
            icon           : "warning",
            iconColor      : "red",
            focusConfirm   : false,
            buttonsStyling : true,
            customClass:
            {
                confirmButton : "btn-success",
                cancelButton  : "btn-secondary",
            },
            confirmButtonColor : '#d33',
            showCancelButton   : true,
            showCloseButton    : true,
            confirmButtonText  : "Supprimer",
            cancelButtonText   : "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUtilisateur(utilisateur.id));
            }
        });
    };

    return (
        <div className="table-responsive">
            <table id="zero-config" className="table dt-table-hover table-striped table table-center mb-3" role="grid" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th className='text-center'>AGENCE</th>
                        <th className='text-center'>NOM & PRENOMS</th>
                        <th className='text-center'>EMAIL</th>
                        <th className='text-center'>TÉLÉPHONE</th>
                        <th className='text-center'>UID</th>
                        <th className='text-center'>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        status.utilisateur === "loading" ?
                            <tr ><td colSpan="7" className="text-center text-20"> <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /> </td></tr>
                            : //!status.agence==="success" ?
                            UtilisateurList.length > 0 ?
                                UtilisateurList.map((item, index) => {
                                    return (
                                        <tr className='text-center' key={"utiList" + index}>
                                            <td>{index+1}</td>
                                            <td>{item.LG_AGEID}</td>
                                            <td>{item.STR_UTIFIRSTLASTNAME}</td>
                                            <td>{item.STR_UTIMAIL}</td>
                                            <td>{item.STR_UTIPHONE}</td>
                                            <td>{item.STR_UTILOGIN}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <ReactTooltip />
                                                    <div onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(setModalUtilisateur({ open: true, mode: "modification", size: "xl", title: item.STR_UTIFIRSTNAME, button: true, buttonName: "Modifier", inputstate: "", btnclass: "btn btn-primary" }));
                                                            dispatch(setformErreur([]))
                                                            dispatch(setCurrentUtilisateur([{ LG_UTIID: item.LG_UTIID, STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN:"",  AGENCE:[{}] }]));
                                                            dispatch(getDataUtilisateur(item.LG_UTIID));
                                                        }}  role="button"
                                                    >
                                                        <svg data-tip={"Modifier / Consulter "+item.STR_UTIFIRSTLASTNAME} xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-primary feather feather-edit">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                        </svg>
                                                    </div>

                                                    <div onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(setCurrentUtilisateur([{ LG_UTIID: item.LG_UTIID, STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN: "", AGENCE: [{}] }]));
                                                            dispatch(setModalAssoProfil({ open: true, mode: "creation", size: "xl", title: "les profils à rattacher à : " + item.STR_UTIFIRSTLASTNAME + " de l'agence " + item.LG_AGEID, button: true, buttonName: "Enregistrer", inputstate: "", btnclass: "btn btn-primary" }))
                                                            dispatch(getBindProfilUser(item.LG_UTIID));
                                                        }}
                                                        role="button"
                                                    >
                                                        <svg data-tip="Rattacher des profils utilisateurs" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary feather feather-user-check ml-4 ">
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy={7} r={4} /><polyline points="17 11 19 13 23 9" />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            deleteUtilisateurConfirme({ id: item.LG_UTIID, name: item.STR_UTIFIRSTNAME });
                                                        }}
                                                        role="button"
                                                    >
                                                        <svg data-tip={"Supprimer "+item.STR_UTIFIRSTLASTNAME} data-background-color="red" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-danger ml-4 feather feather-x-circle">
                                                            <circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                : // !!agenceList.length<=0 
                                <tr>
                                    <td colSpan="7" className="text-center text-20">
                                        <span className="text-center mx-auto">
                                            <img src={BASEROOT+"assets/img/empty-animate.svg"} className="m-0 p-0" height="220" alt="loader" />
                                            <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucun Utilisateur trouvée !!!</small>
                                        </span>
                                    </td>
                                </tr>
                    }
                </tbody>
            </table>
            {/* la pagination */}
            <Pagination
                onClick   = {handlePageChange}
                nbrPage   = {pagination.nbrPage}
                forcePage = {pagination.currentPage}
            />
            {/* la pagination */}
            <ModalAssoProfil />
        </div>
    )
}

export default ListUtilisateur