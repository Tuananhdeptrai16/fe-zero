import { UploadOutlined } from '@ant-design/icons';
import { Col, Collapse, Form, Row, Upload } from 'antd';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  BLOOD_OPTIONS,
  DM_GD_CHINHSACH,
  DM_GIAYTO_TUYTHAN,
  DM_LOAI_THUONGBINH,
  DM_TINHTRANG_SUCKHOE,
} from 'src/shared/constants/DataFixed';
import setColor from 'src/shared/constants/setColorCompare';
import { uploadFile } from 'src/@crema/services/db/additial.service';
import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import {
  convertURLToFileType,
  getFileNameFromURL,
} from 'src/shared/utils/filter';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';

function CollapseOtherInfor({ compare }) {
  const onChange = (info) => {
    const { status } = info.file;

    if (status === 'done') {
      notification.success(`Tải file ${info.file.name} thành công.`);
    } else if (status === 'error') {
      notification.error(`Tải file ${info.file.name} thất bại.`);
    }
  };
  const { send } = useCallApi({
    callApi: uploadFile,
    error: (err) => {
      const errors = getErrorsResponse(err?.raw, messages);
      notification.error(errors);
    },
  });
  const { loading, send: downloadFile } = useCallApi({
    success: (data, request) => {
      if (data) {
        const fileType = convertURLToFileType(request) || 'application/pdf';
        const fileName = getFileNameFromURL(request) || Date.now();
        const urlFile = URL.createObjectURL(
          new File([data], fileName, { type: fileType }),
        );
        const link = document.createElement('a');
        link.href = urlFile;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      } else {
        notification.error('Không thể tải file');
      }
    },
    callApi: (url) => {
      return instanceCoreApi.get(url, {
        responseType: 'blob',
      });
    },
  });
  const { messages } = useIntl();
  const { Panel } = Collapse;

  const renderFormSelect = ({
    labelKey,
    compareKey,
    options,
    colSpan = 12,
    fieldNames = { value: 'name', label: 'name' },
    isRequired = false,
    ...props
  }) => (
    <Col span={colSpan} className={'custom-select'}>
      <FormSelect
        {...props}
        label={messages[labelKey]}
        name={[
          messages['common.informationCommonLeader'],
          messages['common.otherInformation'],
          compareKey,
        ]}
        options={options}
        required={isRequired}
        fieldNames={fieldNames}
        style={setColor(compareKey, compare)}
      />
    </Col>
  );

  const renderFormInput = ({
    labelKey,
    compareKey,
    colSpan = 8,
    rules,
    isDatePicker = false,
    required = false,
    ...props
  }) => {
    const Component = isDatePicker ? FormDatePicker : FormInput;
    return (
      <Col span={colSpan}>
        <Component
          {...props}
          label={messages[labelKey]}
          name={[
            messages['common.informationCommonLeader'],
            messages['common.otherInformation'],
            labelKey,
          ]}
          rules={rules}
          required={required}
          style={setColor(compareKey, compare)}
        />
      </Col>
    );
  };

  const renderFormUpload = ({ labelKey, compareKey }) => (
    <Col span={24}>
      <Form.Item
        valuePropName='fileList'
        getValueFromEvent={({ fileList }) => fileList}
        style={setColor(compareKey, compare)}
        name={[
          messages['common.informationCommonLeader'],
          messages['common.otherInformation'],
          labelKey,
        ]}>
        <Upload
          customRequest={(options) => {
            const { onSuccess, onError, file, onProgress } = options;
            send({ file, onProgress })
              .then((rs) => {
                onSuccess(
                  rs?.result?.url || rs?.result?.file_url || rs?.result,
                );
              })
              .catch((e) => {
                onError(getMessageResponse(e));
              });
          }}
          onDownload={(file) => {
            const url = file?.response || file?.url;
            if (loading) {
              notification.warning('Đang thực hiện tải file');
              return;
            }
            if (url) {
              downloadFile(url);
            }
          }}
          showUploadList={{ showDownloadIcon: true, showRemoveIcon: true }}
          onChange={onChange}>
          <Row>
            <Col span={8}>
              <span style={{ paddingBottom: 8 }}>{messages[labelKey]}</span>
            </Col>
            <AntButton icon={<UploadOutlined />}>Chọn tệp</AntButton>
          </Row>
        </Upload>
      </Form.Item>
    </Col>
  );

  return (
    <Collapse
      defaultActiveKey={messages['common.otherInformation']}
      expandIconPosition={'right'}
      style={{ fontWeight: 'bold', backgroundColor: '#FFF1F0' }}>
      <Panel
        header={messages['common.otherInformation']}
        key={messages['common.otherInformation']}>
        <div style={{ fontWeight: 'normal' }}>
          <Row gutter={50}>
            {renderFormSelect({
              labelKey: 'common.statusHeath',
              compareKey: 'common.statusHeath',
              options: DM_TINHTRANG_SUCKHOE,
              colSpan: 8,
            })}
            {renderFormInput({
              labelKey: 'common.chronicDisease',
              compareKey: 'common.chronicDisease',
              colSpan: 8,
              rules: { maxLength: [{ value: 128 }] },
            })}
            {renderFormInput({
              labelKey: 'common.heightCm',
              compareKey: 'common.heightCm',
              colSpan: 8,
              rules: { maxLength: [{ value: 32 }], digit: [] },
            })}
            {renderFormInput({
              labelKey: 'common.weightKg',
              compareKey: 'common.weightKg',
              colSpan: 12,
              rules: { maxLength: [{ value: 32 }], digit: [] },
            })}
            {renderFormSelect({
              labelKey: 'common.bloodType',
              compareKey: 'common.bloodType',
              options: BLOOD_OPTIONS,
              colSpan: 12,
              fieldNames: { value: 'ten', label: 'ten' },
            })}
            {renderFormSelect({
              labelKey: 'common.documentType',
              compareKey: 'common.documentType',
              options: DM_GIAYTO_TUYTHAN,
              colSpan: 8,
              fieldNames: { value: 'name', label: 'name' },
              isRequired: true,
            })}
            {renderFormInput({
              labelKey: 'common.documentNumber',
              compareKey: 'common.documentNumber',
              colSpan: 8,
              rules: { maxLength: [{ value: 32 }] },
              required: true,
            })}
            {renderFormInput({
              labelKey: 'common.dateOfIssue',
              compareKey: 'common.dateOfIssue',
              colSpan: 8,
              isDatePicker: true,
              required: true,
            })}
            {renderFormInput({
              labelKey: 'common.placeOfIssue',
              compareKey: 'common.placeOfIssue',
              colSpan: 8,
              rules: { maxLength: [{ value: 128 }] },
            })}
            {renderFormSelect({
              labelKey: 'common.warInvalid',
              compareKey: 'common.warInvalid',
              options: DM_LOAI_THUONGBINH,
              colSpan: 8,
            })}
            {renderFormSelect({
              labelKey: 'common.policyFamily',
              compareKey: 'common.policyFamily',
              options: DM_GD_CHINHSACH,
              colSpan: 8,
            })}
            {renderFormUpload({
              labelKey: 'common.personProfile',
              compareKey: 'common.personProfile',
            })}
          </Row>
        </div>
      </Panel>
    </Collapse>
  );
}

export default CollapseOtherInfor;
