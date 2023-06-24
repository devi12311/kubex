import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import PersistentVolumeService from '@services/PersistentVolumeService';
import PersistentVolumeClaimService from '@services/PersistentVolumeClaimService';

const ShowPersistentVolumeClaim = ({ pvc, namespace }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      PersistentVolumeClaimService.find(namespace, pvc.metadata.name).then((response) => {
        console.log(pvc);
        setData(pvc);
      });
  }, [pvc.metadata.name, pvc, showModal, namespace]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="Specifics" onClose={closeModal}>
        <div className="flex flex-col mt-5 mx-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border-2 p-3 font-bold text-lg">Requests</th>
                <th className="border-2 p-3 font-bold text-lg">Access Modes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 p-3">{pvc.spec.resources.requests.storage}</td>
                <td className="border-2 p-3">{pvc.spec.accessModes.join(',')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ViewModal>
    </>
  );
};

export default ShowPersistentVolumeClaim;
