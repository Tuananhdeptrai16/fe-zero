import React from 'react';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import PropTypes from 'prop-types';

const ConfirmInfo = ({ message, name, values = {} }) => {
  return (
    <div>
      <IntlMessages id={message} values={values} />{' '}
      {name && <span className='warning-text-color'>{name} ?</span>}
    </div>
  );
};

ConfirmInfo.propTypes = {
  message: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  values: PropTypes.object,
};

export default ConfirmInfo;
