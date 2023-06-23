import React from 'react';
import { FaUsers, FaUsersCog, FaUserShield } from 'react-icons/fa';
import SidebarItem from '@core/items/SidebarItem';
import SidebarSubItem from '@core/items/SidebarSubItem';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <aside className="h-screen sticky top-0 min-w-max w-72 bg-white hidden lg:block relative">
      <Link to="/" className="h-16 flex bg-blue-900 items-center justify-center">
        <h1 className="border rounded-lg p-2 text-white ">KUBEX</h1>
      </Link>
      <ul className="flex flex-col py-4 h-screen overflow-y-auto">
        <SidebarItem icon={<FaUserShield />} label="Users" link="/users">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <div className="py-10" />
      </ul>
    </aside>
  );
};

export default Sidebar;
