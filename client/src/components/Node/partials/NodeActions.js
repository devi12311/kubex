import React from 'react';
import ShowPod from '@components/Pod/ShowPod';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import NodeService from '@services/NodeService';
import ShowNode from '@components/Node/ShowNode';

const NodeActions = ({ node, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowNode node={node} namespace={namespace} />
      </div>
      <DeleteEntity
        service={NodeService}
        id={node.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default NodeActions;
