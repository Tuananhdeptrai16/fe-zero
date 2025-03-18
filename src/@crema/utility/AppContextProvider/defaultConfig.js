import {
  FooterType,
  LayoutType,
  MenuStyle,
  NavStyle,
  ThemeDirection,
  ThemeMode,
  ThemeStyle,
} from 'src/shared/constants/AppEnums';

export const DarkSidebar = {
  sidebarBgColor: '#fff',
  sidebarTextColor: '#000000D9',
  sidebarHeaderColor: '#313541',
  sidebarMenuSelectedBgColor: '#F9E3B7',
  sidebarMenuSelectedTextColor: 'rgba(0, 0, 0, 0.87)',
  mode: ThemeMode.DARK,
};
export const LightSidebar = {
  sidebarBgColor: '#fff',
  sidebarTextColor: 'rgba(0, 0, 0, 0.60)',
  sidebarHeaderColor: '#fff',
  sidebarMenuSelectedBgColor: '#F4F7FE',
  sidebarMenuSelectedTextColor: 'rgba(0, 0, 0, 0.87)',
  mode: ThemeMode.LIGHT,
};
const defaultConfig = {
  sidebar: {
    borderColor: '#757575',
    menuStyle: MenuStyle.DEFAULT,
    isSidebarBgImage: false,
    sidebarBgImage: 1,
    colorSet: DarkSidebar,
  },

  locale: {
    languageId: 'vietnam',
    locale: 'vi',
    name: 'Việt Nam',
    icon: 'vn',
  },
  themeStyle: ThemeStyle.STANDARD,
  direction: ThemeDirection.LTR,
  themeMode: ThemeMode.SEMI_DARK,
  footerType: FooterType.FLUID,
  navStyle: NavStyle.HOR_DARK_LAYOUT,
  layoutType: LayoutType.FULL_WIDTH,
  footer: false,
  rtlLocale: ['ar'],
};
export default defaultConfig;
