import React from 'react';
import BlankModal from '@core/modals/BlankModal';
import { FaTrash } from 'react-icons/fa';
import RedButton from '@core/buttons/electrons/RedButton';
import { useTranslation } from 'react-i18next';

const DeleteModal = ({ show, title, children, onClose, onSubmit, ...props }) => {
  const { t } = useTranslation();
  return (
    <BlankModal
      width="sm:w-1/3"
      show={show}
      title={title}
      onClose={onClose}
      icon={<FaTrash className="text-red-800" />}
      iconBg="bg-red-100"
      maxWidth="3xl"
      otherButtons={[<RedButton sm onClick={onSubmit} label={t('delete')} />]}
      {...props}>
      {children}
    </BlankModal>
  );
};

export default DeleteModal;
