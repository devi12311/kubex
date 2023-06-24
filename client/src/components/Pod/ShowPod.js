import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import PodService from '@services/PodService';

const ShowPod = ({ pod, namespace }) => {
  const [showModal, setShowModal] = useState(false);
  const [conditions, setConditions] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      PodService.find(namespace, pod.metadata.name).then((response) => {
        setConditions(pod.status.conditions);
      });
  }, [pod.metadata.name, pod, showModal, namespace]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="Conditions" onClose={closeModal}>
        <div className="flex flex-col mt-5 mx-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border-2 p-3 font-bold text-lg">Status</th>
                <th className="border-2 p-3 font-bold text-lg">Type</th>
                <th className="border-2 p-3 font-bold text-lg">Transition Time</th>
              </tr>
            </thead>
            <tbody>
              {conditions.map((condition) => (
                <tr>
                  <td className="border-2 p-3">{condition.status}</td>
                  <td className="border-2 p-3">{condition.type}</td>
                  <td className="border-2 p-3">{condition.lastTransitionTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ViewModal>
    </>
  );
};

export default ShowPod;
