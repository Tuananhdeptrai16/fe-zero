import React from 'react';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SOURCE_DEFINITION_MSSQL_NAME } from 'src/shared/constants/DataFixed';
const StreamMSSQL = () => {
  return <StreamConnection sourceName={SOURCE_DEFINITION_MSSQL_NAME} />;
};

StreamMSSQL.propTypes = {};

StreamMSSQL.defaultProps = {};

export default StreamMSSQL;
