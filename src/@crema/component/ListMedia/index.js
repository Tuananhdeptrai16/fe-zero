import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'src/shared/utils/Typeof';
import Media from 'src/@crema/component/Media';
import { Space } from 'antd';
import { isString } from 'lodash';

const ListMedia = ({ data, sizeItem, controls, ...attrs }) => {
  let listData = data || [];
  if (isString(data)) listData = [data];
  if (isEmpty(data)) return null;
  return (
    <Space {...attrs}>
      {listData.map((item, index) => (
        <Media
          key={`media-item-${index}`}
          width={sizeItem?.width}
          height={sizeItem?.height}
          src={item?.src || item?.cdn_path || item}
          title={item?.title || item?.src}
          alt={item?.title || item?.src}
          controls={controls}
        />
      ))}
    </Space>
  );
};

ListMedia.propTypes = {
  data: PropTypes.array,
};

ListMedia.defaultProps = {};

export default ListMedia;
