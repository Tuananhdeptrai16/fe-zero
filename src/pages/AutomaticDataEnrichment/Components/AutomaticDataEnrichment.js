import React, { useEffect, useState } from 'react';
import style from './AutomaticDataEnrichment.module.scss';
import clsx from 'clsx';
import { Col, Row, Steps } from 'antd';
import SelectOrganization from './SelectOrganization/SelectOrganization';
import SelectSource from './SelectSource/SelectSource';
import SelectConnection from './SelectConnection/SelectConnection';
import useIntl from 'react-intl/lib/src/components/useIntl';
import PropTypes from 'prop-types';
import ConfigureDataEnrichment from './ConfigureDataEnrichment/ConfigureDataEnrichment';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CLEAR_AUTO_DATA } from 'src/shared/constants/ActionTypes';

AutomaticDataEnrichment.propTypes = {
  dataType: PropTypes.string,
};

function AutomaticDataEnrichment({ dataType }) {
  const [current, setCurrent] = useState(0);
  const { messages } = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrent(0);
    dispatch({ type: CLEAR_AUTO_DATA });
  }, [location.pathname]);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: messages['sidebar.select_organization'],
      content: <SelectOrganization next={next} />,
    },
    {
      title: messages['sidebar.select_source'],
      content: <SelectSource next={next} prev={prev} dataType={dataType} />,
    },
    {
      title: messages['sidebar.select_connection'],
      content: <SelectConnection next={next} prev={prev} />,
    },
    {
      title: messages['sidebar.config_data_enrichment'],
      content: <ConfigureDataEnrichment prev={prev} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className={clsx(style.wrapManageDataVersions)}>
      <Row gutter={[12, 12]}>
        <Col span={4}>
          <div className={clsx(style.manageDataVersions_left)}>
            <Steps current={current} items={items} direction='vertical' />
          </div>
        </Col>
        <Col span={20}>
          <div className={clsx(style.manageDataVersions_right)}>
            <div>{steps[current].content}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AutomaticDataEnrichment;
