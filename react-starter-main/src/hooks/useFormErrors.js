import { useCallback, useState } from 'react';
import validate from 'validate.js';
import { useTranslation } from 'react-i18next';

const useFormErrors = () => {
  const [errors, setErrors] = useState(null);
  const { t } = useTranslation();

  const validateErrors = (attributes, constraints) => {
    const errors = validate(attributes, constraints, { fullMessages: false });
    setErrors(errors);
    return errors;
  };

  const clearError = (key, value, setFunction) => {
    setErrors((prev) => {
      return { ...prev, [key]: undefined };
    });
    if (setFunction) {
      setFunction(value);
    }
  };

  const clearErrors = useCallback(() => setErrors(null), []);

  const getError = (key) => {
    if (!errors) {
      return;
    }
    const errorKey = errors[key] ? errors[key][0] : undefined;
    return errorKey ? t(errorKey) : undefined;
  };

  return { clearError, clearErrors, getError, validateErrors };
};

export default useFormErrors;
