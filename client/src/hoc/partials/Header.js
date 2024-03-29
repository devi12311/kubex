import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import MobileMenu from '@hoc/partials/MobileMenu';
import UserDropdown from '@components/User/partials/UserDropdown';
import NamespacesDropdown from '@components/Namespaces/NamespacesDropDown';

const Header = ({ namespaces, onSelected, selectedNamespace }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-900">
      <div className="relative items-center h-14 lg:h-16 shadow flex">
        <div className="hidden lg:flex w-full justify-between">
          <div className="flex mr-6 ">
            <NamespacesDropdown
              namespaces={namespaces}
              onSelected={onSelected}
              selectedNamespace={selectedNamespace}
            />
          </div>
          <div className="flex mr-6">
            <UserDropdown />
          </div>
        </div>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="flex-1 text-2xl absolute right-8 top-6 cursor-pointer lg:hidden text-indigo-900 z-40">
        {open ? <FaTimes classname="sticky" /> : <FaBars />}
      </div>
      <MobileMenu open={open} />
    </nav>
  );
};

export default Header;
