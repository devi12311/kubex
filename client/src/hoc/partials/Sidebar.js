import React from 'react';
import SidebarItem from '@core/items/SidebarItem';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="h-screen sticky top-0 min-w-max w-72 bg-white hidden lg:block relative">
      <Link to="/" className="h-16 flex bg-blue-900 items-center justify-center">
        <h1 className="border rounded-lg p-2 text-white ">KUBEX</h1>
      </Link>
      <ul className="flex flex-col py-4 h-screen overflow-y-auto">
        <SidebarItem label="Pods" link="/pods">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="Deployments" link="/deployments">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="StatefulSets" link="/stateful-sets">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="Services" link="/services">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="Ingresses" link="/ingresses">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="ConfigMaps" link="/configmaps">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="Secrets" link="/secrets">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="Persistent Volumes" link="/pv">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="Persistent Volume Claims" link="/pvc">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <SidebarItem label="Nodes" link="/nodes">
          {/* <SidebarSubItem icon={<FaUsers />} label="User" link="/users" /> */}
        </SidebarItem>
        <div className="py-10" />
      </ul>
    </aside>
  );
};

export default Sidebar;
