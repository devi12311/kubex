import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import IngressService from '@services/IngressService';

const ShowIngress = ({ ingress, namespace }) => {
  const [showModal, setShowModal] = useState(false);
  const [rules, setRules] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      IngressService.find(namespace, ingress.metadata.name).then((response) => {
        setRules(ingress.spec.rules);
      });
  }, [ingress.metadata.name, ingress, showModal, namespace]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="Routing rules" onClose={closeModal}>
        <div className="flex flex-col mt-5 mx-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border-2 p-3 font-bold text-lg">Host</th>
                <th className="border-2 p-3 font-bold text-lg">Paths</th>
                <th className="border-2 p-3 font-bold text-lg">Type</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr>
                  <td className="border-2 p-3">{rule.host}</td>
                  <td className="border-2 p-3">
                    {rule.http.paths.flatMap((path) => path.path).join(',')}
                  </td>
                  <td className="border-2 p-3">
                    {rule.http.paths.flatMap((path) => path.pathType).join(',')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ViewModal>
    </>
  );
};

export default ShowIngress;
