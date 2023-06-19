import React, { useState } from 'react';
import EditModal from '@core/modals/EditModal';
import { showError, showSuccess } from '@utils/helpers';
import Input from '@core/inputs/Input';
import { FaLock } from 'react-icons/fa';
import DefaultButton from '@core/buttons/electrons/DefaultButton';
import UserService from '@services/UserService';
import { useTranslation } from 'react-i18next';
import PermissionHandler from '@hoc/cruds/PermissionHandler';

const ChangeUserPassword = ({ user, onUpdated }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setPassword('');
    setPasswordConfirmation('');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    UserService.changePassword(user.id, password, passwordConfirmation)
      .then(() => {
        showSuccess(t('passwordUpdatedSuccessfully'));
        onUpdated();
        setPassword('');
        setPasswordConfirmation('');
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
    <PermissionHandler permission="change_users_password">
      <DefaultButton
        bgColor="bg-yellow-100"
        sm
        bgColorHover="hover:bg-yellow-200"
        textColor="text-yellow-700"
        onClick={() => setShowModal(true)}
        label={<FaLock />}
      />
      <EditModal
        show={showModal}
        title={t('editUserPassword')}
        onClose={closeModal}
        onSubmit={onSubmit}
        loading={loading}
        label={t('edit')}>
        <div className="mt-4 sm:mt-8 mb-2 grid grid-cols-2 gap-5">
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
        </div>
      </EditModal>
    </PermissionHandler>
  );
};

export default ChangeUserPassword;
