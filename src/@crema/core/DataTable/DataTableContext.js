import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import useDataTableUI from 'src/@crema/core/DataTable/hook/useDataTableUI';
import useDataTableUX from 'src/@crema/core/DataTable/hook/useDataTableUX';
import { useJWTAuth } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';

const Context = React.createContext({});

const { Provider } = Context;

const DataTableContext = forwardRef(
  (
    {
      children,
      pageName,
      url,
      urlDownload,
      syncURL,
      method,
      itemSelected,
      initTable = {},
      columns: columnsProps,
      event,
      buildBodyQuery,
      showColumnIndex = true,
    },
    ref,
  ) => {
    const { pageNameCurrent } = useJWTAuth();
    const pageNameTable = pageName || pageNameCurrent;

    const {
      rowSelection,
      page,
      total,
      pageSize,
      sort,
      filter,
      search,

      isLoadingDownload,
      isLoading,
      status,
      error,
      data: dataWithIndex,

      setPage,
      setPageSize,
      setSort,
      setFilter,
      setSearch,

      reloadPage,
      download,
    } = useDataTableUX({
      url,
      urlDownload,
      syncURL,
      method,
      initTable,
      itemSelected,
      buildBodyQuery,
    });

    const {
      tableSize,
      columns,

      setColumns,
      setColumnHidden,
      setTableSize,
    } = useDataTableUI({
      columns: columnsProps,
      showColumnIndex,
      itemSelected,
      pageNameTable,
      sort,
    });

    useEffect(() => {
      const timeout = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 200);

      return () => {
        clearTimeout(timeout);
      };
    }, [page]);

    const contextValue = {
      pageNameTable,
      rowSelection,
      tableSize,
      page,
      total,
      pageSize,
      sort,
      filter,
      search,

      isLoadingDownload,
      isLoading,
      status,
      error,
      data: dataWithIndex,

      itemSelected,

      setTableSize,
      setPage,
      setPageSize,
      setSort,
      setFilter,
      setSearch,

      setColumns,
      setColumnHidden,

      reloadPage,
      download,
      columns,
      event,
    };

    useImperativeHandle(ref, () => ({
      setTableSize,
      setPage,
      setPageSize,
      setSort,
      setFilter,
      setSearch,
      reloadPage,
    }));

    return <Provider value={contextValue}>{children}</Provider>;
  },
);

DataTableContext.propTypes = {
  url: PropTypes.string,
  method: PropTypes.string,
  initTable: PropTypes.object,
  children: PropTypes.node,
  showColumnIndex: PropTypes.bool,
  columns: PropTypes.array,
  itemSelected: PropTypes.object,
};

DataTableContext.defaultProps = {};

export const useDataTableContext = () => React.useContext(Context);

export default DataTableContext;
