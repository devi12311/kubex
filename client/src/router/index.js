import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import GuestRoute from '@router/GuestRoute';
import UsersPage from '@pages/UsersPage';
import AuthRoute from '@router/AuthRoute';
import RolesPage from '@pages/RolesPage';
import HomePage from '@pages/HomePage';
import { Routes } from 'react-router';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route exact path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/users" element={<UsersPage />} />
          <Route exact path="/roles" element={<RolesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
