import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Select } from 'antd';
import useCallApi from 'src/@crema/hook/useCallApi';
import useEffectDepth from 'src/@crema/hook/useEffectDepth';
import useSelectWrapperValue from 'src/@crema/hook/useSelectWraperValue';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { useIntl } from 'react-intl';

const AntSelectAsync = ({
  configFetch,
  deps = [],
  value: valueProp,
  onChange: onChangeProp,
  filterOption = false,
  pageSize = 10,
  allowClear = true,
  fieldNames,
  returnObject,
  renderItem,
  descriptionField,
  buildQuery,
  ...props
}) => {
  const timeoutSearch = useRef(0);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loadMoreAble, setLoadMoreAble] = useState(true);
  const { messages } = useIntl();

  const body = configFetch?.body || {};
  const pageSizeQuery = body?.pageable?.page_size || pageSize || 10;
  const { loading: isLoading, send } = useCallApi({
    success: (data, params) => {
      if (params?.search === search) {
        const optionsNew =
          data?.data || data?.result?.items || data?.result || [];
        setLoadMoreAble(optionsNew?.length >= pageSizeQuery);
        if (params?.page === 1) {
          setOptions(optionsNew);
        } else {
          setOptions([...options, ...optionsNew]);
        }
      }
    },
    error: (err) => {
      console.log('error', err);
    },
    callApi: () => {
      if (buildQuery) {
        return instanceCoreApi({
          ...configFetch,
          ...buildQuery({
            search,
            pageable: { page: page, page_size: pageSizeQuery },
          }),
        });
      }
      return instanceCoreApi({
        ...configFetch,
        data: {
          ...body,
          keyword: search,
          pageable: { page: page, page_size: pageSizeQuery },
        },
        params: { ...(configFetch.params || {}) },
      });
    },
  });

  useEffectDepth(() => {
    send({ page, search });
  }, [page, search]);

  useEffectDepth(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      send({ page, search });
    }
  }, [...deps, configFetch]);

  const {
    value,

    renderOptions,
    onChange,
  } = useSelectWrapperValue({
    ...props,
    returnObject,
    renderItem,
    options,
    value: valueProp,
    onChange: onChangeProp,
    fieldNames,
  });

  const onSearch = (value) => {
    const valueSearch = value?.trim();
    clearTimeout(timeoutSearch.current);
    timeoutSearch.current = setTimeout(() => {
      setPage(1);
      setSearch(valueSearch);
    }, 300);
  };

  const loadMore = () => {
    if (!isLoading) {
      setPage((oldPage) => {
        return oldPage + 1;
      });
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutSearch.current);
    };
  }, []);

  const description = messages[descriptionField] || descriptionField || '';
  return (
    <>
      <Select
        {...props}
        allowClear={allowClear}
        value={value}
        onChange={onChange}
        showSearch
        onSearch={onSearch}
        onDropdownVisibleChange={(open) => {
          if (!open) {
            onSearch('');
          }
        }}
        loading={isLoading}
        onPopupScroll={(event) => {
          if (event?.target && loadMoreAble) {
            const scrollBottom =
              event?.target?.scrollHeight -
              event?.target?.offsetHeight -
              event?.target?.scrollTop;

            if (scrollBottom <= 70) {
              loadMore();
            }
          }
        }}
        filterOption={filterOption}>
        {renderOptions({ isLoading })}
      </Select>
      {descriptionField && (
        <span className='description-field'>{description}</span>
      )}
    </>
  );
};

AntSelectAsync.propTypes = {
  configFetch: PropTypes.object.isRequired,
  deps: PropTypes.array,
  fieldNames: PropTypes.object,
  renderItem: PropTypes.func,
  returnObject: PropTypes.bool,
  filterOption: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  value: PropTypes.any,
  onChange: PropTypes.func,
  descriptionField: PropTypes.string,
};

AntSelectAsync.defaultProps = {};

export default AntSelectAsync;
