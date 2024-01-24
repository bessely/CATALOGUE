import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { searchDataListOperation, setCurrentEntete } from '../../../store/Rapprochements/Rapprochement';

function ArrowOpeSort({ typeOpe }) {
  const dispatch   = useDispatch();
  const { entete } = useSelector(state => state.rapprochements);
  const handleClickOrder = (e) => {
    var targetArrow = e.currentTarget;
    var { id }      = e.currentTarget;
    if (id === "ASC" || id === "DESC") { // pour eviter de traiter le click en dehors de la fleche
      entete[typeOpe].map((data, x) => {
        if (data.STR_LSTVALUE === e.currentTarget.parentElement.innerText.trim()) {
          dispatch(setCurrentEntete({ "COLUMN": data.STR_LSTDESCRIPTION, "SENS": id }));
          dispatch(searchDataListOperation({ compteType: typeOpe, search: "%" })).then((reponse) => {
            return reponse.payload?.data ? targetArrow.setAttribute("stroke", "#000000") : null; // c'est qd il ya eu un resultat que j'active la fleche concernée
          });
        }
        return false;
      });
    }
  };

  return (
    <>
      <svg id="ASC" title="Tri par ordre croissant" onClick={(e) => { handleClickOrder(e) }} role="button" xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#CECECE" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className={"feather " + typeOpe + " feather-arrow-down"}>
        <line title="Tri par ordre croissant" x1={12} y1={5} x2={12} y2={19} />
        <polyline title="Tri par ordre croissant" points="19 12 12 19 5 12" />
      </svg>
      <svg id="DESC" title="Tri par ordre décroissant" onClick={(e) => { handleClickOrder(e) }} role="button" xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#CECECE" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className={"feather " + typeOpe + " feather-arrow-up"}>
        <line title="Tri par ordre croissant" x1={12} y1={19} x2={12} y2={5} />
        <polyline title="Tri par ordre croissant" points="5 12 12 5 19 12" />
      </svg>
    </>
  )
}

export default ArrowOpeSort