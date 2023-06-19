import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { monthOptions } from '@constants/months';
import { useCallback } from 'react';

const useDateOptions = (date) => {
  const { t } = useTranslation();

  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const numberOfDays = moment(`${month}/${year}`, 'MM/YYYY').daysInMonth() || 31;
  const now = new Date().getFullYear();

  const days = useCallback(
    () =>
      Array.from(Array(numberOfDays).keys()).map((day) => {
        return {
          label: day + 1,
          value: String(day + 1).padStart(2, '0')
        };
      }),
    [numberOfDays]
  );

  const months = useCallback(
    () =>
      monthOptions.map((option) => {
        return { value: option.value.padStart(2, '0'), label: t(`months.${option.label}`) };
      }),
    [t]
  );

  const years = useCallback(() => {
    const previousYears = Array.from(Array(101).keys()).map((index) => ({
      label: now - index,
      value: String(now - index)
    }));

    const futureYears = Array.from(Array(100).keys())
      .map((index) => ({
        label: now + index + 1,
        value: String(now + index + 1)
      }))
      .reverse();

    return [...futureYears, ...previousYears];
  }, [now]);

  return { days, months, years };
};

export default useDateOptions;
