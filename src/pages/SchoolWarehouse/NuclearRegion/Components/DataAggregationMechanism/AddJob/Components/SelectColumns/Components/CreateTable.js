import React, { useEffect, useMemo, useState } from 'react';
import { getDataContextAddJob } from '../../..';
import { Col, Row, Table, Input } from 'antd';
import FormContent from 'src/@crema/component/FormContent';
import FormInput from 'src/@crema/core/Form/FormInput';
import { isEmpty } from 'src/shared/utils/Typeof';
import {
  encryptObject,
  handleRedundantData,
  renderKeyModeQueryDetail,
} from 'src/shared/utils/Object';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import {
  MODE_OPTION_TABLE_CREATE_JOB,
  MODE_QUERY_JOB,
  TYPE_DATA_MARK_SCHOOL_WAREHOUSE,
} from 'src/shared/constants/DataFixed';
import { flatColumnsTable } from 'src/shared/utils/filter';
import notification from 'src/shared/utils/notification';
const { Search } = Input;
import style from './CreateTable.module.scss';
import clsx from 'clsx';
import { SmileOutlined } from '@ant-design/icons';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { useNavigate } from 'react-router-dom';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import {
  handleAnalyzeSQL,
  renderNewColumnDuplicate,
} from 'src/shared/utils/Array';
import FormDestinationTableName from './FormDestinationTableName';
import { extractViewTableAndColumns } from 'src/shared/utils/String';
import { REACT_APP_SECRET_KEY } from 'src/shared/constants/serverConfig';

CreateTable.propTypes = {};

