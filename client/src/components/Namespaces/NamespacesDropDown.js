import React, { useState } from 'react';

const NamespacesDropdown = ({ namespaces, onSelected, selectedNamespace }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnSelect = (name) => {
    console.log(name);
    onSelected(name);
  };

  return (
    <div className="inline-flex bg-white border rounded-md">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`px-4 py-2 text-sm ${
          isOpen ? 'text-indigo-800 border border-b border-indigo-800' : 'text-gray-600'
        } hover:text-indigo-800 hover:bg-gray-50 rounded-l-md font-semibold uppercase cursor-pointer`}>
        {selectedNamespace}
      </div>
      <div className="relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          type="button"
          className={`inline-flex items-center justify-center h-full px-2 text-gray-600 border-l ${
            isOpen ? 'border-indigo-800' : 'border-gray-100'
          } hover:text-gray-700 rounded-r-md hover:bg-gray-50`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 z-10 w-76 mt-2 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
            {namespaces.map((namespace, index) => {
              return (
                <div
                  key={index}
                  className="p-2 cursor-pointer border-t"
                  onClick={() => {
                    handleOnSelect(namespace.metadata.name);
                    setIsOpen(false);
                  }}>
                  <div className="block px-6 py-3 text-base rounded-lg hover:bg-indigo-50 text-left flex">
                    {namespace.metadata.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NamespacesDropdown;
