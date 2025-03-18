import AppIconButton from '../../core/AppIconButton';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './index.styles.less';

const ButtonOutline = ({ shape, onClick, className, icon, ...rest }) => {
  return (
    <AppIconButton
      className={clsx('outline-btn', className)}
      onClick={onClick}
      shape={shape}
      type='ghost'
      icon={icon}
      {...rest}
    />
  );
};

export default ButtonOutline;

ButtonOutline.propTypes = {
  shape: PropTypes.oneOf(['circle', 'round', 'default']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.node,
};

ButtonOutline.defaultProps = {
  shape: 'default',
};
