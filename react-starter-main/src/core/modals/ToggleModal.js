import React from 'react';
import BlankModal from '@core/modals/BlankModal';
import { FaQuestion } from 'react-icons/fa';
import SubmitButton from '@core/buttons/atoms/SubmitButton';

const ToggleModal = ({ show, title, children, onClose, onSubmit, loading, label, ...props }) => {
  return (
    <BlankModal
      show={show}
      title={title}
      onClose={onClose}
      maxWidth="3xl"
      icon={<FaQuestion className="text-primary-700" />}
      iconBg="bg-primary-100"
      otherButtons={[<SubmitButton loading={loading} onClick={onSubmit} label={label} />]}
      {...props}>
      {children}
    </BlankModal>
  );
};
export default ToggleModal;
