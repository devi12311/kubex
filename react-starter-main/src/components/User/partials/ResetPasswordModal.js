import React, { useState } from 'react';
import PasswordInput from '@core/inputs/PasswordInput';
import { useDispatch } from 'react-redux';
import EditModal from '@core/modals/EditModal';
import { hideSpinner, showSpinner } from '@redux/spinner/Action';
import AuthService from '@services/AuthService';
import { showError, showSuccess } from '@utils/helpers';
import { useTranslation } from 'react-i18next';

const ResetPasswordModal = ({ modalState, onCloseModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const closeModal = () => {
    onCloseModal(false);
    setPassword('');
    setPasswordConfirmation('');
  };

  const onSubmit = () => {
    dispatch(showSpinner(t('pleaseWait')));
    AuthService.changePassword(password, passwordConfirmation)
      .then(() => {
        dispatch(hideSpinner());
        showSuccess(t('passwordUpdatedSuccessfully'));
        setPassword('');
        setPasswordConfirmation('');
        closeModal();
      })
      .catch((err) => {
        dispatch(hideSpinner());
        showError(err.response.data.message);
      });
  };

  return (
    <EditModal
      label={t('changePassword')}
      show={modalState}
      title={t('changePassword')}
      onSubmit={onSubmit}
      onClose={closeModal}>
      <div className="relative text-left px-3 md:px-30 mx-auto mt-4">
        <div className="w-full mt-3">
          <PasswordInput
            name="password"
            label={t('newPassword')}
            placeholder={t('newPassword')}
            containerClass="flex-1 relative"
            textSize="text-xs"
            width="md:w-120"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="w-full mt-3 mb-4">
            <PasswordInput
              name="passwordConfirmation"
              label={t('confirmPassword')}
              placeholder={t('confirmPassword')}
              containerClass="flex-1 relative"
              textSize="text-xs"
              width="md:w-120"
              value={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </EditModal>
  );
};

export default ResetPasswordModal;
