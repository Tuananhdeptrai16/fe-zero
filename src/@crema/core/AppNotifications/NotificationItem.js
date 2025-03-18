import React from 'react';

import PropTypes from 'prop-types';
import { List } from 'antd';
import './NotificationItem.less';
import AntAvatar from 'src/@crema/component/AntAvatar/AntAvatar';

const NotificationItem = (props) => {
  const { item } = props;
  return (
    <List.Item className='notify-listItem item-hover'>
      <List.Item.Meta
        avatar={
          <AntAvatar
            className='notify-message-avatar'
            src={item.image}
            alt={item.name}
          />
        }
        title={item.name}
        description={item.message}
      />
    </List.Item>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  item: PropTypes.object.isRequired,
};
