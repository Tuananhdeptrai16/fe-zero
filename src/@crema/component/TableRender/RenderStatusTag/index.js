import React from 'react';
import PropTypes from 'prop-types';
import {
  STATUS_MINISTRY_RECORD_JUDICIAL,
  STATUS_PERMISSION,
  STATUS_RAW_DOCUMENT,
  STATUS_SHARE_API_CONFIG,
  STATUS_VERIFY_RECORD_JUDICIAL,
  USER_ACTION_LOG,
} from 'src/shared/constants/DataTableStatus';

import './styles.less';
import { Badge } from 'antd';

const RenderStatusTag = ({ value, statusType, className }) => {
  let STATUS_LIST = [];

  switch (statusType) {
    case 'RAW_DOCUMENT':
      STATUS_LIST = STATUS_RAW_DOCUMENT;
      break;
    case 'USER_ACTION_LOG':
      STATUS_LIST = USER_ACTION_LOG;
      break;
    case 'VERIFY_JUDICIAL_RECORD':
      STATUS_LIST = STATUS_VERIFY_RECORD_JUDICIAL;
      break;
    case 'MINISTRY':
      STATUS_LIST = STATUS_MINISTRY_RECORD_JUDICIAL;
      break;
    case 'PERMISSION':
      STATUS_LIST = STATUS_PERMISSION;
      break;
    case 'SHARE_API_CONFIG':
      STATUS_LIST = STATUS_SHARE_API_CONFIG;
      break;
    default:
  }

  const tagValue = STATUS_LIST.find((status) => status.value === value);
  if (tagValue)
    return (
      <Badge
        color={tagValue.color}
        text={tagValue.text}
        className={className}
      />
    );
  return null;
};

RenderStatusTag.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  statusType: PropTypes.string,
};

RenderStatusTag.defaultProps = {
  statusType: 'campaign',
};

export default RenderStatusTag;
