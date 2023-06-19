import React from 'react';
import Lottie from '@core/Lottie';

const LoadingTable = () => {
  return (
    <div className="w-20 mx-auto my-20">
      <Lottie animationData={require('@assets/animations/loading.json')} />
    </div>
  );
};
export default LoadingTable;
