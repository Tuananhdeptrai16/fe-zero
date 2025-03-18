import { Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import FormAntUploadFile from 'src/@crema/core/Form/FormAntUploadFile';
import FormCheckbox from 'src/@crema/core/Form/FormCheckbox';
// import PropTypes from 'prop-types';

FormUploadFile.propTypes = {};

function FormUploadFile({ setIsModalOpen, folder, setOverride }) {
  const form = Form.useFormInstance();
  const objectTypeWatch = Form.useWatch('override', form) || '';

  useEffect(() => {
    if (objectTypeWatch) {
      setOverride(true);
    } else {
      setOverride(false);
    }
  }, [objectTypeWatch, form]);

  return (
    <Row gutter={[6, 6]}>
      <Col span={24}>
        <FormAntUploadFile
          name='upload_file'
          setIsModalOpen={setIsModalOpen}
          required
          labelHidden='Tập tin tải lên'
          folder={folder}
          returnFile
          multiple
        />
      </Col>
      <Col span={24}>
        <FormCheckbox name='override'>
          Ghi đè nếu tập tin đã tồn tại
        </FormCheckbox>
      </Col>
    </Row>
  );
}

export default FormUploadFile;
