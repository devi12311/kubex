import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@hoc/layouts/Layout';
import Chart from 'react-apexcharts';
import { FaCircle } from 'react-icons/fa';
import NamespaceService from '@services/NamespaceService';
import NodeService from '@services/NodeService';

const HomePage = () => {
  const [ram, setRam] = useState();
  const [cpu, setCpu] = useState();
  const [resources, setResources] = useState([]);
  const [pods, setPods] = useState();

  const getData = useCallback(() => {
    NodeService.resources().then((response) => {
      setRam(response.data.ram.percentage);
      setCpu(response.data.cpu.percentage);
      setResources(response.data.resources);
      setPods(response.data.resources[1].number);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

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

  const cpuBar = [cpu];
  const ramBar = [ram];
  const pd = [pods];
  return (
    <Layout>
      <div className="status mt-4 flex flex-row justify-center mx-auto pt-12 space-x-20">
        <div className="flex flex-col justify-center">
          <Chart options={style} series={cpuBar} type="radialBar" height="350" />
          <span className="text-center font-bold text-lg pt-5">CPU</span>
        </div>
        <div className="flex flex-col justify-center">
          <Chart options={style} series={ramBar} type="radialBar" height="350" />
          <span className="text-center font-bold text-lg pt-5">RAM</span>
        </div>
        <div className="flex flex-col justify-center">
          <Chart options={style} series={pd} type="radialBar" height="350" />
          <span className="text-center font-bold text-lg pt-5">Pods</span>
        </div>
      </div>
      <div className="pt-20 ml-20 grid grid-cols-3">
        {resources.map((el) => (
          <div className="mb-10 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 w-100">
            <div className="mx-5">
              <FaCircle className=" text-blue-900 text-5xl" />
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="my-2 text-2xl font-bold tracking-tight">{el.number}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{el.label}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
