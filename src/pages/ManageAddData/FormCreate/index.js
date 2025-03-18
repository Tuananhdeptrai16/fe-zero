import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import FormContent from 'src/@crema/component/FormContent';
import { Col, Row, Form } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import notification from 'src/shared/utils/notification';
import { getMessageResponse } from 'src/shared/utils/Service';
import FormInformationAcademy from './FormInformationAcademy';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CATEGORY_ADDITIAL_DATA } from 'src/shared/constants/DataFixed';
import { ADDITIAL_API } from 'src/@crema/services/apis';
import FormLeader from 'src/pageComponents/ManageAddData/form_new/form_leader';
import routes from 'src/config/routes.config';
import moment from 'moment';
import { isObject } from 'src/shared/utils/Typeof';

function WrapperFormAddingData({ title, category }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { messages, formatMessage } = useIntl();
  const [keyTab, setKeyTab] = useState(
    messages['common.informationCommonLeader'],
  );

  const [form] = Form.useForm();
  const onSaveToServer = (data) => {
    return instanceCoreApi.post(ADDITIAL_API.REQUEST_ADDITIAL_DATA, data);
  };
  const onSave = (data) => {
    const dataFormated = formatData(formatObjectValues(data));

    const dataForm = {
      action: id ? 'UPDATE' : 'ADD',
      category,
      information_data: { ...dataFormated },
    };
    send(dataForm);
  };
  const getErrorResponse = (err) => {
    const messageError = getMessageResponse(err);
    notification.error(messages[messageError] || messageError);
  };
  const { send } = useCallApi({
    success: () => {
      const message = !id
        ? 'form.createRequestCreateSuccess'
        : 'form.createRequestUpdateSuccess';
      notification.success(messages[message]);
      navigate(urlCategory[category]);
    },
    callApi: onSaveToServer,
    error: getErrorResponse,
  });
  const tabNameToJson = [
    'Thông tin chung',
    messages['common.traningLeader'],
    messages['common.traningLeaderFostering'],
    messages['common.workingCycleLeader'],
    messages['common.historyLeader'],
    messages['common.familyRelationshipLeader'],
    messages['common.economicStatusLeader'],
    messages['common.rewardDisciplineLeader'],
    messages['common.foreignerRelationshipLeader'],
  ];
  const nameInforCommon = [messages['common.informationCommonLeader']];
  const nameOfList = [
    'Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính trị, ngoại ngữ',
    'Tóm tắt quá trình công tác',
    'Bản thân có làm việc trong chế độ cũ',
    'Tham gia hoặc có quan hệ với các tổ chức kinh tế, chính trị, xã hội',
    'Có nhân thân ở nước ngoài',
    'Về bản thân: Bố, Mẹ, Vợ (hoặc Chồng), các con, anh chị em ruột',
    'Bố, Mẹ, anh chị em ruột (Bên vợ hoặc chồng)',
    'Quá trình lương của bản thân',
    'Nhà đất',
    'Khen thưởng',
    'Kỷ luật',
  ];
  const columnDisplay = [
    'Mã cán bộ',
    'Đơn vị trực thuộc',
    'Chức vụ',
    'Bộ tỉnh',
    'Họ đệm',
    'Tên',
  ];
  const fieldsPickDate = [
    'Ngày xác nhận',
    'Ngày ban hành văn bản',
    'Ngày quyết định',
  ];
  const fieldsPickRangeDate = ['Ngày hiệu lực'];
  const formatPickDate = (date) => {
    return moment.isMoment(date) ? date.format('DD/MM/YYYY') : date ? date : '';
  };
  const formatPickRangeDate = (data, dataFormated, key) => {
    dataFormated[key + ' từ'] = moment.isMoment(data[key]?.[0])
      ? data[key]?.[0].format('DD/MM/YYYY')
      : data[key]?.[0]
      ? data[key]?.[0]
      : '';
    dataFormated[key + ' đến'] = moment.isMoment(data[key]?.[1])
      ? data[key]?.[1].format('DD/MM/YYYY')
      : data[key]?.[1]
      ? data[key]?.[1]
      : '';
  };
  const formatData = (data) => {
    let dataFormated = {};
    if (id) {
      dataFormated.id = id;
    }
    if (
      category === CATEGORY_ADDITIAL_DATA.ACHIEVES ||
      category === CATEGORY_ADDITIAL_DATA.INFOR
    ) {
      for (const key in data) {
        if (fieldsPickDate.some((field) => field === key)) {
          dataFormated[key] = formatPickDate(data[key]);
        } else if (fieldsPickRangeDate.some((field) => field === key)) {
          formatPickRangeDate(data, dataFormated, key);
        } else {
          if (!data[key]) {
            dataFormated[key] = '';
          } else {
            dataFormated[key] = data[key];
          }
        }
      }
    } else {
      for (const field in data) {
        const valueOfField = data[field] || '';
        if (isObject(valueOfField)) {
          Object.keys(valueOfField).forEach((key) => {
            if (!valueOfField[key]) {
              valueOfField[key] = '';
            }
          });
        }
        if (!tabNameToJson.some((item) => item === field)) {
          dataFormated[field] = valueOfField;
        } else if (nameInforCommon.some((item) => item === field)) {
          columnDisplay.forEach(
            (item) => (dataFormated[item] = valueOfField[item] || ''),
          );
          valueOfField[messages['common.otherInformation']][
            messages['common.personProfile']
          ] = formatFileUpload(
            valueOfField[messages['common.otherInformation']][
              messages['common.personProfile']
            ],
          );
          dataFormated[field] = JSON.stringify(valueOfField);
        } else {
          dataFormated[field] = {};
          for (const fieldTabs in valueOfField) {
            const valueFieldTabs = valueOfField[fieldTabs];
            if (nameOfList.some((item) => item === fieldTabs)) {
              dataFormated[field][fieldTabs] = valueFieldTabs
                ? formatItemArray(valueFieldTabs)
                : [];
            } else {
              dataFormated[field][fieldTabs] = valueFieldTabs || '';
            }
          }
          dataFormated[field] = JSON.stringify(dataFormated[field]);
          // dataFormated[field] = dataFormated[field];
        }
      }
    }
    return dataFormated;
  };
  function formatObjectValues(obj) {
    Object.keys(obj).forEach((key) => {
      if (
        obj[key] &&
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key])
      ) {
        formatObjectValues(obj[key]);
      } else if (obj[key] === undefined) {
        obj[key] = '';
      }
    });
    return obj;
  }
  const onFinishFailed = (errorInfo) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (category !== CATEGORY_ADDITIAL_DATA.INFOR) {
      if (errorInfo.errorFields[0].name.length === 1) {
        const tabError = formatMessage({
          id: 'common.informationCommonLeader',
        });
        setKeyTab(tabError);
      } else {
        const nameFieldFailed = errorInfo.errorFields[0].name[0];
        errorInfo.errorFields[0].name[0];
        setKeyTab(nameFieldFailed);
      }
    }
  };

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const formatInitialValues = (data) => {
    let dataFormated = {};
    for (const key in data) {
      if (tabNameToJson.includes(key) && isJson(data[key])) {
        dataFormated[key] = JSON.parse(data[key]);
      } else {
        dataFormated[key] = data[key];
      }
    }
    for (const key in data) {
      if (Array.isArray(data[key])) {
        dataFormated[key] = data[key].map((item) => ({ value: { ...item } }));
      }
    }

    dataFormated['Ngày hiệu lực'] = [
      data['Ngày hiệu lực từ'],
      data['Ngày hiệu lực đến'],
    ];
    delete dataFormated['Ngày hiệu lực từ'];
    delete dataFormated['Ngày hiệu lực đến'];

    return dataFormated;
  };
  const urlCategory = {
    [CATEGORY_ADDITIAL_DATA.INFOR]: routes.manageDataCommonUnit,
    [CATEGORY_ADDITIAL_DATA.LEADERS]: routes.manageLeaders,
    [CATEGORY_ADDITIAL_DATA.TEACHERS]: routes.manageTeachers,
  };
  const formatItemArray = (list) => {
    for (const item of list) {
      const fields = item.value;
      for (const field in fields) {
        if (field === 'Dẫn chứng') {
          if (Array.isArray(fields[field]) && fields[field].length > 0) {
            delete fields[field].file;
            const array = fields[field].map((item) => ({
              uid: item.uid,
              response: item.response,
              status: item.status,
              name: item.name,
            }));
            fields[field] = array;
          }
        } else {
          fields[field] = fields[field] || '';
        }
      }
    }
    return list.map((item) => ({ value: item.value }));
  };
  const formatFileUpload = (arrayFiles) => {
    if (arrayFiles?.file) {
      delete arrayFiles.file;
      return arrayFiles?.fileList
        ? arrayFiles.fileList.map((item) => ({
            uid: item.uid,
            response: item.response,
            status: item.status,
            name: item.name,
          }))
        : arrayFiles;
    } else {
      return arrayFiles.length > 0
        ? arrayFiles.map((item) => ({
            uid: item.uid,
            response: item.response,
            status: item.status,
            name: item.name,
          }))
        : [];
    }
  };
  return (
    <>
      <div className='d-flex justify-start items-center gap-3 my-2 '>
        <Tooltip title='Quay lại'>
          <ArrowLeftOutlined
            className='show_back'
            onClick={() => navigate(urlCategory[category])}
          />
        </Tooltip>
        <h1
          className='page_breadcrumb__page-title my-0'
          style={{ lineHeight: '28px', fontSize: 20 }}>
          {messages[title]}
        </h1>
      </div>
      <FormContent
        form={form}
        onFinish={onSave}
        onFinishFailed={onFinishFailed}
        className='bg-white'
        initialValues={state ? formatInitialValues(state) : {}}
        layout='vertical'
        style={{ padding: '12px 20px', borderRadius: 8 }}>
        {category === CATEGORY_ADDITIAL_DATA.INFOR && (
          <FormInformationAcademy form={form} />
        )}
        {category === CATEGORY_ADDITIAL_DATA.LEADERS && (
          <FormLeader keyTab={keyTab} setKeyTab={setKeyTab} form={form} />
        )}
        {category === CATEGORY_ADDITIAL_DATA.TEACHERS && (
          <FormLeader keyTab={keyTab} setKeyTab={setKeyTab} form={form} />
        )}
        <Row
          justify='end'
          className='bg-white'
          gutter={10}
          style={{
            marginTop: 50,
            padding: '12px 20px',
          }}>
          <Col>
            <AntButton onClick={() => navigate(urlCategory[category])}>
              Hủy
            </AntButton>
          </Col>
          <Col>
            <AntButton type='primary' htmlType='submit'>
              {!id
                ? messages['table.action.add']
                : messages['table.action.edit']}
            </AntButton>
          </Col>
        </Row>
      </FormContent>
    </>
  );
}

export default WrapperFormAddingData;
