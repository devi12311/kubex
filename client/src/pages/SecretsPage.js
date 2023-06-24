import React, { useEffect, useState } from 'react';
import Layout from '@hoc/layouts/Layout';
import NamespaceService from '@services/NamespaceService';
import SecretIndex from '@components/Secret/SecretIndex';

const SecretsPage = () => {
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
      <SecretIndex namespace={selectedNamespace} />
    </Layout>
  );
};

export default SecretsPage;
