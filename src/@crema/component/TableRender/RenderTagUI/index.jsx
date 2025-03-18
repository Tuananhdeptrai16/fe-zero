import React from 'react';
import PropTypes from 'prop-types';
import AntTag from 'src/@crema/component/AntTag';
import { isArray, isObject, isString } from 'src/shared/utils/Typeof';
import { Space } from 'antd';

const RenderTagUI = ({ value, keyName, className, rounded }) => {
  const renderTagUIItem = (item) => {
    if (isString(item)) {
      return (
        item && (
          <AntTag
            className={`table-render-tag ${
              rounded && 'table-render-tag-rounded'
            } ${className}`}>
            {item}
          </AntTag>
        )
      );
    } else if (isObject(item) && keyName) {
      return (
        item?.[keyName] && (
          <AntTag
            className={`table-render-tag ${
              rounded && 'table-render-tag-rounded'
            } ${className}`}>
            {item?.[keyName]}
          </AntTag>
        )
      );
    }
    return null;
  };

  if (isString(value) || isObject(value)) {
    return renderTagUIItem(value);
  } else if (isArray(value)) {
    return (
      <Space size={[4, 4]} wrap>
        {value.map((item, index) => (
          <React.Fragment key={`item-${index}`}>
            {renderTagUIItem(item)}
          </React.Fragment>
        ))}
      </Space>
    );
  }

  return null;
};

RenderTagUI.propTypes = {
  value: PropTypes.any,
  rounded: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

RenderTagUI.defaultProps = {
  rounded: false,
};
export default RenderTagUI;
