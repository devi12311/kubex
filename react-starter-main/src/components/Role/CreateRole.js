import React, { useState } from 'react';
import AddButton from '@core/buttons/atoms/AddButton';
import AddModal from '@core/modals/AddModal';
import Input from '@core/inputs/Input';
import RoleService from '@services/RoleService';
import { showError, showSuccess } from '@utils/helpers';
import { useTranslation } from 'react-i18next';

const CreateRole = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setName('');
    setDescription('');
  };

  const onSubmit = () => {
    setLoading(true);
    RoleService.create(name, description)
      .then(() => {
        showSuccess(t('roleCreatedSuccessfully'));
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
    <div>
      <AddButton label={`${t('add')} ${t('role')}`} onClick={() => setShowModal(true)} />
      <AddModal
        show={showModal}
        title={`${t('add')} ${t('role')}`}
        onClose={closeModal}
        onSubmit={onSubmit}
        loading={loading}>
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
      </AddModal>
    </div>
  );
};

export default CreateRole;
