import { Col, Row } from 'antd';
import React, { useContext } from 'react';
import FormAntUploadFile from 'src/@crema/core/Form/FormAntUploadFile';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { ConTextReport } from '../ReportTemplate';
import { DOC_EXTENSION } from 'src/shared/constants/FileExtension';

const FormUploadTemplate = () => {
  const reportId = useContext(ConTextReport);
  const handleOnChange = (value) => {
    reportId?.setReportId(value);
  };
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <FormAntUploadFile
            name='file'
            // setIsModalOpen={setIsModalOpen}
            required
            label='Tải mẫu báo cáo'
            accept={DOC_EXTENSION}
            maxCount={1}
            returnFile
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          {/* <FormSelect required name='type' label='Chọn loại báo cáo' /> */}
          <FormSelectAsync
            fieldNames={{ label: 'type_report_name', value: 'id' }}
            name={'id'}
            label={'Chọn loại báo cáo'}
            configFetch={{
              url: API.GET_LIST_TYPE_REPORT,
              method: METHOD_FETCH.POST,
            }}
            onChange={(id) => handleOnChange(id)}
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default FormUploadTemplate;
