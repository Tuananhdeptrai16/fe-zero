import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import { Col, Row } from 'antd';
import {
  BUCKET_REGIONS,
  COMPRESSIONS,
  FLATTENING,
  S3_OUTPUT_FORMAT,
} from 'src/shared/constants/DataSelect';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';

export const FormDataModalS3 = () => {
  return (
    <div>
      <Row gutter={20}>
        <Col span={24}>
          <FormInput
            label='Tên dữ liệu đích'
            name='name'
            required
            placeholder={'S3'}
          />
        </Col>

        <Col span={12}>
          <FormInput
            label='ID khóa S3'
            name={[CONNECTION_CONFIGURATION, 'access_key_id']}
            required
          />
        </Col>
        <Col span={12}>
          <FormInput
            label='Khóa truy cập S3'
            name={[CONNECTION_CONFIGURATION, 'secret_access_key']}
            required
          />
        </Col>
        <Col span={12}>
          <FormInput
            label='Tên nhóm S3'
            name={[CONNECTION_CONFIGURATION, 's3_bucket_name']}
            required
          />
        </Col>
        <Col span={12}>
          <FormInput
            label='Đường dẫn nhóm S3'
            name={[CONNECTION_CONFIGURATION, 's3_bucket_path']}
            required
          />
        </Col>
        <Col span={12}>
          <FormSelect
            label='Vùng nhóm S3'
            name={[CONNECTION_CONFIGURATION, 's3_bucket_region']}
            options={BUCKET_REGIONS}
            required
          />
        </Col>
        <Col span={12}>
          <FormSelect
            label='Định dạng đầu ra'
            name={[CONNECTION_CONFIGURATION, 'format', 'format_type']}
            options={S3_OUTPUT_FORMAT}
            required
          />
        </Col>
        <Col span={12}>
          <FormSelect
            label='Nén'
            options={COMPRESSIONS}
            name={[
              CONNECTION_CONFIGURATION,
              'format',
              'compression',
              'compression_type',
            ]}
            required
          />
        </Col>
        <Col span={12}>
          <FormSelect
            label='Làm phẳng'
            options={FLATTENING}
            name={[CONNECTION_CONFIGURATION, 'format', 'flattening']}
            required
          />
        </Col>
        <Col span={8}>
          <FormInput label='Điểm cuối' name='port' />
        </Col>
        <Col span={8}>
          <FormInput label='Định dạng đường dẫn S3' name='db_name' />
        </Col>
        <Col span={8}>
          <FormInput label='Mẫu tên tệp S3' name='api_url' />
        </Col>
      </Row>
    </div>
  );
};
