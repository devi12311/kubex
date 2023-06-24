import React, { useState } from 'react';
import DeleteModal from '@core/modals/DeleteModal';
import { showError, showSuccess } from '@utils/helpers';
import DeleteButton from '@core/buttons/atoms/DeleteButton';
import { useTranslation } from 'react-i18next';
import useHasPermission from '@hooks/useHasPermission';

const DeleteEntity = ({ service, id, onDeleted }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = () => {
    service
      .destroy(id)
      .then(() => {
        showSuccess('Deleted successfully');
        onDeleted();
        closeModal();
      })
      .catch((err) => {
        showError(err.response.data.message);
      });
  };
  return (
    <div>
      <DeleteButton onClick={() => setShowModal(true)} />
      <DeleteModal
        show={showModal}
        title="Are you sure u wanna delete this"
        onClose={closeModal}
        onSubmit={onSubmit}>
        <div className="text-lg my-3 ml-5">
          <span> Are you sure u wanna delete </span>
        </div>
      </DeleteModal>
    </div>
  );
};

export default DeleteEntity;
