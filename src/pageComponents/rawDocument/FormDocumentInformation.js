import React from 'react';
import FormTemplateDocument from 'src/@crema/component/FormTemplateDocument';

const FormDocumentInformation = ({ field, configTemplate }) => {
  return <FormTemplateDocument field={field} configTemplate={configTemplate} />;
};

FormDocumentInformation.propTypes = {};

FormDocumentInformation.defaultProps = {};

export default FormDocumentInformation;
