import React, { useState } from 'react';
import AddButton from '@core/buttons/atoms/AddButton';
import AddModal from '@core/modals/AddModal';
import Input from '@core/inputs/Input';
import UserService from '@services/UserService';
import { showError, showSuccess } from '@utils/helpers';
import RoleSelect from '@components/Role/partials/RoleSelect';
import { useTranslation } from 'react-i18next';

const CreateUser = ({ onAdded }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [roleId, setRoleId] = useState();

  const closeModal = () => {
    setShowModal(false);
    setName('');
    setUsername('');
    setPassword('');
    setPasswordConfirmation('');
    setRoleId();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    UserService.create(name, username, password, passwordConfirmation, roleId)
      .then(() => {
        showSuccess(t('userCreatedSuccessfully'));
        onAdded();
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
      <AddButton label={`${t('add')} ${t('user')}`} onClick={() => setShowModal(true)} />
      <AddModal
        show={showModal}
        title={`${t('add')} ${t('user')}`}
        onClose={closeModal}
        onSubmit={onSubmit}
        loading={loading}>
        <div className="mt-4 sm:mt-8 mb-2 grid grid-cols-2 gap-5">
          <Input
            height="h-10"
            label={t('name')}
            placeholder={t('name')}
            value={name}
            onChange={setName}
          />
          <Input
            height="h-10"
            label={t('userName')}
            placeholder={t('userName')}
            value={username}
            onChange={setUsername}
          />
          <Input
            height="h-10"
            type="password"
            label={t('password')}
            value={password}
            placeholder={t('password')}
            className="rounded-t-none"
            onChange={setPassword}
          />
          <Input
            height="h-10"
            type="password"
            label={t('confirmPassword')}
            value={passwordConfirmation}
            placeholder={t('confirmPassword')}
            className="rounded-t-none"
            onChange={setPasswordConfirmation}
          />
          <div>
            <div className="text-sm font-semibold mb-2">{t('assignARole')}</div>
            <RoleSelect openModal={showModal} onSelect={setRoleId} selected={roleId} />
          </div>
        </div>
      </AddModal>
    </div>
  );
};

export default CreateUser;
