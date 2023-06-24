import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Datatable from '@core/table/Datatable';
import MobileTable from '@core/table/MobileTable';
import PersistentVolumeService from '@services/PersistentVolumeService';
import GreenBadge from '@core/badges/GreenBadge';
import RedBadge from '@core/badges/RedBadge';
import OrangeBadge from '@core/badges/OrangeBadge';
import PersistentVolumeClaimActions from '@components/PersistentVolumeClaim/partials/PersistentVolumeClaimActions';
import PersistentVolumeClaimService from '@services/PersistentVolumeClaimService';

const PersistentVolumeClaimIndex = ({ namespace = 'default' }) => {
  const [loading, setLoading] = useState(true);
  const [updatedTable, setUpdatedTable] = useState(0);
  const [data, setData] = useState([]);

  const badges = (status) => {
    switch (status) {
      case 'Available':
        return <GreenBadge text="Available" />;
      case 'Pending':
        return <OrangeBadge text="Pending" />;
      default:
        return <RedBadge text="Unavailable" />;
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
        id: 'Storage Class Name',
        name: 'Storage Class Name',
        cell: (row) => row.spec.storageClassName,
        sortable: true
      },
      {
        id: 'ReclaimPolicy',
        name: 'Reclaim Policy',
        cell: (row) => row.spec.persistentVolumeReclaimPolicy,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'status',
        name: 'Status',
        cell: (row) => badges(row.status.phase),
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
        id: 'actions',
        name: 'Actions',
        cell: (row) => (
          <PersistentVolumeClaimActions
            pvc={row}
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
      PersistentVolumeClaimService.all(namespace, params).then((response) => {
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
        <label className="text-lg font-bold">Persistent Volume Claims</label>
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

export default PersistentVolumeClaimIndex;