function CreateTable({
  refFormNextStep,
  modeOptionTable,
  isDetail = false,
  isUpdate = false,
  dataDetailJob,
  refFormSelectColumn,
}) {
  const { dataCreateJob, setDataCreateJob, nextStep } = getDataContextAddJob();
  const navigate = useNavigate();
  const { sql } = dataCreateJob || {};
  const keyModeQuey =
    dataCreateJob?.keyModeQuey || renderKeyModeQueryDetail(dataDetailJob);
  const sqlParser = useMemo(() => {
    return handleAnalyzeSQL(sql);
  }, [sql]);
  const { columns: listColumnsParseSql } = useMemo(() => {
    const { table, columns } = extractViewTableAndColumns(sqlParser) || {};

    return {
      table,
      columns: columns.map((column, index) => ({
        old_field_name: column,
        new_field_name: column,
        column_name: column,
        field_name: column,
        data_type: '',
        display_name: '',
        is_key: false,
        key: `${column}_${index}`,
      })),
    };
  }, [sqlParser]);

  const dataByCodeQuey = listColumnsParseSql?.map((item) => {
    const dataColumnOld = (dataCreateJob?.config_fields || [])?.find(
      (data) => data?.key === item?.key,
    );
    return {
      ...item,
      is_key: Boolean(dataColumnOld?.is_key) || Boolean(item?.is_key),
      display_name: dataColumnOld?.display_name || item?.display_name,
      new_field_name: dataColumnOld?.new_field_name || item?.new_field_name,
    };
  });

  const [dataModeCodeQuery, setDataModeCodeQuery] = useState();
  useEffect(() => {
    setDataModeCodeQuery(dataByCodeQuey);
  }, [dataByCodeQuey?.length]);

  const selectedRowKeysDetailJob =
    dataDetailJob?.scheduler_response?.config_fields?.map(
      (item, index) => `${item?.old_field_name}/${index}`,
    ) || dataCreateJob?.config_fields?.map((item) => item?.key);

  const [selectedRowKeys, setSelectedRowKeys] = useState(
    (isDetail || isUpdate ? modeOptionTable : dataCreateJob?.option) ===
      MODE_OPTION_TABLE_CREATE_JOB?.create_table
      ? selectedRowKeysDetailJob
      : [],
  );

  const [selectedRecord, setSelectedRecord] = useState(
    (isDetail || isUpdate ? modeOptionTable : dataCreateJob?.option) ===
      MODE_OPTION_TABLE_CREATE_JOB?.create_table
      ? dataCreateJob?.config_fields
      : [],
  );

  const {
    listColumnsOptions: listColumns,
    typeDataMark,
    nuclear_region_id,
    dtm_region_id,
  } = dataCreateJob || dataDetailJob?.scheduler_response || {};
  const [nuclearTableUseTable, setNuclearTableUseTable] = useState(
    dataCreateJob?.nuclear_table_name || '',
  );

  let listColumnsOptions = listColumns;
  if (keyModeQuey === MODE_QUERY_JOB.QUERY_CODE) {
    listColumnsOptions = listColumnsParseSql;
  }

  const [searchValue, setSearchValue] = useState('');

  // get list table nuclear option used_table
  const renderUrlGetTableModeUseTable = (type) => {
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      return API.GET_LIST_TABLE_NUCLEAR_REGION(nuclear_region_id);
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      return API.GET_LIST_TABLE_DATA_MARK(dtm_region_id);
    }
  };
  // render params get key table old
  const renderParamGetKey = (type) => {
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      return {
        tableName: nuclearTableUseTable,
        type: 'ATM',
      };
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      return {
        tableName: nuclearTableUseTable,
        type: 'DTM',
      };
    }
    return {};
  };

  const { data } = useFetch(
    {
      enabled: modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table,
      method: METHOD_FETCH.GET,
      url: renderUrlGetTableModeUseTable(typeDataMark),
    },
    [modeOptionTable, nuclear_region_id, dtm_region_id, typeDataMark],
  );
  const database_name = data?.result?.schema;
  const listTableByDestination = data?.result?.tables || [];
  const optionSelectTableRenders = listTableByDestination?.map((item) => {
    return {
      label: item?.table_name,
      value: item?.table_name,
    };
  });
  const tableBySelectColumn = listTableByDestination?.find((item) => {
    return item?.table_name === nuclearTableUseTable;
  });

  // get key old table
  const { data: dataKeyTable, error } = useFetch(
    {
      enabled: modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table,
      method: METHOD_FETCH.GET,
      url: API.GET_KEY_TABLE_OLD,
      params: renderParamGetKey(typeDataMark),
    },
    [modeOptionTable, nuclearTableUseTable, typeDataMark],
  );
  const listKeyMap = !isEmpty(error) ? [] : dataKeyTable?.result?.key_map || [];

  const renderKeyMap = (columnOld) => {
    if (!isEmpty(listKeyMap)) {
      const dataKeyOld = listKeyMap?.find((item) => {
        return item?.new_field_name === columnOld;
      });

      if (!isEmpty(dataKeyOld)) {
        return dataKeyOld?.is_key;
      } else {
        return false;
      }
    }
    return false;
  };

  const dataTableModeUsedTable = flatColumnsTable(
    [tableBySelectColumn],
    database_name,
  )
    ?.map((item, index) => {
      const itemOldSelectedUseTable = dataCreateJob?.config_fields?.find(
        (select) => {
          return select?.key === `${item?.column_name}/${index}`;
        },
      );

      return {
        table_order: itemOldSelectedUseTable?.table_order || item?.table_order,
        old_field_name: itemOldSelectedUseTable?.old_field_name || '',
        new_field_name: item?.field_name,
        is_key: renderKeyMap(item?.field_name),
        key: `${item?.column_name}/${index}`,
        data_type_current: item?.data_type,
      };
    })
    ?.filter((item) => {
      return (
        item?.new_field_name !== 'key_map' &&
        item?.new_field_name !== 'extract_time'
      );
    });

  const [selectColumnModeUseTable, setSelectColumnModeUseTable] = useState(
    dataTableModeUsedTable,
  );

  useEffect(() => {
    setSelectColumnModeUseTable(dataTableModeUsedTable);
  }, [dataTableModeUsedTable?.length, listKeyMap?.length]);

  // mode create table
  const dataRenderTable = isEmpty(listColumnsOptions)
    ? []
    : listColumnsOptions?.map((item, index) => {
        const itemOldSelected = selectedRecord?.find((select) => {
          return select?.key === `${item?.column_name}/${index}`;
        });
        return {
          ...item,
          old_field_name: itemOldSelected?.old_field_name || item?.field_name,
          new_field_name: itemOldSelected?.new_field_name || item?.field_name,
          display_name: itemOldSelected?.display_name || item?.display_name,
          is_key: Boolean(itemOldSelected?.is_key) || Boolean(item?.is_key),
          index,
          key: `${item?.column_name}/${index}`,
        };
      });
  const [dataRenderSelectColumn, setDataRenderSelectColumn] =
    useState(dataRenderTable);

  let dataColumnTypeCreateTable = [];
  if (isEmpty(searchValue)) {
    dataColumnTypeCreateTable =
      isDetail || isUpdate
        ? dataDetailJob?.scheduler_response?.config_fields?.map(
            (item, index) => {
              return {
                ...item,
                display_name: item?.display_name,
                is_key: Boolean(item?.is_key),
                index,
                key: `${item?.old_field_name}/${index}`,
                field_name: item?.old_field_name || '',
              };
            },
          )
        : dataRenderSelectColumn;
  } else {
    const newDataSearchKeyWord = dataRenderSelectColumn?.filter((item) => {
      const listValues =
        Object.values(item)?.filter(
          (value) => Boolean(value) && typeof value === 'string',
        ) || [];
      return listValues?.some((value) =>
        value?.toUpperCase()?.includes(searchValue?.toUpperCase()),
      );
    });

    const dataNotExistSelected = [];
    newDataSearchKeyWord?.forEach((item) => {
      const indexOldSelected = selectedRecord?.findIndex(
        (data) => data?.key === item?.key,
      );
      if (indexOldSelected === -1) {
        dataNotExistSelected?.push(item);
      }
    });

    // dataColumnTypeCreateTable = [...selectedRecord, ...dataNotExistSelected];
    dataColumnTypeCreateTable = [...newDataSearchKeyWord];
  }

  // mode useTable
  let dataColumnTypeUseTable = [];
  if (isEmpty(searchValue)) {
    dataColumnTypeUseTable = selectColumnModeUseTable;
  } else {
    dataColumnTypeUseTable = selectColumnModeUseTable?.filter((item) => {
      const listValues =
        Object.values(item)?.filter(
          (value) => Boolean(value) && typeof value === 'string',
        ) || [];
      return listValues?.some((value) =>
        value?.toUpperCase()?.includes(searchValue?.toUpperCase()),
      );
    });
  }

  const renderColumnOldModeUseTable = (type) => {
    if (isEmpty(type)) {
      return [];
    } else {
      const dataFilterByType = listColumnsOptions?.filter((item) => {
        return item?.data_type === type || isEmpty(item?.data_type);
      });
      return dataFilterByType;
    }
  };

  let dataTypeQueryCode = [];
  if (isEmpty(searchValue)) {
    dataTypeQueryCode = isDetail
      ? dataDetailJob?.scheduler_response?.config_fields?.map((item, index) => {
          return {
            ...item,
            display_name: item?.display_name,
            is_key: Boolean(item?.is_key),
            index,
            key: `${item?.new_field_name}/${index}`,
            field_name: item?.old_field_name || '',
          };
        })
      : dataModeCodeQuery;
  } else {
    dataTypeQueryCode = dataModeCodeQuery?.filter((item) => {
      const listValues =
        Object.values(item)?.filter(
          (value) => Boolean(value) && typeof value === 'string',
        ) || [];
      return listValues?.some((value) =>
        value?.toUpperCase()?.includes(searchValue?.toUpperCase()),
      );
    });
  }

  const columns = [
    {
      title: 'Tên cột',
      dataIndex: 'old_field_name',
      key: 'old_field_name',
      render: (_, record) => {
        if (modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table) {
          return (
            <FormContent
              ref={refFormSelectColumn}
              initialValues={{
                select_columns: record?.old_field_name,
              }}
              onFinish={() => {}}>
              <FormSelect
                options={renderColumnOldModeUseTable(
                  record?.data_type_current,
                )?.map((item) => {
                  return {
                    label: `${item?.field_name} ${
                      item?.schema && item?.table_name
                        ? `(${item?.schema} - ${item?.table_name})`
                        : ''
                    }`,
                    value: item?.field_name,
                    table_order: item?.table_order,
                  };
                })}
                notFoundContent={
                  <div className={clsx(style.renderNotFoundItem)}>
                    <SmileOutlined className={clsx(style.notFoundIcon)} />
                    <p className={clsx(style.notFoundText)}>
                      Không có cột nào bạn vừa join khớp với kiểu dữ liệu ở cột
                      đích có sẵn !
                    </p>
                  </div>
                }
                placeholder='Chọn cột'
                name='select_columns'
                required
                labelHidden='Chọn cột'
                getPopupContainer={null}
                onChange={(value, option) => {
                  const keyRow = record?.key;
                  const valueChange = handleRedundantData(value);
                  setSelectColumnModeUseTable((prev) => {
                    const indexPrev = prev?.findIndex((item) => {
                      return item?.key === keyRow;
                    });
                    if (indexPrev === -1) {
                      return [...prev];
                    } else {
                      const prevDataCopy = [...prev];
                      prevDataCopy[indexPrev].old_field_name = valueChange;
                      prevDataCopy[indexPrev].table_order = option?.table_order;
                      return [...prevDataCopy];
                    }
                  });
                }}
              />
            </FormContent>
          );
        } else {
          if (record?.schema && record?.table_name) {
            return (
              <span>
                {record?.old_field_name}
                {` (${record?.schema} - ${record?.table_name})`}
              </span>
            );
          }
          return <span>{record?.old_field_name}</span>;
        }
      },
    },
    isDetail ||
    isUpdate ||
    modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table
      ? {
          title: 'Tên cột đích',
          dataIndex: 'new_field_name',
          key: 'new_field_name',
        }
      : {
          title: 'Tên cột đích mới',
          dataIndex: 'new_field_name',
          key: 'new_field_name',
          render: (_, record) => {
            const oldFieldName = dataCreateJob?.config_fields?.find((item) => {
              return item?.old_field_name === record?.old_field_name;
            });
            return (
              <FormContent
                onFinish={() => {}}
                initialValues={{
                  new_field_name:
                    record?.new_field_name || oldFieldName?.new_field_name,
                }}>
                <FormInput
                  onChange={(e) => {
                    const keyRow = record?.key;
                    const valueChange = handleRedundantData(e?.target?.value);
                    setDataRenderSelectColumn((prev) => {
                      const indexPrev = prev?.findIndex((item) => {
                        return item?.key === keyRow;
                      });
                      if (indexPrev === -1) {
                        return [...prev];
                      } else {
                        const prevDataCopy = [...prev];
                        prevDataCopy[indexPrev].new_field_name = valueChange;
                        return [...prevDataCopy];
                      }
                    });
                    setSelectedRecord((prev) => {
                      const indexOldSelected = prev?.findIndex((item) => {
                        return item?.key === keyRow;
                      });
                      if (indexOldSelected === -1) {
                        return [...prev];
                      } else {
                        const newSelectedRecord = [...prev];
                        newSelectedRecord[indexOldSelected] = record;
                        return newSelectedRecord;
                      }
                    });
                    setDataModeCodeQuery((prev) => {
                      const indexPrev = prev?.findIndex((item) => {
                        return item?.key === keyRow;
                      });
                      if (indexPrev === -1) {
                        return [...prev];
                      } else {
                        const prevDataCopy = [...prev];
                        prevDataCopy[indexPrev].new_field_name = valueChange;
                        return [...prevDataCopy];
                      }
                    });
                  }}
                  disabled={isDetail || isUpdate}
                  // required
                  placeholder='Nhập tên cột đích mới'
                  name='new_field_name'
                  labelHidden='Tên cột đích mới'
                />
              </FormContent>
            );
          },
        },
    {
      title: 'Mô tả cột',
      dataIndex: 'display_name',
      key: 'display_name',
      render: (_, record) => {
        const oldFieldName = dataCreateJob?.config_fields?.find((item) => {
          return item?.old_field_name === record?.old_field_name;
        });
        return (
          <FormContent
            onFinish={() => {}}
            initialValues={{
              display_name: record?.display_name || oldFieldName?.display_name,
            }}>
            <FormInput
              disabled={
                modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table ||
                isDetail ||
                isUpdate
              }
              onChange={(e) => {
                const keyRow = record?.key;
                const valueChange = handleRedundantData(e?.target?.value);
                setDataRenderSelectColumn((prev) => {
                  const indexPrev = prev?.findIndex((item) => {
                    return item?.key === keyRow;
                  });
                  if (indexPrev === -1) {
                    return [...prev];
                  } else {
                    const prevDataCopy = [...prev];
                    prevDataCopy[indexPrev].display_name = valueChange;
                    return [...prevDataCopy];
                  }
                });
                setSelectedRecord((prev) => {
                  const indexOldSelected = prev?.findIndex((item) => {
                    return item?.key === keyRow;
                  });
                  if (indexOldSelected === -1) {
                    return [...prev];
                  } else {
                    const newSelectedRecord = [...prev];
                    newSelectedRecord[indexOldSelected] = record;
                    return newSelectedRecord;
                  }
                });
                setDataModeCodeQuery((prev) => {
                  const indexPrev = prev?.findIndex((item) => {
                    return item?.key === keyRow;
                  });
                  if (indexPrev === -1) {
                    return [...prev];
                  } else {
                    const prevDataCopy = [...prev];
                    prevDataCopy[indexPrev].display_name = valueChange;
                    return [...prevDataCopy];
                  }
                });
              }}
              placeholder='Nhập mô tả cột'
              name='display_name'
              labelHidden='Nhập mô tả cột'
            />
          </FormContent>
        );
      },
    },
    {
      title: 'Khóa',
      dataIndex: 'is_key',
      key: 'is_key',
      render: (_, record) => {
        return (
          <AntCheckbox
            checked={record?.is_key}
            defaultChecked={record?.is_key}
            disabled={
              modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table ||
              isDetail ||
              isUpdate
            }
            onChange={(e) => {
              const keyRow = record?.key;
              const valueChange = handleRedundantData(e?.target?.checked);
              setDataRenderSelectColumn((prev) => {
                const indexPrev = prev?.findIndex((item) => {
                  return item?.key === keyRow;
                });
                if (indexPrev === -1) {
                  return [...prev];
                } else {
                  const prevDataCopy = [...prev];
                  prevDataCopy[indexPrev].is_key = valueChange;
                  return [...prevDataCopy];
                }
              });
              setSelectedRecord((prev) => {
                const indexOldSelected = prev?.findIndex((item) => {
                  return item?.key === keyRow;
                });
                if (indexOldSelected === -1) {
                  return [...prev];
                } else {
                  const newSelectedRecord = [...prev];
                  newSelectedRecord[indexOldSelected] = record;
                  return newSelectedRecord;
                }
              });
              setDataModeCodeQuery((prev) => {
                const indexPrev = prev?.findIndex((item) => {
                  return item?.key === keyRow;
                });
                if (indexPrev === -1) {
                  return [...prev];
                } else {
                  const prevDataCopy = [...prev];
                  prevDataCopy[indexPrev].is_key = valueChange;
                  return [...prevDataCopy];
                }
              });
            }}
            name='is_key'
          />
        );
      },
    },
  ]?.filter(Boolean);

  const onSelectChange = (newSelectedRowKeys, selectedRecord) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRecord(selectedRecord);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps:
      isDetail || isUpdate
        ? () => {
            return {
              disabled: true,
              checked: true,
            };
          }
        : null,
  };

  const onSearch = (value) => {
    setSearchValue(handleRedundantData(value));
  };

  const renderInitTableName = () => {
    if (isDetail || isUpdate) {
      return (
        dataDetailJob?.scheduler_response?.nuclear_table_name ||
        dataDetailJob?.scheduler_response?.dtm_table_name ||
        dataDetailJob?.scheduler_response?.table_view ||
        ''
      );
    } else {
      if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
        return dataCreateJob?.nuclear_table_name;
      }
      if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
        return dataCreateJob?.dtm_table_name;
      }
      if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
        return dataCreateJob?.new_data_table_name;
      }
      return '';
    }
  };

  // update formula
  const { send: sendUpdateFormula } = useCallApi({
    success: (res) => {
      notification.success(res?.result || 'Cập nhật công thức thành công');
      setTimeout(() => {
        navigate(-1);
      }, 300);
    },
    callApi: async (data) => {
      const encryptData = await encryptObject(data, REACT_APP_SECRET_KEY);
      return instanceCoreApi.put(
        API.UPDATE_FORMULA(dataDetailJob?.scheduler_response?.id),
        { data: encryptData },
      );
    },
  });

  const renderRowSelection = () => {
    if (modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table) {
      return null;
    } else {
      if (keyModeQuey === MODE_QUERY_JOB.QUERY_CODE) {
        return null;
      }
      return rowSelection;
    }
  };

  const renderDataSource = () => {
    if (modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table) {
      return dataColumnTypeUseTable;
    } else {
      if (keyModeQuey === MODE_QUERY_JOB.QUERY_CODE) {
        return dataTypeQueryCode || [];
      }
      return dataColumnTypeCreateTable || [];
    }
  };

  const renderConfigFields = () => {
    if (modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table) {
      return selectColumnModeUseTable
        ?.map((item) => {
          return {
            old_field_name: item?.old_field_name,
            new_field_name: item?.new_field_name,
            is_key: item?.is_key,
            display_name: item?.display_name,
            key: item?.key,
            table_order: item?.table_order,
            ...item,
          };
        })
        ?.filter((data) => !isEmpty(data?.old_field_name));
    }

    if (modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.create_table) {
      if (keyModeQuey === MODE_QUERY_JOB.QUERY_CODE) {
        return dataModeCodeQuery
          ?.map((item, index) => {
            return {
              old_field_name: item?.new_field_name,
              new_field_name: item?.new_field_name,
              is_key: item?.is_key,
              display_name: item?.display_name,
              index,
              key: item?.key,
              ...item,
            };
          })
          ?.filter((data) => !isEmpty(data?.new_field_name));
      }
      return selectedRecord?.map((item) => {
        return {
          table_order: item?.table_order,
          old_field_name: item?.field_name || item?.old_field_name,
          new_field_name: item?.new_field_name,
          is_key: item?.is_key,
          display_name: item?.display_name,
          key: item?.key,
          ...item,
        };
      });
    }
  };

  return (
    <FormContent
      layout='vertical'
      initialValues={
        isDetail || isUpdate || dataCreateJob?.nuclear_table_name
          ? (isDetail || isUpdate ? modeOptionTable : dataCreateJob?.option) ===
            MODE_OPTION_TABLE_CREATE_JOB?.create_table
            ? {
                nuclear_table_name_create_table: renderInitTableName(),
                nuclear_table_name_use_table: '',
              }
            : {
                nuclear_table_name_use_table: renderInitTableName(),
                nuclear_table_name_create_table: '',
              }
          : {}
      }
      ref={refFormNextStep}
      onValuesChange={(value) => {
        setNuclearTableUseTable(value?.nuclear_table_name_use_table);
      }}
      onFinish={(data) => {
        const nuclearTableName =
          modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.create_table
            ? data?.nuclear_table_name_create_table
            : data?.nuclear_table_name_use_table;

        if (isUpdate) {
          sendUpdateFormula({
            new_data_table_name: nuclearTableName,
          });
        } else {
          const config_fields = renderConfigFields();
          setDataCreateJob((prev) => {
            return {
              ...prev,
              option: modeOptionTable,
              config_fields,
              nuclear_table_name: nuclearTableName,
              dtm_table_name: nuclearTableName,
              new_data_table_name: nuclearTableName,
              new_config_fields: config_fields,
            };
          });
          if (isEmpty(config_fields)) {
            notification.warning('Vui lòng chọn ít nhất 1 cột !');
          } else {
            const lengthCheckDuplicate = renderNewColumnDuplicate(
              config_fields || [],
            );

            const checkEmptyOldField = config_fields?.filter(
              (item) => item?.old_field_name,
            );
            const checkEmptyNewField = config_fields?.filter(
              (item) => !item?.new_field_name,
            );
            const checkSelectIsKey = config_fields?.filter((item) => {
              return item?.is_key === true;
            });
            if (!isEmpty(checkSelectIsKey)) {
              if (
                !isEmpty(lengthCheckDuplicate) &&
                isEmpty(checkEmptyNewField)
              ) {
                notification.warning(
                  `Tên cột đích ${lengthCheckDuplicate?.join(
                    '-',
                  )} bị trùng lặp, vui lòng kiểm tra lại !`,
                );
              } else {
                if (
                  modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table
                ) {
                  if (isEmpty(checkEmptyOldField)) {
                    notification.warning('Vui lòng chọn ít nhất 1 cột !');
                  } else {
                    nextStep();
                  }
                } else {
                  if (!isEmpty(checkEmptyNewField)) {
                    notification.warning('Tên cột đích mới là bắt buộc !');
                  } else {
                    nextStep();
                  }
                }
              }
            } else {
              notification.warning(
                'Trong các cột được chọn, phải có ít nhất 1 cột có khóa !',
              );
            }
          }
        }
      }}>
      <Row gutter={[12, 12]} className={clsx(style.wrapCreateTable)}>
        <FormDestinationTableName
          dataDetailJob={dataDetailJob}
          modeOptionTable={modeOptionTable}
          isDetail={isDetail}
          optionSelectTableRenders={optionSelectTableRenders}
          sqlParser={sqlParser}
        />
        <Col span={24}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <div className='d-flex justify-between items-center'>
                <h5>Chọn cột</h5>
                {isDetail || isUpdate ? (
                  <></>
                ) : (
                  <Search
                    placeholder='Nhập nội dung tìm kiếm'
                    onSearch={onSearch}
                    style={{
                      width: 264,
                    }}
                  />
                )}
              </div>
            </Col>
            <Col span={24}>
              <Table
                className={clsx(style.tableAntd)}
                pagination={false}
                scroll={{
                  y: '36vh',
                }}
                rowKey={'key'}
                rowSelection={renderRowSelection()}
                dataSource={renderDataSource()}
                columns={columns}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </FormContent>
  );
}

export default CreateTable;
