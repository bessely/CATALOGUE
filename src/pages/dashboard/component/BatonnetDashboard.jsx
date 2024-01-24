import React from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
function BatonnetDashboard() {
  const { STR_SOCNAMEmntSuspOpeCorr, status } = useSelector((state) => state.dashboard);

  let battonet = {
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        }
      }
    }
  };

  return (
    <div className="col-4 p-3">
      <div className='statbox widget shadow-sm box box-shadow'>
        <div className='border border-primary rounded p-3'>
          <h4 className='text-muted'>Dashboard</h4>
          <Chart
            className = "p-3 text-center col"
            options   = {battonet}
            series    = {battonet.series}
            type      = "bar"
          />
        </div>
      </div>
    </div>
  )
}

export default BatonnetDashboard