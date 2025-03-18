import { Col, Form, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { SCHEDULE_DATA_SERVICE_MODE } from 'src/shared/constants/DataSelect';

const FormAddOrUpdate = ({ rowData }) => {
  const form = Form.useFormInstance();
  const objectTypeWatch = Form.useWatch('type', form) || '';
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <FormInput
            label='Tên'
            name='name'
            required
            disabled={rowData ? true : false}
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
        <Col span={24}>
          <FormInput
            label='Mô tả'
            name='description'
            rules={{ maxLength: [{ value: 255 }] }}
          />
        </Col>
        <Col span={24}>
          <FormInput
            label='Client ID'
            name='client_id'
            required
            disabled={rowData ? true : false}
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
        {objectTypeWatch?.trim() === 'public' && (
          <Col span={24}>
            <FormDatePicker
              label='Ngày hết hạn'
              name='expired_time'
              required
              disabledDate={(currentDate) => {
                return currentDate && currentDate < moment().endOf('day');
              }}
            />
          </Col>
        )}
        <Col span={24}>
          <FormSelect
            label='Chế độ'
            name='type'
            options={SCHEDULE_DATA_SERVICE_MODE}
            required
            disabled={rowData ? true : false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormAddOrUpdate;
