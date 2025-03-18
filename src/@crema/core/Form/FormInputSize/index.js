import { Form } from 'antd';
import { useIntl } from 'react-intl';
import InputSize from '../../../component/InputSize';
import PropTypes from 'prop-types';

const FormInputSize = (props) => {
  const { name, label, ...attrs } = props;
  const { messages } = useIntl();
  const labelShow = messages[label] || label;
  return (
    <Form.Item name={name} label={labelShow}>
      <InputSize {...attrs} />
    </Form.Item>
  );
};

FormInputSize.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
};

FormInputSize.defaultProps = {};

export default FormInputSize;
