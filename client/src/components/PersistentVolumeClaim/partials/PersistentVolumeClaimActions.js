import React from 'react';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import ShowPersistentVolumeClaim from '@components/PersistentVolumeClaim/ShowPersistentVolumeClaim';
import PersistentVolumeClaimService from '@services/PersistentVolumeClaimService';

const PersistentVolumeClaimActions = ({ pvc, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowPersistentVolumeClaim pvc={pvc} namespace={namespace} />
      </div>
      <DeleteEntity
        service={PersistentVolumeClaimService}
        id={pvc.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default PersistentVolumeClaimActions;
