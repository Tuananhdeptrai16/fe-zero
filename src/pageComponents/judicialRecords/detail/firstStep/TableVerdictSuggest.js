import React from 'react';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { TableResponse } from 'src/@crema/component/TableResponse';
import { DEFAULT_CONFIG_TABLE } from 'src/shared/constants/Default';
import { DIRECTION_QUERY } from 'src/shared/constants/DataTable';
import { isNullUndefEmptyStrObj } from 'src/shared/utils/Typeof';

export const TableVerdictSuggest = ({ filters, columns, refetchId }) => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { isLoading, data } = useFetch(
    {
      url: API.SEARCH_VERDICT_BY_CITIZEN,
      method: METHOD_FETCH.POST,
      body: {
        ...(filters || {}),
        pageable: {
          page: page,
          page_size: pageSize,
          sort: DEFAULT_CONFIG_TABLE.sort.map(({ field, desc }) => ({
            property: field,
            direction: desc ? DIRECTION_QUERY.DESCEND : DIRECTION_QUERY.ASCEND,
          })),
        },
      },
      enabled: !isNullUndefEmptyStrObj(filters),
    },
    [filters, page, pageSize, refetchId],
  );
  const dataSource = data?.result?.items || [];

  return (
    <>
      <TableResponse
        rowKey={(item) => item?.raw_document_object?.id}
        dataSource={dataSource}
        isLoading={isLoading}
        pageSize={pageSize}
        page={page}
        total={data?.result?.total}
        setPage={setPage}
        setPageSize={setPageSize}
        columns={columns}
      />
    </>
  );
};
