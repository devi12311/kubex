import React from 'react';
import BlankModal from '@core/modals/BlankModal';
import { FaEye } from 'react-icons/fa';

const ViewModal = ({ show, title, children, onClose, onSubmit, ...props }) => {
  return (
    <BlankModal
      show={show}
      title={title}
      onClose={onClose}
      maxWidth="3xl"
      icon={<FaEye className="text-indigo-700" />}
      iconBg="bg-indigo-100"
      {...props}>
      {children}
    </BlankModal>
  );
};

export default ViewModal;
