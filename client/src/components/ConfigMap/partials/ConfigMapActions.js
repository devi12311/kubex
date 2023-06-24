import React from 'react';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import ConfigMapService from '@services/ConfigMapService';
import ShowConfigMap from '@components/ConfigMap/ShowConfigMap';

const ConfigMapActions = ({ configmap, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowConfigMap configmap={configmap} namespace={namespace} />
      </div>
      <DeleteEntity
        service={ConfigMapService}
        id={configmap.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default ConfigMapActions;
