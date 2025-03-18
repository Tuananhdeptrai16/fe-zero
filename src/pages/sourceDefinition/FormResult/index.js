import React from 'react';
import { Col, Row } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { SearchOutlined } from '@ant-design/icons';

const FormResult = ({ optionsTableRender, loadingResult }) => {
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <FormSelect
            label='Chọn bảng'
            name={'table_name'}
            options={optionsTableRender}
            required
          />
        </Col>
        <Col span={12}>
          <AntButton
            loading={loadingResult}
            icon={<SearchOutlined />}
            type='primary'
            htmlType='submit'>
            Tra cứu
          </AntButton>
        </Col>
      </Row>
    </div>
  );
};

export default FormResult;
