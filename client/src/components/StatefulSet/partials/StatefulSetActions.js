import React from 'react';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import StatefulSetService from '@services/StatefulSetService';
import ShowStatefulSet from '@components/StatefulSet/ShowStatefulSet';

const StatefulSetActions = ({ statefulset, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowStatefulSet statefulset={statefulset} namespace={namespace} />
      </div>
      <DeleteEntity
        service={StatefulSetService}
        id={statefulset.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default StatefulSetActions;
