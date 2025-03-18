import React from 'react';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SOURCE_DEFINITION_FILE_NAME } from 'src/shared/constants/DataFixed';
const StreamData = () => {
  return <StreamConnection sourceName={SOURCE_DEFINITION_FILE_NAME} />;
};

StreamData.propTypes = {};

StreamData.defaultProps = {};

export default StreamData;
