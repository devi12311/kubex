import React, { useEffect, useState } from 'react';
import Layout from '@hoc/layouts/Layout';
import DeploymentIndex from '@components/Deployment/DeploymentIndex';
import NamespaceService from '@services/NamespaceService';

const DeploymentsPage = () => {
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
      <DeploymentIndex namespace={selectedNamespace} />
    </Layout>
  );
};

export default DeploymentsPage;
