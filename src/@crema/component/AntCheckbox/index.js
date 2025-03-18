import { Checkbox } from 'antd';

const AntCheckbox = (props) => {
  const { ...attrs } = props;
  return <Checkbox {...attrs} />;
};

AntCheckbox.propTypes = {};

AntCheckbox.defaultProps = {};

export default AntCheckbox;
