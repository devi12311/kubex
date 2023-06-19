import React from 'react';
import { FaUsers, FaUsersCog, FaUserShield } from 'react-icons/fa';
import SidebarItem from '@core/items/SidebarItem';
import SidebarSubItem from '@core/items/SidebarSubItem';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <aside className="h-screen sticky top-0 min-w-max w-56 bg-white border hidden lg:block relative">
      <Link to="/" className="h-16 flex items-center justify-center">
        <h1>LOGO</h1>
      </Link>
      <ul className="flex flex-col py-4 mt-6 h-screen overflow-y-auto">
        <SidebarItem
          icon={<FaUserShield />}
          label={t('users')}
          permissions={['view_users', 'view_roles']}
          exact>
          <SidebarSubItem
            icon={<FaUsers />}
            label={t('users')}
            link="/users"
            permission="view_users"
          />
          <SidebarSubItem
            icon={<FaUsersCog />}
            label={t('roles')}
            link="/roles"
            permission="view_roles"
          />
        </SidebarItem>
        <div className="py-10" />
      </ul>
    </aside>
  );
};

export default Sidebar;
