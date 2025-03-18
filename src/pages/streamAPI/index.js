import React from 'react';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SOURCE_DEFINITION_API_NAME } from 'src/shared/constants/DataFixed';

const StreamAPI = () => {
  return <StreamConnection sourceName={SOURCE_DEFINITION_API_NAME} />;
};

StreamAPI.propTypes = {};

StreamAPI.defaultProps = {};

export default StreamAPI;
