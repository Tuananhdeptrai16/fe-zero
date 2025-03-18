import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import MergeChangeProjectsInput from 'src/@crema/component/MergeChangeProjectsInput';

const FormMergeChangeProjects = (props) => {
  const { required, name, label, rules, layout, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      {...layout}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <MergeChangeProjectsInput style={{ width: '100%' }} {...attrs} />
    </Form.Item>
  );
};

FormMergeChangeProjects.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  rules: PropTypes.object,
};

FormMergeChangeProjects.defaultProps = {};

export default FormMergeChangeProjects;
