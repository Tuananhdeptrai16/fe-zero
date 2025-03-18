import React from 'react';
import wrapperTableNuclearRegion from 'src/HOC/wrapperTableNuclearRegion';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import AntModal from 'src/@crema/component/AntModal/index.js';
import { FormSearch } from 'src/pages/SchoolWarehouse/NuclearRegion/Components/LookCollectedResults/FormSearch';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { Spin } from 'antd';

LookCollectedResults.propTypes = {};

function LookCollectedResults({
  isCollectedResult,
  setIsisCollectedResult,
  rowData,
}) {
  const idJob = rowData?.id;

  const { data, isLoading: isLoadingDetailJob } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: idJob ? API.GET_DETAIL_JOB(idJob) : null,
    },
    [idJob],
  );
  const detailNuclearRegion = data?.result?.scheduler_response || {};
  return (
    <AntModal
      okButtonProps={{ hidden: true }}
      size={MODAL_SIZE.XLARGE}
      centered
      bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
      // footer={null}
      title='Tra cứu kết quả thu thập'
      open={isCollectedResult}
      onCancel={() => setIsisCollectedResult(false)}>
      <Spin spinning={isLoadingDetailJob}>
        {rowData && (
          <FormSearch
            key={`formSearch-${rowData?.id}`}
            data={detailNuclearRegion}
          />
        )}
      </Spin>
    </AntModal>
  );
}

export default wrapperTableNuclearRegion(LookCollectedResults, {
  synthesis_mechanism: false,
});
