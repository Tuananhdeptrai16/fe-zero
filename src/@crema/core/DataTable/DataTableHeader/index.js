import {
  ColumnHeightOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Search from 'antd/es/input/Search';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { TABLE_SIZE, TABLE_SIZE_MAPPING } from 'src/shared/constants/Default';
import DataTableSetting from '../DataTableSetting';

import styles from './style.module.scss';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { useLocation } from 'react-router-dom';

const DataTableHeader = ({
  isShowSearch,
  isShowDownload,
  toolbars,
  toolbarsMini,
}) => {
  const { pageNameTable } = useDataTableContext();
  const { checkPermissionAction } = useJWTAuthActions();
  const {
    isLoadingDownload,
    download,
    isLoading,
    tableSize,
    search: searchDT,

    setSearch: setSearchDT,
    setTableSize,
    reloadPage,
  } = useDataTableContext();
  const { search: searchUrl } = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(searchUrl),
    [searchUrl],
  );
  const [search, setSearch] = useState(searchParams.get('q') || searchDT);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    setSearchDT(e.target.value);
  };

  return (
    <div className={styles.dataTableHeader}>
      <div className={styles.left}>
        {isShowSearch && (
          <Search
            style={{ width: 230, height: 32 }}
            placeholder='Nhập nội dung tìm kiếm'
            type='search'
            value={search}
            onChange={onChangeSearch}
          />
        )}
      </div>
      <Space size={8} className={styles.right}>
        <div className={styles.toolbar}>
          {toolbars.map((toolbar) => {
            if (toolbar.key === ITEM_PERMISSIONS.ADD) {
              if (!checkPermissionAction(pageNameTable, toolbar.key)) {
                return null;
              }
            }
            return toolbar;
          })}
        </div>
        <div className={styles.toolbarMini}>
          {toolbarsMini.map((toolbar) => {
            if (toolbar.key === ITEM_PERMISSIONS.ADD) {
              if (!checkPermissionAction(pageNameTable, toolbar.key)) {
                return null;
              }
            }
            return toolbar;
          })}
          {isShowDownload && (
            <AppIconButton
              title={<IntlMessages id='table.toolbar.download' />}
              icon={<DownloadOutlined />}
              loading={isLoadingDownload}
              onClick={download}
            />
          )}
          <AppIconButton
            title={<IntlMessages id='table.toolbar.reload' />}
            icon={<ReloadOutlined />}
            loading={isLoading}
            onClick={reloadPage}
          />

          <Dropdown
            menu={{
              selectedKeys: [tableSize],
              items: [
                {
                  key: TABLE_SIZE.SMALL,
                  label: TABLE_SIZE_MAPPING[TABLE_SIZE.SMALL],
                },
                {
                  key: TABLE_SIZE.MIDDLE,
                  label: TABLE_SIZE_MAPPING[TABLE_SIZE.MIDDLE],
                },
                {
                  key: TABLE_SIZE.LARGE,
                  label: TABLE_SIZE_MAPPING[TABLE_SIZE.LARGE],
                },
              ],
              onClick: (e) => setTableSize(e?.key),
            }}
            trigger={['click']}
            getPopupContainer={(trigger) => {
              return trigger.parentNode;
            }}
            placement='bottomRight'>
            <AppIconButton
              title={<IntlMessages id='table.toolbar.itemSize' />}
              icon={<ColumnHeightOutlined />}
            />
          </Dropdown>
          <DataTableSetting />
        </div>
      </Space>
    </div>
  );
};

DataTableHeader.propTypes = {
  toolbars: PropTypes.array,
  toolbarsMini: PropTypes.array,
  columns: PropTypes.array,
};

DataTableHeader.defaultProps = {
  toolbars: [],
  toolbarsMini: [],
  columns: [],
};

export default DataTableHeader;
