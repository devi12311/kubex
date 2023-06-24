import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Datatable from '@core/table/Datatable';
import MobileTable from '@core/table/MobileTable';
import StatefulSetService from '@services/StatefulSetService';
import GreenBadge from '@core/badges/GreenBadge';
import RedBadge from '@core/badges/RedBadge';
import OrangeBadge from '@core/badges/OrangeBadge';
import StatefulSetActions from '@components/StatefulSet/partials/StatefulSetActions';

const StatefulSetIndexIndex = ({ namespace = 'default' }) => {
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
        id: 'Replicas',
        name: 'Replicas',
        cell: (row) => (row.status.availableReplicas ? row.status.availableReplicas : 0),
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'Desired Replicas',
        name: 'Desired Replicas',
        cell: (row) => row.spec.replicas,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'Strategy',
        name: 'Strategy',
        cell: (row) => row.spec.updateStrategy.type,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'status',
        name: 'Status',
        cell: (row) => badges(row.status.replicas, row.status.availableReplicas),
        sortable: true,
        width: '100px'
      },
      {
        id: 'createdAt',
        name: 'Created At',
        cell: (row) => row.metadata.creationTimestamp,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'actions',
        name: 'Actions',
        cell: (row) => (
          <StatefulSetActions
            statefulset={row}
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
      StatefulSetService.all(namespace, params).then((response) => {
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
        <label className="text-lg font-bold">Stateful Sets</label>
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

export default StatefulSetIndexIndex;
