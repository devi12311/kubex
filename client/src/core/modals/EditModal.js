import React from 'react';
import BlankModal from '@core/modals/BlankModal';
import { FaPencilAlt, FaSpinner } from 'react-icons/fa';
import GreenButton from '@core/buttons/electrons/GreenButton';
import { useTranslation } from 'react-i18next';

const EditModal = ({
  show,
  title,
  children,
  onClose,
  onSubmit,
  width,
  loading,
  extraButton,
  label,
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
      icon={<FaPencilAlt className="text-emerald-700" />}
      iconBg="bg-emerald-100"
      otherButtons={[
        <GreenButton
          disabled={loading}
          sm
          onClick={onSubmit}
          label={
            <div className="flex items-center">
              {loading ? (
                <FaSpinner className="animate-spin mr-1" />
              ) : (
                <FaPencilAlt className="mr-1" />
              )}
              {t('edit')}
            </div>
          }
        />,
        extraButton
      ]}
      {...props}>
      {children}
    </BlankModal>
  );
};

export default EditModal;
