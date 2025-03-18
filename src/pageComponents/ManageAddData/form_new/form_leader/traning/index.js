import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Col, Collapse, Form, Row, Table, Tooltip, Upload } from 'antd';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormDateRangePicker from 'src/@crema/core/Form/FormDateRangePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import {
  COEFFICIENTS_SALARY_OPTIONS,
  DM_GIAYCN_QSH_TS,
  HINHTHUC_DAOTAO,
  HINHTHUC_KHENTHUONG,
  HINHTHUC_KYLUAT,
  KYLUAT,
  MOIQUANHE,
  NGUON,
  ROLE_OPTIONS,
  STAFF_RANK_OPTIONS,
  TAISAN,
  VANBANG_CHUNGCHI,
  WAGE_OPTIONS,
} from 'src/shared/constants/DataFixed';
import setColor from 'src/shared/constants/setColorCompare';
import {
  convertURLToFileType,
  getFileNameFromURL,
} from 'src/shared/utils/filter';
import notification from 'src/shared/utils/notification';
import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import { uploadFile } from 'src/@crema/services/db/additial.service';
import styled from 'styled-components';

const StyledCollapse = styled.section`
  .ant-collapse-header {
    background-color: #fff1f0;
  }
  .ant-collapse-header-text {
    font-weight: 500;
  }
  .ant-form-item-explain-error {
    position: absolute;
  }
  .ant-table-cell {
    .wrapper-input {
      margin: 12px 0;
    }
    .ant-form-item {
      margin-bottom: 0;
    }
    .upload-custom {
      align-items: center;
    }
  }
`;

