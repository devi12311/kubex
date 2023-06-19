import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react';
import SearchInput from '@core/inputs/SearchInput';
import _ from 'lodash';
import EmptyTable from '@core/table/EmptyTable';
import LoadingTable from '@core/table/LoadingTable';
import { useTranslation } from 'react-i18next';

const Datatable = ({
  headers,
  totalRows,
  getData = () => {},
  initialPageSize = 10,
  title = null,
  data = null,
  onRowClicked = () => {},
  isLoading = false,
  pointerOnHover = false,
  extraDependencies = [],
  ...props
}) => {
  const { t } = useTranslation();
  const [sortColumn, setSortColumn] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [qs, setQs] = useState(null);

  const handleSort = async (column, sortDirection) => {
    setSortColumn(column.id);
    setSortDirection(sortDirection);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
  };

  const search = _.debounce((e) => {
    setQs(e || null);
  }, 400);

  useEffect(() => {
    const params = {};
    if (pageSize) {
      params['page-size'] = pageSize;
    }
    if (page) {
      params.page = page;
    }
    if (qs) {
      params.qs = qs;
    }
    if (sortColumn && sortDirection) {
      params.sortColumn = sortColumn;
      params.sortDirection = sortDirection;
    }
    getData(params);
    // eslint-disable-next-line
  }, [page, pageSize, qs, sortDirection, sortColumn, ...extraDependencies]);

  return (
    <>
      <div className={`flex justify-${title ? 'between' : 'end'} my-2 pt-3 pb-1 items-center`}>
        {title && <label className="text-lg font-bold text-gray-800">{title}</label>}
        <SearchInput onKeyUp={search} placeholder={t('search')} />
      </div>
      <hr />
      <DataTable
        columns={headers}
        data={data}
        pagination
        striped
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={pageSize}
        paginationDefaultPage={page}
        onChangePage={(page) => handlePageChange(page)}
        onChangeRowsPerPage={handlePageSizeChange}
        onSort={handleSort}
        sortServer
        onRowClicked={onRowClicked}
        progressPending={isLoading}
        progressComponent={<LoadingTable />}
        pointerOnHover={pointerOnHover}
        persistTableHead
        noDataComponent={<EmptyTable />}
        {...props}
      />
    </>
  );
};

export default Datatable;
