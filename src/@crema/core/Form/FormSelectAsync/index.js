import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import AntSelectAsync from 'src/@crema/component/AntSelectAsync';
import { injectRules } from 'src/validate';

const FormSelectAsync = (props) => {
  const {
    required,
    name,
    label,
    placeholder,
    rules,
    allowClear: allowClearProps = true,
    layout,
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;
  const placeholderShow =
    messages[placeholder] ||
    placeholder ||
    messages['input.placeholder.select'] + labelShow.toLowerCase();
  const allowClear = required ? false : allowClearProps;

  return (
    <>
      <Form.Item
        name={name}
        label={labelShow}
        {...layout}
        rules={injectRules({ required, labelShow, rules, formatMessage })}>
        <AntSelectAsync
          placeholder={placeholderShow}
          style={{ width: '100%' }}
          allowClear={allowClear}
          {...attrs}
        />
      </Form.Item>
    </>
  );
};

FormSelectAsync.propTypes = {
  required: PropTypes.bool,
  allowClear: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  layout: PropTypes.object,
  descriptionField: PropTypes.string,
};

FormSelectAsync.defaultProps = {};

export default FormSelectAsync;
