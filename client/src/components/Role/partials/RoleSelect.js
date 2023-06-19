import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import RoleService from '@services/RoleService';
import { addRoles } from '@redux/selects/Role/Action';

const RoleSelect = ({ openModal, onSelect, selected, placeholder, disabled = false }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const [selectedObject, setSelectedObject] = useState();

  // eslint-disable-next-line no-undef
  const options = useSelector((state) => _.get(state, 'rolesReducer', []));

  const handleChangeSelected = (item) => {
    setSelectedObject(item);
    return onSelect && onSelect(item.id);
  };

  useEffect(() => {
    if (openModal) {
      RoleService.all().then((response) => {
        dispatch(addRoles(response.data?.data));
      });
    }
  }, [dispatch, openModal]);

  useEffect(() => {
    if (options) {
      const foundItem = Object.values(options)?.find((item) => item.id === selected);
      setSelectedObject(foundItem || null);
    }
  }, [selected, options]);

  return (
    <Select
      isDisabled={disabled}
      getOptionValue={(option) => option.id}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      isSearchable={false}
      options={options}
      onChange={handleChangeSelected}
      value={selectedObject}
      placeholder={placeholder}
      getOptionLabel={(selectedObject) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className="text-sm">
          <span style={{ marginLeft: 5 }}>
            {language === 'al' ? selectedObject.name : selectedObject.name}
          </span>
        </div>
      )}
    />
  );
};

export default RoleSelect;
