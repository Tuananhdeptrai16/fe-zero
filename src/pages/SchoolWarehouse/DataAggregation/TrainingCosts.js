import React from 'react';
import PropTypes from 'prop-types';
import APIDataAggregatedList from './components/APIDataAggregatedList';
import { CATEGORY_AGGREGATES_API_DATA } from 'src/shared/constants/DataFixed';
import { useIntl } from 'react-intl';
import { ROUTER_NAME } from 'src/pages/routeConfig';

function TrainingCosts() {
  const { messages } = useIntl();
  return (
    <APIDataAggregatedList
      category={CATEGORY_AGGREGATES_API_DATA.TRAINING_COSTS}
      title={messages['training_costs']}
      pageName={ROUTER_NAME.TRAINING_COSTS}
    />
  );
}

TrainingCosts.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
};

export default TrainingCosts;
