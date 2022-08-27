import React from 'react';
import { useTable, usePagination } from 'react-table';
import '../style/TableWithPagination.scss';
import Pagination from './Pagination';
import styled from 'styled-components'

function TableWithPagination({ columns, data }) {
  const {
    page,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
      },
    },
    usePagination
  );

  const Card = styled.div`
    backgroundColor : white;
  `

  return (
    <>
      <Card className='card'>
        <div className='card-body'>
          <table className='table table-light' {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {data.length > 0 ? (
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>NO DATA TO DISPLAY</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </Card>
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
        nextPage={nextPage}
        previousPage={previousPage}
        pageCount={pageCount}
        gotoPage={gotoPage}
      />
    </>
  );
}

export default TableWithPagination;
