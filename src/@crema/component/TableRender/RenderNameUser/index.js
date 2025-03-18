const RenderNameUser = ({ user }) => {
  if (user) {
    return [user?.first_name, user?.last_name]
      .filter((name) => !!name)
      .join(' ');
  }

  return '';
};
RenderNameUser.propTypes = {};

RenderNameUser.defaultProps = {};

export default RenderNameUser;
