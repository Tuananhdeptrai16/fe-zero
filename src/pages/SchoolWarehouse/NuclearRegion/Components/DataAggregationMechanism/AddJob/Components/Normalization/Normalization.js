import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React, { useRef, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import FormContent from 'src/@crema/component/FormContent';
import AppCard from 'src/@crema/core/AppCard';
import { getDataContextAddJob } from '../..';
import { isEmpty } from 'src/shared/utils/Typeof';
import AntModal from 'src/@crema/component/AntModal';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import InsertConditions from './InsertConditions';
import PreviewResults from './PreviewResults';
import notification from 'src/shared/utils/notification';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import useCallApi from 'src/@crema/hook/useCallApi';
import {
  decryptObject,
  encryptObject,
  handleRedundantData,
  renderDataCreateJob,
  renderModeSchedule,
} from 'src/shared/utils/Object';
import { useNavigate } from 'react-router-dom';
import FormRules from './FormRules';
import { handlePrevRulesAddJob, renderRulesJob } from 'src/shared/utils/Array';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import FormFormula from './FormFormula';
import { REACT_APP_SECRET_KEY } from 'src/shared/constants/serverConfig';
// import PropTypes from 'prop-types';

Normalization.propTypes = {};

function Normalization({ isDetail = false, isUpdate = false, dataDetailJob }) {
  const addButtonRef = useRef();
  const { dataCreateJob, setDataCreateJob, prevStep } = getDataContextAddJob();
  const { rulesOld, config_fields, typeDataMark } =
    dataCreateJob || dataDetailJob?.scheduler_response || {};
  const [isOpenModalCondition, setIsOpenModalCondition] = useState(false);
  const [code, setCode] = useState('');
  const [expression, setExpression] = useState('');
  const [isOpenPreviewResult, setIsOpenPreviewResult] = useState(false);
  const navigate = useNavigate();
  const [typeCreateJob, setTypeCreateJob] = useState(false);

  const renderUrlCreateJob = async (type, data) => {
    const encryptData = await encryptObject(data, REACT_APP_SECRET_KEY);
    const decryptData = await decryptObject(encryptData, REACT_APP_SECRET_KEY);
    console.log('1: ', decryptData);
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      // console.log(data);
      return instanceCoreApi.post(API.CREATE_JOB_AIRFLOW, {
        data: encryptData,
      });
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      return instanceCoreApi.post(API.CREATE_DATA_MARK, { data: encryptData });
    }
  };
  // create job
  const { loading: loadingCreateJob, send: sendCreateJob } = useCallApi({
    success: () => {
      notification.success('Tạo job thành công');
      setTimeout(() => {
        navigate(-1);
      }, 300);
    },
    callApi: (data) => {
      return renderUrlCreateJob(typeDataMark, data);
    },
  });

  // create formula
  const { loading: loadingCreateFormula, send: sendCreateFormula } = useCallApi(
    {
      success: () => {
        notification.success('Thêm mới công thức thành công');
        setTimeout(() => {
          navigate(-1);
        }, 300);
      },
      callApi: async (data) => {
        const encryptData = await encryptObject(data, REACT_APP_SECRET_KEY);
        return instanceCoreApi.post(API.CREATE_FORMULA, { data: encryptData });
      },
    },
  );

  // update formula
  const { send: sendUpdateFormula } = useCallApi({
    success: (res) => {
      notification.success(
        res?.result || 'Cập nhật dữ liệu cho công thức thành công',
      );
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

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AppCard>
          <FormContent
            ref={addButtonRef}
            onValuesChange={(_, dataAll) => {
              // add columns change values
              const rulesAll = dataAll?.rules || [];
              const listAddColumnsChange = rulesAll
                ?.filter((item) => item?.type === 'add_column')
                ?.map((item) => {
                  return {
                    type: 'add_column',
                    new_column: item?.add_column_new_name,
                    data_type: item?.add_column_data_type,
                  };
                });
              const newConfigFiled = listAddColumnsChange?.map((item) => {
                return {
                  is_key: true,
                  new_field_name: item?.new_column,
                  old_field_name: item?.new_column,
                  ...item,
                };
              });
              if (!isUpdate) {
                setDataCreateJob((prev) => {
                  return {
                    ...prev,
                    new_config_fields: [...config_fields, ...newConfigFiled],
                    rules: handlePrevRulesAddJob(dataAll) || [],
                  };
                });
              }
            }}
            onFinish={(data) => {
              const rules = data?.rules || [];
              const formulaData = data?.condition_formulas || [];

              if (isUpdate) {
                sendUpdateFormula({
                  condition_formulas: formulaData,
                });
              } else {
                const dataSetCreateJob = {
                  ...dataCreateJob,
                  config_condition:
                    isEmpty(dataCreateJob?.config_condition?.type) &&
                    !isEmpty(dataCreateJob?.code_query)
                      ? {
                          type: 'sql',
                          sql: dataCreateJob?.code_query,
                        }
                      : dataCreateJob?.config_condition,
                  rules: handlePrevRulesAddJob(data) || [],
                  config_tables: dataCreateJob?.config_tables?.map((item) => {
                    if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
                      return {
                        destination_id: item?.destination_id,
                        table_name: item?.table_name,
                        join_mapping: item?.join_mapping,
                        order: item?.order,
                      };
                    }
                    if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
                      return {
                        nuclear_region_id: item?.nuclear_region_id,
                        table_name: item?.table_name,
                        join_mapping: item?.join_mapping,
                        order: item?.order,
                      };
                    }
                    if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
                      return {
                        dtm_region_id: item?.dtm_region_id,
                        table_name: item?.table_name,
                        join_mapping: item?.join_mapping,
                        order: item?.order,
                      };
                    }
                  }),
                  config_fields: dataCreateJob?.config_fields.map((item) => {
                    return {
                      is_key: item?.is_key,
                      old_field_name: item?.old_field_name,
                      new_field_name: item?.new_field_name,
                      table_order: item?.table_order,
                      display_name: item?.display_name,
                      data_type: item?.data_type,
                    };
                  }),
                  nuclear_table_name:
                    typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM
                      ? dataCreateJob?.nuclear_table_name
                      : '',
                  dtm_table_name:
                    typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM
                      ? dataCreateJob?.dtm_table_name
                      : '',
                  new_data_table_name:
                    typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML
                      ? dataCreateJob?.new_data_table_name
                      : '',
                  condition_formulas:
                    typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML
                      ? formulaData
                      : '',
                  new_config_fields: '',
                  listColumnsOptions: '',
                  rulesOld: '',
                  isReloadCallPreviewResult: '',
                  typeDataMark: '',
                  code_query: '',
                  mode_scheduler: '',
                  ...renderModeSchedule(dataCreateJob),
                };

                setDataCreateJob((prev) => {
                  return {
                    ...prev,
                    rules: handlePrevRulesAddJob(data) || [],
                    rulesOld: rules || [],
                    condition_formulas: formulaData,
                  };
                });

                if (typeCreateJob) {
                  if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
                    sendCreateFormula(handleRedundantData(dataSetCreateJob));
                  } else {
                    const newDataConvertAddJob =
                      renderDataCreateJob(dataSetCreateJob);
                    sendCreateJob(handleRedundantData(newDataConvertAddJob));
                  }
                } else {
                  setDataCreateJob((prev) => {
                    return {
                      ...prev,
                      isReloadCallPreviewResult: true,
                    };
                  });
                  setIsOpenPreviewResult(true);
                }
              }
            }}
            initialValues={{
              rules:
                rulesOld ||
                renderRulesJob(dataDetailJob?.scheduler_response?.rules),
              condition_formulas:
                dataCreateJob?.condition_formulas ||
                dataDetailJob?.scheduler_response?.condition_formulas,
            }}
            layout='vertical'>
            <Row
              gutter={[8, 8]}
              className='d-flex items-center justify-end flex-row'>
              <Col span={24}>
                {typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML ? (
                  <FormFormula
                    isDetail={isDetail}
                    dataDetailJob={dataDetailJob}
                    isUpdate={isUpdate}
                  />
                ) : (
                  <FormRules
                    isDetail={isDetail}
                    dataDetailJob={dataDetailJob}
                  />
                )}
              </Col>
            </Row>
          </FormContent>
        </AppCard>
      </Col>
      {isDetail || isUpdate ? (
        <></>
      ) : (
        <Col span={24}>
          <AppCard>
            <div className='d-flex items-center justify-end flex-row gap-2'>
              <AntButton icon={<ArrowLeftOutlined />} onClick={prevStep}>
                Quay lại
              </AntButton>
              {!(typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) && (
                <AntButton
                  onClick={() => {
                    setTypeCreateJob(false);
                    addButtonRef.current.submit();
                  }}>
                  Xem trước kết quả
                </AntButton>
              )}

              <AntButton
                onClick={() => {
                  navigate(-1);
                }}>
                Hủy
              </AntButton>

              <AntButton
                loading={loadingCreateJob || loadingCreateFormula}
                type='primary'
                onClick={() => {
                  setTypeCreateJob(true);
                  addButtonRef.current.submit();
                }}>
                {typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML
                  ? 'Tạo công thức'
                  : 'Tạo job'}
              </AntButton>
            </div>
          </AppCard>
        </Col>
      )}

      {isUpdate && (
        <Col span={24}>
          <AppCard>
            <div className='d-flex items-center justify-end flex-row gap-2'>
              <AntButton
                onClick={() => {
                  navigate(-1);
                }}>
                Hủy
              </AntButton>
              <AntButton
                type='primary'
                onClick={() => {
                  if (!isEmpty(addButtonRef.current)) {
                    addButtonRef.current.submit();
                  }
                }}>
                Cập nhật
              </AntButton>
            </div>
          </AppCard>
        </Col>
      )}
      <Col span={24}>
        <AntModal
          title={'Chèn điều kiện'}
          bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
          onCancel={() => {
            setIsOpenModalCondition(false);
          }}
          onOk={() => {
            setIsOpenModalCondition(false);
          }}
          okText='Xong'
          centered
          open={isOpenModalCondition}
          size={MODAL_SIZE.LARGE}>
          <InsertConditions
            code={code}
            setCode={setCode}
            expression={expression}
            setExpression={setExpression}
          />
        </AntModal>
      </Col>
      <Col span={24}>
        <AntModal
          title={'Xem trước kết quả'}
          bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
          onCancel={() => {
            setIsOpenPreviewResult(false);
            setDataCreateJob((prev) => {
              return {
                ...prev,
                isReloadCallPreviewResult: false,
              };
            });
          }}
          onOk={() => {
            setIsOpenPreviewResult(false);
          }}
          footer={null}
          centered
          open={isOpenPreviewResult}
          size={MODAL_SIZE.XLARGE}>
          <PreviewResults />
        </AntModal>
      </Col>
    </Row>
  );
}

export default Normalization;
