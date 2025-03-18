import React, { useRef, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import { Col, Row } from 'antd';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import AppCard from 'src/@crema/core/AppCard';
import CreateTable from './Components/CreateTable';
import {
  MODE_OPTION_TABLE_CREATE_JOB,
  TYPE_DATA_MARK_SCHOOL_WAREHOUSE,
} from 'src/shared/constants/DataFixed';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getDataContextAddJob } from '../..';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'src/shared/utils/Typeof';
// import PropTypes from 'prop-types';

SelectColumns.propTypes = {};

function SelectColumns({ isDetail = false, isUpdate = false, dataDetailJob }) {
  const refFormCreateTable = useRef();
  const refFormUseTable = useRef();
  const navigate = useNavigate();
  const { dataCreateJob } = getDataContextAddJob();
  const { option, typeDataMark } =
    dataCreateJob || dataDetailJob?.scheduler_response || {};
  const [modeOptionTable, setModeOptionTable] = useState(
    option || MODE_OPTION_TABLE_CREATE_JOB?.create_table,
  );

  const { prevStep } = getDataContextAddJob();

  const tabItems = [
    {
      label: 'Tạo mới bảng đích',
      key: MODE_OPTION_TABLE_CREATE_JOB?.create_table,
      children: (
        <CreateTable
          modeOptionTable={modeOptionTable}
          refFormNextStep={refFormCreateTable}
          isDetail={isDetail}
          isUpdate={isUpdate}
          dataDetailJob={dataDetailJob}
        />
      ),
    },
    {
      label: 'Chọn bảng đích có sẵn',
      key: MODE_OPTION_TABLE_CREATE_JOB?.used_table,
      children: (
        <CreateTable
          modeOptionTable={modeOptionTable}
          refFormNextStep={refFormUseTable}
          isDetail={isDetail}
          isUpdate={isUpdate}
          dataDetailJob={dataDetailJob}
        />
      ),
    },
  ];

  const handleClickNextStep = () => {
    if (modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.create_table) {
      refFormCreateTable?.current?.submit();
    }
    if (modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.used_table) {
      refFormUseTable?.current?.submit();
    }
  };

  const handleUpdateFormula = () => {
    if (!isEmpty(refFormCreateTable?.current)) {
      refFormCreateTable?.current?.submit();
    }
  };
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AppCard>
          <AppTabs
            onChange={(value) => {
              setModeOptionTable(value);
            }}
            activeKey={modeOptionTable}
            items={tabItems}
            tabBarStyle={{
              display:
                isDetail || typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML
                  ? 'none'
                  : 'block',
            }}
          />
        </AppCard>
      </Col>
      {isDetail || isUpdate ? (
        <></>
      ) : (
        <Col span={24}>
          <AppCard className='d-flex items-center justify-end flex-row'>
            <div className='d-flex items-center justify-end flex-row gap-2'>
              <AntButton icon={<ArrowLeftOutlined />} onClick={prevStep}>
                Quay lại
              </AntButton>
              <AntButton type='primary' onClick={handleClickNextStep}>
                Tiếp theo
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
              <AntButton type='primary' onClick={handleUpdateFormula}>
                Cập nhật
              </AntButton>
            </div>
          </AppCard>
        </Col>
      )}
    </Row>
  );
}

export default SelectColumns;
