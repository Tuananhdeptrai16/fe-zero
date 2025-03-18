import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';

import AppLocale from '../../../shared/localization';
import { useLayoutContext } from '../AppContextProvider/LayoutContextProvider';
import { useLocaleContext } from '../AppContextProvider/LocaleContextProvide';
import {
  getLocalData,
  saveLocalData,
  THEME,
} from 'src/@crema/services/Application/LocalStorage';

const Context = React.createContext({
  theme: {},
  setTheme: () => null,
});

const { Provider } = Context;

const THEME_DEFAULT = {
  primaryColor: '#1890FF',
  warningColor: '#FAAD14',
  errorColor: '#FF4D4F',
  successColor: '#52C41A',
  infoColor: '#1890FF',
};
const themeFromLocal = getLocalData(THEME) || THEME_DEFAULT;

const AppThemeProvider = (props) => {
  const { direction } = useLayoutContext();
  const { locale } = useLocaleContext();
  const { antLocale } = AppLocale[locale?.locale];

  const [theme, setTheme] = useState(themeFromLocal);

  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  useEffect(() => {
    ConfigProvider.config({
      prefixCls: 'ant',
      theme: theme,
    });
  }, [theme]);

  const onChangeTheme = useCallback(
    (themeUpdated) => {
      const themeNew = {
        ...theme,
        ...themeUpdated,
      };
      setTheme(themeNew);
      saveLocalData(THEME, themeNew);
      return themeNew;
    },
    [theme],
  );

  const value = useMemo(() => {
    return {
      theme,
      setTheme: onChangeTheme,
    };
  }, [theme, onChangeTheme]);

  return (
    <Provider value={value}>
      <ConfigProvider direction={direction} locale={antLocale}>
        {props.children}
      </ConfigProvider>
    </Provider>
  );
};

export const useAppTheme = () => React.useContext(Context);

export default React.memo(AppThemeProvider);

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
