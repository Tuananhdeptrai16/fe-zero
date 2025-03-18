import React, { useCallback, useRef } from 'react';
import { Layout, Space } from 'antd';
import './index.style.less';
import PropTypes from 'prop-types';
import AppHorizontalNav from '../components/AppHorizontalNav';
import UserInfo from '../components/UserInfo';
// import { useSidebarContext } from '../../../utility/AppContextProvider/SidebarContextProvider';
import AppLogoWithoutText from '../components/AppLogoWithoutText';
import { useNavigate } from 'react-router-dom';
import routes from 'src/config/routes.config';
import AntButton from 'src/@crema/component/AntButton';
import { BgColorsOutlined, HomeOutlined } from '@ant-design/icons';
import AntPopover from 'src/@crema/component/AntPopover';
import TagColor from 'src/@crema/component/TagColor';
import { useAppTheme } from 'src/@crema/utility/AppThemeProvider';

const THEME_COLORS = [
  '#1890FF',
  '#2c8ae1',
  '#fa541c',
  '#af8022',
  '#1ba8a8',
  '#4E8A7E',
  '#44911e',
  '#3554d5',
  '#722ed1',
];

const PATH_HCMA = 'http://qldt.hcma.vn/';

const AppHeader = () => {
  const headerRef = useRef();
  const { Header } = Layout;
  // const { sidebarColorSet } = useSidebarContext();
  const navigate = useNavigate();
  const { theme, setTheme } = useAppTheme();
  const themePrimaryColor = theme?.primaryColor;
  const changeTheme = useCallback(
    (newPrimaryColor) => {
      setTheme({ primaryColor: newPrimaryColor });
    },
    [setTheme],
  );

  // const styleNav =
  //   useMemo(() => {
  //     return {
  //       backgroundColor: sidebarColorSet.sidebarBgColor,
  //       color: sidebarColorSet.sidebarTextColor,
  //     };
  //   }, [sidebarColorSet]) || {};

  return (
    <Header ref={headerRef} className='app-header-hor-dark' id={''}>
      <div className='header-nav-hor-dark'>
        <div className='pl-6 pr-8'>
          <div className='d-flex items-center gap-6 relative'>
            <div
              className='header-logo'
              onClick={() => {
                navigate(routes.workspace);
              }}>
              <AppLogoWithoutText />
            </div>
            <div className='header-nav-category'>
              <AppHorizontalNav className='app-main-hor-dark-menu' />
            </div>
            <div className='items-center header-group-btn'>
              <AntPopover
                getPopupContainer={() => headerRef.current}
                content={
                  <Space align='center'>
                    {THEME_COLORS.map((color, index) => (
                      <TagColor
                        onClick={() => changeTheme(color)}
                        active={color === themePrimaryColor}
                        key={`index-${index}`}
                        color={color}
                      />
                    ))}
                  </Space>
                }
                trigger='click'>
                <AntButton
                  type={'text'}
                  icon={<BgColorsOutlined style={{ color: '#fff' }} />}
                />
              </AntPopover>
              <AntButton
                onClick={() => window.open(PATH_HCMA, '_self')}
                type={'text'}
                icon={<HomeOutlined style={{ color: '#fff' }} />}
              />
            </div>
            <div className='header-group-user-infor-overlay'></div>
            <div className='header-group-user-infor'>
              <UserInfo />
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  showDrawer: PropTypes.func,
};
