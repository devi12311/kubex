import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Datatable from '@core/table/Datatable';
import MobileTable from '@core/table/MobileTable';
import ServiceService from '@services/ServiceService';
import GreenBadge from '@core/badges/GreenBadge';
import RedBadge from '@core/badges/RedBadge';
import OrangeBadge from '@core/badges/OrangeBadge';
import ServiceActions from '@components/Service/partials/ServiceActions';

const ServiceIndex = ({ namespace = 'default' }) => {
  const [loading, setLoading] = useState(true);
  const [updatedTable, setUpdatedTable] = useState(0);
  const [data, setData] = useState([]);

  const badges = (replicas, totalReplicas) => {
    switch (true) {
      case replicas === totalReplicas:
        return <GreenBadge text="Ready" />;
      case replicas === 0:
        return <RedBadge text="UnHealthy" />;
      case replicas <= totalReplicas:
        return <OrangeBadge text="Pending" />;
      default:
        return <RedBadge text="UnHealthy" />;
    }
  };

  const headers = useMemo(
    () => [
      {
        id: 'name',
        name: 'Name',
        cell: (row) => row.metadata.name,
        sortable: true
      },
      {
        id: 'Cluster IP',
        name: 'Cluster IP',
        cell: (row) => row.spec.clusterIP,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'IP Family',
        name: 'IP Family',
        cell: (row) => row.spec.ipFamilies.join(','),
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'createdAt',
        name: 'Created At',
        cell: (row) => row.metadata.creationTimestamp,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'type',
        name: 'Type',
        cell: (row) => row.spec.type,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'actions',
        name: 'Actions',
        cell: (row) => (
          <ServiceActions
            service={row}
            namespace={namespace}
            onDeleted={() => setUpdatedTable((prev) => prev + 1)}
          />
        )
      }
    ],
    [namespace]
  );

  const getData = useCallback(
    (params) => {
      setLoading(true);
      ServiceService.all(namespace, params).then((response) => {
        setData(response.data);
        setLoading(false);
      });
    },
    [namespace]
  );

  useEffect(() => {
    getData(namespace);
  }, [namespace, getData]);

  return (
    <div className="border bg-white rounded justify-between items-center mb-5 py-2">
      <div className="mx-3 my-5">
        <label className="text-lg font-bold">Pods</label>
        <div className="block lg:hidden">
          <MobileTable headers={headers} data={data} />
        </div>
        <div className="hidden lg:block">
          <Datatable
            data={data}
            headers={headers}
            getData={getData}
            isLoading={loading}
            extraDependencies={[updatedTable]}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceIndex;
