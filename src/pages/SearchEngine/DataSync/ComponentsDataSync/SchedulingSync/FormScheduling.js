import { Col, Form, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import AntButton from 'src/@crema/component/AntButton';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { SELECT_SCHEDULE_REPEAT } from 'src/shared/constants/DataSelect';
import { convertDateJs } from 'src/shared/utils/DateTime';
// import PropTypes from 'prop-types';

FormScheduling.propTypes = {};

function FormScheduling({ dataOldIndexScheduling, loading }) {
  const { messages } = useIntl();
  const form = Form.useFormInstance();
  const startDate = Form.useWatch('start_date', form) || '';
  const endDate = Form.useWatch('end_date', form) || '';

  return (
    <Row gutter={[16, 12]}>
      <Col span={12}>
        <FormInput
          label={messages['common.name_schedule']}
          name='name'
          required
          disabled={dataOldIndexScheduling ? true : false}
        />
      </Col>
      <Col span={12}></Col>
      <Col span={12}>
        <FormDatePicker
          required
          label={messages['common.schedule_start_date']}
          name='start_date'
          inputReadOnly
          disabledDate={(currentDate) => {
            const today = moment();
            return (
              currentDate.isAfter(convertDateJs(endDate), 'day') ||
              currentDate.isSame(convertDateJs(endDate), 'day') ||
              currentDate.isBefore(today, 'day')
            );
          }}
        />
      </Col>
      <Col span={12}></Col>
      <Col span={12}>
        <FormDatePicker
          label={messages['common.schedule_end_date']}
          name='end_date'
          required
          inputReadOnly
          disabledDate={(currentDate) => {
            return (
              currentDate.isBefore(convertDateJs(startDate), 'day') ||
              currentDate.isSame(convertDateJs(startDate), 'day')
            );
          }}
        />
      </Col>
      <Col span={12}></Col>
      <Col span={12}>
        <FormSelect
          label={messages['common.schedule_repeat']}
          name='unit'
          placeholder='Đơn vị'
          required
          labelHidden='Thời gian lặp lại'
          options={SELECT_SCHEDULE_REPEAT}
        />
      </Col>
      <Col span={12}></Col>
      <Col span={24}>
        <AntButton loading={loading} htmlType='submit' type='primary'>
          {dataOldIndexScheduling
            ? messages['common.update_schedule']
            : messages['common.confirm_schedule']}
        </AntButton>
      </Col>
    </Row>
  );
}

export default FormScheduling;
