import PropTypes from 'prop-types';
import React from 'react';
import QueueAnim from 'rc-queue-anim';

const AppAnimateGroup = (props) => {
  const { height, animateStyle, justifyContent, alignItems, ...rest } = props;
  return (
    <QueueAnim
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justifyContent,
        alignItems: alignItems,
        height: height,
        ...animateStyle,
      }}
      {...rest}>
      {props.children}
    </QueueAnim>
  );
};

AppAnimateGroup.propTypes = {
  children: PropTypes.any,
  animateStyle: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
};

AppAnimateGroup.defaultProps = {
  type: 'bottom', //alpha, left, right, top, bottom, scale, scaleBig, scaleX ,scaleY
  ease: 'easeInOutQuart',
  delay: 0,
  height: '100%',
  interval: 50,
  duration: 300,
};

export default AppAnimateGroup;
