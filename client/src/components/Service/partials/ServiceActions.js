import React from 'react';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import ServiceService from '@services/ServiceService';
import ShowService from '@components/Service/ShowService';

const ServiceActions = ({ service, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowService service={service} namespace={namespace} />
      </div>
      <DeleteEntity
        service={ServiceService}
        id={service.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default ServiceActions;
