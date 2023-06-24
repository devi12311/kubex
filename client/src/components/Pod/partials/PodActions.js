import React from 'react';
import ShowPod from '@components/Pod/ShowPod';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import PodService from '@services/PodService';

const PodActions = ({ pod, onDeleted }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowPod pod={pod} />
      </div>
      <DeleteEntity service={PodService} id={pod.metadata.name} onDeleted={onDeleted} />
    </div>
  );
};

export default PodActions;
