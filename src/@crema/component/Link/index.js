import { Link as ReactLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Link = (props) => {
  const { children, to, ...rest } = props;
  const targetBlank = (to && to.includes('http')) || rest?.target === '_blank';
  return (
    <ReactLink to={to} target={targetBlank ? '_blank' : '_self'} {...rest}>
      {children}
    </ReactLink>
  );
};

export default Link;

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.any,
};
