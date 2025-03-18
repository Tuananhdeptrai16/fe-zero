import React from 'react';
import { Dropdown } from 'antd';
import { FiMoreVertical } from 'react-icons/fi';

const options = ['View More', 'Update Data', 'Clear Data'];
const AppMenu = () => {
  // const menu = (
  //   <Menu>
  //     {options.map((option) => (
  //       <Menu.Item key={option}>
  //         <a href='#/'>{option}</a>
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );

  const items = options.map((option, index) => ({
    label: (
      <div>
        <a href='#/'>{option}</a>
      </div>
    ),
    key: `app_menu-${index}`,
  }));

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a
        className='ant-dropdown-link cr-dropdown-link'
        onClick={(e) => e.preventDefault()}>
        <FiMoreVertical />
      </a>
    </Dropdown>
  );
};

export default AppMenu;
