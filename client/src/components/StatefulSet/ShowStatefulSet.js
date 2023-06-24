import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import StatefulSetService from '@services/StatefulSetService';

const ShowStatefulSet = ({ statefulset, namespace }) => {
  const [showModal, setShowModal] = useState(false);
  const [volumeClaims, setVolumeClaims] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      StatefulSetService.find(namespace, statefulset.metadata.name).then((response) => {
        setVolumeClaims(response.data.spec.volumeClaimTemplates);
      });
  }, [statefulset.metadata.name, statefulset, showModal, namespace]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="Volume Claims" onClose={closeModal}>
        <div className="flex flex-col mt-5 mx-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border-2 p-3 font-bold text-lg">Name</th>
                <th className="border-2 p-3 font-bold text-lg">Access Modes</th>
                <th className="border-2 p-3 font-bold text-lg">Storage Request</th>
                <th className="border-2 p-3 font-bold text-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {volumeClaims.map((volumeClaim) => (
                <tr>
                  <td className="border-2 p-3">{volumeClaim.metadata.name}</td>
                  <td className="border-2 p-3">{volumeClaim.spec.accessModes.join(',')}</td>
                  <td className="border-2 p-3">{volumeClaim.spec.resources.requests.storage}</td>
                  <td className="border-2 p-3">{volumeClaim.status.phase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ViewModal>
    </>
  );
};

export default ShowStatefulSet;
