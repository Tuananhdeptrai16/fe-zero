import React from 'react';
import PreviewPDF from 'src/@crema/core/DataDisplay/PreviewPDF';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Form } from 'antd';
import AppEmptyResult from 'src/@crema/core/AppEmptyResult';

export const FormPrintJudicialRecord = ({ listPdf }) => {
  const form = Form.useFormInstance();
  const link = Form.useWatch('link', form) || form.getFieldValue('link');
  if (listPdf && listPdf.length > 0) {
    return (
      <div>
        <FormSelect
          options={listPdf}
          name={'link'}
          label={'Link'}
          onChange={(value) => form.setFieldValue('link', value)}
        />
        <PreviewPDF height={500} src={link} />
      </div>
    );
  }
  return <AppEmptyResult title={'Không có phiếu LLTP nào!'} />;
};
