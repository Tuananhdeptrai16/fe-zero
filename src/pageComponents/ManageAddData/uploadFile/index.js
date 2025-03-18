import { DownloadOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import FormAntUploadFile from 'src/@crema/core/Form/FormAntUploadFile';
import FormCheckbox from 'src/@crema/core/Form/FormCheckbox';
import { downloadFileUploadExample } from 'src/@crema/services/db/additial.service';
import { XLSX_EXTENSION } from 'src/shared/constants/FileExtension';

UploadFile.propTypes = {};

function UploadFile({ setIsModalOpen, category, isPermissionVerify }) {
  return (
    <Row gutter={[6, 6]}>
      <Col span={24}>
        <FormAntUploadFile
          name='file'
          setIsModalOpen={setIsModalOpen}
          required
          labelHidden='Tập tin tải lên'
          accept={XLSX_EXTENSION}
          maxCount={1}
          returnFile
        />
        <a onClick={() => downloadFileUploadExample({ category })}>
          Tải xuống file upload mẫu <DownloadOutlined />
        </a>
        <div style={{ display: isPermissionVerify ? 'block' : 'none' }}>
          <FormCheckbox name={'required'} defaultChecked={false}>
            Không yêu cầu phê duyệt nội dung file
          </FormCheckbox>
        </div>
      </Col>
    </Row>
  );
}

export default UploadFile;
