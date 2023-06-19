import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const ApiSelect = ({ service, onSelect, selected, placeholder, extraParams, disabled = false }) => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const [options, setOptions] = useState([]);
  const [selectedObject, setSelectedObject] = useState();

  const handleChangeSelected = (item) => {
    setSelectedObject(item);
    return onSelect && onSelect(item.id);
  };

  useEffect(() => {
    service.all(extraParams).then((response) => {
      const items = response.data?.data;
      // TODO: Temporary solution for highlighting the correct value (react-selects)
      const mappedOptions = items.map((item) => {
        return { value: item.id, ...item };
      });
      setOptions(mappedOptions);
    });
  }, [extraParams, service]);

  useEffect(() => {
    const foundItem = options?.find((item) => item.id === selected);
    setSelectedObject(foundItem || null);
  }, [selected, options]);

  return (
    <Select
      isDisabled={disabled}
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
            {language === 'al' ? selectedObject.name : selectedObject.name_eng}
          </span>
        </div>
      )}
    />
  );
};

export default ApiSelect;
