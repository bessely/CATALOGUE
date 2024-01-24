import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';
import Pagination, { PAGINATION } from '../../../globalComponents/Pagination';
import { deleteListe, getDataListe, loadDataListe } from '../../../services/ValeurListe';
import { BASEROOT } from '../../../services/serveur';
import { setCurrentListe, setModalListe, setPagination, setformErreur } from '../../../store/Valeur/ValeurListe';

/**
 * 
 * @returns LA MODAL DES LISTES D'UNE TYPE LISTE
 */
function ListeListe() {
    const { ListListe, pagination, status } = useSelector((state) => state.listes);
    const { modalTypeListe, currentTypeListe } = useSelector((state) => state.typelistes);
    const dispatch = useDispatch();
    useEffect(() => {
        //alert(currentTypeListe.LG_TYLID)
        dispatch(loadDataListe({ start: 0, listParPage: PAGINATION.listParPage, id: currentTypeListe.LG_TYLID }));
    }, [dispatch, currentTypeListe.LG_TYLID]);

    /**pagination
     * @évènement onClick
     **/
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataListe({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage, id: currentTypeListe.LG_TYLID }));
    };

    /**SUPPRESSION D'UN ACTEUR
     * @param {object}  liste 
     * @function
     **/
    const deleteListeConfirme = (liste) => {
        Swal.fire({
            title              : liste.name,
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
                dispatch(deleteListe(liste.id));
            }
        });
    };

    return (
        <div className={modalTypeListe.mode === "modification" ? "table-responsive" : "table-responsive  d-none"} >
            <table id="zero-config" className="table dt-table-hover table-striped table table-center mb-3 " role="grid" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th className='text-center'>DESCRIPTION</th>
                        <th className='text-center'>VALEUR</th>
                        <th className='text-center'>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        status.liste === "loading" ?
                            <tr ><td colSpan="7" className="text-center text-20"> <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /> </td></tr>
                            : //!status.agence==="success" ?
                            // ListListe.length > 0 && modalTypeListe.mode === "modification" ?
                            ListListe.length > 0 ?
                                ListListe.map((item, index) => {
                                    return (
                                        <tr className='text-center' key={"utiList" + index}>
                                            <td>{index + 1}</td>
                                            <td>{item.STR_LSTDESCRIPTION}</td>
                                            <td>{item.STR_LSTVALUE}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <ReactTooltip />
                                                    <div onClick={(e) => {
                                                        e.preventDefault();
                                                        dispatch(setModalListe({ open: true, mode: "modification", size: "xl", title: item.STR_LSTDESCRIPTION, button: true, buttonName: "Modifier", inputstate: "", btnclass: "btn btn-primary" }));
                                                        dispatch(setformErreur([]))
                                                        dispatch(setCurrentListe({ LG_LSTID: item.LG_LSTID, STR_LSTOTHERVALUE2: "", STR_LSTOTHERVALUE1: "", STR_LSTOTHERVALUE: "", STR_LSTVALUE: "", STR_LSTDESCRIPTION: "", LG_TYLID: "", LG_SOCID: "", AGENCE: [{}] }));
                                                        dispatch(getDataListe(item.LG_LSTID));
                                                    }}  role="button">
                                                        <svg data-tip={"Modifier / Consulter " + item.STR_LSTDESCRIPTION} xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-primary feather feather-edit">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            deleteListeConfirme({ id: item.LG_LSTID, name: item.STR_LSTDESCRIPTION });
                                                        }}
                                                        role="button">
                                                        <svg data-tip={"Supprimer " + item.STR_LSTDESCRIPTION} data-background-color="red"  xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-danger ml-4 feather feather-x-circle">
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
                                            <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucune Liste trouvée !!!</small>
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

export default ListeListe