import React, { useState } from 'react';
import style from './PageConfig.module.scss';
import clsx from 'clsx';
import { Skeleton, Tabs } from 'antd';
import InformationField from '../ComponentsConfigIndex/InformationField';
import Synonym from '../ComponentsConfigIndex/Synonym';
import ConfigFilter from '../ComponentsConfigIndex/ConfigFilter';
import ConfigSearch from '../ComponentsConfigIndex/ConfigSearch';
import PropTypes from 'prop-types';

PageConfig.propTypes = {
  dataResponseIndex: PropTypes.object,
};

function PageConfig({ dataResponseIndex }) {
  const [activeKey, setActiveKey] = useState('1');
  let configIndexOld;
  if (dataResponseIndex?.config) {
    configIndexOld = JSON.parse(dataResponseIndex?.config);
  }
  const onChange = (key) => {
    setActiveKey(key);
  };
  return (
    <div className={clsx(style.wrapPageConfig)}>
      <Tabs
        defaultActiveKey='1'
        onChange={onChange}
        activeKey={activeKey}
        centered
        items={[
          {
            label: 'Trường thông tin',
            key: '1',
            children: (
              <>
                {configIndexOld ? (
                  <InformationField
                    configIndexOld={configIndexOld}
                    dataResponseIndex={dataResponseIndex}
                  />
                ) : (
                  <>
                    <Skeleton active />
                    <Skeleton active />
                  </>
                )}
              </>
            ),
          },
          {
            label: 'Từ đồng nghĩa',
            key: '2',
            children: <Synonym />,
          },
          {
            label: 'Cấu hình bộ lọc',
            key: '3',
            children: <ConfigFilter />,
          },
          {
            label: 'Cấu hình kết quả tìm kiếm',
            key: '4',
            children: <ConfigSearch />,
          },
        ]}
      />
    </div>
  );
}

export default PageConfig;
