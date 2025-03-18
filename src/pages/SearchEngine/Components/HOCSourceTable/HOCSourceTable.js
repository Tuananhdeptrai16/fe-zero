import React from 'react';
import { useSelector } from 'react-redux';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

function HOCSourceTable(WrapComponent) {
  const newComponent = (props) => {
    const idDataSourceSaveRedux = useSelector(
      (state) => state?.common?.dataSourceAddIndex?.idSource,
    );
    // get list data source
    const { data: dataTable, isLoading } = useFetch(
      {
        method: METHOD_FETCH.GET,
        url: API.SEARCH_LIST_TABLE_COLUMNS(idDataSourceSaveRedux),
      },
      [idDataSourceSaveRedux],
    );
    const dataTableColumnsResult = dataTable?.result || {};
    return (
      <WrapComponent
        {...props}
        data={dataTableColumnsResult}
        isLoading={isLoading}
      />
    );
  };
  return newComponent;
}

export default HOCSourceTable;
