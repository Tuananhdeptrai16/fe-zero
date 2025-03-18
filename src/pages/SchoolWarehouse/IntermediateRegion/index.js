import { Col, Row, Table } from 'antd';
import React, { useState } from 'react';
import FormContent from 'src/@crema/component/FormContent';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import AntButton from 'src/@crema/component/AntButton/index.js';
import AntModal from 'src/@crema/component/AntModal/index.js';
import { instanceCoreApi } from 'src/@crema/services/setupAxios.js';
import API from 'src/@crema/services/apis/index.js';
import useCallApi from 'src/@crema/hook/useCallApi.js';
import { isEmpty } from 'src/shared/utils/Typeof.js';
import FormResult from './FormResult';
// import PropTypes from 'prop-types';

IntermediateRegion.propTypes = {};

function IntermediateRegion({
  isCollectedResult,
  setIsisCollectedResult,
  rowData,
}) {
  const [dataResult, setDataResult] = useState([]);
  // results
  const { loading: loadingResult, send: sendResult } = useCallApi({
    success: (res) => {
      const dataRes = res?.result?.items;
      setDataResult(dataRes);
    },
    callApi: (data) => {
      return instanceCoreApi.post(API.GET_LOOKUP_INTERMEDIATE, data);
    },
  });

  const dataSource = isEmpty(dataResult)
    ? []
    : dataResult?.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });

  const columns = isEmpty(dataResult)
    ? []
    : Object.keys(dataResult[0])?.map((item, index) => {
        return {
          title: item,
          dataIndex: item,
          key: `${item}_${index}`,
          width: 180,
        };
      });
  return (
    <AntModal
      okButtonProps={{ hidden: true }}
      size={MODAL_SIZE.LARGE}
      centered
      cancelText='Đóng'
      title='Tra cứu kết quả thu thập'
      open={isCollectedResult}
      onCancel={() => setIsisCollectedResult(false)}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <FormContent
            onFinish={(data) => {
              const dataResult = {
                ...data,
                pageable: {
                  page: 1,
                  page_size: 100,
                },
                filters: [],
              };
              sendResult(dataResult);
              console.log('dataResult', dataResult);
            }}
            layout='vertical'>
            <FormResult idOrganization={rowData?.organization_id} />
            <Col span={12}>
              <AntButton
                loading={loadingResult}
                type='primary'
                htmlType='submit'>
                Tra cứu
              </AntButton>
            </Col>
          </FormContent>
        </Col>
        <Col span={24}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <h4>Kết quả tra cứu</h4>
            </Col>
            <Col span={24}>
              <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{
                  x: 1000,
                }}
                pagination={{
                  defaultPageSize: 4,
                }}
                pageSizeOptions={[4, 10, 20, 50, 100]}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </AntModal>
  );
}

export default IntermediateRegion;