function FormTraning({ name, compare, form }) {
  const { messages } = useIntl();
  let listColunmsOfTab = [
    {
      name: messages['common.traningLeaderFostering'],
      label: messages['common.traningLeaderFosteringTitle'],
      listInput: [
        {
          type: 'table',
          name: [
            messages['common.traningLeaderFostering'],
            'Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính trị, ngoại ngữ',
          ],
          label:
            'Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính trị, ngoại ngữ',
          columns: [
            {
              title: 'Tên trường',
              dataIndex: 'Tên trường',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Ngành học hoặc tên lớp học',
              dataIndex: 'Ngành học hoặc tên lớp học',
              isTextLong: true,
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Thời gian học ( Tháng )',
              dataIndex: 'Thời gian học ( Tháng )',
              isDatePicker: true,
            },
            {
              title: 'Hình thức học',
              dataIndex: 'Hình thức học',
              isSelect: true,
              options: HINHTHUC_DAOTAO,
            },
            {
              title: 'Văn bằng, chứng chỉ, trình độ',
              dataIndex: 'Văn bằng, chứng chỉ, trình độ',
              isSelect: true,
              options: VANBANG_CHUNGCHI,
            },
            {
              title: 'Dẫn chứng',
              dataIndex: 'Dẫn chứng',
              isUpload: true,
            },
          ],
        },
      ],
    },
    {
      name: messages['common.workingCycleLeader'],
      label: messages['common.workingCycleLeaderTitle'],
      listInput: [
        {
          type: 'table',
          name: [
            messages['common.workingCycleLeader'],
            'Tóm tắt quá trình công tác',
          ],
          label: 'Tóm tắt quá trình công tác',
          columns: [
            {
              title: 'Thời gian',
              dataIndex: 'Thời gian',
              isDateRangePicker: true,
            },
            {
              title: 'Chức danh',
              dataIndex: 'Chức danh',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Chức vụ',
              dataIndex: 'Chức vụ',
              isSelect: true,
              options: ROLE_OPTIONS,
            },
            {
              title: 'Đơn vị công tác',
              dataIndex: 'Đơn vị công tác',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Dẫn chứng',
              dataIndex: 'Dẫn chứng',
              isUpload: true,
            },
          ],
        },
      ],
    },
    {
      name: messages['common.historyLeader'],
      listInput: [
        {
          type: 'textarea',
          label: 'Khai rõ bị bắt, đi tù, đã khai báo cho ai, những vấn đề gì?',
          name: [messages['common.historyLeader'], 'Khai rõ'],
          rules: { maxLength: [{ value: 256 }] },
        },
        {
          type: 'table',
          label: 'Bản thân có làm việc trong chế độ cũ',
          name: [
            messages['common.historyLeader'],
            'Bản thân có làm việc trong chế độ cũ',
          ],
          columns: [
            {
              title: 'Cơ quan/ Đơn vị',
              dataIndex: 'Cơ quan/ Đơn vị',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Địa điểm làm việc',
              dataIndex: 'Địa điểm làm việc',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Chức danh',
              dataIndex: 'Chức danh',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Chức vụ',
              dataIndex: 'Chức vụ',
              isSelect: true,
              options: ROLE_OPTIONS,
            },
            {
              title: 'Thời gian',
              dataIndex: 'Thời gian',
              isDateRangePicker: true,
            },
          ],
        },
      ],
    },
    {
      name: messages['common.foreignerRelationshipLeader'],
      listInput: [
        {
          type: 'table',
          name: [
            messages['common.foreignerRelationshipLeader'],
            'Tham gia hoặc có quan hệ với các tổ chức kinh tế, chính trị, xã hội',
          ],
          label:
            'Tham gia hoặc có quan hệ với các tổ chức kinh tế, chính trị, xã hội',
          columns: [
            {
              title: 'Công việc đã làm',
              dataIndex: 'Công việc đã làm',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Tên tổ chức',
              dataIndex: 'Tên tổ chức',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Địa chỉ trụ sở',
              dataIndex: 'Địa chỉ trụ sở',
              rules: { maxLength: [{ value: 128 }] },
            },
          ],
        },
        {
          type: 'table',
          label: 'Có nhân thân ở nước ngoài',
          name: [
            messages['common.foreignerRelationshipLeader'],
            'Có nhân thân ở nước ngoài',
          ],
          columns: [
            {
              title: 'Mối quan hệ',
              dataIndex: 'Mối quan hệ',
              isSelect: true,
              options: MOIQUANHE,
            },
            {
              title: 'Công việc',
              dataIndex: 'Công việc',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Địa chỉ',
              dataIndex: 'Địa chỉ',
              rules: { maxLength: [{ value: 128 }] },
            },
          ],
        },
      ],
    },
    {
      name: messages['common.familyRelationshipLeader'],
      listInput: [
        {
          type: 'table',
          name: [
            messages['common.familyRelationshipLeader'],
            'Về bản thân: Bố, Mẹ, Vợ (hoặc Chồng), các con, anh chị em ruột',
          ],
          label:
            'Về bản thân: Bố, Mẹ, Vợ (hoặc Chồng), các con, anh chị em ruột',
          columns: [
            {
              title: 'Mối quan hệ',
              dataIndex: 'Mối quan hệ',
              isSelect: true,
              options: MOIQUANHE,
            },
            {
              title: 'Họ và tên',
              dataIndex: 'Họ và tên',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Năm sinh',
              dataIndex: 'Năm sinh',
              isDatePicker: true,
            },
            {
              title: 'Quê quán',
              dataIndex: 'Quê quán',
              rules: { maxLength: [{ value: 128 }] },
            },
            {
              title: 'Nghề nghiệp',
              dataIndex: 'Nghề nghiệp',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Chức danh',
              dataIndex: 'Chức danh',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Chức vụ',
              dataIndex: 'Chức vụ',
              isSelect: true,
              options: ROLE_OPTIONS,
            },
            {
              title: 'Đơn vị công tác/ học tập',
              dataIndex: 'Đơn vị công tác/ học tập',
              rules: { maxLength: [{ value: 32 }] },
              isTextLong: true,
            },
            {
              title: 'Nơi ở',
              dataIndex: 'Nơi ở',
              rules: { maxLength: [{ value: 128 }] },
            },
            {
              title: 'Thành viên các tổ chức CTXH',
              dataIndex: 'Thành viên các tổ chức CTXH',
              rules: { maxLength: [{ value: 32 }] },
              isTextLong: true,
            },
          ],
        },
        {
          type: 'table',
          label: 'Bố, Mẹ, anh chị em ruột (Bên vợ hoặc chồng)',
          name: [
            messages['common.familyRelationshipLeader'],
            'Bố, Mẹ, anh chị em ruột (Bên vợ hoặc chồng)',
          ],
          columns: [
            {
              title: 'Mối quan hệ',
              dataIndex: 'Mối quan hệ',
              isSelect: true,
              options: MOIQUANHE,
            },
            {
              title: 'Họ và tên',
              dataIndex: 'Họ và tên',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Năm sinh',
              dataIndex: 'Năm sinh',
              isDatePicker: true,
            },
            {
              title: 'Quê quán',
              dataIndex: 'Quê quán',
              rules: { maxLength: [{ value: 128 }] },
            },
            {
              title: 'Nghề nghiệp',
              dataIndex: 'Nghề nghiệp',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Chức danh',
              dataIndex: 'Chức danh',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Chức vụ',
              dataIndex: 'Chức vụ',
              isSelect: true,
              options: ROLE_OPTIONS,
            },
            {
              title: 'Đơn vị công tác/ học tập',
              dataIndex: 'Đơn vị công tác/ học tập',
              rules: { maxLength: [{ value: 32 }] },
              isTextLong: true,
            },
            {
              title: 'Nơi ở',
              dataIndex: 'Nơi ở',
              rules: { maxLength: [{ value: 128 }] },
            },
            {
              title: 'Thành viên các tổ chức CTXH',
              dataIndex: 'Thành viên các tổ chức CTXH',
              rules: { maxLength: [{ value: 32 }] },
              isTextLong: true,
            },
          ],
        },
      ],
    },
    {
      name: messages['common.economicStatusLeader'],
      listInput: [
        {
          type: 'table',
          label: 'Quá trình lương của bản thân',
          name: [
            messages['common.economicStatusLeader'],
            'Quá trình lương của bản thân',
          ],
          columns: [
            {
              title: 'Thời gian',
              dataIndex: 'Thời gian',
              isDateRangePicker: true,
            },

            {
              title: 'Ngạch',
              dataIndex: 'Ngạch',
              isSelect: true,
              options: STAFF_RANK_OPTIONS,
              fieldNames: { value: 'tenNgachCb', label: 'tenNgachCb' },
            },
            {
              title: 'Bậc lương',
              dataIndex: 'Bậc lương',
              isSelect: true,
              options: COEFFICIENTS_SALARY_OPTIONS,
            },
            {
              title: 'Hệ số lương',
              dataIndex: 'Hệ số lương',
              isSelect: true,
              options: WAGE_OPTIONS,
            },
          ],
        },
        {
          type: 'input',
          label: 'Nguồn thu nhập chính của gia đình hàng năm',
          inputs: [
            {
              name: [messages['common.economicStatusLeader'], 'Tiền lương'],
              labelKey: 'Tiền lương',
              colSpan: 12,
              rules: { maxLength: [{ value: 10 }] },
            },
            {
              name: [messages['common.economicStatusLeader'], 'Các nguồn khác'],
              labelKey: 'Các nguồn khác',
              colSpan: 12,
              rules: { maxLength: [{ value: 10 }] },
            },
          ],
        },
        {
          type: 'table',
          label: 'Nhà đất',
          name: [messages['common.economicStatusLeader'], 'Nhà đất'],
          columns: [
            {
              title: 'Loại tài sản',
              dataIndex: 'Loại tài sản',
              isSelect: true,
              options: TAISAN,
              fieldNames: { value: 'name', label: 'name' },
            },
            {
              title: 'Nguồn',
              dataIndex: 'Nguồn',
              isSelect: true,
              options: NGUON,
            },
            {
              title: 'Loại nhà',
              dataIndex: 'Loại nhà',
              rules: { maxLength: [{ value: 32 }] },
            },
            {
              title: 'Tổng diện tích sử dụng',
              dataIndex: 'Tổng diện tích sử dụng',
              rules: { maxLength: [{ value: 32 }] },
              isTextLong: true,
            },
            {
              title: 'Giấy chứng nhận quyền sở hữu sử dụng',
              dataIndex: 'Giấy chứng nhận quyền sở hữu sử dụng',
              isSelect: true,
              options: DM_GIAYCN_QSH_TS,
              fieldNames: { value: 'name', label: 'name' },
            },
            {
              title: 'Ghi chú',
              dataIndex: 'Ghi chú',
              rules: { maxLength: [{ value: 128 }] },
            },
          ],
        },
      ],
    },
    {
      name: messages['common.rewardDisciplineLeader'],
      listInput: [
        {
          type: 'table',
          label: 'Khen thưởng',
          name: [messages['common.rewardDisciplineLeader'], 'Khen thưởng'],
          columns: [
            {
              title: 'Khen thưởng',
              dataIndex: 'Khen thưởng',
              rules: { maxLength: [{ value: 128 }] },
            },
            {
              title: 'Hình thức khen thưởng',
              dataIndex: 'Hình thức khen thưởng',
              isSelect: true,
              options: HINHTHUC_KHENTHUONG,
              fieldNames: { value: 'name', label: 'name' },
            },
            {
              title: 'Năm khen thưởng',
              dataIndex: 'Năm khen thưởng',
              isDatePicker: true,
            },
            {
              title: 'Dẫn chứng',
              dataIndex: 'Dẫn chứng',
              isUpload: true,
            },
          ],
        },
        {
          type: 'table',
          label: 'Kỷ luật',
          name: [messages['common.rewardDisciplineLeader'], 'Kỷ luật'],
          columns: [
            {
              title: 'Kỷ luật',
              dataIndex: 'Kỷ luật',
              isSelect: true,
              options: KYLUAT,
              fieldNames: { value: 'name', label: 'name' },
            },
            {
              title: 'Cấp quyết định',
              dataIndex: 'Cấp quyết định',
              rules: { maxLength: [{ value: 32 }] },
            },

            {
              title: 'Năm kỷ luật',
              dataIndex: 'Năm kỷ luật',
              isDatePicker: true,
            },
            {
              title: 'Lý do kỷ luật',
              dataIndex: 'Lý do kỷ luật',
              rules: { maxLength: [{ value: 128 }] },
            },
            {
              title: 'Hình thức kỷ luật',
              dataIndex: 'Hình thức kỷ luật',
              isSelect: true,
              options: HINHTHUC_KYLUAT,
              fieldNames: { value: 'name', label: 'name' },
            },
          ],
        },
      ],
    },
  ];
  const tabActive = listColunmsOfTab.find((item) => item.name === name);
  const watch = Form.useWatch(
    [messages['common.economicStatusLeader'], 'Nhà đất'],
    form,
  );
  if (watch && form) {
    const fields = form.getFieldsValue();
    const table = fields['Hoàn cảnh kinh tế']['Nhà đất'];
    let resetOptionSource = false;
    const valueTable = table.map((item) => ({ value: { ...item.value } }));
    const valueFormat = valueTable.map((item) => {
      if (
        !item.value?.['Loại tài sản'] ||
        !NGUON.some(
          (itemSub) =>
            itemSub.name === item.value?.['Loại tài sản'] &&
            itemSub.ten === item.value['Nguồn'],
        )
      ) {
        resetOptionSource = true;
        return { value: { ...item.value, ['Nguồn']: undefined } };
      } else {
        return { value: { ...item.value } };
      }
    });

    resetOptionSource &&
      form.setFieldsValue({
        'Hoàn cảnh kinh tế': {
          'Nhà đất': valueFormat,
        },
      });
  }

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
  const onChange = (info) => {
    const { status } = info.file;

    if (status === 'done') {
      notification.success(`Tải file ${info.file.name} thành công.`);
    } else if (status === 'error') {
      notification.error(`Tải file ${info.file.name} thất bại.`);
    }
  };
  const renderTable = (dataTable) => {
    const { Panel } = Collapse;
    const intiColumnsTable = (columns, remove) => {
      const columnsFormat = columns.map((item) =>
        item.isDatePicker
          ? {
              title: item.title,
              key: item.dataIndex,
              dataIndex: item.dataIndex,
              render: (value, row, index) => (
                <div className='wrapper-input'>
                  <FormDatePicker
                    name={[index, 'value', item.dataIndex]}
                    placeholder={'Nhập ' + item.title}
                    style={setColor(
                      item.dataIndex,
                      compare,
                      false,
                      index,
                      dataTable.name[0],
                      dataTable.label,
                    )}
                  />
                </div>
              ),
            }
          : item.isUpload
          ? {
              title: item.title,
              key: item.dataIndex,
              width: 300,
              render: (value, row, index) => (
                <>
                  <Form.Item
                    name={[index, 'value', item.dataIndex]}
                    valuePropName='fileList'
                    style={setColor(
                      item.dataIndex,
                      compare,
                      false,
                      index,
                      dataTable.name[0],
                      dataTable.label,
                      true,
                    )}
                    getValueFromEvent={({ fileList }) => fileList}>
                    <Upload
                      name='file'
                      className='upload-custom'
                      customRequest={(options) => {
                        const { onSuccess, onError, file, onProgress } =
                          options;
                        send({ file, onProgress })
                          .then((rs) => {
                            onSuccess(
                              rs?.result?.url ||
                                rs?.result?.file_url ||
                                rs?.result,
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
                      showUploadList={{
                        showDownloadIcon: true,
                        showRemoveIcon: true,
                      }}
                      onChange={onChange}>
                      <AntButton icon={<UploadOutlined />}></AntButton>
                    </Upload>
                  </Form.Item>
                </>
              ),
            }
          : item.isDateRangePicker
          ? {
              title: item.title,
              key: item.dataIndex,
              dataIndex: item.dataIndex,
              width: item.isTextLong ? 500 : 350,
              render: (value, row, index) => (
                <div className='wrapper-input'>
                  <FormDateRangePicker
                    name={[index, 'value', item.dataIndex]}
                    style={setColor(
                      item.dataIndex,
                      compare,
                      false,
                      index,
                      dataTable.name[0],
                      dataTable.label,
                    )}
                  />
                </div>
              ),
            }
          : item.isSelect
          ? {
              title: item.title,
              key: item.dataIndex,
              dataIndex: item.dataIndex,
              width: item.isTextLong ? 500 : 350,
              render: (value, row, index) => (
                <div className={'custom-select-hidden-margin custom-select'}>
                  <FormSelect
                    options={
                      item.dataIndex === 'Nguồn' && watch?.[index].value
                        ? watch[index]?.value
                          ? item.options.filter(
                              (item) =>
                                item.name ===
                                watch[index].value['Loại tài sản'],
                            )
                          : []
                        : item.options
                    }
                    fieldNames={
                      item.fieldNames || { value: 'ten', label: 'ten' }
                    }
                    name={[index, 'value', item.dataIndex]}
                    style={setColor(
                      item.dataIndex,
                      compare,
                      false,
                      index,
                      dataTable.name[0],
                      dataTable.label,
                    )}
                    listHeight={128}
                  />
                </div>
              ),
            }
          : {
              title: item.title,
              dataIndex: item.dataIndex,
              key: item.dataIndex,
              width: item.isTextLong ? 500 : 350,
              render: (value, row, index) => (
                <div className='wrapper-input'>
                  <FormInput
                    labelHidden={item.title}
                    name={[index, 'value', item.dataIndex]}
                    placeholder={'Nhập ' + item.title}
                    style={setColor(
                      item.dataIndex,
                      compare,
                      false,
                      index,
                      dataTable.name[0],
                      dataTable.label,
                    )}
                    rules={item.rules}
                  />
                </div>
              ),
            },
      );
      columnsFormat.unshift({
        title: 'STT',
        key: 'STT',
        render: (value, row, index) => index + 1,
      });
      columnsFormat.push({
        title: 'Thao tác',
        key: 'Thao tác',
        fixed: 'right',
        render: (value, row, index) => (
          <>
            <Tooltip title={'Xóa hàng'}>
              <AntButton
                shape='circle'
                danger
                icon={<DeleteOutlined />}
                onClick={() => remove(index)}
              />
            </Tooltip>
          </>
        ),
      });
      return columnsFormat;
    };
    return (
      <Panel header={dataTable.label} key={dataTable.label}>
        <Row>
          <Col span={24}>
            <Form.List name={dataTable.name}>
              {(data, { add, remove }) => {
                return (
                  <>
                    <Table
                      pagination={false}
                      dataSource={data}
                      scroll={{ x: 'max-content' }}
                      columns={intiColumnsTable(
                        dataTable.columns,
                        remove,
                      )}></Table>
                    <AntButton
                      style={{ marginBottom: 8 }}
                      type='dashed'
                      onClick={add}
                      block
                      icon={<PlusOutlined />}>
                      Thêm hàng
                    </AntButton>
                  </>
                );
              }}
            </Form.List>
          </Col>
        </Row>
      </Panel>
    );
  };
  const renderTextArea = (dataTextArea) => {
    return (
      <Row>
        <Col span={24}>
          <FormTextArea
            name={dataTextArea.name}
            label={dataTextArea.label}
            style={setColor('Khai rõ', compare)}
            rules={dataTextArea.rules}
          />
        </Col>
      </Row>
    );
  };
  const renderFormInput = ({
    labelKey,
    name,
    colSpan = 8,
    required = false,
    rules,
  }) => {
    return (
      <Col span={colSpan}>
        <FormInput
          label={labelKey}
          layout={{
            className: 'ant-form-item-horizontal',
            wrapperCol: { span: 15 },
            labelCol: { span: 5 },
            style: {
              display: 'inline-block',
              width: '100%',
            },
          }}
          name={name}
          required={required}
          rules={rules}
          style={setColor && setColor(name, compare)}
        />
      </Col>
    );
  };
  const renderInputs = (data) => {
    return (
      <Row style={{ marginTop: '10px', padding: '0 16px' }} gutter={50}>
        <Col span={24}>
          <div style={{ marginBottom: '18px', fontWeight: 700 }}>
            {data.label}
          </div>
        </Col>
        {data.inputs.map((input) => renderFormInput(input))}
      </Row>
    );
  };

  return (
    <StyledCollapse>
      {tabActive.listInput.map((item) => {
        const data = listColunmsOfTab.map((itemLabel) =>
          itemLabel.listInput.map(
            (input) => input.type === 'table' && input.label,
          ),
        );
        const columnsFormated = [].concat(...data).filter(Boolean);
        return item.type === 'table' ? (
          <Collapse
            defaultActiveKey={columnsFormated}
            expandIconPosition={'right'}>
            {renderTable(item)}
          </Collapse>
        ) : item.type === 'input' ? (
          renderInputs(item)
        ) : (
          renderTextArea(item)
        );
      })}
    </StyledCollapse>
  );
}

export default FormTraning;
