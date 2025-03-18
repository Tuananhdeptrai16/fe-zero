import { Space } from 'antd';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AntButton from 'src/@crema/component/AntButton/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
// import { isFunction } from 'src/shared/utils/Typeof';
import { useDataTableContext } from '../DataTableContext';
import './data-table-selected-footer.styles.less';
const DataTableSelectedFooter = () => {
  const appContentWidth = useSelector(
    (state) => state?.common?.appContentWidth,
  );
  const { data, rowSelection, itemSelected } = useDataTableContext();
  const { selectedRowKeys, onChange: setSelectedRowKeys } = rowSelection;
  const { action, clickAction, preItemSelect } = itemSelected;

  const removeSelectedRowKeys = () => {
    setSelectedRowKeys([]);
  };

  const itemsSelected = useMemo(() => {
    const items = data.filter((item) => selectedRowKeys?.includes(item?.id));

    if (preItemSelect) {
      return preItemSelect(items);
    }

    return items;
  }, [selectedRowKeys, preItemSelect, data]);

  const counterSelected = useMemo(() => {
    return itemsSelected?.length || 0;
  }, [itemsSelected]);

  return (
    <div
      className='data-table-selected-footer'
      style={{ width: appContentWidth }}>
      <div className='data-table-selected-footer-container'>
        <div>
          <IntlMessages
            id='table.toolbar.infoSelected'
            values={{ numRow: counterSelected }}
          />
        </div>
        <Space size={[12, 0]}>
          <AntButton
            onClick={() => {
              removeSelectedRowKeys();
            }}>
            Đóng
          </AntButton>
          <AntButton
            onClick={() => {
              clickAction(selectedRowKeys, itemsSelected);
            }}
            type='primary'>
            <IntlMessages id={action} values={{ numRow: counterSelected }} />
          </AntButton>
        </Space>
      </div>
    </div>
  );
};

export default DataTableSelectedFooter;
