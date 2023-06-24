import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Datatable from '@core/table/Datatable';
import MobileTable from '@core/table/MobileTable';
import GreenBadge from '@core/badges/GreenBadge';
import RedBadge from '@core/badges/RedBadge';
import NodeService from '@services/NodeService';
import NodeActions from '@components/Node/partials/NodeActions';

const NodeIndex = ({ namespace = 'default' }) => {
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
        id: 'Architecture',
        name: 'Architecture',
        cell: (row) => row.status.nodeInfo.architecture,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'Kubelet Version',
        name: 'Architecture',
        cell: (row) => row.status.nodeInfo.kubeletVersion,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'OS Image',
        name: 'OS Image',
        cell: (row) => row.status.nodeInfo.osImage,
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
          <NodeActions
            node={row}
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
      NodeService.all(namespace, params).then((response) => {
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
        <label className="text-lg font-bold">Nodes</label>
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

export default NodeIndex;
