import { Col, Row, Tag, Tooltip } from 'antd';
import React, { useRef } from 'react';
import Query from '../../NuclearRegion/Components/DataAggregationMechanism/AddJob/Components/Query/Query';
import FormContent from 'src/@crema/component/FormContent';
import AppCard from 'src/@crema/core/AppCard';
import AntButton from 'src/@crema/component/AntButton';
import { useNavigate } from 'react-router-dom';
import FormNameFormula from '../../NuclearRegion/Components/DataAggregationMechanism/AddJob/Components/NameJob/FormNameFormula';
import style from './DetailFormula.module.scss';
import clsx from 'clsx';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import useCallApi from 'src/@crema/hook/useCallApi';
import notification from 'src/shared/utils/notification';
import { encryptObject } from 'src/shared/utils/Object';
import { REACT_APP_SECRET_KEY } from 'src/shared/constants/serverConfig';
// import PropTypes from 'prop-types';

QueryJob.propTypes = {};

function QueryJob({ isDetail, isUpdate, dataDetailJob, onlySelectQuery }) {
  const navigate = useNavigate();
  const refGroupByUpdate = useRef();

  const listTable = dataDetailJob?.scheduler_response?.config_tables?.map(
    (item) => {
      return item?.table_name;
    },
  );

  const initialValuesFormula = {
    formula_name: dataDetailJob?.formula_name,
    criterion_id: dataDetailJob?.scheduler_response?.criterion_id,
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

  return (
    <FormContent
      initialValues={initialValuesFormula}
      labelCol={{ span: 6 }}
      labelAlign='left'
      onFinish={async (data) => {
        try {
          let newDataUpdate = {
            config_condition: data?.config_condition || null,
            group_by: null,
          };
          if (data?.formula_name !== dataDetailJob?.formula_name) {
            newDataUpdate = {
              ...newDataUpdate,
              formula_name: data?.formula_name,
            };
          }
          if (
            data?.criterion_id !==
            dataDetailJob?.scheduler_response?.criterion_id
          ) {
            newDataUpdate = {
              ...newDataUpdate,

              criterion_id: data?.criterion_id,
            };
          }

          if (data?.isGroupBy) {
            await refGroupByUpdate?.current?.validateFields();
            await refGroupByUpdate?.current?.submit();
            const group_by = refGroupByUpdate?.current.getFieldsValue();
            newDataUpdate = {
              ...newDataUpdate,
              group_by,
            };
          }
          sendUpdateFormula(newDataUpdate);
        } catch (error) {
          console.error('Validate thất bại:', error);
        }
      }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AppCard>
            <Row>
              <Col span={24}>
                <FormNameFormula isUpdate={isUpdate} isDetail={isDetail} />
              </Col>
              <Col span={24}>
                <Col span={24}>
                  <label className={clsx(style.label_select_table)}>
                    Chọn bảng
                  </label>
                  <div className='d-flex items-center justify-start'>
                    <div>
                      {listTable?.map((tag, index) => {
                        const isLongTag = tag?.length > 20;
                        const tagElem = (
                          <Tag
                            style={{
                              padding: '5.2px',
                            }}
                            key={`${tag},${index}`}
                            closable={false}>
                            <span>
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                          </Tag>
                        );
                        return isLongTag ? (
                          <Tooltip title={tag} key={tag}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        );
                      })}
                    </div>
                  </div>
                </Col>
              </Col>
            </Row>
          </AppCard>
        </Col>

        <Col span={24}>
          <Query
            isDetail={isDetail}
            isUpdate={isUpdate}
            dataDetailJob={dataDetailJob}
            refGroupByUpdate={refGroupByUpdate}
            onlySelectQuery={onlySelectQuery}
          />
        </Col>
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
                <AntButton type='primary' htmlType='submit'>
                  Cập nhật
                </AntButton>
              </div>
            </AppCard>
          </Col>
        )}
      </Row>
    </FormContent>
  );
}

export default QueryJob;
