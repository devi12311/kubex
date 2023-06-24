import React, { useEffect, useState } from 'react';
import ViewModal from '@core/modals/ViewModal';
import ViewButton from '@core/buttons/atoms/ViewButton';
import SecretService from '@services/SecretService';

const ShowSecret = ({ secret, namespace }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal)
      SecretService.find(namespace, secret.metadata.name).then((response) => {
        const keys = Object.keys(secret.data);
        const array = keys.map((key) => ({ key: `${key}`, value: secret.data[`${key}`] }));
        console.log(array);
        setData(array);
      });
  }, [secret.metadata.name, secret, showModal, namespace]);

  return (
    <>
      <ViewButton onClick={() => setShowModal(true)} />
      <ViewModal show={showModal} title="Data" onClose={closeModal}>
        <div className="flex flex-col mt-5 mx-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border-2 p-3 font-bold text-lg">Key</th>
                <th className="border-2 p-3 font-bold text-lg">Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((singleKey) => (
                <tr>
                  <td className="border-2 p-3">{singleKey.key}</td>
                  <td className="border-2 p-3">{singleKey.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ViewModal>
    </>
  );
};

export default ShowSecret;
