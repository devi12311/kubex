import React, { useEffect, useState } from 'react';
import Layout from '@hoc/layouts/Layout';
import NamespaceService from '@services/NamespaceService';
import PersistentVolumeClaimIndex from '@components/PersistentVolumeClaim/PersistentVolumeClaimIndex';

const PersistentVolumeClaimPage = () => {
  const [namespaces, setNamespaces] = useState([]);
  const [selectedNamespace, setSelectedNamespace] = useState();

  useEffect(() => {
    NamespaceService.all().then((response) => {
      setNamespaces(response.data);
    });
  }, []);

  return (
    <Layout
      namespaces={namespaces}
      onSelected={setSelectedNamespace}
      selectedNamespace={selectedNamespace}>
      <PersistentVolumeClaimIndex namespace={selectedNamespace} />
    </Layout>
  );
};

export default PersistentVolumeClaimPage;
