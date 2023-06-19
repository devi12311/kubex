import React from 'react';
import Lottie from '@core/Lottie';
import { useTranslation } from 'react-i18next';

const EmptyTable = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="w-1/3 mx-auto my-5">
        <Lottie animationData={require('@assets/animations/empty_results.json')} />

        <div className="text-md font-normal text-center text-gray-700 mt-5 mb-10">
          {t('noData')}
        </div>
      </div>
    </div>
  );
};
export default EmptyTable;
