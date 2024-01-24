import React from 'react';
import ReactPaginate from "react-paginate";
import { getCurrentPath } from '../services/globalFunction';
export const PAGINATION = {listParPage:10, currentPage:0, changePageClick:false, listLenght:0, nbrPage:0};
export function Pagination({onClick,nbrPage, forcePage}) {
  if (getCurrentPath() === "Rapprochement" || getCurrentPath() === "Validation" || getCurrentPath() === "Derapprochement" || getCurrentPath() === "Societe" || getCurrentPath() === "Valeur") {
        return(
          <div className="m-0 paginating-container pagination-default d-flex justify-content-end">
            <ReactPaginate
              previousLabel         = {"<"}
              nextLabel             = {">"}
              breakLabel            = "..."
              breakClassName        = {""}
              breakLinkClassName    = {""}
              pageCount             = {nbrPage}
              onPageChange          = {onClick}
              pageRangeDisplayed    = {1}
              containerClassName    = {"pagination m-1"}
              pageClassName         = {""}
              previousClassName     = {"prev"}
              nextClassName         = {"next"}
              pageLinkClassName     = {""}
              previousLinkClassName = {""}
              nextLinkClassName     = {""}
              disabledClassName     = {"disable"}
              activeClassName       = {"active"}
              renderOnZeroPageCount = {false}
              forcePage             = {forcePage}
            />
          </div>
        )
      }else{
        return(
            <div className="m-0 paginating-container pagination-solid d-flex justify-content-end text-white">
                  <ReactPaginate
                      previousLabel         = {"< Précédent"}
                      nextLabel             = {"Suivant >"}
                      breakLabel            = "..."
                      breakClassName        = {""}
                      breakLinkClassName    = {""}
                      pageCount             = {nbrPage}
                      onPageChange          = {onClick}
                      pageRangeDisplayed    = {1}
                      containerClassName    = {"pagination m-1"}
                      pageClassName         = {""}
                      previousClassName     = {"prev"}
                      nextClassName         = {"next"}
                      pageLinkClassName     = {""}
                      previousLinkClassName = {""}
                      nextLinkClassName     = {""}
                      disabledClassName     = {"disable"}
                      activeClassName       = {"active"}
                      renderOnZeroPageCount = {false}
                      forcePage             = {forcePage}
                  />
            </div>
        );
      }
}
  
export default Pagination
