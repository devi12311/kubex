import React from 'react';
import EditUser from '@components/User/EditUser';
import ShowUser from '@components/User/ShowUser';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import UserService from '@services/UserService';
import ToggleUser from '@components/User/partials/ToggleUser';
import ChangeUserPassword from '@components/User/partials/ChangeUserPassword';

const UserActions = ({ user, onEdited, onDeleted, onToggle, onUpdated }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ToggleUser user={user} onToggle={onToggle} />
      </div>
      <div className="mr-2">
        <ChangeUserPassword user={user} onUpdated={onUpdated} />
      </div>
      <div className="mr-2">
        <ShowUser user={user} />
      </div>
      <div className="mr-2">
        <EditUser user={user} onEdited={onEdited} />
      </div>
      <DeleteEntity
        service={UserService}
        id={user.id}
        onDeleted={onDeleted}
        permission="delete_users"
      />
    </div>
  );
};

export default UserActions;
