import React, { useState } from 'react';
import style from './ManageDataVersions.module.scss';
import clsx from 'clsx';
import { Col, Row, Steps } from 'antd';
import SelectOrganization from './SelectOrganization/SelectOrganization';
import SelectSource from './SelectSource/SelectSource';
import SelectTable from './SelectTable/SelectTable';
import SelectRecord from './SelectRecord/SelectRecord';
import SelectConnection from './SelectConnection/SelectConnection';
import ResultTableHistory from './ResultTableHistory/ResultTableHistory';
import useIntl from 'react-intl/lib/src/components/useIntl';
import PropTypes from 'prop-types';

ManageDataVersions.propTypes = {
  sourceName: PropTypes.string,
};

function ManageDataVersions({ sourceName }) {
  const [current, setCurrent] = useState(0);
  const { messages } = useIntl();

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
      content: <SelectSource sourceName={sourceName} next={next} prev={prev} />,
    },
    {
      title: messages['sidebar.select_connection'],
      content: <SelectConnection next={next} prev={prev} />,
    },
    {
      title: messages['sidebar.select_table'],
      content: <SelectTable next={next} prev={prev} />,
    },
    {
      title: messages['sidebar.select_record'],
      content: <SelectRecord prev={prev} next={next} />,
    },
    {
      title: messages['sidebar.history'],
      content: <ResultTableHistory prev={prev} />,
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

export default ManageDataVersions;
