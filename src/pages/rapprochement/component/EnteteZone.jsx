import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Info } from '../../../globalComponents/CustomToast';
import { deleteAllRejectRapprochement, listEnteteRapprochement, listOperationByEntete, setCurrentEntetePage } from '../../../store/Rapprochements/Rapprochement';
import EnteteForEnAttente from './EnteteForEnAttente';

/**
 * LA ZONE DES ENTETES DANS LA SECTION DES RESUMES
*/
function EnteteZone() {
  const dispacth = useDispatch();
  const { currentEntetePage } = useSelector(state => state.rapprochements);
  const move = (behavior, column) => {
    let elmt     = document.getElementById("entetesection"+column);
    let decalage = 0;
    if (behavior === "left") {
      dispacth(setCurrentEntetePage({ ...currentEntetePage, [column]: currentEntetePage[column] - 4 }));
      decalage        =+500;
      elmt.scrollLeft+=500;
    }
    if (behavior==="right") {
      dispacth(setCurrentEntetePage({ ...currentEntetePage, [column]: currentEntetePage[column] + 4 }));
      decalage        =-500;
      elmt.scrollLeft-=500;
    }
    elmt.animate([
      // étapes/keyframes
      { transform: `translateX(${decalage}px)` }
    ], {
      // temporisation
      duration   : 200,
      iterations : 1,
    });
    //chagement des entetes par le click
    dispacth(listEnteteRapprochement([]));
  };

  const loadRapprochement = (e,RAPPROID, column,data) => {

    if (column==="attente") {
      let elmt = document.getElementsByClassName("entetechoise");
      for (let i = 0; i < elmt.length; i++) {
        elmt[i].className = "entetechoise";
      }
      e.target.className = "entetechoise active";
    }
    if (column === "rejet") {
        let elmt = document.getElementsByClassName("entetechoiserejet");
        for (let i = 0; i < elmt.length; i++) {
          elmt[i].className = "entetechoiserejet";
        }
        e.target.className = "entetechoiserejet active";
    }
    //chagement des operations de l'entete designée par le click
    if (e.ctrlKey && column === "rejet") {
        Swal.fire({
          title: "Confirmez la suppression ? ",
          html           :"Des opérations de : <br/><p>"+data.LG_UTIUPDATED +"  <br/> du <br/>"+data.DT_RAPPROCREATEDFULL.charAt(0).toUpperCase()+ data.DT_RAPPROCREATEDFULL.slice(1)+"</p>",
          icon           : "warning",
          iconColor      : "red",
          focusConfirm   : false,
          buttonsStyling : true,
          customClass:
          {
            // confirmButton : "btn-danger",
            cancelButton  : "btn-secondary",
          },
          confirmButtonColor : '#d33',
          showCancelButton  : true,
          showCloseButton   : true,
          confirmButtonText : "Confirmer",
          cancelButtonText  : "Annuler",
        }).then((result) => {
          console.log(RAPPROID);
          if (result.isConfirmed) {
            dispacth(deleteAllRejectRapprochement(RAPPROID));
          }
        });        
    }else{
      if (RAPPROID) {
        dispacth(listOperationByEntete(RAPPROID));
      } else {
        Info.fire('title', 'Identifiant d\'entête non renseigné !');
      }
    }
  };

  return (
    <>
        <h3 className='mt-3 text-center text-muted px-auto fs-3'>OPÉRATIONS REJETÉES</h3>
        <div className='d-flex'>
          <EnteteForEnAttente
            key               = "entetetRapproRejet"
            loadRapprochement = {loadRapprochement}
            move              = {move}
            column            = "rejet"
          />
        </div>
        <h3 className='mt-3 text-center text-muted px-auto fs-3'>OPÉRATIONS EN ATTENTE DE VALIDATION</h3>
        <div>
          <EnteteForEnAttente
            key               = "entetetRapproAttente"
            loadRapprochement = {loadRapprochement}
            move              = {move}
            column            = "attente"
          />
        </div>
    </>
  )
}

export default EnteteZone;