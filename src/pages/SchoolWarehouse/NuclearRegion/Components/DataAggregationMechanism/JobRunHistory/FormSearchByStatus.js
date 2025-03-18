import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import FormSelect from 'src/@crema/core/Form/FormSelect';
// import PropTypes from 'prop-types';

FormSearchByStatus.propTypes = {};

function FormSearchByStatus({ dataSearch }) {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('status', dataSearch?.status);
  }, [dataSearch, form]);

  return (
    <Row gutter={[20, 12]}>
      <Col span={12}>
        <FormSelect
          name='status'
          placeholder='Nhập trạng thái'
          required
          label={'Trạng thái'}
          options={[
            {
              label: 'Thành công',
              value: 'success',
            },
            {
              label: 'Thất bại',
              value: 'failed',
            },
            {
              label: 'Đang chạy',
              value: 'running',
            },
            {
              label: 'Chờ chạy',
              value: 'queued',
            },
            {
              label: 'Tất cả',
              value: 'all',
            },
          ]}
        />
      </Col>
      <Col span={12}>
        <AntButton htmlType='submit' type='primary' icon={<SearchOutlined />}>
          Tìm kiếm
        </AntButton>
      </Col>
    </Row>
  );
}

export default FormSearchByStatus;
