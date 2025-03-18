import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { getWidthByModalSize } from 'src/shared/utils/Modal';

const AntModal = (props) => {
  const { children, size, ...rest } = props;
  let width = getWidthByModalSize(size);
  return (
    <Modal width={width} {...rest}>
      {children}
    </Modal>
  );
};

export default AntModal;

AntModal.propTypes = {
  children: PropTypes.node,
  width: PropTypes.any,
  size: PropTypes.string,
};

AntModal.defaultProps = {};
