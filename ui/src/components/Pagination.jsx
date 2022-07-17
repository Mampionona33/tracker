import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
  nextPage,
  previousPage,
  pageCount,
  gotoPage,
}) => {
  const { row_show } = useParams();
  const navigate = useNavigate();

  const handleSelectedRowShow = (event) => {
    setPageSize(event.target.value);
    const currentUrl = window.location.pathname;
    navigate(`${currentUrl.slice(0, -1)}${event.target.value}`);
  };

  useEffect(() => {
    if (row_show) {
      setPageSize(row_show);
    }
  }, [row_show]);

  return (
    <div className='card pagination'>
      <div className='directNav'>
        <button
          type='button'
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <button
          type='button'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <button
          type='button'
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
        <button
          type='button'
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
      </div>
      <div className='pageControl'>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
      </div>
      <select
        title='rowPerPage'
        value={row_show}
        onChange={(e) => {
          handleSelectedRowShow(e);
        }}
      >
        {[3, 7, 15].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
