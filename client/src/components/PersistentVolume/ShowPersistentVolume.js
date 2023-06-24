import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import PersistentVolumeService from '@services/PersistentVolumeService';

const ShowPersistentVolume = ({ pv, namespace }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      PersistentVolumeService.find(namespace, pv.metadata.name).then((response) => {
        console.log(pv);
        setData(pv);
      });
  }, [pv.metadata.name, pv, showModal, namespace]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="Capacity" onClose={closeModal}>
        <div className="flex flex-col mt-5 mx-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border-2 p-3 font-bold text-lg">Capacity</th>
                <th className="border-2 p-3 font-bold text-lg">Access Modes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 p-3">{pv.spec.capacity.storage}</td>
                <td className="border-2 p-3">{pv.spec.accessModes.join(',')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ViewModal>
    </>
  );
};

export default ShowPersistentVolume;
