import {
  EyeOutlined,
  RetweetOutlined,
  SettingOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Col,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tooltip,
  Radio,
  Checkbox,
} from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import style from '../../ConfigureDataEnrichment.module.scss';
import clsx from 'clsx';
import AntModal from 'src/@crema/component/AntModal';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import notification from 'src/shared/utils/notification';
import { isArray, isEmpty } from 'src/shared/utils/Typeof';
import { checkColumnDisableAll } from 'src/shared/utils/Array';
import { useLocation, useNavigate } from 'react-router-dom';
import AppCard from 'src/@crema/core/AppCard';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import API from 'src/@crema/services/apis';
import { ConTextDataConnection } from 'src/pages/streamConnection/infoData';
import { useContext } from 'react';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import {
  IconCustomAirByte,
  IconDestinationPostgres,
} from 'src/assets/icon/workspace';
import { encryptObject } from 'src/shared/utils/Object';
import { REACT_APP_SECRET_KEY } from 'src/shared/constants/serverConfig';

SourceTable.propTypes = {
  dataDetailConnection: PropTypes.object,
  type: PropTypes.string,
  updateConfig: PropTypes.func,
  dataStatusSync: PropTypes.object,
  loadingUpdateConfig: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};

function SourceTable({
  dataDetailConnection,
  reloadDataConnection,
  type = 'source',
  updateConfig,
  dataStatusSync,
  loadingUpdateConfig,
  isModalOpen,
  setIsModalOpen,
  streams,
  dataDetailSource,
  dataSave,
}) {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [dataRecord, setDataRecord] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState('');
  const location = useLocation();
  const [dataStreams, setDataStreams] = useState(
    !isEmpty(streams)
      ? streams
      : dataDetailConnection?.sync_catalog?.streams || [],
  );
  const path = location.pathname.match(/^\/([^/]+)/);
  const configTable = dataRecord?.config;
  const typeSyncModeRecord = `${dataRecord?.config?.sync_mode},${dataRecord?.config?.destination_sync_mode}`;
  const dataRecordOld = dataRecord?.stream?.json_schema?.properties;
  const listFieldsRecord = dataRecord ? Object.keys(dataRecordOld) : [];
  const isConfigSelectColumns = configTable?.field_selection_enabled;
  const cursor_field = configTable?.cursor_field || [];
  const primary_key = configTable?.primary_key?.flat() || [];
  const typeSyncMode = `${configTable?.sync_mode},${configTable?.destination_sync_mode}`;
  // console.log(dataStreams);
  let count = 0;

  dataStreams?.forEach((item) => {
    if (item?.config?.selected === true) count += 1;
    const primaryKeyDefault = item?.config?.primary_key?.flat() || [];
    const objectColumnInTable = item?.stream?.json_schema?.properties;
    const listColumnInTable = objectColumnInTable
      ? Object.keys(objectColumnInTable)
      : [];
    const filterPrimaryKey = primaryKeyDefault?.filter((item) => {
      return listColumnInTable?.includes(item);
    });
    const primaryKeyFilterRender = filterPrimaryKey?.map((item) => {
      return [item];
    });
    item.config.primary_key = primaryKeyFilterRender;
  });

  const listCursorFieldPrimary =
    typeSyncMode === 'incremental,append_dedup'
      ? [...new Set([...cursor_field, ...primary_key])]
      : typeSyncMode === 'incremental,append'
      ? [...new Set([...cursor_field])]
      : [];

  const oldSelectColumns = isConfigSelectColumns
    ? configTable?.selected_fields?.map((item) => {
        return {
          name: item['field_path'][0],
          checked: true,
        };
      })
    : listFieldsRecord?.map((nameColumn) => {
        return {
          name: nameColumn,
          checked: true,
        };
      });
  const [listSelectColumns, setSelectColumns] = useState(oldSelectColumns);

  useEffect(() => {
    setSelectColumns(oldSelectColumns || []);
  }, [dataRecord]);

  useEffect(() => {
    setSelectColumns((prev) => {
      const newColumnSelect = listCursorFieldPrimary?.map((item) => {
        return {
          name: item,
          checked: true,
        };
      });
      let dataNoRepeat = [];
      const mergeColumns = [...newColumnSelect, ...prev];
      mergeColumns?.forEach((item) => {
        const index = dataNoRepeat?.findIndex(
          (column) => column?.name === item?.name,
        );
        if (index === -1) {
          dataNoRepeat?.push(item);
        }
      });
      return dataNoRepeat;
    });
  }, [
    listCursorFieldPrimary?.length,
    cursor_field[0],
    typeSyncMode,
    dataRecord,
  ]);

  useEffect(() => {
    if (isEmpty(streams)) {
      setDataStreams(dataDetailConnection?.sync_catalog?.streams);
    } else {
      setDataStreams(streams);
    }
  }, [dataDetailConnection, streams?.length]);

  const destination = dataDetailConnection?.destination;

  const dataRenderTable = dataStreams?.map((item, index) => {
    return {
      dataDetailConnection,
      dataDetailSource,
      ...item,
      destination,
      key: index,
    };
  });

  useEffect(() => {
    const check = dataRenderTable?.map((item) => {
      return item?.config?.selected;
    });
    if (check?.every((item) => item === true)) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, [dataRenderTable]);

  useEffect(() => {
    setDataSource(dataRenderTable);
  }, [dataStreams]);

  useEffect(() => {
    if (count > 50) notification.warning('Đồng bộ tối đa 50 bảng');
  }, [count]);

  // console.log(dataRenderTable);
  // handle change dong bo
  const handleChangeSelected = (checked, data) => {
    if (checked === true) {
      count += 1;
    } else {
      count -= 1;
    }
    setDataStreams((prev) => {
      const configStream = {
        ...data?.config,
        selected: checked,
      };
      const nameTableCurrent = data?.stream?.name;
      const indexStream = prev?.findIndex((item) => {
        return item?.stream?.name === nameTableCurrent;
      });
      const newDataUpdate = [...prev];
      newDataUpdate[indexStream].config = configStream;
      return newDataUpdate;
    });
  };
  // console.log(count);
  // handle change dong bo tat ca
  const handleChangeSelectedAll = (checked) => {
    setDataStreams(
      dataRenderTable?.map((item) => {
        return {
          ...item,
          config: { ...item.config, selected: checked },
        };
      }),
    );
  };

  const columns = [
    {
      // title: messages['table.sync'],
      title: (
        <Switch
          checked={!isChecked}
          onChange={() => {
            handleChangeSelectedAll(isChecked);
            setIsChecked((prev) => !prev);
            // if (isChecked === true) {
            //   setCount(50);
            // } else {
            //   setCount(0);
            // }
          }}
        />
      ),
      dataIndex: 'sync',
      key: 'sync',
      width: 116,
      fixed: 'left',
      render: (_, record) => {
        return (
          <Switch
            checked={record?.config?.selected}
            onChange={(checked) => {
              handleChangeSelected(checked, record);
              if (checked === false) setIsChecked(!checked);
            }}
          />
        );
      },
    },
    {
      title:
        type === 'source'
          ? messages['table.source_data']
          : messages['sidebar.targetDataSource'],
      dataIndex: 'destination',
      key: 'destination',
      width: 220,
      render: (_, record) => {
        const isSource = type === 'source';
        const urlIcon = isSource
          ? record?.dataDetailConnection?.source?.icon ||
            record?.dataDetailSource?.icon
          : record?.dataDetailConnection?.destination?.icon;
        const name = isSource
          ? record?.dataDetailConnection?.source?.name ||
            dataSave?.source_display_name ||
            record?.dataDetailSource?.name
          : record?.dataDetailConnection?.destination?.name;
        return (
          <>
            <Avatar src={urlIcon || <IconCustomAirByte />} />
            <span style={{ paddingLeft: '4px' }}>{name}</span>
          </>
        );
      },
    },
    {
      title: messages['table.name_table'],
      dataIndex: 'stream',
      key: 'stream',
      width: 200,
      render: (_, record) => {
        return <span>{record?.stream?.name}</span>;
      },
    },
    {
      title: messages['table.type_sync_mode'],
      dataIndex: 'stream',
      key: 'sync_mode',
      width: 320,
      render: (_, record) => {
        const supported_sync_modes = record?.stream?.supported_sync_modes || [];
        const optionSelectTypes = [
          {
            value: 'incremental,append_dedup',
            label: 'Tăng dần | Tạo mới + Loại bỏ trùng lặp',
          },
          {
            value: 'full_refresh,overwrite',
            label: 'Làm mới đầy đủ | Ghi đè',
          },
          {
            value: 'incremental,append',
            label: 'Tăng dần | Thêm vào',
          },
          {
            value: 'full_refresh,append',
            label: 'Làm mới đầy đủ | Thêm vào',
          },
        ].filter((item) => {
          const modes = item?.value?.split(',');
          return supported_sync_modes?.includes(modes[0]);
        });

        return (
          <Select
            onChange={(valueSync) => {
              setDataStreams((prev) => {
                const listTypeSync = valueSync?.split(',');
                const nameTableCurrent = record?.stream?.name;
                const indexStream = prev?.findIndex((item) => {
                  return item?.stream?.name === nameTableCurrent;
                });
                const newDataUpdate = [...prev];
                newDataUpdate[indexStream].config.sync_mode = listTypeSync[0];
                newDataUpdate[indexStream].config.destination_sync_mode =
                  listTypeSync[1];
                return newDataUpdate;
              });
            }}
            defaultValue={`${record?.config?.sync_mode},${record?.config?.destination_sync_mode}`}
            value={`${record?.config?.sync_mode},${record?.config?.destination_sync_mode}`}
            style={{
              width: 300,
            }}
            options={optionSelectTypes}
          />
        );
      },
    },
    {
      title: 'Khóa chính, con trỏ',
      dataIndex: 'stream',
      key: 'stream',
      width: 380,
      render: (_, record) => {
        const typeSyncMode = `${record?.config?.sync_mode},${record?.config?.destination_sync_mode}`;
        const handleClick = () => {
          setIsModalOpen(true);
          setDataRecord(record);
        };
        if (typeSyncMode === 'incremental,append') {
          return (
            <div className={clsx(style.itemCursor)} onClick={handleClick}>
              <span
                style={{
                  paddingRight: '8px',
                }}>
                Con trỏ:
              </span>
              {record.config.cursor_field.length > 0 ? (
                record.config.cursor_field.flat()?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })
              ) : (
                <>
                  <span
                    style={{
                      color: 'red',
                      marginRight: '10px',
                    }}>
                    Thiếu trường con trỏ
                  </span>
                </>
              )}
            </div>
          );
        } else if (typeSyncMode === 'incremental,append_dedup') {
          return (
            <div className={clsx(style.itemCursor)} onClick={handleClick}>
              <div>
                <span
                  style={{
                    paddingRight: '8px',
                  }}>
                  Con trỏ:
                </span>
                {record.config.cursor_field.length > 0 ? (
                  record.config.cursor_field.flat()?.map((item, index) => {
                    return <span key={index}>{item}</span>;
                  })
                ) : (
                  <>
                    <span
                      style={{
                        color: 'red',
                        marginRight: '10px',
                      }}>
                      Thiếu trường con trỏ
                    </span>
                  </>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                <span
                  style={{
                    paddingRight: '8px',
                    minWidth: '20px',
                  }}>
                  Khóa chính:
                </span>
                <div>
                  {record.config.primary_key.flat().length > 0 ? (
                    record.config.primary_key.flat().length > 2 ? (
                      <>
                        {record.config.primary_key
                          .flat()
                          .slice(0, 2)
                          .map((item, index) => {
                            return (
                              <Tooltip
                                key={index}
                                title={record.config.primary_key
                                  .flat()
                                  .map((item) => {
                                    return `${item}, `;
                                  })}>
                                <span>{item}, </span>
                              </Tooltip>
                            );
                          })}
                        ...
                      </>
                    ) : (
                      record.config.primary_key.flat().map((item, index) => {
                        return <span key={index}>{item}</span>;
                      })
                    )
                  ) : (
                    <>
                      <span
                        style={{
                          color: 'red',
                          marginRight: '10px',
                        }}>
                        Thiếu trường khóa chính
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div onClick={handleClick} className={clsx(style.itemCursor)}>
              Chế độ đồng bộ không yêu cầu cấu hình khóa chính, con trỏ
            </div>
          );
        }
      },
    },
    {
      title: messages['table.action'],
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <Tooltip className={clsx(style.toolTipIcon)} title='Chọn cột'>
              <SettingOutlined
                onClick={() => {
                  setIsModalOpen(true);
                  setDataRecord(record);
                }}
                className={clsx(style.iconAction)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  // data detail record
  const dataRenderTableRecord = listFieldsRecord?.map((item, index) => {
    return {
      key: index,
      name: item,
      type_record: isArray(dataRecordOld[item]?.type)
        ? dataRecordOld[item]?.type[0]
        : dataRecordOld[item]?.type || '',
      name_destination: item,
      nameTable: dataRecord?.stream?.name,
      configTable: configTable,
    };
  });

  const columnsRecord = [
    {
      title: 'Chọn cột',
      dataIndex: 'select_column',
      key: 'select_column',
      width: 130,
      render: (_, record) => {
        const nameColumn = record?.name;
        const findColumnChecked = listSelectColumns?.find((item) => {
          return item?.name === nameColumn;
        });

        const renderCheckedColumn = () => {
          if (findColumnChecked) {
            return findColumnChecked?.checked;
          } else {
            return false;
          }
        };

        return (
          <Switch
            onChange={(checked) => {
              const valueAddColumn = {
                name: nameColumn,
                checked: checked,
              };
              setSelectColumns((prev) => {
                const indexOldSelected = prev?.findIndex(
                  (item) => item?.name === valueAddColumn?.name,
                );
                if (indexOldSelected === -1) {
                  return [...prev, valueAddColumn];
                } else {
                  const newCopyColumns = [...prev];
                  newCopyColumns[indexOldSelected].checked =
                    valueAddColumn?.checked;
                  return newCopyColumns;
                }
              });
            }}
            checked={renderCheckedColumn()}
            disabled={listCursorFieldPrimary?.includes(nameColumn)}
          />
        );
      },
    },
    {
      title: 'Tên cột nguồn',
      dataIndex: 'name',
      key: 'name',
      width: 160,
    },
    {
      title: 'Loại dữ liệu',
      dataIndex: 'type_record',
      key: 'type_record',
      width: 100,
    },
    typeSyncModeRecord === 'incremental,append' ||
    typeSyncModeRecord === 'incremental,append_dedup'
      ? {
          title: 'Con trỏ',
          dataIndex: 'type_record',
          key: 'type_record',
          width: 100,
          align: 'center',
          render: (_, data) => {
            const indexOldChecked = dataStreams?.findIndex(
              (item) => item?.stream?.name === data.nameTable,
            );
            const dataCurrentChecked = dataStreams[indexOldChecked];
            return (
              <Radio
                checked={
                  dataCurrentChecked?.config?.cursor_field[0] === data.name
                }
                value={data.name}
                name='cursor_field'
                onClick={(e) => {
                  const checked = e?.target?.value;
                  const cursorField = [checked];
                  const nameTableCurrent = data.nameTable;
                  setDataStreams((prev) => {
                    const indexByNameTable = prev?.findIndex(
                      (item) => item?.stream?.name === nameTableCurrent,
                    );
                    const newDataStream = [...prev];
                    newDataStream[indexByNameTable].config.cursor_field =
                      cursorField;
                    return newDataStream;
                  });
                }}></Radio>
            );
          },
        }
      : null,
    typeSyncModeRecord === 'incremental,append_dedup'
      ? {
          title: 'Khóa chính',
          dataIndex: 'type_record',
          key: 'type_record',
          width: 100,
          render: (_, data) => {
            const indexOldCheckBox = dataStreams?.findIndex(
              (item) => item?.stream?.name === data.nameTable,
            );
            const dataCurrentChecked = dataStreams[indexOldCheckBox];
            if (
              dataCurrentChecked.stream.source_defined_primary_key.length > 0
            ) {
              return (
                <Checkbox
                  checked={
                    dataCurrentChecked?.stream?.source_defined_primary_key.flat()[0] ===
                    data.name
                  }
                  disabled
                  value={data.name}
                  name='primary_key'></Checkbox>
              );
            } else {
              const isOldChecked = dataCurrentChecked.config.primary_key
                .flat()
                .find((item) => {
                  return item === data.name;
                });

              return (
                <Checkbox
                  checked={Boolean(isOldChecked)}
                  value={data.name}
                  name='primary_key'
                  onClick={(e) => {
                    const valueCheckBox = e?.target?.value;
                    const nameTableCurrent = data.nameTable;
                    setDataStreams((prev) => {
                      const indexByNameTable = prev?.findIndex(
                        (item) => item?.stream?.name === nameTableCurrent,
                      );
                      const newDataStream = [...prev];
                      const listCheckBoxOld =
                        newDataStream[indexByNameTable].config.primary_key;

                      const index = listCheckBoxOld.findIndex((item) => {
                        return item[0] === valueCheckBox;
                      });
                      if (index === -1) {
                        newDataStream[indexByNameTable].config.primary_key = [
                          ...newDataStream[indexByNameTable].config.primary_key,
                          [valueCheckBox],
                        ];
                      } else {
                        newDataStream[
                          indexByNameTable
                        ].config.primary_key.splice(index, 1);
                      }
                      return newDataStream;
                    });
                  }}></Checkbox>
              );
            }
          },
        }
      : null,

    {
      title: 'Tên cột đích',
      dataIndex: 'name_destination',
      key: 'name_destination',
      align: 'center',
      width: 160,
    },
  ].filter(Boolean);

  // data error when config cursor || primary
  const errorCursorOrPrimary = dataStreams?.filter(({ config }) => {
    if (!config?.selected) return false;
    const { sync_mode, destination_sync_mode, cursor_field, primary_key } =
      config;

    const typeSyncMode = `${sync_mode},${destination_sync_mode}`;
    switch (typeSyncMode) {
      case 'incremental,append':
        return cursor_field.length === 0;
      case 'incremental,append_dedup':
        return primary_key.length === 0 || cursor_field.length === 0;
      default:
        return false;
    }
  });

  const handleChangeColumns = () => {
    const filterNotChecked = listSelectColumns?.filter((item) => item?.checked);
    const selectedColumnUpdate = filterNotChecked?.map((item) => {
      return {
        field_path: [item?.name],
      };
    });
    const filterSelectNotColumns = selectedColumnUpdate?.filter((item) => {
      return listFieldsRecord?.includes(item?.field_path[0]);
    });

    const nameTable = dataRecord?.stream?.name;
    setDataStreams((prev) => {
      const indexStream = prev?.findIndex(
        (item) => item?.stream?.name === nameTable,
      );
      if (indexStream === -1) return [...prev];

      const dataStreamCopy = [...prev];
      const streamConfig = dataStreamCopy[indexStream].config;

      streamConfig.field_selection_enabled =
        listFieldsRecord?.length !== filterSelectNotColumns?.length;
      streamConfig.selected_fields = streamConfig.field_selection_enabled
        ? filterSelectNotColumns
        : null;
      return dataStreamCopy;
    });
  };
  const { reloadPage } = useDataTableContext() || {};
  const dataContextConnection = useContext(ConTextDataConnection);
  const { loading: loadingCreateConnection, send: sendCreateConnection } =
    useCallApi({
      success: () => {
        notification.success('Thêm tiến trình thành công');
        dataContextConnection?.setIsOpenModalStep(false);
        dataContextConnection.setDataContext(false);
        dataContextConnection.setCurrent(0);
        reloadPage();
      },
      callApi: (data) => {
        return instanceCoreApi.post(API.CREATE_CONNECTION_AIR_BYTE, data);
      },
    });
  const handleAddConnection = async () => {
    try {
      const dataCreateConnection = {
        ...dataContextConnection?.dataCreateConnection,
        sync_catalog: {
          streams: dataStreams,
        },
      };
      const dataEncryptConnection = await encryptObject(
        dataCreateConnection,
        REACT_APP_SECRET_KEY,
      );
      sendCreateConnection({ data: dataEncryptConnection });
    } catch (error) {
      console.log('Lỗi trong hàm handleAddConnection: ', error);
    }
  };

  const handleGoBack = () => {
    dataContextConnection?.prevStep();
  };

  return (
    <>
      <div className={clsx(style.wrapSourceTable)}>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            {dataStatusSync?.is_running && (
              <div className={clsx(style.spinSync)}>
                <Spin tip='Đang đồng bộ'>
                  <h3></h3>
                </Spin>
              </div>
            )}
            <Space
              align='center'
              style={{
                width: '100%',
                justifyContent: isEmpty(dataContextConnection)
                  ? 'flex-end'
                  : 'space-between',
                alignItems: 'center',
              }}>
              {!isEmpty(dataContextConnection) && (
                <Search
                  style={{ width: 230, height: 32 }}
                  placeholder='Search'
                  value={value}
                  onChange={(e) => {
                    const currValue = e.target.value.trim();
                    setValue(currValue);
                    const filteredData = dataRenderTable.filter((entry) =>
                      entry?.stream?.name.includes(currValue),
                    );
                    setDataSource(filteredData);
                  }}
                />
              )}
              {isEmpty(dataContextConnection) && (
                <>
                  <AntButton
                    icon={<EyeOutlined />}
                    onClick={() => {
                      navigate(
                        `/${path[1]}/detail-info-history/${dataDetailConnection?.connection_id}`,
                      );
                    }}>
                    {messages['sidebar.view_log_progress']}
                  </AntButton>
                  {count <= 50 && (
                    <AntButton
                      icon={<RetweetOutlined />}
                      onClick={() => {
                        const newDataConfig = {
                          ...dataDetailConnection,
                          sync_catalog: {
                            streams: dataStreams,
                          },
                          source_catalog_id: dataDetailConnection?.catalog_id,
                          schedule: undefined,
                          skip_reset: true,
                        };
                        if (checkColumnDisableAll(dataStreams)) {
                          notification.error(
                            'Vui lòng chọn ít nhất 1 bảng để đồng bộ !',
                          );
                        } else {
                          if (errorCursorOrPrimary?.length === 0) {
                            updateConfig(newDataConfig);
                          } else {
                            const listNameTableMissingCursorOrPrimary =
                              errorCursorOrPrimary?.map(
                                (item) => item?.stream?.name,
                              );
                            notification.error(
                              ` Chế độ đồng bắt buộc, Bảng ${listNameTableMissingCursorOrPrimary?.join()} phải có khóa chính hoặc con trỏ, Vui lòng chọn khóa chính hoặc con trỏ ! `,
                            );
                          }
                        }
                      }}>
                      Cập nhật cấu hình đồng bộ
                    </AntButton>
                  )}
                </>
              )}
              <AntButton
                onClick={reloadDataConnection}
                icon={<UndoOutlined />}
                type='primary'
                ghost='ghost'>
                Làm mới bảng
              </AntButton>
            </Space>
          </Col>

          {!isEmpty(dataContextConnection) && (
            <Col span={24}>Số bảng chọn để đồng bộ là: {count} bảng</Col>
          )}

          <Col span={24}>
            <Table
              loading={loadingUpdateConfig}
              scroll={{ y: 450 }}
              columns={columns}
              dataSource={dataSource}
            />
          </Col>

          {!isEmpty(dataContextConnection) && (
            <Col span={24}>
              <AppCard>
                <div className='d-flex items-center justify-end gap-2'>
                  <AntButton onClick={handleGoBack}>
                    {messages['dialog.button.goBack']}
                  </AntButton>
                  {!isEmpty(dataRenderTable) &&
                    !isEmpty(streams) &&
                    count <= 50 && (
                      <AntButton
                        type='primary'
                        loading={loadingCreateConnection}
                        onClick={handleAddConnection}>
                        Thêm mới
                      </AntButton>
                    )}
                </div>
              </AppCard>
            </Col>
          )}
        </Row>

        <AntModal
          title='Thông tin'
          open={isModalOpen}
          centered
          onOk={() => {
            setIsModalOpen(false);
          }}
          footer={
            <>
              <AntButton
                onClick={() => {
                  setIsModalOpen(false);
                }}>
                Hủy
              </AntButton>
              <AntButton
                type='primary'
                onClick={() => {
                  handleChangeColumns();
                  setIsModalOpen(false);
                }}>
                Cập nhật
              </AntButton>
            </>
          }
          size={MODAL_SIZE.LARGE}
          onCancel={() => {
            setIsModalOpen(false);
          }}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <div className={clsx(style.header_detail_record)}>
                <div>
                  <h5>
                    Nguồn:
                    <Avatar
                      src={
                        dataRecord?.dataDetailConnection?.source?.icon ||
                        dataDetailSource?.icon || <IconCustomAirByte />
                      }
                    />
                    {dataSave?.source_display_name ||
                      dataRecord?.dataDetailConnection?.source?.name ||
                      dataDetailSource?.name}
                  </h5>
                </div>
                <div>
                  <h5>
                    Đích:
                    <Avatar
                      src={
                        dataRecord?.dataDetailConnection?.destination?.icon || (
                          <IconDestinationPostgres />
                        )
                      }
                    />
                    {dataRecord?.dataDetailConnection?.destination?.name ||
                      dataSave?.destination_display_name}
                  </h5>
                </div>
              </div>
              <h4>Tên bảng: {dataRecord?.stream?.name}</h4>
            </Col>
            <Col span={24}>
              <Table
                dataSource={dataRenderTableRecord}
                columns={columnsRecord}
                scroll={{ y: 450 }}
                pagination={false}
              />
            </Col>
          </Row>
        </AntModal>
      </div>
    </>
  );
}

export default SourceTable;
