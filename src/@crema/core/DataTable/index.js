import { Card, Space } from 'antd';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
// import { useIntl } from 'react-intl';
import DataTableContent from 'src/@crema/core/DataTable/DataTableContent';
import DataTableContext from 'src/@crema/core/DataTable/DataTableContext'; // useDataTableContext,
import DataTableFilter from 'src/@crema/core/DataTable/DataTableFilter';
import DataTableHeader from 'src/@crema/core/DataTable/DataTableHeader';
// import IntlMessages from 'src/@crema/utility/IntlMessages';
import { TABLE_SORT_VALUE } from 'src/shared/constants/DataTable';
import { isEmpty } from 'src/shared/utils/Typeof';

import styles from './index.module.scss';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

const DataTable = ({
  isShowHeaderTable,
  isShowSearch,
  isShowDownload,
  toolbars,
  toolbarsMini,
  filters,
  children,
  rowKey,
  scroll,
  layoutFilterCustom = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: {
      style: { maxWidth: 'calc(100% - 120px)' },
    },
  },
  onQuery,
}) => {
  // const { selectedRowKeys, setSelectedRowKeys } = useDataTableContext();
  // const { messages } = useIntl();
  //
  // const clear = () => {
  //   setSelectedRowKeys([]);
  // };
  return (
    <div className={styles.dataTableWrapper}>
      {!isEmpty(filters) && (
        <Card
          bordered={false}
          className={`data-table-filter ${styles.dataTableFilter}`}>
          <DataTableFilter
            filters={filters}
            layout={layoutFilterCustom}
            onQuery={onQuery}
          />
        </Card>
      )}
      <Card
        bordered={false}
        className={`data-table-content ${styles.dataTableContent}`}>
        {isShowHeaderTable && (
          <Space
            className={`data-table-header ${styles.dataTableHeader}`}
            size={[0, 12]}
            direction='vertical'>
            <DataTableHeader
              isShowDownload={isShowDownload}
              isShowSearch={isShowSearch}
              toolbars={toolbars}
              toolbarsMini={toolbarsMini}
            />
          </Space>
        )}
        {/*{selectedRowKeys?.length > 0 && (*/}
        {/*  <Alert*/}
        {/*    className={styles.infoSelectedRow}*/}
        {/*    message={*/}
        {/*      <IntlMessages*/}
        {/*        id='table.toolbar.infoSelected'*/}
        {/*        values={{ numRow: selectedRowKeys?.length }}*/}
        {/*      />*/}
        {/*    }*/}
        {/*    type='info'*/}
        {/*    action={*/}
        {/*      <Button onClick={clear} size='small' type='link'>*/}
        {/*        {messages['table.toolbar.clearSelected']}*/}
        {/*      </Button>*/}
        {/*    }*/}
        {/*  />*/}
        {/*)}*/}
        <DataTableContent scroll={scroll} rowKey={rowKey} />
      </Card>
      {children}
    </div>
  );
};

DataTable.propTypes = {
  isShowHeaderTable: PropTypes.bool,
  // columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.array,
  isShowSearch: PropTypes.bool,
  toolbars: PropTypes.array,
  toolbarsMini: PropTypes.array,
  initTable: PropTypes.object,
  children: PropTypes.node,
};

const DataTableWrapper = forwardRef(
  (
    {
      url,
      urlDownload,
      syncURL,
      pageName,
      itemSelected,
      initTable = {},
      method = METHOD_FETCH.POST,
      buildBodyQuery,
      ...props
    },
    ref,
  ) => {
    const { columns, event, ...restProps } = props;
    const columnSort = (props?.columns || []).find(
      (column) => column?.defaultSortOrder,
    );

    let initTableSort;
    if (columnSort) {
      initTableSort = [
        {
          field: columnSort?.dataIndex,
          desc: columnSort?.defaultSortOrder === TABLE_SORT_VALUE.DESCEND,
        },
      ];
    }

    return (
      <DataTableContext
        ref={ref}
        url={url}
        urlDownload={urlDownload}
        pageName={pageName}
        itemSelected={itemSelected}
        columns={columns}
        event={event}
        syncURL={syncURL}
        initTable={{
          sort: initTableSort,
          ...initTable,
        }}
        buildBodyQuery={buildBodyQuery}
        method={method}>
        <DataTable {...restProps} isShowDownload={!isEmpty(urlDownload)} />
      </DataTableContext>
    );
  },
);

DataTableWrapper.propTypes = {
  url: PropTypes.string.isRequired,
  pageName: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  event: PropTypes.object,
  initTable: PropTypes.object,
  isShowSearch: PropTypes.bool,
  syncURL: PropTypes.bool,
  itemSelected: PropTypes.object,
  children: PropTypes.node,
};

DataTableWrapper.defaultProps = {
  isShowSearch: true,
  isShowHeaderTable: true,
  syncURL: true,
  event: {},
};

export default DataTableWrapper;
