import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Collapse } from 'react-collapse';
import { useNavigate } from 'react-router-dom';
import useActiveMenuItem from '@hooks/useActiveMenuItem';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const SidebarItem = ({ icon, label, link, children, exact = false, permissions }) => {
  const navigate = useNavigate();
  const isActive = useActiveMenuItem(link, children, exact);
  const [isOpen, setIsOpen] = useState(isActive);
  const [hasAccess, setHasAccess] = useState(false);

  const userPermissions = useSelector((state) =>
    _.get(state, 'permissionsReducer.permissions', [])
  );

  useEffect(() => {
    if (
      userPermissions.length > 0 &&
      permissions &&
      permissions.some((permission) => userPermissions.includes(permission))
    ) {
      setHasAccess(true);
    }
  }, [permissions, userPermissions]);

  const handleClick = () => {
    if (link) {
      return navigate(link);
    }

    setIsOpen((prev) => !prev);
  };

  return hasAccess ? (
    <li className="mx-2">
      <span
        onClick={handleClick}
        className={`flex flex-row items-center h-10 transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-700 cursor-pointer rounded-md ${
          isActive ? 'text-primary-700 bg-gray-100' : 'text-gray-500'
        }`}>
        <span
          className={`inline-flex items-center justify-center h-12 w-12 text-lg ${
            isActive ? 'text-gray-700' : 'text-gray-400'
          }`}>
          {icon}
        </span>
        <span className={`text-sm ${isActive ? 'font-semibold text-gray-700' : 'text-gray-500'}`}>
          {label}
        </span>
        {children && (
          <span className="ml-auto mr-2 text-gray-400">
            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        )}
      </span>
      <Collapse isOpened={isOpen}>
        <ul className="flex flex-col bg-brand-header-bg">{children}</ul>
      </Collapse>
    </li>
  ) : null;
};

export default SidebarItem;
