import React, { useEffect, useRef, useState } from 'react';
import style from './TestIndex.module.scss';
import clsx from 'clsx';
import {
  Col,
  Row,
  Space,
  Input,
  Checkbox,
  Table,
  Skeleton,
  Divider,
  Tooltip,
} from 'antd';
import {
  CloudSyncOutlined,
  EyeOutlined,
  FilterOutlined,
  // PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import AntModal from 'src/@crema/component/AntModal';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import useIntl from 'react-intl/lib/src/components/useIntl';
import routes from 'src/config/routes.config';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import { getMessageResponse } from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import DetailsRecord from './DetailsRecord';
import FormContent from 'src/@crema/component/FormContent';
import FormInput from 'src/@crema/core/Form/FormInput';

function TestIndex() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [listValueFilter, setValueListFilter] = useState([]);
  const [listCheckFilter, setListCheckFilter] = useState([]);
  const [dataTableSearch, setDataTableSearch] = useState([]);
  const [dataDetailRecord, setDataDetailRecord] = useState({});
  const { Search } = Input;
  const { id: idIndex } = useParams();
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const refReloadPage = useRef(false);
  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.DETAIL_INDEX(idIndex),
    },
    [idIndex],
  );
  const dataDetailIndex = data?.result || {};

  // useCallAPI server
  const onSaveToServer = (data) => {
    return instanceCoreApi.post(data.api, data.payload);
  };

  const { loading, send } = useCallApi({
    success: (response) => {
      setPageSize(response?.result?.page_size || 10);
      setTotal(response?.result?.total || 0);
      const dataResult = response?.result?.items?.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });
      setDataTableSearch(dataResult);
      refReloadPage.current = true;
    },
    callApi: onSaveToServer,
    error: (err) => {
      refReloadPage.current = true;
      const messageError = getMessageResponse(err) || 'Tìm kiếm thất bại';
      notification.error(messages[messageError] || messageError);
    },
  });

  // search all value
  const handleSearchValueIndex = (value) => {
    setValueListFilter([]);
    let newValue = value.replace(/"/g, '');
    if (value && value.trim() !== '') {
      setValueSearch(value.trim());
      const dataSearchNotFilter = {
        indices: dataDetailIndex?.index_name,
        search_query: newValue.trim(),
        page,
      };
      const requestSearch = {
        api: API.SEARCH_TEST_INDEX,
        payload: dataSearchNotFilter,
      };
      send(requestSearch);
    }
  };

  // handleFilterSearch
  const handleFilterSearch = (valueSearch) => {
    setValueSearch('');
    const filterServer = listCheckFilter?.map((item) => {
      return {
        name: item,
        value: valueSearch[item] || '',
      };
    });
    setValueListFilter(filterServer);
    const dataFilterSearch = {
      indices: dataDetailIndex?.index_name,
      page,
      filters: filterServer,
    };
    const requestFilter = {
      api: API.FILTER_TEST_INDEX,
      payload: dataFilterSearch,
    };
    send(requestFilter);
  };

  useEffect(() => {
    setPage(1);
  }, [listValueFilter?.length]);

  useEffect(() => {
    if (refReloadPage.current) {
      if (valueSearch) {
        handleSearchValueIndex(valueSearch);
      } else {
        const valueFilterByPage = listValueFilter?.map((item) => {
          return {
            [item?.name]: item?.value,
          };
        });
        const objectFilter = {};
        valueFilterByPage?.forEach((item) => {
          Object.assign(objectFilter, item);
        });
        handleFilterSearch(objectFilter);
      }
    }
  }, [page]);

  const fieldNameJSON = dataDetailIndex?.config;
  const fieldNameFilter = fieldNameJSON ? JSON.parse(fieldNameJSON) : {};
  const listFields =
    fieldNameFilter?.config?.filter((item) => {
      return item?.filter_config === true;
    }) || [];

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDataDetailRecord({});
  };
  const optionsFilter = listFields?.map((item) => {
    return {
      label: item?.new_field_name,
      value: item?.new_field_name,
    };
  });

  const onChangeFilter = (checkedValues) => {
    if (checkedValues.length <= 4) {
      setListCheckFilter(checkedValues);
    } else {
      notification.warning('Bạn chỉ có thể chọn tối đa 4 trường để lọc !');
    }
  };

  // table columns
  const columnResponse =
    fieldNameFilter?.config?.map((item, index) => {
      return {
        title: `${item?.new_field_name}`,
        dataIndex: item?.new_field_name,
        index: index + 1,
        key: `${item?.new_field_name},${index}`,
        width: 160,
        align: 'center',
        sorter: (a, b) => {
          const typeFiled = typeof a[item?.new_field_name];
          if (typeFiled === 'string') {
            return (a[item?.new_field_name] || '').localeCompare(
              b[item?.new_field_name] || '',
              'vi',
            );
          } else {
            return (
              (a[item?.new_field_name] || 0) - (b[item?.new_field_name] || 0)
            );
          }
        },
      };
    }) || [];

  const columnsTable = [
    ...columnResponse,
    {
      title: `Điểm đánh giá`,
      dataIndex: 'score',
      key: `score`,
      align: 'center',
      width: 160,
      sorter: (a, b) => {
        return (a?.score || 0) - (b?.score || 0);
      },
    },
    {
      title: `document_id`,
      dataIndex: 'document_id',
      key: `document_id`,
      align: 'center',
      width: 160,
      sorter: (a, b) => {
        const typeFiled = typeof a?.document_id;
        if (typeFiled === 'string') {
          return (a?.document_id || '').localeCompare(
            b?.document_id || '',
            'vi',
          );
        } else {
          return (a?.document_id || 0) - (b?.document_id || 0);
        }
      },
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (_, data) => {
        return (
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined
              style={{
                fontSize: '18px',
              }}
              onClick={() => {
                setDataDetailRecord(data);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className={clsx(style.wrapTestIndex)}>
      {isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col span={4} className={clsx(style.contentLeft)}>
              {dataDetailIndex?.source_response?.source_name && (
                <h4 className={clsx(style.name_source)}>
                  {dataDetailIndex?.source_response?.source_name}
                </h4>
              )}
              <div className={clsx(style.contentLeft_header)}>
                <Space>
                  <h4 className={clsx(style.header_title)}>
                    Thử nghiệm tìm kiếm
                  </h4>
                </Space>
              </div>
              <div>
                <p className={clsx(style.contentLeft_index)}>
                  Tên chỉ mục tìm kiếm:
                </p>
                <p className={clsx(style.nameIndex)}>
                  {dataDetailIndex?.index_name}
                </p>
              </div>
              <Divider />
              <div className={clsx(style.wrapActions)}>
                <AntButton
                  onClick={() => {
                    navigate(routes.search_engine_index_add);
                  }}
                  className={clsx(style.btnItem)}
                  type='primary'>
                  {messages['sidebar.search_engine_index_add_search']}
                </AntButton>
                <AntButton
                  icon={<CloudSyncOutlined />}
                  onClick={() => {
                    navigate(routes.sync_data_search_engine(idIndex));
                  }}
                  className={clsx(style.btnItem)}
                  type='primary'>
                  {messages['sidebar.sync_search_engine']}
                </AntButton>
                <AntButton
                  icon={<SettingOutlined />}
                  onClick={() => {
                    navigate(routes.config_index(idIndex));
                  }}
                  className={clsx(style.btnItem)}
                  type='primary'>
                  {messages['sidebar.config_index']}
                </AntButton>
              </div>
            </Col>
            <Col span={20}>
              <div className={clsx(style.content_right)}>
                <div className={clsx(style.content_right_header)}>
                  <h3 className={clsx(style.content_right_header_text)}>
                    Thử nghiệm
                  </h3>
                  <div className={clsx(style.content_right_search)}>
                    {listCheckFilter?.length > 0 ? (
                      <div className={clsx(style.wrapFilterSearch)}>
                        <FormContent onFinish={handleFilterSearch}>
                          <Row gutter={[6, 6]}>
                            {listCheckFilter?.map((item, index) => {
                              return (
                                <Col span={12} key={`${item}_${index}`}>
                                  <FormInput
                                    name={item}
                                    allowClear
                                    placeholder={`Nhập ${item}`}
                                    addonBefore={
                                      <>
                                        <FilterOutlined />
                                        <span
                                          style={{
                                            paddingLeft: '3px',
                                          }}>
                                          {item}
                                        </span>
                                      </>
                                    }
                                  />
                                </Col>
                              );
                            })}

                            <Col span={24}>
                              <div className={clsx(style.wrapBtn)}>
                                <AntButton
                                  className={clsx(style.btnSubmit)}
                                  htmlType='submit'
                                  type='primary'>
                                  Tìm kiếm
                                </AntButton>
                              </div>
                            </Col>
                          </Row>
                        </FormContent>
                      </div>
                    ) : (
                      <Search
                        prefix={<SearchOutlined />}
                        placeholder='Nhập thông tin tìm kiếm'
                        enterButton='Tìm kiếm'
                        allowClear
                        size='large'
                        onSearch={handleSearchValueIndex}
                        loading={loading}
                      />
                    )}
                  </div>
                </div>
                <div className={clsx(style.content_right_main)}>
                  <Row>
                    <Col span={4} className={clsx(style.main_right_filter)}>
                      <div className={clsx(style.main_right_filter_header)}>
                        <div className={clsx(style.icon)}>
                          <FilterOutlined />
                          <span>Bộ lọc</span>
                        </div>
                      </div>
                      <div className={clsx(style.main_right_filter_content)}>
                        <h6 className={clsx(style.title)}>
                          Chọn trường thông tin
                        </h6>
                        <Checkbox.Group
                          options={optionsFilter}
                          defaultValue={[]}
                          value={listCheckFilter}
                          onChange={onChangeFilter}
                          className={clsx(style.main_right_filter_item)}
                        />
                      </div>
                    </Col>
                    <Col span={20}>
                      <div className={clsx(style.content_result)}>
                        <div>
                          <h6>Kết quả</h6>
                          {valueSearch && (
                            <p>
                              <span className={clsx(style.text_result_active)}>
                                {total}{' '}
                              </span>{' '}
                              kết quả được tìm thấy cho từ khóa{' '}
                              <span className={clsx(style.text_result_active)}>
                                {`"${valueSearch}"`}
                              </span>
                            </p>
                          )}
                          {listValueFilter.length > 0 && (
                            <p>
                              <span className={clsx(style.text_result_active)}>
                                {total}{' '}
                              </span>{' '}
                              kết quả được tìm thấy cho bộ lọc{' '}
                              {listValueFilter?.map((item, index) => {
                                return (
                                  <React.Fragment
                                    key={`${item?.value},${index}`}>
                                    <span
                                      className={clsx(
                                        style.text_active_filter,
                                      )}>
                                      <span className={clsx(style.text_label)}>
                                        {item.name}
                                      </span>
                                      :{item.value || '...'}
                                    </span>
                                  </React.Fragment>
                                );
                              })}
                            </p>
                          )}
                        </div>

                        <Table
                          loading={loading}
                          scroll={{
                            x: 1300,
                          }}
                          onChange={(values) => {
                            setPage(values?.current || 1);
                          }}
                          pagination={{
                            current: page,
                            pageSize,
                            total,
                            pageSizeOptions: [pageSize],
                          }}
                          dataSource={dataTableSearch}
                          columns={columnsTable}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}

      <AntModal
        centered
        title='Chi tiết bản ghi'
        size={MODAL_SIZE.LARGE}
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}>
        <DetailsRecord dataDetailRecord={dataDetailRecord} />
      </AntModal>
    </div>
  );
}

export default TestIndex;
