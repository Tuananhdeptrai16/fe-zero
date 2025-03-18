import React from 'react';
import { Empty, Space, Typography } from 'antd';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { isEmpty } from 'src/shared/utils/Typeof';

const { Text } = Typography;
export const ListComment = ({ data }) => {
  if (isEmpty(data)) {
    return (
      <div className='ant-d-flex ant-align-center ant-justify-center'>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }
  return (
    <Space direction={'vertical'}>
      {(data || []).map((item, index) => (
        <Space align={'start'} key={index}>
          <h5 className={'whitespace-nowrap'}>
            {RenderNameUser({ user: item?.user })}:
          </h5>
          <Space direction={'vertical'} size={[0, 0]}>
            <Text>{item?.content}</Text>
            <Text type={'secondary'} className={'description-field'}>
              {formatDateJs(item?.created_at)}
            </Text>
          </Space>
        </Space>
      ))}
    </Space>
  );
};
