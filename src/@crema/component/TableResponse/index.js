import React from 'react';
import AppTableContainer from 'src/@crema/core/AppTableContainer';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { toNumberSpace } from 'src/shared/utils/filter';

export const TableResponse = ({
  tableSize,
  isLoading,
  dataSource,
  pageSize,
  page,
  total,
  columns,
  setPage,
  setPageSize,
  ...restProps
}) => {
  const handleChangeTable = (pagination) => {
    setPage(pagination?.current);
    if (pagination?.pageSize !== pageSize) {
      setPage(1);
      setPageSize(pagination?.pageSize);
    }
  };
  return (
    <>
      <AppTableContainer
        size={tableSize}
        data={dataSource}
        loading={isLoading}
        columns={columns}
        sticky={{
          offsetHeader: 48,
        }}
        onChange={handleChangeTable}
        pagination={{
          position: ['bottomRight'],
          pageSize: pageSize,
          total: total,
          size: 'large',
          showTotal: (total, range) => (
            <IntlMessages
              id='table.pagination.show_total'
              values={{
                from: toNumberSpace(range[0]),
                to: toNumberSpace(range[1]),
                total: toNumberSpace(total),
              }}
            />
          ),
          style: { marginRight: 16 },
          totalBoundaryShowSizeChanger: 10,
          current: page,
        }}
        scroll={{ x: 'max-content' }}
        {...restProps}
      />
    </>
  );
};
