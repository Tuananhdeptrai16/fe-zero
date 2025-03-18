import { Form } from 'antd';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import InputByType from 'src/@crema/component/InputByType';
import { TYPE_SETTING_SYSTEM } from 'src/shared/constants/SettingSystem';
import ListInputByType from 'src/@crema/component/ListInputByType';

const InputFormSetting = (props) => {
  const { required, name, label, type, placeholder, rules, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.List
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      {(fields, operation, meta) => (
        <ListInputByType
          name={name}
          fields={fields}
          operation={operation}
          meta={meta}
          type={type}
          label={labelShow}
        />
      )}
    </Form.List>
  );
};

InputFormSetting.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
};

export default InputFormSetting;
