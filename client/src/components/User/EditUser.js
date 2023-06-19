import React, { useEffect, useState } from 'react';
import EditModal from '@core/modals/EditModal';
import EditButton from '@core/buttons/atoms/EditButton';
import Input from '@core/inputs/Input';
import UserService from '@services/UserService';
import { showError, showSuccess } from '@utils/helpers';
import { useTranslation } from 'react-i18next';
import PermissionHandler from '@hoc/cruds/PermissionHandler';

const EditUser = ({ user, onEdited }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setName('');
    setUsername('');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    UserService.update(user.id, name, username)
      .then(() => {
        showSuccess(t('userEditedSuccessfully'));
        onEdited();
        closeModal();
      })
      .catch((err) => {
        showError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (showModal)
      UserService.find(user.id).then((response) => {
        setName(response.data.data.name);
        setUsername(response.data.data.username);
      });
  }, [user.id, showModal]);

  return (
    <PermissionHandler permission="update_users">
      <EditButton onClick={() => setShowModal(true)} />
      <EditModal
        show={showModal}
        title={t('editUser')}
        onClose={closeModal}
        onSubmit={onSubmit}
        loading={loading}
        label={t('edit')}>
        <div className="mt-4 sm:mt-8 mb-2 grid grid-cols-2 gap-5">
          <Input
            label={t('name')}
            placeholder={t('name')}
            value={name}
            onChange={setName}
            height="h-10"
          />
          <Input
            label={t('userName')}
            placeholder={t('userName')}
            value={username}
            onChange={setUsername}
            height="h-10"
          />
        </div>
      </EditModal>
    </PermissionHandler>
  );
};

export default EditUser;
