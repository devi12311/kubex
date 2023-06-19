import React, { useContext, useState } from 'react';
import { AuthContext } from '@core/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout } from 'react-icons/ai';
import { logout } from '@redux/authentication/Action';
import SidebarItem from '@core/items/SidebarItem';
import { FaUsers, FaUsersCog } from 'react-icons/fa';
import ResetPasswordModal from '@components/User/partials/ResetPasswordModal';
import SidebarSubItem from '@core/items/SidebarSubItem';
import { useTranslation } from 'react-i18next';

const MobileMenu = ({ open }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useContext(AuthContext);

  const LogoutButton = ({ onClick }) => (
    <div
      className="w-full flex text-red-600 text-lg cursor-pointer mt-8 align-middle"
      onClick={onClick}>
      <span className="mr-3 h-5 mt-1 text-xl">
        <AiOutlineLogout />
      </span>
      <div>{t('logout')}</div>
    </div>
  );

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // eslint-disable-next-line no-undef
  const name = useSelector((state) => _.get(state, 'meReducer.name', ''));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main
      className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out  ${
        open
          ? 'transition-opacity opacity-100 duration-500'
          : 'transition-opacity opacity-0 delay-500 translate-x-full'
      }`}>
      {showModal ? <ResetPasswordModal modalState={showModal} onCloseModal={setShowModal} /> : null}
      <div
        className={`w-44 md:w-50 right-0 absolute bg-white bg-fixed h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ${
          open ? 'translate-x-0 ' : 'translate-x-full'
        }`}>
        <article className="relative w-screen flex flex-col space-y-6 h-full justify-between">
          <div className="flex-1 lg:px-5 py-5 overflow-y-scroll">
            <ul className="float-left pl-0 block lg:hidden mt-15">
              {isAuthenticated && (
                <div className="flex flex-col">
                  <div
                    className={`mx-2 bg-white rounded-md flex border justify-between ${
                      isOpen ? 'text-indigo-800 border-indigo-800' : 'text-gray-600'
                    }`}>
                    <div
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                      className={`px-4 py-2 text-sm ${
                        isOpen ? 'text-indigo-800' : 'text-gray-600'
                      } hover:text-indigo-800 font-semibold`}>
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
                        <div className="absolute right-0 z-10 w-36 mt-2 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                          <div>
                            <div
                              onClick={() => {
                                setIsOpen(false);
                                setShowModal(!showModal);
                              }}
                              className="block px-3 py-3 text-xs text-gray-500 rounded-lg hover:bg-indigo-50 hover:text-gray-700">
                              {t('changePassword')}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <ul className="flex flex-col py-4">
                    <SidebarItem
                      icon={<FaUsers />}
                      label={t('users')}
                      permissions={['view_users', 'view_roles']}
                      exact>
                      <SidebarSubItem
                        icon={<FaUsers />}
                        label="User"
                        link="/configurations/users"
                        permission="view_users"
                      />
                      <SidebarSubItem
                        icon={<FaUsersCog />}
                        label="Role"
                        link="/configurations/roles"
                        permission="view_roles"
                      />
                    </SidebarItem>
                  </ul>
                </div>
              )}
              {isAuthenticated && (
                <div className="flex-col flex mx-auto px-5">
                  <LogoutButton onClick={handleLogout} />
                </div>
              )}
            </ul>
          </div>
        </article>
      </div>
      <section className=" w-screen h-full cursor-pointer" />
    </main>
  );
};
export default MobileMenu;
