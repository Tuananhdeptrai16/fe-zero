import React, { useEffect } from 'react';

import { AppLoader } from '../../../@crema';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessage } from 'src/redux/actions';
import notification from 'src/shared/utils/notification';

const AppInfoView = () => {
  const { loading, error, displayMessage } = useSelector(
    ({ common }) => common,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      notification.error(error);
      dispatch(hideMessage());
    }
  }, [error]);

  useEffect(() => {
    if (displayMessage) {
      notification.success(displayMessage);
      dispatch(hideMessage());
    }
  }, [displayMessage]);

  return <>{loading ? <AppLoader /> : null}</>;
};

export default AppInfoView;
