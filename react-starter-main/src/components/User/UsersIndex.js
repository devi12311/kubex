import React, { useMemo, useState } from 'react';
import Datatable from '@core/table/Datatable';
import UserActions from '@components/User/partials/UserActions';
import MobileTable from '@core/table/MobileTable';
import useHasPermission from '@hooks/useHasPermission';
import UserService from '@services/UserService';
import CreateUser from '@components/User/CreateUser';
import GreenBadge from '@core/badges/GreenBadge';
import RedBadge from '@core/badges/RedBadge';
import { useTranslation } from 'react-i18next';

const UsersIndex = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const canCreateUser = useHasPermission('create_users');
  const [metaData, setMetaData] = useState();
  const [updatedTable, setUpdatedTable] = useState(0);
  const [data, setData] = useState([]);

  const headers = useMemo(
    () => [
      {
        id: 'name',
        name: t('name'),
        cell: (row) => row.name,
        sortable: true
      },
      {
        id: 'username',
        name: t('userName'),
        cell: (row) => row.username,
        sortable: true,
        minWidth: '300px'
      },
      {
        id: 'status',
        name: t('status'),
        cell: (row) =>
          row.is_active ? <GreenBadge text="Active" /> : <RedBadge text="Inactive" />,
        sortable: true,
        width: '100px'
      },
      {
        id: 'actions',
        name: t('actions'),
        cell: (row) => (
          <UserActions
            user={row}
            onEdited={() => setUpdatedTable((prev) => prev + 1)}
            onDeleted={() => setUpdatedTable((prev) => prev + 1)}
            onToggle={() => setUpdatedTable((prev) => prev + 1)}
            onUpdated={() => setUpdatedTable((prev) => prev + 1)}
          />
        )
      }
    ],
    [t]
  );

  const getData = (params) => {
    setLoading(true);
    UserService.all(params).then((response) => {
      setMetaData(response.data.metadata);
      setData(response.data.data);
      setLoading(false);
    });
  };

  return (
    <div className="border bg-white rounded justify-between items-center mb-5 py-2">
      <div className="mx-3 my-5">
        <label className="text-lg font-bold">{t('userList')}</label>
        {canCreateUser && (
          <div className="flex w-1/2 sm:w-1/4 md:w-1/6 mt-3 mr-2">
            <CreateUser
              onAdded={() => setUpdatedTable((prev) => prev + 1)}
              label={`${t('add')} ${t('user')}`}
            />
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

export default UsersIndex;
