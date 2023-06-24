import React from 'react';
import Sidebar from '@hoc/partials/Sidebar';
import Header from '@hoc/partials/Header';

const Layout = ({ children, namespaces, onSelected, selectedNamespace = 'default' }) => {
  return (
    <div>
      <div className="min-h-screen flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <Header
            namespaces={namespaces}
            onSelected={onSelected}
            selectedNamespace={selectedNamespace}
          />
          <div className="m-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
