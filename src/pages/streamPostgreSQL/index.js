import React from 'react';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SOURCE_DEFINITION_POSTGRES_NAME } from 'src/shared/constants/DataFixed';

const StreamPostgreSQL = () => {
  return <StreamConnection sourceName={SOURCE_DEFINITION_POSTGRES_NAME} />;
};

StreamPostgreSQL.propTypes = {};

StreamPostgreSQL.defaultProps = {};

export default StreamPostgreSQL;
