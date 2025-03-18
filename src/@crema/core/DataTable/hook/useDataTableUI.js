import { findIndex, map } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  KEY_ACTION_COLUMN,
  TABLE_SORT_VALUE,
} from 'src/shared/constants/DataTable';
import DataTableAction from 'src/@crema/core/DataTable/DataTableAction';
import { updateItem } from 'src/shared/utils/Array';
import { DEFAULT_CONFIG_TABLE } from 'src/shared/constants/Default';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { isEmpty } from 'src/shared/utils/Typeof';

const useDataTableUI = ({
  columns: columnsProp,
  showColumnIndex,
  itemSelected,
  sort,
  pageNameTable,
}) => {
  const { checkPermissionAction } = useJWTAuthActions();
  const [tableSize, setTableSize] = useState(DEFAULT_CONFIG_TABLE.tableSize);
  const [columns, setColumns] = useState(columnsProp || []);
  const [columnsHidden, setColumnsHidden] = useState([]);

  useEffect(() => {
    let columnsRaw = columnsProp;

    columnsRaw = columnsRaw.map((column) => ({
      ...column,
      key: column?.key || column?.dataIndex,
    }));

    columnsRaw = map(columnsRaw, (column) => {
      if (column?.sorter) {
        return {
          ...column,
          sortDirections: [TABLE_SORT_VALUE.ASCEND, TABLE_SORT_VALUE.DESCEND],
          sortOrder:
            sort?.[0]?.field === column.dataIndex
              ? sort?.[0]?.desc
                ? TABLE_SORT_VALUE.DESCEND
                : TABLE_SORT_VALUE.ASCEND
              : null,
        };
      }

      return column;
    });

    if (showColumnIndex && !itemSelected) {
      columnsRaw = [
        {
          title: 'STT',
          dataIndex: 'myIndex',
          key: 'myIndex',
          width: 50,
          fixed: 'left',
          align: 'center',
          render: (value) => {
            return <span>{value}</span>;
          },
        },
        ...columnsRaw,
      ];
    }

    const indexColumnAction = findIndex(
      columnsRaw,
      (column) => column?.key === KEY_ACTION_COLUMN,
    );

    if (indexColumnAction !== -1) {
      const columnAction = columnsRaw[indexColumnAction];
      const actionsShow = (columnAction.actions || []).filter((action) => {
        const { actionName } = action || {};
        if (actionName) {
          return checkPermissionAction(pageNameTable, actionName);
        }
        return true;
      });
      if (actionsShow?.length > 0) {
        columnsRaw = [
          ...columnsRaw.slice(0, indexColumnAction),
          {
            ...columnAction,
            dataIndex: KEY_ACTION_COLUMN,
            title: 'Thao tác',
            fixed: 'right',
            align: columnAction?.align || 'center',
            width: columnAction?.width || 120,
            render: (_, row) => {
              return <DataTableAction row={row} actions={actionsShow} />;
            },
          },
          ...columnsRaw.slice(indexColumnAction + 1),
        ];
      } else {
        columnsRaw = [
          ...columnsRaw.slice(0, indexColumnAction),
          ...columnsRaw.slice(indexColumnAction + 1),
        ];
      }
    }

    setColumns(isEmpty(columnsHidden) ? columnsRaw : columnsHidden);
  }, [
    itemSelected,
    showColumnIndex,
    checkPermissionAction,
    sort,
    pageNameTable,
    columnsProp,
    columnsHidden,
  ]);

  const setColumnHidden = useCallback(
    (key, status) => {
      setColumns(updateItem(columns, { key }, { hidden: status }));
      setColumnsHidden(updateItem(columns, { key }, { hidden: status }));
    },
    [columns],
  );

  return {
    tableSize,
    columns,

    setTableSize,
    setColumns,
    setColumnHidden,
  };
};

export default useDataTableUI;
