import React, { useEffect, useState } from 'react';
import Layout from '@hoc/layouts/Layout';
import IngressIndex from '@components/Ingress/IngressIndex';
import NamespaceService from '@services/NamespaceService';

const IngressesPage = () => {
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
      <IngressIndex namespace={selectedNamespace} />
    </Layout>
  );
};

export default IngressesPage;
