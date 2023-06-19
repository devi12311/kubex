import React, { useState } from 'react';
import UserService from '@services/UserService';
import { showError, showSuccess } from '@utils/helpers';
import { FaCheck, FaTimes } from 'react-icons/fa';
import DefaultButton from '@core/buttons/electrons/DefaultButton';
import ToggleModal from '@core/modals/ToggleModal';
import { useTranslation } from 'react-i18next';
import PermissionHandler from '@hoc/cruds/PermissionHandler';

const ToggleUser = ({ user, onToggle }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    UserService.toggleStatus(user.id)
      .then(() => {
        showSuccess(t('statusUpdate'));
        onToggle();
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
    <PermissionHandler permission="toggle_users_state">
      {user.is_active ? (
        <DefaultButton
          bgColor="bg-red-100"
          sm
          bgColorHover="hover:bg-red-300"
          textColor="text-red-700"
          onClick={() => setShowModal(true)}
          label={<FaTimes />}
        />
      ) : (
        <DefaultButton
          bgColor="bg-emerald-100"
          sm
          bgColorHover="hover:bg-emerald-200"
          textColor="text-emerald-700"
          onClick={() => setShowModal(true)}
          label={<FaCheck />}
        />
      )}
      <ToggleModal
        title={`${user.is_active ? t('deactivateUser') : t('activateUser')}`}
        show={showModal}
        onClose={closeModal}
        onSubmit={onSubmit}
        loading={loading}
        label={`${user.is_active ? t('deactivate') : t('activate')}`}>
        <div className="text-lg my-3 ml-5">
          <span>{`${
            user.is_active
              ? t('areYouSureYouWantToDeactivateThisUser')
              : t('areYouSureYouWantToActivateThisUser')
          }`}</span>
        </div>
      </ToggleModal>
    </PermissionHandler>
  );
};
export default ToggleUser;
