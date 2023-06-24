import React from 'react';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import ShowPersistentVolume from '@components/PersistentVolume/ShowPersistentVolume';
import PersistentVolumeService from '@services/PersistentVolumeService';

const PersistentVolumeActions = ({ pv, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowPersistentVolume pv={pv} namespace={namespace} />
      </div>
      <DeleteEntity
        service={PersistentVolumeService}
        id={pv.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default PersistentVolumeActions;
