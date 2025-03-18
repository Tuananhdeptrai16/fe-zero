const ConditionalWrapper = (props) => {
  const { children, wrapper, condition } = props;
  if (condition) {
    return wrapper(children);
  }
  return children;
};

export default ConditionalWrapper;
