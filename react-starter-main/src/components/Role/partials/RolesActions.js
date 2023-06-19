import React from 'react';
import EditRole from '@components/Role/EditRole';
import ShowRole from '@components/Role/ShowRole';
import ManageRolePermissions from '@components/Role/partials/ManageRolePermissions';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import RoleService from '@services/RoleService';

const RolesActions = ({ role, roleName, onDeleted, onSuccess }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ManageRolePermissions role={role} roleName={roleName} onSuccess={onSuccess} />
      </div>
      <div className="mr-2">
        <ShowRole role={role} roleName={roleName} />
      </div>
      <div className="mr-2">
        <EditRole roleName={roleName} role={role} onSuccess={onSuccess} />
      </div>
      <DeleteEntity
        onDeleted={onDeleted}
        id={role.id}
        service={RoleService}
        permission="delete_roles"
      />
    </div>
  );
};

export default RolesActions;
