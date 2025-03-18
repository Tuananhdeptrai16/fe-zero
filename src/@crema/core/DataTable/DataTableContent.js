import React from 'react';
import PropTypes from 'prop-types';
import AppTableContainer from 'src/@crema/core/AppTableContainer';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import { TABLE_SORT_VALUE } from 'src/shared/constants/DataTable';
import DataTableSelectedFooter from './DataTableSelectedFooter/index';
import { DEFAULT_CONFIG_TABLE } from 'src/shared/constants/Default';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { toNumberSpace } from 'src/shared/utils/filter';

const DataTableContent = ({ scroll = { x: 'max-content' }, rowKey }) => {
  const {
    tableSize,
    isLoading,
    data,
    pageSize,
    page,
    total,
    rowSelection,
    setPage,
    setPageSize,
    setSort,
  } = useDataTableContext();

  const { columns } = useDataTableContext();
  const columnsShow = columns.filter((column) => !column?.hidden);

  const handleChangeTable = (pagination, filters, sorter) => {
    setPage(pagination?.current);
    if (pagination?.pageSize !== pageSize) {
      setPage(1);
      setPageSize(pagination?.pageSize);
    }
    if (sorter?.order === null || sorter?.order === undefined) {
      setSort(DEFAULT_CONFIG_TABLE.sort);
    } else {
      setSort([
        {
          field: sorter?.field,
          desc: sorter?.order === TABLE_SORT_VALUE.DESCEND,
        },
      ]);
    }
  };

  return (
    <div>
      <AppTableContainer
        rowSelection={rowSelection}
        size={tableSize}
        data={data}
        loading={isLoading}
        columns={columnsShow}
        // sticky={{
        //   offsetHeader: 0,
        // }}
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
        scroll={scroll}
        rowKey={rowKey}
      />
      {rowSelection?.selectedRowKeys?.length > 0 && <DataTableSelectedFooter />}
    </div>
  );
};

export default DataTableContent;

DataTableContent.defaultProps = {
  orderData: [],
};

DataTableContent.propTypes = {
  orderData: PropTypes.array,
  loading: PropTypes.bool,
};
