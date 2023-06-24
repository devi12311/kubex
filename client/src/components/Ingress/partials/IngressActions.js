import React from 'react';
import DeleteEntity from '@hoc/cruds/DeleteEntity';
import ShowIngress from '@components/Ingress/ShowIngress';
import IngressService from '@services/IngressService';

const IngressActions = ({ ingress, onDeleted, namespace }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <ShowIngress ingress={ingress} namespace={namespace} />
      </div>
      <DeleteEntity
        service={IngressService}
        id={ingress.metadata.name}
        onDeleted={onDeleted}
        namespace={namespace}
      />
    </div>
  );
};

export default IngressActions;
