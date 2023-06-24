import React, { useEffect, useState } from 'react';
import Layout from '@hoc/layouts/Layout';
import ServiceIndex from '@components/Service/ServiceIndex';
import NamespaceService from '@services/NamespaceService';

const ServicesPage = () => {
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
      <ServiceIndex namespace={selectedNamespace} />
    </Layout>
  );
};

export default ServicesPage;
