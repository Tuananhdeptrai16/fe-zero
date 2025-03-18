import { Col, Form } from 'antd';
import React, { useEffect } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import FormHidden from 'src/@crema/core/Form/FormHidden';

FormSettingParameterizedRequests.propTypes = {};

const PARTITION_ROUTER_TYPE = ['retriever', 'parameterized_requests', 'type'];
const PARTITION_ROUTER_REQUEST_OPTION_TYPE = [
  'retriever',
  'parameterized_requests',
  'request_option',
  'type',
];

function FormSettingParameterizedRequests() {
  const form = Form.useFormInstance();
  const [isInjectInto, setIsInjectInto] = React.useState(
    form.getFieldValue(PARTITION_ROUTER_REQUEST_OPTION_TYPE) ===
      'RequestOption',
  );

  useEffect(() => {
    if (isInjectInto) {
      form.setFieldValue(PARTITION_ROUTER_REQUEST_OPTION_TYPE, 'RequestOption');
    } else {
      form.setFieldValue(PARTITION_ROUTER_REQUEST_OPTION_TYPE, undefined);
    }
  }, [isInjectInto]);

  return (
    <>
      <FormHidden
        name={PARTITION_ROUTER_TYPE}
        defaultValue={'ListPartitionRouter'}
      />
      <Col span={24}>
        <FormSelect
          required
          name={['retriever', 'parameterized_requests', 'values']}
          mode='tags'
          label='Danh sách giá trị'
        />
      </Col>
      <Col span={24}>
        <FormInput
          required
          name={['retriever', 'parameterized_requests', 'cursor_field']}
          label='Mã định danh giá trị tham số hiện tại'
        />
      </Col>
      <Col span={24}>
        <AntCheckbox
          checked={isInjectInto}
          onChange={(e) => setIsInjectInto(e.target.checked)}>
          Đưa giá trị vào Yêu cầu HTTP gửi đi
        </AntCheckbox>
      </Col>
      {isInjectInto && (
        <>
          <FormHidden
            name={PARTITION_ROUTER_REQUEST_OPTION_TYPE}
            defaultValue={'RequestOption'}
          />
          <Col span={24} className={'mt-4'}>
            <FormSelect
              allowClear={false}
              label='Thêm vào'
              required
              getPopupContainer={(trigger) => trigger.parentNode}
              name={[
                'retriever',
                'parameterized_requests',
                'request_option',
                'inject_into',
              ]}
              options={[
                {
                  label: 'Header',
                  value: 'header',
                },
                {
                  label: 'Query Parameter',
                  value: 'request_parameter',
                },
                {
                  label: 'Body data',
                  value: 'body_data',
                },
                {
                  label: 'Body JSON payload',
                  value: 'body_json',
                },
              ]}
            />
          </Col>
          <Col span={24}>
            <FormInput
              label='Giá trị'
              required
              name={[
                'retriever',
                'parameterized_requests',
                'request_option',
                'field_name',
              ]}
            />
          </Col>
        </>
      )}
    </>
  );
}

export default FormSettingParameterizedRequests;
