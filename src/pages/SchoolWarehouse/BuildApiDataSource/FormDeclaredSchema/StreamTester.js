import React, { useRef, useState } from 'react';
import { Button, Form, Typography } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import FormContent from 'src/@crema/component/FormContent';
import AntModal from 'src/@crema/component/AntModal';
import FormInputStream from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormDeclaredSchema/FormInputStream';
import { isEmpty } from 'src/shared/utils/Typeof';
import useCallApi from 'src/@crema/hook/useCallApi';
import notification from 'src/shared/utils/notification';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import { parse, stringify } from 'src/shared/utils/String';
import { get } from 'lodash';

StreamTester.propTypes = {};

function StreamTester({ stream, builderProjectId, testingValues }) {
  const refFormStream = useRef();
  const form = Form.useFormInstance();
  const [response, setResponse] = useState(null);
  const [isOpenDialogInput, setIsOpenDialogInput] = React.useState(false);
  const nameAutoImportSchema = ['metadata', 'autoImportSchema', stream.name];
  const nameSchema = ['schemas', stream.name];
  const autoImportSchema = Form.useWatch(nameAutoImportSchema);
  const properties = Form.useWatch([
    'spec',
    'connection_specification',
    'properties',
  ]);
  const required = Form.useWatch([
    'spec',
    'connection_specification',
    'required',
  ]);
  const spec = Form.useWatch('spec');
  const { loading: loadingUpdateTest, send: sendUpdateTest } = useCallApi({
    success: () => {
      notification.success('Lưu cài đặt cấu hình thử nghiệm thành công');
      setIsOpenDialogInput(false);
    },
    callApi: (data) => {
      return instanceCoreApi.post(API.UPDATE_CONFIG_TEST, data);
    },
  });

  // get config test api loading: loadingConfigTestApi,
  const { loading: loadingReadStream, send: readStream } = useCallApi({
    success: (res) => {
      const result = parse(res?.result) || {};
      const firstRecord = get(result, 'slices[0].pages[0].records');
      const inferredSchema = get(result, 'inferred_schema');
      if (firstRecord) {
        setResponse(stringify(firstRecord, null, '\t'));
        if (autoImportSchema && inferredSchema) {
          form.setFieldValue(nameSchema, inferredSchema);
        }
      } else {
        setResponse(result?.message || 'Lỗi thử nghiệm luồng');
      }
    },
    callApi: (data) => {
      return instanceCoreApi.post(API.CHECK_API_BUILDER, data);
    },
  });

  return (
    <div>
      <div className={'d-flex'}>
        <Typography.Title level={4}>Thử nghiệm</Typography.Title>
        <Button
          disabled={isEmpty(properties)}
          className={'ml-auto'}
          onClick={() => setIsOpenDialogInput(true)}>
          Kiểm tra giá trị
        </Button>
        <Button
          className={'ml-2'}
          type={'primary'}
          loading={loadingReadStream}
          onClick={() => {
            const manifest = form.getFieldsValue();
            const dataReadStream = {
              builder_project_id: builderProjectId,
              manifest: JSON.stringify(manifest),
              stream_name: stream?.name,
            };
            readStream(dataReadStream);
          }}>
          Kiểm tra
        </Button>
      </div>
      <AntModal
        size={MODAL_SIZE.MEDIUM}
        bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
        centered
        title={'Dữ liệu thử nghiệm'}
        open={isOpenDialogInput}
        okButtonProps={{ loading: loadingUpdateTest }}
        onOk={() => {
          if (refFormStream.current) {
            refFormStream.current.submit();
          }
        }}
        okText={'Cập nhật'}
        onCancel={() => {
          setIsOpenDialogInput(false);
        }}>
        <FormContent
          initialValues={testingValues || {}}
          layout='vertical'
          onFinish={(data) => {
            const dataUpdateTest = {
              builder_project_id: builderProjectId,
              spec:
                stringify({
                  ...(spec || {}),
                  type: 'object',
                }) || '{}',
              testing_values: stringify(data || {}),
            };
            sendUpdateTest(dataUpdateTest);
          }}
          ref={refFormStream}>
          <FormInputStream required={required} properties={properties} />
        </FormContent>
      </AntModal>
      <div>
        <AceEditor
          mode='json'
          theme='github'
          name='response'
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          wrapEnabled={true}
          highlightActiveLine={true}
          value={response}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
          readOnly
        />
      </div>
    </div>
  );
}

export default StreamTester;
