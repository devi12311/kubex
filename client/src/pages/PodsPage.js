import React, { useEffect, useState } from 'react';
import Layout from '@hoc/layouts/Layout';
import PodIndex from '@components/Pod/PodIndex';
import NamespaceService from '@services/NamespaceService';

const PodsPage = () => {
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
      <PodIndex namespace={selectedNamespace} />
    </Layout>
  );
};

export default PodsPage;
