import React from 'react';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SOURCE_DEFINITION_MYSQL_NAME } from 'src/shared/constants/DataFixed';

const StreamMySQL = () => {
  return <StreamConnection sourceName={SOURCE_DEFINITION_MYSQL_NAME} />;
};

StreamMySQL.propTypes = {};

StreamMySQL.defaultProps = {};

export default StreamMySQL;
