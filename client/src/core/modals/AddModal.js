import React from 'react';
import BlankModal from '@core/modals/BlankModal';
import { FaPlus } from 'react-icons/fa';
import SubmitButton from '@core/buttons/atoms/SubmitButton';
import { useTranslation } from 'react-i18next';

const AddModal = ({
  show,
  title,
  children,
  onClose,
  onSubmit,
  width,
  loading = false,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <BlankModal
      width={width}
      show={show}
      title={title}
      onClose={onClose}
      maxWidth="3xl"
      icon={<FaPlus className="text-primary-500" />}
      otherButtons={[<SubmitButton loading={loading} onClick={onSubmit} label={t('add')} />]}
      {...props}>
      {children}
    </BlankModal>
  );
};

export default AddModal;
