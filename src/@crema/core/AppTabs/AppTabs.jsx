import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

/**
 *
 * @param {{
 * tabPosition: "top" | "right" | "bottom" | "left";
 * size: "large" | "middle" | "small";
 * type: "line" | "card" | "editable-card";
 * }} props Props for the component
 *
 */

const AppTabs = ({
  activeKey,
  animated,
  centered,
  defaultActiveKey,
  items,
  renderTabBar,
  size,
  tabPosition,
  type,
  onChange,
  onTabClick,
  ...restProps
}) => {
  return (
    <Tabs
      activeKey={activeKey}
      animated={animated}
      centered={centered}
      defaultActiveKey={defaultActiveKey}
      items={items}
      renderTabBar={renderTabBar}
      size={size}
      type={type}
      tabPosition={tabPosition}
      onChange={onChange}
      onTabClick={onTabClick}
      {...restProps}
    />
  );
};

AppTabs.propTypes = {
  activeKey: PropTypes.string,
  centered: PropTypes.bool,
  defaultActiveKey: PropTypes.string,
  items: PropTypes.array,
  size: PropTypes.string,
  type: PropTypes.string,
  tabPosition: PropTypes.string,
};

AppTabs.defaultProps = {
  centered: false,
  items: [],
  size: 'middle',
  type: 'line',
  tabPosition: 'top',
};

export default AppTabs;
