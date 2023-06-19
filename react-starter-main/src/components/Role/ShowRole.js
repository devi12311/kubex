import React, { useEffect, useState } from 'react';
import ViewButton from '@core/buttons/atoms/ViewButton';
import ViewModal from '@core/modals/ViewModal';
import RoleService from '@services/RoleService';
import RowDetails from '@hoc/cruds/RowDetails';
import { useTranslation } from 'react-i18next';
import PermissionHandler from '@hoc/cruds/PermissionHandler';

const HeadCell = ({ children, border }) => (
  <th scope="col" className={`text-sm font-medium text-gray-900 px-6 py-2 ${border}`}>
    {children}
  </th>
);

const BodyCell = ({ children, textAlign, border }) => (
  <td className={`text-sm text-gray-900 font-normal px-2 py-2  ${textAlign} ${border}`}>
    {children}
  </td>
);

const ShowRole = ({ role }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [rolePermissions, setRolePermissions] = useState([]);
  const { name } = role;
  const { description } = role;

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      RoleService.findPermissions(role.id).then((res) => {
        setRolePermissions(res.data.data.permissions);
      });
    }
  }, [role.id, showModal]);

  const permissionsList = () => {
    return rolePermissions.map((permission) => {
      const { name, description } = permission;

      return (
        <tbody className="text-center">
          <tr className="bg-white">
            <BodyCell border="border border-gray-300">{name}</BodyCell>
            <BodyCell border="hidden md:table-cell border border-gray-300">{description}</BodyCell>
          </tr>
        </tbody>
      );
    });
  };

  return (
    <PermissionHandler permission="view_role_permissions">
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title={`${t('viewRole')}`} onClose={closeModal}>
        <div className="flex flex-col mt-5">
          <RowDetails label={t('name')} value={name} />
          <RowDetails label={t('description')} value={description} />
        </div>
        <div className="flex flex-col lg:flex-row justify-evenly">
          <div className="mr-3">
            <div className="my-5 text-center font-semibold text-lg">{`${t('permissions')}`}</div>
            {rolePermissions && (
              <div className={`${rolePermissions.length > 6 && 'h-72 overflow-y-scroll'}`}>
                <table className="min-w-full rounded-lg">
                  <thead className="border-b-2 bg-white">
                    <tr className="rounded-t-lg text-center">
                      <HeadCell border="border border-gray-300 rounded-lg bg-gray-100">
                        {t('name')}
                      </HeadCell>
                      <HeadCell border="hidden md:table-cell border border-gray-300 rounded-lg bg-gray-100">
                        {t('description')}
                      </HeadCell>
                    </tr>
                  </thead>
                  {permissionsList()}
                </table>
              </div>
            )}
          </div>
        </div>
      </ViewModal>
    </PermissionHandler>
  );
};

export default ShowRole;
