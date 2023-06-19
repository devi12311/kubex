import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import UserService from '@services/UserService';
import RowDetails from '@hoc/cruds/RowDetails';
import { useTranslation } from 'react-i18next';
import PermissionHandler from '@hoc/cruds/PermissionHandler';

const ShowUser = ({ user }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      UserService.find(user.id).then((response) => {
        setUserData(response.data.data);
      });
  }, [user.id, showModal]);

  return (
    <PermissionHandler permission="view_users">
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title={`${t('overview')}`} onClose={closeModal}>
        <div className="flex flex-col mt-5">
          <RowDetails label={t('name')} value={userData.name} />
          <RowDetails label={t('userName')} value={userData.username} />
        </div>
      </ViewModal>
    </PermissionHandler>
  );
};

export default ShowUser;
