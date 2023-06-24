import React from 'react';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import ConfigMapService from '@services/ConfigMapService';
import ShowConfigMap from '@components/ConfigMap/ShowConfigMap';
import ShowSecret from '@components/Secret/ShowSecret';
import SecretService from '@services/SecretService';

const SecretActions = ({ secret, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowSecret secret={secret} namespace={namespace} />
      </div>
      <DeleteEntity
        service={SecretService}
        id={secret.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default SecretActions;
