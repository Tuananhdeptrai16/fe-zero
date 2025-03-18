import React, { useCallback, useState } from 'react';
import { AutoComplete, Divider, Dropdown, Input, Space, Spin } from 'antd';
import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import AppEmptyResult from 'src/@crema/core/AppEmptyResult';
import RenderLink from '../../@crema/component/TableRender/RenderLink';

const KEY = {
  CONNECTION: 'connection',
  SEARCH_ENGINE: 'search_engine',
};
const items = [
  {
    key: KEY.CONNECTION,
    label: 'Tiến trình dữ liệu',
  },
  {
    key: KEY.SEARCH_ENGINE,
    label: 'Chỉ mục tìm kiếm',
  },
];
const renderPayload = (filterName, searchValue) => {
  switch (filterName) {
    case KEY.CONNECTION:
      return {
        filters: [
          {
            name: 'name',
            operation: FILTER_OPERATION.LIKE,
            value: searchValue,
          },
        ],
        pageable: {
          page: 1,
          page_size: 15,
        },
      };
    case KEY.SEARCH_ENGINE:
      return {
        filters: [
          {
            name: 'index_name',
            operation: FILTER_OPERATION.LIKE,
            value: searchValue,
          },
        ],
        pageable: {
          page: 1,
          page_size: 15,
        },
      };
  }

  return {
    filters: [],
    keyword: searchValue,
    pageable: {
      page: 1,
      page_size: 15,
    },
  };
};

const getURLFetchData = (filterName) => {
  switch (filterName) {
    case KEY.CONNECTION:
      return API.GET_CONNECTION_AIR_BYTE;
    case KEY.SEARCH_ENGINE:
      return API.SEARCH_LIST_INDEX_ALL;
  }
};

const renderConfigFetchData = (filterName, searchValue) => {
  return {
    url: getURLFetchData(filterName),
    method: METHOD_FETCH.POST,
    body: renderPayload(filterName, searchValue),
  };
};

export const WorkspaceSearch = ({ openPopup, setOpenPopup }) => {
  const { messages } = useIntl();

  const [filterName, setFilterName] = useState(KEY.CONNECTION);
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { data, isLoading } = useFetch(
    renderConfigFetchData(filterName, searchValue),
    [filterName, searchValue],
  );

  const onSelectDropdown = ({ key }) => {
    setFilterName(key);
  };

  const onChangeInput = (data) => {
    setInputValue(data);
  };
  const renderOption = useCallback(
    (item, index) => {
      const value = `${filterName}-${index}`;
      switch (filterName) {
        case KEY.CONNECTION:
          return {
            label: (
              <RenderLink to={`/detail-info-data/${item?.connection_id}`}>
                {item?.name}
              </RenderLink>
            ),
            value: value,
          };
        case KEY.SEARCH_ENGINE:
          return {
            label: (
              <RenderLink to={`/config-index/${item?.id}`}>
                {item?.index_name}
              </RenderLink>
            ),
            value: value,
          };
      }
    },
    [filterName],
  );
  const itemSelected = items.find((item) => item.key === filterName);

  return (
    <Space
      split={<Divider type={'vertical'} />}
      className={'workspaceSearchContainer'}>
      <Dropdown
        trigger={['click']}
        menu={{
          items,
          onClick: onSelectDropdown,
        }}>
        <Space
          style={{ minWidth: 180 }}
          size={'large'}
          className={'pointer justify-between'}
          onClick={(e) => e.preventDefault()}>
          <Space className={'whitespace-nowrap'}>
            <FilterOutlined />
            {itemSelected?.label}
          </Space>
          <CaretDownOutlined />
        </Space>
      </Dropdown>
      <AutoComplete
        onClick={(e) => e.stopPropagation()}
        getPopupContainer={(trigger) => trigger.parentElement.parentElement}
        options={(data?.result?.items || []).map((item, index) =>
          renderOption(item, index),
        )}
        value={inputValue}
        open={openPopup}
        notFoundContent={
          <AppEmptyResult
            title={
              isLoading ? (
                <Spin spinning className={'text-center'} />
              ) : (
                'Không có kết quả'
              )
            }
          />
        }
        popupClassName={'w-full l-0'}
        onChange={onChangeInput}>
        <Input
          bordered={false}
          style={{ height: 48, width: 350 }}
          placeholder={messages['common.typeSearchContent']}
          allowClear
        />
      </AutoComplete>
      <AntButton
        type={'primary'}
        className={'workspaceSearchButton'}
        onClick={(e) => {
          e.stopPropagation();
          setOpenPopup(true);
          setSearchValue(inputValue);
        }}>
        {messages['common.search']}
      </AntButton>
    </Space>
  );
};
