import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import DateRangeText from 'src/@crema/component/DateRangeText';

const FormDateRangeText = (props) => {
  const {
    required,
    name,
    label,
    labelHidden,
    rules,
    layout = {},
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label || '';
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
      <DateRangeText style={{ width: '100%' }} {...attrs} />
    </Form.Item>
  );
};

FormDateRangeText.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
};

FormDateRangeText.defaultProps = {};

export default FormDateRangeText;
