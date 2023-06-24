import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import NodeService from '@services/NodeService';

const ShowNode = ({ node, namespace }) => {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      NodeService.find(namespace, node.metadata.name).then((response) => {
        setImages(node.status.images);
      });
  }, [node.metadata.name, node, showModal, namespace]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="Conditions" onClose={closeModal}>
        <div className="flex flex-col mt-5 mx-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border-2 p-3 font-bold text-lg">Image Name</th>
                <th className="border-2 p-3 font-bold text-lg">Size Bytes</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr>
                  <td className="border-2 p-3">{image.names.join(',')}</td>
                  <td className="border-2 p-3">{image.sizeBytes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ViewModal>
    </>
  );
};

export default ShowNode;
