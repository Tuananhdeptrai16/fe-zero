import React from 'react';
import PropTypes from 'prop-types';
import APIDataAggregatedList from './components/APIDataAggregatedList';
import { CATEGORY_AGGREGATES_API_DATA } from 'src/shared/constants/DataFixed';
import { useIntl } from 'react-intl';
import { ROUTER_NAME } from 'src/pages/routeConfig';

function StudentData() {
  const { messages } = useIntl();
  return (
    <APIDataAggregatedList
      category={CATEGORY_AGGREGATES_API_DATA.STUDENT}
      title={messages['student_data']}
      pageName={ROUTER_NAME.STUDENT_DATA}
    />
  );
}

StudentData.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
};

export default StudentData;
