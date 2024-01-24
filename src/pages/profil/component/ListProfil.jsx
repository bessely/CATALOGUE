import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';
import Pagination, { PAGINATION } from "../../../globalComponents/Pagination";
import { deleteProfil, getDataProfil, loadDataProfilList } from '../../../services/profil';
import { BASEROOT } from '../../../services/serveur';
import { loadDataProfilPrivilegeList } from '../../../store/Profil/Privilege';
import { setCurrentProfil, setModalProfil, setPagination, setformErreur } from '../../../store/Profil/Profil';

/**
 * LE COMPOSANT LISTE DES PROFILS
*/
function ListProfil() {
    const {profilList, pagination, status} = useSelector((state) => state.profils);
    const dispatch = useDispatch(); 

    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataProfilList({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage }));
    };
    /**SUPPRESSION D'UN ACTEUR
     * @param {object}  profil 
     * @function
     */
    const deleteProfilConfirme = (profil) => {
        Swal.fire({
            title              : profil.name,
            text               : "Confirmez la suppression ?",
            icon               : "warning",
            iconColor          : "red",
            focusConfirm       : false,
            buttonsStyling     : true,
            customClass        : {
                confirmButton      : "btn-success",
                cancelButton       : "btn-secondary",
            },
            confirmButtonColor : '#d33',
            showCancelButton   : true,
            showCloseButton    : true,
            confirmButtonText  : "Supprimer",
            cancelButtonText   : "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProfil(profil.id));
            }
        });
    };

    return (
        <div className="table-responsive">
            <table id="zero-config" className="table dt-table-hover table-striped table table-center mb-3" role="grid" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th className='text-center'>DESCRIPTION</th>
                        <th className='text-center'>LIBELE</th>
                        <th className='text-center'>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                {
                    status.profil==="loading" ?
                    <tr ><td colSpan="7" className="text-center text-20"> <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /> </td></tr>  
                    : //!status.profil==="success" ?
                    profilList.length > 0 ?
                        profilList.map((item, index) => {
                            return (
                                <tr className='text-center' key={"profilList" + index}>
                                    <td>{index+1}</td>
                                    <td>{item.STR_PRODESCRIPTION}</td>
                                    <td>{item.STR_PRONAME}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                        <ReactTooltip />
                                            <div onClick={(e) => {
                                                        dispatch(setModalProfil({ open: true, mode:"modification", size: "xl", title: item.STR_PRODESCRIPTION, button:true,  buttonName:"Modifier", inputstate: "", btnclass: "btn btn-primary" }));
                                                        dispatch(setformErreur([]))
                                                        dispatch(setCurrentProfil([ {LG_PROID:item.LG_PROID, STR_PRONAME:"", STR_PRODESCRIPTION:"", STR_PROTYPE: "", LG_SOCID:"", SOCIETE:[{}]} ]));
                                                        dispatch(getDataProfil(item.LG_PROID));
                                                        dispatch(loadDataProfilPrivilegeList({LG_PROID:item.LG_PROID}));
                                                    }}  
                                                    role="button"
                                            >
                                                <svg data-tip={"Modifier / Consulter "+item.STR_PRODESCRIPTION} xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-primary feather feather-edit">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </div>
                                            <div 
                                                role="button"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    deleteProfilConfirme({id: item.LG_PROID, name:item.STR_PRONAME});
                                                }}
                                                >
                                                <svg  data-tip={"Supprimer le profil "+item.STR_PRODESCRIPTION} data-background-color="red"  xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-danger ml-4 feather feather-x-circle">
                                                    <circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    : // !!profilList.length<=0 
                    <tr>
                        <td colSpan="7" className="text-center text-20">
                            <span className="text-center mx-auto">
                                <img src={BASEROOT + "assets/img/empty-animate.svg"} className="m-0 p-0" height="220" alt="loader" />
                                <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucun profil trouvé !!!</small>
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
        </div>
    )
}

export default ListProfil