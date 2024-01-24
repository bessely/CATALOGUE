import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDataListOperation, setCurrentEntete } from '../../../store/Rapprochements/Rapprochement';
import ArrowOpeSort from './ArrowOpeSort';

function Title({typeOpe}) {
  const dispatch = useDispatch();
  const {entete} = useSelector(state => state.rapprochements);  
  const handleClickSens = (e) => {
    var currentSens         = e.currentTarget.getAttribute("data-currentsens");
    if (currentSens==="ASC" || currentSens==="DESC") { // pour eviter de traiter le click en dehors de la fleche
      entete[typeOpe].map((data,x) => {
        if(data.STR_LSTVALUE === "Sens"){
          if (currentSens==="ASC") {
            e.currentTarget.setAttribute("data-currentsens","DESC");
            dispatch(setCurrentEntete({"COLUMN":data.STR_LSTDESCRIPTION, "SENS":"DESC"}));
            dispatch(searchDataListOperation({ compteType:typeOpe, search: "%"}));
            return false;
          }else{
            e.currentTarget.setAttribute("data-currentsens","ASC");
            dispatch(setCurrentEntete({"COLUMN":data.STR_LSTDESCRIPTION, "SENS":"ASC"}));
            dispatch(searchDataListOperation({ compteType:typeOpe, search: "%"}));
            return false;
          }
        }
        return true;
      });
    }
  };
  return (
    <div className='col coteneurcomptTitle'>
      <small className='w-50 small-8'> N° </small>
      <small className='titleCompte w-180'> 
        Date Opé &nbsp; <ArrowOpeSort typeOpe={typeOpe}/>
      </small>
      <small className='titleCompte w-180'>
        Date Val &nbsp; <ArrowOpeSort typeOpe={typeOpe}/>
      </small>
      <small className='titleCompte w-350'>
        Libellé &nbsp; <ArrowOpeSort typeOpe={typeOpe}/>
      </small>
      <small className='titleCompte w-200'>
        Réf Opé &nbsp; <ArrowOpeSort typeOpe={typeOpe}/>
      </small>
      <small className='titleCompte w-200'>
        Réf Rel &nbsp; <ArrowOpeSort typeOpe={typeOpe}/>
      </small>
      {/* <small className='titleCompte w-250'>
        Réf Trans &nbsp; <ArrowOpeSort typeOpe={typeOpe}/>
      </small> */}
      <small className='titleCompte w-250'>
        Montant &nbsp; <ArrowOpeSort typeOpe={typeOpe}/>
      </small>
      <small role="button" data-currentsens="ASC" onClick={(e)=>{handleClickSens(e)}} className='titleCompte w-80'>
      Sens {/*  &nbsp; <ArrowOpeSort/> -> retiré pour cause de place  */}
      </small>
    </div>
  )
}

export default Title