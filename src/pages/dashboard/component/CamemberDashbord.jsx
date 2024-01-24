import React from 'react';
import { useSelector } from 'react-redux';
import { formatBydevise } from '../../../store/Rapprochements/Rapprochement';
import Chart from 'react-apexcharts';
import { BASEROOT } from '../../../services/serveur';

/**
 * CHART CAMEMBER
 * @param {String} map Le nom de la map
 * @param {String} text Le texte du titre
 */
function CamemberDashbord({map, text}) {
  const { MntCumSusp, NbreOpeSus, status } = useSelector((state) => state.dashboard);
  let camember = {};
  if (map ==="Data MntCumSusp") {
      camember = {
        series: MntCumSusp,
      chart: {
        width: 500,
        type: 'donut',
      },
      seriesNamesEx: ['Mtn C Mir', 'Mtn D Mir', 'Mtn C Nos.', 'Mtn C Nos.'],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return opts.w.config.seriesNamesEx[opts.seriesIndex] + " : " + formatBydevise(opts.w.config.series[opts.seriesIndex], "");
        }
      },
      tooltip: {
        y:{
          formatter: function (val, opts) {
            return opts.config.seriesNamesEx[opts.seriesIndex];
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }
  if (map === "Data NbreOpeSus") {
    camember = {
      series: NbreOpeSus,
      chart: {
        width: 500,
        type: 'donut',
      },
      seriesNamesEx: ['Nbre Crédit Mirroir', 'Nbre Débit Mirroir', 'Nbre Crédit Nostro', 'Nbre Débit Nostro'],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return opts.w.config.seriesNamesEx[opts.seriesIndex] + " : " + formatBydevise(opts.w.config.series[opts.seriesIndex], "");
        }
      },
      tooltip: {
        y: {
          formatter: function (val, opts) {
            return opts.config.seriesNamesEx[opts.seriesIndex];
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  return (
    <div className="col-4 p-3">
      <div className='statbox widget border border-primary rounded shadow-sm p-1'>
          <h6 className='text-muted'>{text}</h6>
          {
            status.dashboard === "loading" ?
              <div className='text-center mx-auto'>
                <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" />
              </div>
              : 
              camember !== undefined && camember?.series.length >0 ?
                  <Chart
                    className = "p-0 m-0  text-center"
                    options   = {camember}
                    series    = {camember?.series}
                    type      = "donut"
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

export default CamemberDashbord