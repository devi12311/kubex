import React, { useMemo, useState } from 'react';
import Datatable from '@core/table/Datatable';
import moment from 'moment';
import MobileTable from '@core/table/MobileTable';
import useHasPermission from '@hooks/useHasPermission';
import RoleService from '@services/RoleService';
import RolesActions from '@components/Role/partials/RolesActions';
import CreateRole from '@components/Role/CreateRole';
import { useTranslation } from 'react-i18next';

const RolesIndex = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState();
  const [loading, setLoading] = useState(true);
  const canCreateRoles = useHasPermission('create_roles');
  const [updatedTable, setUpdatedTable] = useState(0);

  const headers = useMemo(
    () => [
      {
        id: 'name',
        name: t('name'),
        cell: (row) => row.name
      },
      {
        id: 'description',
        name: t('description'),
        cell: (row) => row.description
      },
      {
        id: 'createdAt',
        name: t('createdAt'),
        cell: (row) => moment(row.createdAt).format('MMMM D YYYY')
      },
      {
        id: 'actions',
        name: t('actions'),
        cell: (row) => (
          <RolesActions
            role={row}
            roleName={row.name}
            onSuccess={() => setUpdatedTable((prev) => prev + 1)}
            onDeleted={() => setUpdatedTable((prev) => prev + 1)}
          />
        )
      }
    ],
    [t]
  );

  const getData = (params) => {
    setLoading(true);
    RoleService.all(params).then((response) => {
      setData(response.data.data);
      setMetaData(response.data.metadata);
      setLoading(false);
    });
  };

  return (
    <div className="border bg-white rounded justify-between items-center mb-5 py-2">
      <div className="mx-3 my-5">
        <label className="text-lg font-bold">{t('rolesList')}</label>
        {canCreateRoles && (
          <div className="flex w-1/2 sm:w-1/4 md:w-1/6 mt-3 mr-2">
            <CreateRole onSuccess={() => setUpdatedTable((prev) => prev + 1)} label="Add Role" />
          </div>
        )}
        <div className="block lg:hidden">
          <MobileTable
            headers={headers}
            data={data}
            page={metaData?.currentPage}
            totalRows={metaData?.total}
            pageCount={metaData?.lastPage}
          />
        </div>
        <div className="hidden lg:block">
          <Datatable
            data={data}
            headers={headers}
            totalRows={metaData?.total}
            getData={getData}
            isLoading={loading}
            extraDependencies={[updatedTable]}
          />
        </div>
      </div>
    </div>
  );
};

export default RolesIndex;
