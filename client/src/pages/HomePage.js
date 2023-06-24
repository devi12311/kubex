import React from 'react';
import Layout from '@hoc/layouts/Layout';
import Chart from 'react-apexcharts';

const HomePage = () => {
  const optionsorder = {
    chart: {
      id: 'donut-chart'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
          labels: {
            show: true,

            total: {
              show: true,
              label: 'Orders',
              color: '#99abb4'
            }
          }
        }
      }
    },
    labels: ['Success', 'Failed ', 'Pending'],
    stroke: {
      width: 0
    },
    legend: {
      show: false
    },
    colors: ['rgb(64, 196, 255)', 'rgb(255, 130, 28)', 'rgb(41, 97, 255)'],
    tooltip: {
      fillSeriesColor: false
    }
  };
  const seriesorder = [65, 15, 17];
  return (
    <Layout>
      <div className="status mt-4">
        <Chart options={optionsorder} series={seriesorder} type="donut" height="250" />
      </div>
      <div>
        {/* <div className="flex flex-row ">
          <div className=" flex flex-col xs-4">
            <i className="fa fa-circle text-primary" />
            <h3 className="mb-0 font-medium">5489</h3>
            <span>Success</span>
          </div>
          <div className=" flex flex-col xs-4">
            <i className="fa fa-circle text-info" />
            <h3 className="mb-0 font-medium">954</h3>
            <span>Pending</span>
          </div>
          <div className="flex flex-col xs-4">
            <i className="fa fa-circle text-orange" />
            <h3 className="mb-0 font-medium">736</h3>
            <span>Failed</span>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default HomePage;
