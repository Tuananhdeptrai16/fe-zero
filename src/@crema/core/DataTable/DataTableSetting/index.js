import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'src/shared/utils/Typeof';
import AppIconButton from '../../AppIconButton/index';
import { SettingOutlined } from '@ant-design/icons';
import { Popover, Space, Tooltip, Tree, Typography } from 'antd';
import IntlMessage from 'src/@crema/utility/IntlMessages';
import { map, filter } from 'lodash';
import { useDataTableContext } from '../DataTableContext';

import styles from './style.module.scss';
import { onDropTree } from 'src/shared/utils/Array';
import IntlMessages from 'src/@crema/utility/IntlMessages';

const DataTableSetting = (props) => {
  const { as: Component = Fragment, ...restProps } = props;
  const { columns, setColumns, setColumnHidden } = useDataTableContext();
  const treeLists = useMemo(() => {
    return map(columns, (item) => {
      return {
        key: item?.key,
        disabled: !isEmpty(item?.fixed),
        title: item?.title,
      };
    });
  }, [columns]);

  const keysSelected = useMemo(() => {
    return map(
      filter(columns, (item) => {
        return !item?.hidden;
      }),
      (item) => item?.key,
    );
  }, [columns]);

  const onChangeHandler = (checkedKeys, info) => {
    const nodeKey = info.node.key;
    const nodeChecked = info.node.checked;

    setColumnHidden(nodeKey, nodeChecked);
  };

  const onHandleDrop = (info) => {
    setColumns(onDropTree(columns, info));
  };

  const renderTreePopover = () => {
    return (
      <Tree
        draggable
        height={300}
        checkedKeys={keysSelected || []}
        onDrop={onHandleDrop}
        blockNode
        checkable
        titleRender={(data) => {
          if (React.isValidElement(data?.title)) {
            return data?.title;
          } else {
            return (
              <IntlMessages id={data?.title} maxLength={18} placement='right' />
            );
          }
        }}
        treeData={treeLists}
        onCheck={onChangeHandler}
      />
    );
  };

  const renderTitlePopover = () => {
    return (
      <Space size='small'>
        <Typography.Text>
          {<IntlMessage id='table.column.display' />}
        </Typography.Text>
      </Space>
    );
  };
  return (
    <Component {...restProps}>
      <Popover
        overlayClassName={styles.dataTableSetting}
        placement='bottomRight'
        getPopupContainer={(trigger) => {
          return trigger.parentNode;
        }}
        title={renderTitlePopover()}
        content={renderTreePopover()}
        trigger='clicked'>
        <Tooltip title={<IntlMessage id='table.toolbar.setting' />}>
          <AppIconButton icon={<SettingOutlined />} />
        </Tooltip>
      </Popover>
    </Component>
  );
};

DataTableSetting.defaultProps = {
  as: Fragment,
};

DataTableSetting.propTypes = {
  as: PropTypes.elementType,
};

export default DataTableSetting;
