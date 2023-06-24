import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import ServiceService from '@services/ServiceService';

const ShowService = ({ service, namespace }) => {
  const [showModal, setShowModal] = useState(false);
  const [ports, setPorts] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      ServiceService.find(namespace, service.metadata.name).then((response) => {
        setPorts(service.spec.ports);
      });
  }, [service.metadata.name, service, showModal, namespace]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="Ports" onClose={closeModal}>
        <div className="flex flex-col mt-5 mx-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border-2 p-3 font-bold text-lg">Port</th>
                <th className="border-2 p-3 font-bold text-lg">Protocol</th>
                <th className="border-2 p-3 font-bold text-lg">Container port</th>
              </tr>
            </thead>
            <tbody>
              {ports.map((port) => (
                <tr>
                  <td className="border-2 p-3">{port.port}</td>
                  <td className="border-2 p-3">{port.protocol}</td>
                  <td className="border-2 p-3">{port.targetPort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ViewModal>
    </>
  );
};

export default ShowService;
