import PropTypes from 'prop-types';
import React from 'react';
import './page_breadcrumb.styles.less';
import { Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const SubHeaderAppTemplate = ({ title, subTitle, isShowGoBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.key !== 'default';

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='sub-header-app-template pt-6'>
      {subTitle && <div>{subTitle}</div>}
      <div className='d-flex justify-start items-center gap-3'>
        {isShowGoBack && canGoBack && (
          <Tooltip title='Quay lại'>
            <ArrowLeftOutlined className='show_back' onClick={handleGoBack} />
          </Tooltip>
        )}

        <h1
          className='page_breadcrumb__page-title mb-0'
          style={{ lineHeight: '28px', fontSize: 24 }}>
          {title}
        </h1>
      </div>
    </div>
  );
};

SubHeaderAppTemplate.propTypes = {
  title: PropTypes.any,
  subTitle: PropTypes.any,
};

SubHeaderAppTemplate.defaultProps = {};

export default SubHeaderAppTemplate;
