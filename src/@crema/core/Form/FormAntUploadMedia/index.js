import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import AntUploadMedia from 'src/@crema/component/AntUploadMedia';
import { injectRules } from 'src/validate';
import { isEmpty } from 'src/shared/utils/Typeof';

const FormAntUploadMedia = (props) => {
  const { required, name, label, rules, layout, hiddenEmpty, ...attrs } = props;
  const value = Form.useWatch(name);
  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  if (hiddenEmpty && isEmpty(value)) return null;

  return (
    <Form.Item
      name={name}
      {...layout}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <AntUploadMedia style={{ width: '100%' }} {...attrs} />
    </Form.Item>
  );
};

FormAntUploadMedia.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  rules: PropTypes.object,
};

FormAntUploadMedia.defaultProps = {};

export default FormAntUploadMedia;
