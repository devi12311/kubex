import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Datatable from '@core/table/Datatable';
import PodActions from '@components/Pod/partials/PodActions';
import MobileTable from '@core/table/MobileTable';
import PodService from '@services/PodService';
import GreenBadge from '@core/badges/GreenBadge';
import RedBadge from '@core/badges/RedBadge';

const PodIndex = ({ namespace = 'default' }) => {
  const [loading, setLoading] = useState(true);
  const [updatedTable, setUpdatedTable] = useState(0);
  const [data, setData] = useState([]);

  const headers = useMemo(
    () => [
      {
        id: 'name',
        name: 'Name',
        cell: (row) => row.metadata.name,
        sortable: true
      },
      {
        id: 'Images',
        name: 'Images',
        cell: (row) => row.spec.containers.flatMap((container) => container.image).join(','),
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'ip',
        name: 'IP',
        cell: (row) => row.status.podIP,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'status',
        name: 'Status',
        cell: (row) =>
          row.status.phase === 'Running' ? (
            <GreenBadge text={`${row.status.phase}`} />
          ) : (
            <RedBadge text={`${row.status.phase}`} />
          ),
        sortable: true,
        width: '100px'
      },
      {
        id: 'createdAt',
        name: 'Created At',
        cell: (row) => row.status.startTime,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'actions',
        name: 'Actions',
        cell: (row) => (
          <PodActions
            pod={row}
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
      PodService.all(namespace, params).then((response) => {
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

export default PodIndex;
