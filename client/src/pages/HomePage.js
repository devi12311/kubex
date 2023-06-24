import React from 'react';
import Layout from '@hoc/layouts/Layout';
import Chart from 'react-apexcharts';
import { FaCircle } from 'react-icons/fa';

const HomePage = () => {
  const style = {
    series: [76],
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '22px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {},
    labels: ['Average Results']
  };

  const seriesorder = [65];
  return (
    <Layout>
      <div className="status mt-4 flex flex-row justify-center mx-auto pt-12 space-x-20">
        <div className="flex flex-col justify-center">
          <Chart options={style} series={seriesorder} type="radialBar" height="350" />
          <span className="text-center font-bold text-lg pt-5">CPU</span>
        </div>
        <div className="flex flex-col justify-center">
          <Chart options={style} series={seriesorder} type="radialBar" height="350" />
          <span className="text-center font-bold text-lg pt-5">RAM</span>
        </div>
        <div className="flex flex-col justify-center">
          <Chart options={style} series={seriesorder} type="radialBar" height="350" />
          <span className="text-center font-bold text-lg pt-5">Pods</span>
        </div>
      </div>
      <div className="pt-20 ml-20 grid grid-cols-3">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el) => (
          <div className="mb-10 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 w-100">
            <div className="mx-5">
              <FaCircle className=" text-blue-900 text-5xl" />
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="my-2 text-2xl font-bold tracking-tight">144</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
