import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AntSpin = (props) => {
  const antIcon = (
    <LoadingOutlined spin style={{ fontSize: 'inherit', color: 'white' }} />
  );

  return <Spin {...props} indicator={antIcon} />;
};

export default AntSpin;
