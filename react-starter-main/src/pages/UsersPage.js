import React from 'react';
import Layout from '@hoc/layouts/Layout';
import UsersIndex from '@components/User/UsersIndex';

const UsersPage = () => {
  return (
    <Layout>
      <UsersIndex />
    </Layout>
  );
};

export default UsersPage;
