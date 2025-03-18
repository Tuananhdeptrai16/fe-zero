import { Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import FormInput from 'src/@crema/core/Form/FormInput';
import AntCheckbox from 'src/@crema/component/AntCheckbox';

FormParentStream.propTypes = {};

const STREAM_REF = [
  'retriever',
  'parent_stream',
  'parent_stream_configs',
  'stream',
  '$ref',
];

const STREAM_REF_TEMP = 'stream_ref_temp';

function FormParentStream({ listStream }) {
  const form = Form.useFormInstance();
  const [injectParentKey, setInjectParentKey] = useState(
    form.getFieldValue([
      'retriever',
      'parent_stream',
      'request_option',
      'type',
    ]) === 'RequestOption',
  );
  const streamRef = Form.useWatch(STREAM_REF);
  const streamRefTemp = Form.useWatch(STREAM_REF_TEMP);

  useEffect(() => {
    if (streamRef) {
      const streamRefArr = streamRef.split('/');
      const streamRefName = streamRefArr[streamRefArr.length - 1];

      if (streamRefName !== streamRefTemp) {
        form.setFieldValue(STREAM_REF_TEMP, streamRefName);
      }
    } else {
      form.setFieldValue(STREAM_REF_TEMP, undefined);
    }
  }, [streamRef]);

  useEffect(() => {
    if (streamRefTemp) {
      const streamRefStr = `#/definitions/streams/${streamRefTemp}`;

      if (streamRef !== streamRefStr) {
        form.setFieldValue(STREAM_REF, streamRefStr);
      }
    } else {
      form.setFieldValue(STREAM_REF, undefined);
    }
  }, [streamRefTemp]);

  return (
    <div>
      <Row>
        <Col span={24}>
          <FormHidden
            name={['retriever', 'parent_stream', 'type']}
            defaultValue={'SubstreamPartitionRouter'}
          />
          <FormHidden
            name={[
              'retriever',
              'parent_stream',
              'parent_stream_configs',
              'type',
            ]}
            defaultValue={'ParentStreamConfig'}
          />
          <FormSelect
            getPopupContainer={(trigger) => trigger.parentNode}
            label='Luồng cha'
            required
            name={STREAM_REF_TEMP}
            fieldNames={{ label: 'name', value: 'name' }}
            options={listStream}
          />
        </Col>
        <Col span={24}>
          <FormInput
            label='Khoá chính'
            required
            name={[
              'retriever',
              'parent_stream',
              'parent_stream_configs',
              'parent_key',
            ]}
          />
        </Col>
        <Col span={24}>
          <FormInput
            label='Định danh giá trị khóa'
            required
            name={[
              'retriever',
              'parent_stream',
              'parent_stream_configs',
              'partition_field',
            ]}
          />
        </Col>
        <Col span={24}>
          <AntCheckbox
            checked={injectParentKey}
            onChange={(e) => setInjectParentKey(e.target.checked)}>
            Chèn khoá chính vào yêu cầu HTTP gửi đi
          </AntCheckbox>
        </Col>
        {injectParentKey && (
          <Col span={24} className={'mt-4'}>
            <Row>
              <FormHidden
                name={['retriever', 'parent_stream', 'request_option', 'type']}
                defaultValue={'RequestOption'}
              />
              <Col span={24}>
                <FormSelect
                  getPopupContainer={(trigger) => trigger.parentNode}
                  name={[
                    'retriever',
                    'parent_stream',
                    'request_option',
                    'inject_into',
                  ]}
                  required
                  label='Thêm vào'
                  options={[
                    {
                      label: 'Tham số yêu cầu',
                      value: 'request_parameter',
                    },
                    {
                      label: 'Tiêu đề',
                      value: 'header',
                    },
                    {
                      label: 'Dữ liệu nội dung (dạng mã hóa url)',
                      value: 'body_data',
                    },
                    {
                      label: 'Nội dung json',
                      value: 'body_json',
                    },
                  ]}
                />
              </Col>
              <Col span={24}>
                <FormInput
                  label='Tên khóa'
                  required
                  name={[
                    'retriever',
                    'parent_stream',
                    'request_option',
                    'field_name',
                  ]}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default FormParentStream;
