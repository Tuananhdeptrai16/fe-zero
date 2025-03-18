import React from 'react';
import AppsPagination from 'src/@crema/core/AppsPagination';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';

const DataTableFooter = () => {
  const {
    page,
    total,
    pageSize,

    setPage,
    // setTotal,
    // setPageSize,
  } = useDataTableContext();

  return (
    <div>
      <AppsPagination
        className='order-footer-pagination'
        pageSize={pageSize}
        count={total}
        page={page}
        onChange={setPage}
      />
    </div>
  );
};

export default DataTableFooter;
