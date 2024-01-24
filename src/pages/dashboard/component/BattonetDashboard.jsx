import React from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { formatBydevise } from '../../../store/Rapprochements/Rapprochement';
import { BASEROOT } from '../../../services/serveur';

/**
 * CHART BATTONET
 * @param {String} map Le nom de la map
 * @param {String} text Le texte du titre
 */
function BattonetDashboard({ map, text }) {
  const { mntSuspOpeCorr, mntComptRappNos, mntRappOpeCorr, mntComptSuspNos, NmbrOpeRappCorr, status } = useSelector((state) => state.dashboard);
  let battonet = {};
  if (map === "Data mntComptRappNos") {
    battonet = {
      series: [
        {
          name: 'En Crédit',
          data: mntComptRappNos?.MntRappOKCreditNos
        },
        {
          name: 'En Débit',
          data: mntComptRappNos?.MntRappOKDebitNos
        },
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent']
      },
      xaxis: {
        categories: mntComptRappNos?.STR_SCCNCPTENOSTRO
      },
      yaxis: {
        title: {
          text: 'Les montants'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatBydevise(val, "");
          }
        }
      }
    };
  }
  if (map ==="Data mntRappOpeCorr") {
    battonet = {
      series: [
        {
          name: 'En Crédit',
          data: mntRappOpeCorr?.MntRappCreditNos
        }, 
        {
          name: 'En Débit',
          data: mntRappOpeCorr?.MntRappDebitNos
        }, 
      ],
      chart: {
        type   : 'bar',
        height : 350
      },
      plotOptions: {
        bar: {
          horizontal  : false,
          columnWidth : '30%',
          endingShape : 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show   : true,
        width  : 5,
        colors : ['transparent']
      },
      xaxis: {
        categories: mntRappOpeCorr?.STR_SOCNAME
      },
      yaxis: {
        title: {
          text: 'Les montants'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatBydevise(val,"");
          }
        }
      }
    };
  }
  if (map === "Data mntSuspOpeCorr") {
    battonet = {
      series: [
        {
          name: 'En Crédit',
          data: mntSuspOpeCorr?.MntSuspOpeCreditNos
        },
        {
          name: 'En Débit',
          data: mntSuspOpeCorr?.MntSuspOpeDebitNos
        },
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent']
      },
      xaxis: {
        categories: mntSuspOpeCorr?.STR_SOCNAMEmntSuspOpeCorr
      },
      yaxis: {
        title: {
          text: 'Les montants'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatBydevise(val, "");
          }
        }
      }
    };
  }
  if (map === "Data mntComptSuspNos") {
    battonet = {
      series: [
        {
          name: 'En Crédit',
          data: mntComptSuspNos?.MntRappSuspCreditNos
        },
        {
          name: 'En Débit',
          data: mntComptSuspNos?.MntSuspDebitNos
        },
        // {
        //   name: 'Solde du compte',
        //   data: mntComptSuspNos?.STR_SCCNCPTENOSTRO
        // },
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent']
      },
      xaxis: {
        categories: mntComptSuspNos?.STR_SCCNCPTENOSTRO
      },
      yaxis: {
        title: {
          text: 'Les montants'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatBydevise(val, "");
          }
        }
      }
    };
  }
  if (map === "Data NmbrOpeRappCorr") {
    battonet = {
      series: [
        {
          name: 'En Crédit',
          data: NmbrOpeRappCorr?.NBRERappCreditNos
        },
        {
          name: 'En Débit',
          data: NmbrOpeRappCorr?.NBRERappDebitNos
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent']
      },
      xaxis: {
        categories: NmbrOpeRappCorr?.STR_SOCNAME
      },
      yaxis: {
        title: {
          text: 'Le nbr d\'opérations rapprochées '
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatBydevise(val, "");
          }
        }
      }
    };
  }
  return (
    <div className="col-4 p-3">
        <div className='statbox widget box box-shadow  border border-primary rounded p-1'>
          <h6 className='text-muted'>{text}</h6>
          {
            status.dashboard === "loading" ?
            <div className='text-center mx-auto'>
              <img src={BASEROOT + "assets/img/preloader.svg"} height="200" alt="loader" />
            </div>
              :
            battonet !== undefined && battonet?.series[0].data !== undefined && battonet?.series[0].data.length>0 ?
                <Chart
                  className = "p-0 m-0 text-center"
                  options   = {battonet}
                  series    = {battonet?.series}
                  type      = "bar"
                />
                :
                <div className="text-center mx-auto">
                  <img src={BASEROOT+"assets/img/emptybag.jpg"} className="m-0 p-0" height="220" alt="loader" />
                  <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucune donnée pour le moment !!!</small>
                </div>
          }
        </div>
    </div>
  )
}

export default BattonetDashboard