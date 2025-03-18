import React from 'react';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SOURCE_DEFINITION_ORACLE_NAME } from 'src/shared/constants/DataFixed';

const StreamOracle = () => {
  return <StreamConnection sourceName={SOURCE_DEFINITION_ORACLE_NAME} />;
};

StreamOracle.propTypes = {};

StreamOracle.defaultProps = {};

export default StreamOracle;
