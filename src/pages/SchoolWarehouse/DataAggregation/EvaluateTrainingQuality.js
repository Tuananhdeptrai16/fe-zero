import React from 'react';
import PropTypes from 'prop-types';
import APIDataAggregatedList from './components/APIDataAggregatedList';
import { CATEGORY_AGGREGATES_API_DATA } from 'src/shared/constants/DataFixed';
import { useIntl } from 'react-intl';
import { ROUTER_NAME } from 'src/pages/routeConfig';

function EvaluateTrainingQuality() {
  const { messages } = useIntl();
  return (
    <APIDataAggregatedList
      category={CATEGORY_AGGREGATES_API_DATA.EVALUATE_TRAINING_QUALITY}
      title={messages['evaluate_training_quality']}
      pageName={ROUTER_NAME.EVALUATE_TRAINING_QUALITY}
    />
  );
}

EvaluateTrainingQuality.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
};

export default EvaluateTrainingQuality;
