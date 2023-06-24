import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import PodService from '@services/PodService';
import RowDetails from '@hoc/cruds/RowDetails';
import PermissionHandler from '@hoc/cruds/PermissionHandler';

const ShowPod = ({ pod }) => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      PodService.find(pod.name).then((response) => {
        setUserData(response.data.data);
      });
  }, [pod.name, showModal]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="ajshd" onClose={closeModal}>
        <div className="flex flex-col mt-5">
          <RowDetails label="" value={userData.name} />
          <RowDetails label="" value={userData.username} />
        </div>
      </ViewModal>
    </>
  );
};

export default ShowPod;
