import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination, { PAGINATION } from "../../../globalComponents/Pagination";
import { loadDataPisteAuditList } from '../../../services/PisteAudit';
import { BASEROOT } from '../../../services/serveur';
import { setPagination } from '../../../store/PisteAudit/PisteAudit';

function ListPisteAudite() {
    const { pisteAuditList, pagination, status, selectedUser } = useSelector((state) => state.pisteaudites);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDataPisteAuditList({ start: 0, listParPage: PAGINATION.listParPage }));
    }, [dispatch]);
    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataPisteAuditList({ LG_UTIID: selectedUser, DT_BEGIN: document.getElementById("DT_BEGIN").value, DT_END: document.getElementById("DT_END").value, STR_PISTYPE: document.getElementById("STR_PISTYPE").value, start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage, search: "%" + document.getElementById("search").value + "%" }));
    };

    return (
        <div className="table-responsive">
            <table id="zero-config" className="table dt-table-hover table-striped table table-center mb-3" role="grid" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th className='text-center'>UTILISATEUR</th>
                        <th className='text-center'>LIBELLÉ</th>
                        <th className='text-center'>DATE</th>
                        <th className='text-center'>TYPE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        status.pisteaudites === "loading" ?
                            <tr ><td colSpan="7" className="text-center text-20"> <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /> </td></tr>
                            : //!status.agence==="success" ?
                            pisteAuditList.length > 0 ?
                                pisteAuditList.map((item, index) => {
                                    return (

                                        <tr className='text-center' key={"pisteAuditList" + index}>
                                            {/* { console.log(pisteAuditList)} */}
                                            <td>{index + 1}</td>
                                            <td>{item.STR_UTIFIRSTLASTNAME}</td>
                                            <td>{item.STR_PISLIBELLE}</td>
                                            <td>{item.STR_PISDATE}</td>
                                            <td>{item.STR_PISTYPE}</td>

                                        </tr>
                                    )
                                })
                                : // !!agenceList.length<=0 
                                <tr>
                                    <td colSpan="7" className="text-center text-20">
                                        <span className="text-center mx-auto">
                                            <img src={BASEROOT + "assets/img/empty-animate.svg"} className="m-0 p-0" height="220" alt="loader" />
                                            <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucune Piste Audite trouvée !!!</small>
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

export default ListPisteAudite