import React from 'react';
import ShowPod from '@components/Pod/ShowPod';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import DeploymentService from '@services/DeploymentService';
import ShowDeployment from '@components/Deployment/ShowDeployment';

const DeploymentActions = ({ deployment, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowDeployment deployment={deployment} namespace={namespace} />
      </div>
      <DeleteEntity
        service={DeploymentService}
        id={deployment.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default DeploymentActions;
