import React, { useEffect, useState } from 'react';
import BlankModal from '@core/modals/BlankModal';
import DefaultButton from '@core/buttons/electrons/DefaultButton';
import { FaCheck, FaKey, FaMinus, FaPlus, FaSpinner } from 'react-icons/fa';
import RoleService from '@services/RoleService';
import { showError, showSuccess } from '@utils/helpers';
import { useTranslation } from 'react-i18next';
import PermissionHandler from '@hoc/cruds/PermissionHandler';

const HeadCell = ({ children, border }) => (
  <th scope="col" className={`text-sm font-medium text-gray-900 py-2 ${border}`}>
    {children}
  </th>
);

const BodyCell = ({ children, textAlign, border }) => (
  <td className={`text-sm text-gray-900 font-normal px-2 py-2  ${textAlign} ${border}`}>
    {children}
  </td>
);

const ManageRolePermissions = ({ role, roleName, onSuccess }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      RoleService.findPermissions(role.id).then((res) => {
        setSelectedPermissions(res.data.data.permissions);
      });
    }
  }, [role.id, showModal]);

  useEffect(() => {
    if (showModal) {
      RoleService.allPermissions().then((res) => {
        setPermissions(res.data.data);
      });
    }
  }, [role.id, showModal]);

  const onSubmit = () => {
    const formattedPermissions = selectedPermissions?.map(({ id }) => id);
    setLoading(true);
    RoleService.assignPermissions(role.id, formattedPermissions)
      .then((res) => {
        showSuccess(res.data.message);
        onSuccess();
      })
      .catch((err) => {
        showError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addPermission = (permission) => {
    const { id, name, description } = permission;
    const sortedPermissions = [...selectedPermissions, { id, name, description }];
    setSelectedPermissions(sortedPermissions);
  };

  const removePermission = (id) => {
    const filteredSelectedPermissions = selectedPermissions.filter(
      (permission) => permission.id !== id
    );
    setSelectedPermissions(filteredSelectedPermissions);
  };

  const permissionsList = () => {
    const selectedIds = selectedPermissions?.map((permission) => permission.id);
    const filteredPermissions = permissions.filter(
      (permission) => !selectedIds?.includes(permission.id)
    );

    return filteredPermissions?.map((permission) => {
      const { name, description } = permission;

      return (
        <tbody className="text-center">
          <tr className="bg-white">
            <BodyCell border="border border-gray-300">{name}</BodyCell>
            <BodyCell border="hidden md:table-cell border border-gray-300">{description}</BodyCell>
            <BodyCell border="border border-gray-300">
              <DefaultButton
                xs
                width=""
                bgColor="bg-emerald-500"
                bgColorHover="bg-emerald-600"
                label={
                  <div className="items-center p-0.5">
                    <FaPlus />
                  </div>
                }
                onClick={() => addPermission(permission)}
              />
            </BodyCell>
          </tr>
        </tbody>
      );
    });
  };

  const selectedPermissionsList = () => {
    return selectedPermissions?.map((permission) => {
      const { id, name, description } = permission;
      return (
        <tbody className="text-center">
          <tr className="bg-white">
            <BodyCell border="border border-gray-300">{name}</BodyCell>
            <BodyCell border="hidden md:table-cell border border-gray-300">{description}</BodyCell>
            <BodyCell border="border border-gray-300">
              <DefaultButton
                xs
                width=""
                bgColor="bg-red-500"
                bgColorHover="bg-red-600"
                label={
                  <div className="flex items-center p-0.5">
                    <FaMinus />
                  </div>
                }
                onClick={() => removePermission(id)}
              />
            </BodyCell>
          </tr>
        </tbody>
      );
    });
  };

  return (
    <PermissionHandler permission="update_role_permissions">
      <DefaultButton
        sm
        label={
          <div className="flex items-center">
            <FaKey />
          </div>
        }
        bgColor="bg-yellow-100"
        bgColorHover="hover:bg-yellow-200"
        textColor="text-yellow-700"
        onClick={() => setShowModal(true)}
      />
      <BlankModal
        show={showModal}
        title={`${t('manage')} ${roleName}'s ${t('role')}`}
        onClose={closeModal}
        maxWidth="3xl"
        iconBg="bg-yellow-100"
        icon={<FaKey className="text-yellow-500" />}
        otherButtons={[
          <DefaultButton
            sm
            label={
              <div className="flex items-center">
                {loading ? (
                  <FaSpinner className="animate-spin mr-1" />
                ) : (
                  <FaCheck className="mr-1" />
                )}
                {t('submit')}
              </div>
            }
            bgColor="bg-yellow-100"
            bgColorHover="bg-yellow-200"
            textColor="text-yellow-700"
            onClick={onSubmit}
          />
        ]}>
        <div className="flex flex-col lg:flex-row justify-evenly">
          <div className="mr-3 w-full md:w-1/2">
            <div className="my-5 text-center text-lg font-semibold">{t('allPermissions')}</div>
            {permissions && (
              <div className={`${permissions.length > 6 && 'h-92 overflow-y-scroll'}`}>
                <table className="min-w-full rounded-lg">
                  <thead className="border-b-2 bg-white">
                    <tr className="rounded-t-lg text-center">
                      <HeadCell border="border border-gray-300 rounded-lg bg-gray-100">
                        {t('name')}
                      </HeadCell>
                      <HeadCell border="hidden md:table-cell border border-gray-300 rounded-lg bg-gray-100">
                        {t('description')}
                      </HeadCell>
                      <HeadCell border="border border-gray-300 rounded-lg bg-gray-100">
                        {t('add')}
                      </HeadCell>
                    </tr>
                  </thead>
                  {permissionsList()}
                </table>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <div className="my-5 text-center font-semibold text-lg">{t('selectedPermissions')}</div>
            {selectedPermissions && (
              <div className={`${selectedPermissions.length > 6 && 'h-92 overflow-y-scroll'}`}>
                <table className="min-w-full rounded-lg">
                  <thead className="border-b-2 bg-white">
                    <tr className="rounded-t-lg text-center">
                      <HeadCell border="border border-gray-300 rounded-lg bg-gray-100">
                        {t('name')}
                      </HeadCell>
                      <HeadCell border="hidden md:table-cell border border-gray-300 rounded-lg bg-gray-100">
                        {t('description')}
                      </HeadCell>
                      <HeadCell border="border border-gray-300 rounded-lg bg-gray-100">
                        {t('remove')}
                      </HeadCell>
                    </tr>
                  </thead>
                  {selectedPermissionsList()}
                </table>
              </div>
            )}
          </div>
        </div>
      </BlankModal>
    </PermissionHandler>
  );
};

export default ManageRolePermissions;
