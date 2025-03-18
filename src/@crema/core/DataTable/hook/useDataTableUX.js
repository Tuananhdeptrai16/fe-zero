import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { DEFAULT_CONFIG_TABLE } from 'src/shared/constants/Default';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { getMessageResponse } from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import { useSearchParams } from 'react-router-dom';
import {
  isEmpty,
  isNumberStr,
  isString,
  isFunction,
} from 'src/shared/utils/Typeof';
import {
  DIRECTION_QUERY,
  KEY_SEARCH_PARAM_DT,
  TABLE_SORT_VALUE,
} from 'src/shared/constants/DataTable';
import useUpdatedEffect from 'antd/lib/typography/hooks/useUpdatedEffect';

const useDataTableUX = ({
  url,
  urlDownload,
  syncURL,
  method,
  initTable,
  itemSelected,
  buildBodyQuery,
}) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(
    initTable?.page || DEFAULT_CONFIG_TABLE.page,
  );
  const [pageSize, setPageSize] = useState(
    initTable?.pageSize || DEFAULT_CONFIG_TABLE.pageSize,
  );
  const [sort, setSort] = useState(
    initTable?.sort || DEFAULT_CONFIG_TABLE.sort,
  );
  const [filter, setFilter] = useState(
    initTable?.filter || DEFAULT_CONFIG_TABLE.filter,
  );
  const [search, setSearch] = useState(
    initTable?.search || DEFAULT_CONFIG_TABLE.search,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    itemSelected?.prevData ? itemSelected.prevData : [],
  );
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (syncURL) {
      const pageParam = searchParams.get(KEY_SEARCH_PARAM_DT.PAGE);
      const pageSizeParam = searchParams.get(KEY_SEARCH_PARAM_DT.PAGE_SIZE);
      const searchParam = searchParams.get(KEY_SEARCH_PARAM_DT.SEARCH);
      const sortParam = searchParams.get(KEY_SEARCH_PARAM_DT.SORT);

      if (isNumberStr(pageParam) && +pageParam > 0) {
        setPage(+pageParam);
      }

      if (isNumberStr(pageSizeParam)) {
        setPageSize(+pageSizeParam);
      }

      if (isString(searchParam) && !isEmpty(searchParam)) {
        setSearch(searchParam);
      }

      if (isString(sortParam) && !isEmpty(sortParam)) {
        const [field, value] = sortParam.split(KEY_SEARCH_PARAM_DT.PAIR_KEY);
        if (
          !isEmpty(field) &&
          !isEmpty(value) &&
          (value === TABLE_SORT_VALUE.ASCEND ||
            value === TABLE_SORT_VALUE.DESCEND)
        ) {
          setSort([{ field, desc: value === TABLE_SORT_VALUE.DESCEND }]);
        }
      }
    }
  }, [syncURL, searchParams]);

  useUpdatedEffect(() => {
    if (syncURL) {
      const pageParam = searchParams.get(KEY_SEARCH_PARAM_DT.PAGE);
      if (
        (isNumberStr(pageParam) && +pageParam !== page) ||
        isEmpty(pageParam)
      ) {
        setSearchParams((params) => {
          params.set(KEY_SEARCH_PARAM_DT.PAGE, page);
          return params;
        });
      }
    }
  }, [syncURL, page]);

  useUpdatedEffect(() => {
    if (syncURL) {
      const pageSizeParam = searchParams.get(KEY_SEARCH_PARAM_DT.PAGE_SIZE);
      if (
        (isNumberStr(pageSizeParam) && +pageSizeParam !== pageSize) ||
        isEmpty(pageSizeParam)
      ) {
        setSearchParams((params) => {
          params.set(KEY_SEARCH_PARAM_DT.PAGE_SIZE, pageSize);
          return params;
        });
      }
    }
  }, [syncURL, pageSize]);

  useUpdatedEffect(() => {
    if (syncURL) {
      const searchParam = searchParams.get(KEY_SEARCH_PARAM_DT.SEARCH);
      if (
        (isString(searchParam) && searchParam !== search) ||
        isEmpty(searchParam)
      ) {
        setSearchParams((params) => {
          params.set(KEY_SEARCH_PARAM_DT.SEARCH, search?.trim());
          return params;
        });
      }
    }
  }, [syncURL, search]);

  useUpdatedEffect(() => {
    if (syncURL) {
      const sortParam = searchParams.get(KEY_SEARCH_PARAM_DT.SORT);
      if (isEmpty(sort)) {
        setSearchParams((params) => {
          params.set(KEY_SEARCH_PARAM_DT.SORT, '');
          return params;
        });
      } else {
        const newSortValue = `${sort[0]?.field}${KEY_SEARCH_PARAM_DT.PAIR_KEY}${
          sort[0]?.desc ? TABLE_SORT_VALUE.DESCEND : TABLE_SORT_VALUE.ASCEND
        }`;

        if (newSortValue !== sortParam) {
          setSearchParams((params) => {
            params.set(KEY_SEARCH_PARAM_DT.SORT, newSortValue);
            return params;
          });
        }
      }
    }
  }, [syncURL, sort]);

  let bodyQuery = {
    ...(search ? { keyword: search?.trim() } : {}),
    filters: [...Object.values(filter || {}), ...(initTable?.filters || [])],
    pageable: {
      page: page,
      page_size: pageSize,
      sort: sort.map(({ field, desc }) => ({
        property: field,
        direction: desc ? DIRECTION_QUERY.DESCEND : DIRECTION_QUERY.ASCEND,
      })),
    },
    ...(initTable?.body || {}),
  };

  if (isFunction(buildBodyQuery)) {
    bodyQuery = buildBodyQuery(bodyQuery, {
      initTable,
      filter,
      search: search?.trim(),
    });
  }

  const paramQuery = {
    ...(initTable?.params || {}),
  };

  const {
    isLoading,
    status,
    error,
    data,

    fetchData,
  } = useFetch(
    {
      url,
      method,
      body: bodyQuery,
      params: paramQuery,
      loadInit: true,
      useCache: false,
    },
    [page, pageSize, sort, filter, search],
  );

  const { send: download, loading: isLoadingDownload } = useCallApi({
    callApi: () => {
      return instanceCoreApi.post(urlDownload, bodyQuery, {
        responseType: 'arraybuffer',
      });
    },
    error: (err) => {
      const error = getMessageResponse(err);
      notification.error(error);
    },
    success: (res) => {
      if (res) {
        const url = window.URL.createObjectURL(new Blob([res]), {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${moment().format('DD-MM-YYYY')}.xlsx`);
        document.body.appendChild(link);
        link.click();
      }
    },
  });

  const reloadPage = () => {
    fetchData();
  };

  const { items, total } = data?.result || data?.body || {};

  const dataWithIndex = useMemo(() => {
    return (items || []).map((item, index) => ({
      ...item,
      myIndex: (page - 1) * pageSize + index + 1,
      id: item?.id || item?.source_id,
    }));
  }, [items, page, pageSize]);

  const updateSearch = (newSearch) => {
    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
    }
  };

  useEffect(() => {
    if (isEmpty(items) && page > 1) {
      setPage((pageCurrent) => pageCurrent - 1);
    }
  }, [items]);

  return {
    rowSelection: itemSelected
      ? {
          type: itemSelected?.type
            ? itemSelected?.type === 'checkbox'
              ? 'checkbox'
              : 'radio'
            : 'checkbox',
          selectedRowKeys,
          selectedRows,
          // onChange: setSelectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
          },
        }
      : false,
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
    setSearch: updateSearch,

    reloadPage,
    download,
  };
};

export default useDataTableUX;
