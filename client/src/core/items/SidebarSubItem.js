import React from 'react';
import { Link } from 'react-router-dom';
import useHasPermission from '@hooks/useHasPermission';
import useActiveMenuItem from '../../hooks/useActiveMenuItem';

const SidebarSubItem = ({ label, icon, link, permission, exact = false, children = [] }) => {
  const isActive = useActiveMenuItem(link, children, exact);
  const hasAccess = useHasPermission(permission);

  return hasAccess ? (
    <li className="pl-5">
      <Link
        to={link}
        className={`flex flex-row items-center h-8 hover:text-gray-700 cursor-pointer ${
          isActive ? 'text-gray-700' : 'text-gray-400'
        }`}>
        <span
          className={`inline-flex items-center justify-center h-12 w-12 text-lg ${
            isActive ? 'text-gray-700' : 'text-gray-400'
          }`}>
          {icon}
        </span>
        <span className={`text-sm ${isActive ? 'font-semibold' : ''}`}>{label}</span>
      </Link>
    </li>
  ) : null;
};

export default SidebarSubItem;
