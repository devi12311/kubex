import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import GuestRoute from '@router/GuestRoute';
import UsersPage from '@pages/UsersPage';
import AuthRoute from '@router/AuthRoute';
import RolesPage from '@pages/RolesPage';
import HomePage from '@pages/HomePage';
import RegisterPage from '@pages/RegisterPage';
import { Routes } from 'react-router';
import PodsPage from '@pages/PodsPage';
import DeploymentsPage from '@pages/DeploymentsPage';
import StatefulSetPage from '@pages/StatefulSetPage';
import ServicesPage from '@pages/ServicesPage';
import IngressesPage from '@pages/IngressesPage';
import ConfigMapsPage from '@pages/ConfigMapsPage';
import SecretsPage from '@pages/SecretsPage';
import PersistentVolumesPage from '@pages/PersistentVolumesPage';
import PersistentVolumeClaimsPage from '@pages/PersistentVolumeClaimsPage';
import NodesPage from '@pages/NodesPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/pods" element={<PodsPage />} />
          <Route exact path="/deployments" element={<DeploymentsPage />} />
          <Route exact path="/stateful-sets" element={<StatefulSetPage />} />
          <Route exact path="/services" element={<ServicesPage />} />
          <Route exact path="/ingresses" element={<IngressesPage />} />
          <Route exact path="/configmaps" element={<ConfigMapsPage />} />
          <Route exact path="/secrets" element={<SecretsPage />} />
          <Route exact path="/pv" element={<PersistentVolumesPage />} />
          <Route exact path="/pvc" element={<PersistentVolumeClaimsPage />} />
          <Route exact path="/nodes" element={<NodesPage />} />
          <Route exact path="/roles" element={<RolesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
