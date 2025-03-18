import React from 'react';

import AppPageMetadata from 'src/@crema/core/AppPageMetadata';

import { useParams } from 'react-router-dom';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import StreamConnection from 'src/pages/streamConnection/infoData';

const DetailConnectionList = () => {
  const params = useParams();

  const destinationId = params?.id;

  return (
    <>
      <AppPageMetadata title={'Danh sách kết nối'} />
      <SubHeaderApp>
        <SubHeaderAppTemplate title={'Danh sách kết nối'} isShowGoBack />
      </SubHeaderApp>
      <StreamConnection destinationId={destinationId} />
    </>
  );
};
export default DetailConnectionList;
