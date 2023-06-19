import React, { useEffect, useState } from 'react';
import EditModal from '@core/modals/EditModal';
import EditButton from '@core/buttons/atoms/EditButton';
import Input from '@core/inputs/Input';
import RoleService from '@services/RoleService';
import { showError, showSuccess } from '@utils/helpers';
import { useTranslation } from 'react-i18next';
import PermissionHandler from '@hoc/cruds/PermissionHandler';

const EditRole = ({ role, onSuccess }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal) {
      RoleService.find(role.id).then((res) => {
        setName(res.data.data.name);
        setDescription(res.data.data.description);
      });
    }
  }, [role.id, showModal]);

  const closeModal = () => {
    setShowModal(false);
    setName('');
    setDescription('');
  };

  const onSubmit = () => {
    setLoading(true);
    RoleService.update(role.id, name, description)
      .then(() => {
        showSuccess(t('roleEditedSuccessfully'));
        onSuccess();
        closeModal();
      })
      .catch((err) => {
        showError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PermissionHandler permission="update_roles">
      <EditButton onClick={() => setShowModal(true)} />
      <EditModal
        show={showModal}
        title={`${t('editRole')}`}
        onClose={closeModal}
        onSubmit={onSubmit}
        loading={loading}
        label={t('edit')}>
        <div className="mt-4 sm:mt-8 mb-2 flex flex-col lg:grid grid-cols-2 gap-5">
          <Input
            height="h-10"
            label={t('name')}
            placeholder={t('name')}
            value={name}
            onChange={setName}
          />
          <Input
            height="h-10"
            label={t('description')}
            placeholder={t('description')}
            value={description}
            onChange={setDescription}
          />
        </div>
      </EditModal>
    </PermissionHandler>
  );
};

export default EditRole;
