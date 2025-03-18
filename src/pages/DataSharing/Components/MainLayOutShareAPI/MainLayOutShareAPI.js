import React, { useState } from 'react';
import style from './MainLayOutShareAPI.module.scss';
import clsx from 'clsx';
import { Row, Col, Steps } from 'antd';
import { createContext } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SelectOrganization from '../SelectOrganization/SelectOrganization';
import SelectSourceCSDL from '../SelectSourceCSDL/SelectSourceCSDL';
import SelectTableBySource from '../SelectTableBySource/SelectTableBySource';
import SelectSubOrganization from '../SelectSubOrganization/SelectSubOrganization';
import ListApiRetry from '../ListApiRetry/ListApiRetry';
// import ListConnection from '../ListConnection/ListConnection';
MainLayOutShareAPI.propTypes = {
  isConfigPermission: PropTypes.bool.isRequired,
};

export const MainLayOutShareAPIContext = createContext();
function MainLayOutShareAPI({ isConfigPermission = false }) {
  const [dataStep, setDataStep] = useState({
    organization: null,
    sourceCSDL: null,
    table: null,
    sub_organization: null,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const { messages } = useIntl();

  const nextStepPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevStepPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const contentData = {
    dataStep: dataStep,
    setDataStep,
    nextStepPage,
    prevStepPage,
    isConfigPermission,
  };
  // list step item
  const stepsDataShare = [
    // {
    //   title: 'Danh sách kết nối',
    //   content: <ListConnection />,
    // },
    isConfigPermission
      ? {
          title: 'Chọn tổ chức',
          content: <SelectOrganization />,
        }
      : null,
    isConfigPermission
      ? {
          title: 'Chọn tổ chức con',
          content: <SelectSubOrganization />,
        }
      : null,
    {
      title: 'Chọn nguồn CSDL',
      content: <SelectSourceCSDL />,
    },
    {
      title: 'Chọn bảng',
      content: <SelectTableBySource />,
    },
    !isConfigPermission
      ? {
          title: 'Danh sách API chia sẻ',
          content: <ListApiRetry />,
        }
      : null,
  ].filter(Boolean);

  const items = stepsDataShare.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <MainLayOutShareAPIContext.Provider value={contentData}>
      <div className={clsx(style.wrapMainLayOutShareAPI)}>
        <AppPageMetadata
          title={messages['sidebar.config_query_permission_organization']}
        />
        <Row gutter={[12, 12]}>
          <Col span={4} className={clsx(style.contentLeft)}>
            <Steps direction='vertical' current={currentPage} items={items} />
          </Col>
          <Col span={20} className={clsx(style.contentRight)}>
            {stepsDataShare[currentPage].content}
          </Col>
        </Row>
      </div>
    </MainLayOutShareAPIContext.Provider>
  );
}

export default MainLayOutShareAPI;
