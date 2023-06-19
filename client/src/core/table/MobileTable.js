import React from 'react';
import Pagination from '@core/pagination/Pagination';
import EmptyTable from '@core/table/EmptyTable';
import LoadingTable from '@core/table/LoadingTable';

const MobileTable = ({
  title,
  headers,
  data = [],
  isLoading,
  page,
  onPageChange,
  totalRows,
  pageCount,
  ...props
}) => {
  return (
    <div {...props}>
      <label className="text-lg font-bold text-gray-800">{title}</label>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <>
          {pageCount === 0 ? (
            <div className="flex mx-auto mt-4 w-10/12">
              <EmptyTable />
            </div>
          ) : (
            data.map((row) => {
              return (
                <div key={row.id} className="my-6 border border-gray-300 rounded-md shadow-ml mx-2">
                  {headers.map((header) => {
                    const { id, name, selector, cell } = header;
                    return (
                      <div
                        key={id}
                        className={`flex ${
                          name ? 'justify-between' : 'justify-center'
                        } p-3 last:border-none border-b items-center`}>
                        {name && (
                          <div className="flex-1 font-semibold text-xs text-gray-700">{name}</div>
                        )}
                        <div
                          className={`flex flex-1 overflow-wrap ${
                            name ? 'justify-end' : 'justify-center'
                          } text-xs`}>
                          {selector ? selector(row) : cell(row)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
          {pageCount > 1 && (
            <Pagination
              page={page}
              pageCount={pageCount}
              onPageChange={onPageChange}
              totalRows={totalRows}
              className="flex justify-center"
            />
          )}
        </>
      )}
    </div>
  );
};

export default MobileTable;
