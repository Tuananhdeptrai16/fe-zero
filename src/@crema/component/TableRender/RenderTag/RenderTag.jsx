import React from 'react';
import PropTypes from 'prop-types';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import AntTag from 'src/@crema/component/AntTag';

const RenderTag = ({ value, statusList, className, rounded }) => {
  const tagValue = statusList?.find((status) => status?.value === value);
  if (!tagValue) return null;
  return (
    <AntTag
      color={tagValue?.color}
      icon={tagValue?.icon}
      style={tagValue?.style}
      className={`table-render-tag ${
        rounded && 'table-render-tag-rounded'
      } ${className}`}>
      <IntlMessages id={tagValue?.text} />
    </AntTag>
  );
};

RenderTag.propTypes = {
  value: PropTypes.string,
  statusList: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  rounded: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

RenderTag.defaultProps = {
  statusList: [],
  rounded: false,
};
export default RenderTag;
