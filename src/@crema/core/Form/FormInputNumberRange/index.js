import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import AntInputNumberRange from '../../../component/AntInputNumberRange';

const FormInputNumberRange = (props) => {
  const {
    required,
    name,
    label,
    rules,
    layout = {},
    placeholderMin,
    placeholderMax,
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}
      {...layout}>
      <AntInputNumberRange
        placeholderMin={placeholderMin}
        placeholderMax={placeholderMax}
        {...attrs}
      />
    </Form.Item>
  );
};

FormInputNumberRange.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeholderMin: PropTypes.string,
  placeholderMax: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
};

FormInputNumberRange.defaultProps = {};

export default FormInputNumberRange;
