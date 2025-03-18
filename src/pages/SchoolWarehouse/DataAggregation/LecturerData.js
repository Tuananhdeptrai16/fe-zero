import React from 'react';
import PropTypes from 'prop-types';
import APIDataAggregatedList from './components/APIDataAggregatedList';
import { CATEGORY_AGGREGATES_API_DATA } from 'src/shared/constants/DataFixed';
import { useIntl } from 'react-intl';
import { ROUTER_NAME } from 'src/pages/routeConfig';

function LecturerData() {
  const { messages } = useIntl();
  return (
    <APIDataAggregatedList
      category={CATEGORY_AGGREGATES_API_DATA.TEACHER}
      title={messages['lecturer_data']}
      pageName={ROUTER_NAME.LECTURER_DATA}
    />
  );
}

LecturerData.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
};

export default LecturerData;
