import React from 'react';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { LOGS_FAKE } from 'src/shared/constants/DataFixed';
import { Col, Row, Spin } from 'antd';
import { parserLog } from 'src/shared/utils/String';

const FormModalLog = ({ data }) => {
  const jobId = data?.job?.id;
  const { data: logs, isLoading } = useFetch(
    {
      url: API.DETAIL_JOB_CONNECTION_AIR_BYTE,
      method: METHOD_FETCH.POST,
      body: {
        job_id: jobId,
        attempt_number: 0,
      },
    },
    [jobId],
  );
  const logLines = logs?.logs?.logLines || LOGS_FAKE?.logLines || [];

  return (
    <Spin spinning={isLoading}>
      {logLines.map((log, index) => {
        return (
          <Row key={`log-item-${index}`}>
            <Col span={2}>{index + 1}</Col>
            <Col span={22}>
              <p>{parserLog(log)}</p>
            </Col>
          </Row>
        );
      })}
    </Spin>
  );
};

FormModalLog.propTypes = {};

FormModalLog.defaultProps = {};

export default FormModalLog;
