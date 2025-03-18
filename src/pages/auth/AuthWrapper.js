import React from 'react';
import PropTypes from 'prop-types';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import { AppInfoView } from '../../@crema';
import './index.styles.less';

const AuthWrapper = ({ children }) => {
  return (
    <AppAnimateGroup
      justifyContent='center'
      alignItems='center'
      type='scale'
      animateStyle={{ flex: 1 }}
      delay={0}
      interval={10}
      duration={200}>
      <div className='auth-wrap' key={'wrap'}>
        {children}
      </div>
      <AppInfoView />
    </AppAnimateGroup>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
