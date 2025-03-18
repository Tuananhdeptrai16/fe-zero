import React from 'react';
import { Col, Row } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { SearchOutlined } from '@ant-design/icons';
import API from 'src/@crema/services/apis';

const FormResult = ({ destinationId }) => {
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <FormSelect
            label='Chọn bảng'
            name={'table'}
            required
            returnObject
            fieldNames={{ label: 'table_name', value: 'table_name' }}
            configFetch={{
              url: API.GET_LIST_TABLE_DESTINATION(destinationId),
            }}
          />
        </Col>
        <Col span={12}>
          <AntButton icon={<SearchOutlined />} type='primary' htmlType='submit'>
            Tra cứu
          </AntButton>
        </Col>
      </Row>
    </div>
  );
};

export default FormResult;
