import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import AntUploadFile from 'src/@crema/component/AntUploadFile';
import { injectRules } from 'src/validate';

const FormAntUploadFile = (props) => {
  const { required, name, label, labelHidden, rules, layout, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;
  const labelHiddenShow = messages[labelHidden] || labelHidden;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({
        required,
        labelShow,
        labelHidden: labelHiddenShow,
        rules,
        formatMessage,
      })}
      {...layout}>
      <AntUploadFile style={{ width: '100%' }} {...attrs} />
    </Form.Item>
  );
};

FormAntUploadFile.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  rules: PropTypes.object,
};

FormAntUploadFile.defaultProps = {};

export default FormAntUploadFile;
