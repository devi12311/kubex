import React, { useState } from 'react';
import ResetPasswordModal from '@components/User/partials/ResetPasswordModal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AiOutlineLogout } from 'react-icons/ai';
import { logout } from '@redux/authentication/Action';
import {useNavigate} from "react-router-dom";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line no-undef
  const name = useSelector((state) => _.get(state, 'meReducer.name', ''));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
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
        {!name ? t('user') : name}
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
            <div className="p-2 cursor-pointer border-t">
              <div
                onClick={handleLogout}
                className="block px-6 py-3 text-base text-red-600 rounded-lg hover:bg-indigo-50 text-left flex">
                <AiOutlineLogout className="mr-3 mt-1" />
                {t('logout')}
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal ? <ResetPasswordModal modalState={showModal} onCloseModal={setShowModal} /> : null}
    </div>
  );
};

export default UserDropdown;
