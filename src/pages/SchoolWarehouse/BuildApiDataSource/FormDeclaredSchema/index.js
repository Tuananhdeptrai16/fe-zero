import React from 'react';
import { Col, Form, Row, Tabs } from 'antd';
import { STREAMS } from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/Streams';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import StreamTester from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormDeclaredSchema/StreamTester';
import DeclaredSchema from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormDeclaredSchema/DeclaredSchema';

FormDeclaredSchema.propTypes = {};

function FormDeclaredSchema({ builderProjectId, testingValues }) {
  const streams = Form.useWatch(STREAMS);
  const streamTabs = Object.keys(streams || {}).map((streamName, index) => ({
    label: `Luồng ${streamName}`,
    key: index + 1,
    children: (
      <Row gutter={20}>
        <Col span={12}>
          <DeclaredSchema stream={streams[streamName]} />
        </Col>
        <Col span={12}>
          <StreamTester
            stream={streams[streamName]}
            builderProjectId={builderProjectId}
            testingValues={testingValues}
          />
        </Col>
      </Row>
    ),
  }));

  return (
    <>
      <FormHidden name={'check'} />
      <FormHidden name={'definitions'} />
      <FormHidden name={'metadata'} />
      <FormHidden name={'spec'} />
      <FormHidden name={'schemas'} />
      <FormHidden name={'streams'} />
      <FormHidden name={'type'} />
      <FormHidden name={'version'} />
      <Tabs
        defaultActiveKey='1'
        style={{ marginBottom: 32 }}
        items={streamTabs}
      />
    </>
  );
}

export default FormDeclaredSchema;
