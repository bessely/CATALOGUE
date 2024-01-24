import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../globalComponents/Card';
import Footer from '../../globalComponents/Footer';
import { listProject } from '../../services/Dashboard';
import { BASEROOT } from '../../services/serveur';
import ModalAcces from './component/ModalAcces';
import ModalModule from './component/ModalModule';

/**
 * LE DASHBOARD LA PAGE DE DEMARRAGE
 * @returns JSX
 */
function Dashboard() {
  const dispatch             = useDispatch();
  const {status,projectList} = useSelector(state => state.dashboard);
  useEffect(() => {
      dispatch(listProject());
  }, [dispatch]);
  return (
    <>
      {
          status.dashboard === "loading" ?
          <div className="text-center">
            <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /> <br />
            <span>Chargement du catalogue en cours...</span>
          </div>
          :
          <>
            <div className="d-flex flex-wrap mx-3 my-4">
              {
                    projectList.map((item,index)=>{
                      return(<Card key={"classicCard_"+index} data={item}/>)
                    })
              }
            </div>
            <ModalModule />
            <ModalAcces />
            <Footer />
          </>
      }
    </>
  )
}

export default Dashboard