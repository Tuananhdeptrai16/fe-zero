import { Col, Empty, Form, Modal, Row, Skeleton, Tabs } from 'antd';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import { useForm } from 'antd/lib/form/Form';
import { ADDITIAL_API } from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { getMessageResponse } from 'src/shared/utils/Service';
import useCallApi from 'src/@crema/hook/useCallApi';
import notification from 'src/shared/utils/notification';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import { CATEGORY_ADDITIAL_DATA } from 'src/shared/constants/DataFixed';
import FormAchive from '../form_achieve';
import FormInforCommonLeader from './form_leader/infor_common';
import FormTraning from './form_leader/traning';
import React, { useEffect, useState } from 'react';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { isEmpty } from 'src/shared/utils/Typeof';
import FormInformationAcademy from 'src/pages/ManageAddData/FormCreate/FormInformationAcademy';

function LayoutCompare({ children, isLoading, isEmtpy = false }) {
  const { messages } = useIntl();
  return (
    <Row gutter={50}>
      {isLoading && (
        <>
          <Col span={12}>
            <Skeleton
              paragraph={{
                rows: 15,
              }}
              active
            />
          </Col>
          <Col span={12} style={{ borderLeft: '1px solid #00000040' }}>
            <Skeleton
              paragraph={{
                rows: 15,
              }}
              active
            />
          </Col>
        </>
      )}
      {!isLoading && (
        <>
          <Col span={12}>
            <Form.List name='old'>
              {() =>
                !isEmtpy ? (
                  children
                ) : (
                  <Empty description={messages['common.recordDontExist']} />
                )
              }
            </Form.List>
          </Col>
          <Col span={12} style={{ borderLeft: '1px solid #00000040' }}>
            <Form.List name='new'>{() => children}</Form.List>
          </Col>
        </>
      )}
    </Row>
  );
}
const FormCompare = ({ onClose, rowData, id, category, columns }) => {
  const { messages } = useIntl();
  const [form] = useForm();
  const [emtpyData, setEmtpyData] = useState(false);
  const [compareValue, setCompareValue] = useState({});
  const [initialValues, setInitialValues] = useState();
  const { reloadPage } = useDataTableContext();
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
  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const formatInitialValuesCompare = (data) => {
    for (const key in data) {
      if (tabNameToJson.includes(key) && isJson(data[key])) {
        data[key] = JSON.parse(data[key]);
      }
    }
    for (const key in data) {
      if (Array.isArray(data[key])) {
        const arrayFormated = [];
        for (const item of data[key]) {
          arrayFormated.push({ value: item });
        }
        data[key] = arrayFormated;
      }
    }
    if (category === CATEGORY_ADDITIAL_DATA.INFOR) {
      data['Ngày hiệu lực'] = [
        data['Ngày hiệu lực từ'],
        data['Ngày hiệu lực đến'],
      ];
      delete data['Ngày hiệu lực từ'];
      delete data['Ngày hiệu lực đến'];
    }

    return data;
  };
  function comparePickRangeDate({ oldRangeDate, newRangeDate }) {
    const EMPTY_DATE = '["",""]';
    oldRangeDate = JSON.stringify(oldRangeDate);
    newRangeDate = JSON.stringify(newRangeDate);
    const status =
      oldRangeDate === EMPTY_DATE && newRangeDate !== EMPTY_DATE
        ? 'add'
        : oldRangeDate !== EMPTY_DATE && newRangeDate === EMPTY_DATE
        ? 'delete'
        : 'update';
    return status;
  }
  function compareStringObjects(data) {
    const { new: newObj, old: oldObj } = data;
    function compareObjects(newObject, oldObject, acc, nameTab) {
      Object.keys(newObject).forEach((key) => {
        const newValue = newObject[key];
        const oldValue =
          oldObject[key] ||
          (typeof newValue === 'object' && newValue !== null ? {} : '');
        const tabName = tabNameToJson.find((item) => item === key);
        if (tabName) {
          Object.keys(newValue).forEach((keyArray) => {
            if (Array.isArray(newValue[keyArray])) {
              const newArray = newValue[keyArray];
              const oldArray = oldValue[keyArray];
              const maxLength = Math.max(newArray.length, oldArray.length);
              for (let i = 0; i < maxLength; i++) {
                const newValue =
                  newArray[i]?.value ||
                  Object.keys(oldArray[i]?.value).reduce((acc, key) => {
                    acc[key] = '';
                    return acc;
                  }, {});
                const oldValue =
                  oldArray[i]?.value ||
                  Object.keys(newArray[i]?.value).reduce((acc, key) => {
                    acc[key] = '';
                    return acc;
                  }, {});
                for (const keyField of Object.keys(newValue)) {
                  let valueNewCompare = newValue?.[keyField];
                  let valueOldCompare = oldValue[keyField];
                  if (Array.isArray(newValue[keyField])) {
                    valueNewCompare = JSON.stringify(newValue[keyField]);
                    valueOldCompare = JSON.stringify(oldValue[keyField]);
                  }
                  if (valueNewCompare !== valueOldCompare) {
                    let status = null;
                    if (
                      (!isEmpty(valueNewCompare) && isEmpty(valueOldCompare)) ||
                      (valueNewCompare !== '[]' &&
                        (valueOldCompare === '[]' ||
                          (isJson(valueOldCompare) &&
                            !JSON.parse(valueOldCompare))))
                    ) {
                      status = 'add';
                    } else if (
                      (isEmpty(valueNewCompare) && !isEmpty(valueOldCompare)) ||
                      (valueNewCompare === '[]' && valueOldCompare !== '[]')
                    ) {
                      status = 'delete';
                    } else if (
                      (!isEmpty(valueNewCompare) &&
                        !isEmpty(valueOldCompare) &&
                        valueNewCompare !== valueOldCompare) ||
                      (valueNewCompare !== '[]' &&
                        valueOldCompare !== '[]' &&
                        valueNewCompare !== valueOldCompare)
                    ) {
                      status = 'update';
                    }
                    if (status) {
                      acc[nameTab || key] = acc[nameTab || key] || {};
                      acc[nameTab || key][keyArray] =
                        acc[nameTab || key][keyArray] || [];

                      acc[nameTab || key][keyArray].push({
                        index: i,
                        field: keyField,
                        table: keyArray,
                        newValue: valueNewCompare,
                        oldValue: valueOldCompare,
                        status: status,
                      });
                    }
                  }
                }
              }
            } else {
              compareObjects(
                { [keyArray]: newValue[keyArray] },
                { [keyArray]: oldValue[keyArray] },
                acc,
                key,
              );
            }
          });
        } else if (
          typeof newValue === 'object' &&
          newValue !== null &&
          !Array.isArray(newValue)
        ) {
          compareObjects(newValue, oldValue, acc, key);
        } else if (
          Array.isArray(newValue) &&
          JSON.stringify(newValue) !== JSON.stringify(oldValue)
        ) {
          let status;
          if (key === 'Ngày hiệu lực') {
            status = comparePickRangeDate({
              oldRangeDate: oldValue,
              newRangeDate: newValue,
            });
          } else {
            status =
              (oldValue === '' && newValue !== '') ||
              (!oldValue?.length && newValue.length > 0)
                ? 'add'
                : oldValue !== '' && newValue === ''
                ? 'delete'
                : 'update';
          }

          acc[key] = { status, newValue, oldValue, key: nameTab || key };
        } else if (newValue !== oldValue && !Array.isArray(newValue)) {
          const status =
            oldValue === '' && newValue !== ''
              ? 'add'
              : oldValue !== '' && newValue === ''
              ? 'delete'
              : 'update';
          acc[key] = { status, newValue, oldValue, key: nameTab || key };
        }
      });
    }
    const differences = {};
    if (!isEmpty(oldObj)) {
      compareObjects(newObj, oldObj, differences);
    }
    console.log(differences);
    return differences;
  }
  const { data, isLoading, error } = useFetch(
    {
      url: '/api/v1/admin/additional-data/get-old-data',
      method: METHOD_FETCH.POST,
      params: { id },
    },
    [],
  );
  const { send: sendReject, loading: loadingReject } = useCallApi({
    success: () => {
      notification.success(messages['confirm.rejectSuccess']);
      reloadPage();
      onClose();
    },
    callApi: ({ status }) => {
      return instanceCoreApi.post(
        ADDITIAL_API.UPDATE_STATUS_ADDITIAL_DATA(id),
        null,
        {
          params: { status },
        },
      );
    },

    error: (err) => {
      const messageError = getMessageResponse(err);
      notification.error(messages[messageError] || messageError);
    },
  });
  const { send: sendAppove, loading: loadingAppove } = useCallApi({
    success: () => {
      notification.success(messages['confirm.approveSuccess']);
      reloadPage();
      onClose();
    },
    callApi: ({ status }) => {
      return instanceCoreApi.post(
        ADDITIAL_API.UPDATE_STATUS_ADDITIAL_DATA(id),
        null,
        {
          params: { status },
        },
      );
    },

    error: (err) => {
      const messageError = getMessageResponse(err);
      notification.error(messages[messageError] || messageError);
    },
  });
  useEffect(() => {
    if (data || error) {
      form.resetFields();
      const dataOldFormated = formatInitialValuesCompare(
        error ? {} : data.result,
      );
      const dataNewFormated = formatInitialValuesCompare(rowData);
      setEmtpyData(isEmpty(dataOldFormated));
      form.setFieldsValue({
        new: dataNewFormated,
        old: dataOldFormated,
      });
      console.log({
        new: dataNewFormated,
        old: dataOldFormated,
      });

      setInitialValues(() => ({
        new: dataNewFormated,
        old: dataOldFormated,
      }));
    }
  }, [data, error]);
  useEffect(() => {
    initialValues && setCompareValue(compareStringObjects(initialValues));
  }, [initialValues]);

  const formCompareCategoryInfor = () => {
    return (
      <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
        <FormInformationAcademy
          compare={compareValue}
          isEmtpy={emtpyData}
          form={form}
        />
      </LayoutCompare>
    );
  };
  const formCompareCategoryAchieve = () => {
    return (
      <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
        <FormAchive
          compare={compareValue}
          columns={columns}
          isEmtpy={emtpyData}
        />
      </LayoutCompare>
    );
  };
  const formTabs = () => {
    const checkChanges = (keys) => {
      const compareKeys = Object.keys(compareValue);
      const array = compareKeys.map(
        (item) => compareValue[item]['key'] || item,
      );
      const result = keys.some((item) => array.includes(item));
      return result;
    };
    const items = [
      {
        key: messages['common.informationCommonLeader'],
        label: (
          <span>
            {messages['common.informationCommonLeader']}
            {checkChanges([
              messages['common.informationCommonLeader'],
              messages['table.detail_info'],
              messages['common.otherInformation'],
              messages['common.traningLeader'],
            ]) && <span style={{ color: 'red' }}>{` *`}</span>}
          </span>
        ),
        children: (
          <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
            <FormInforCommonLeader compare={compareValue} form={form} />
          </LayoutCompare>
        ),
      },
      {
        key: messages['common.traningLeaderFostering'],
        label: (
          <span>
            {messages['common.traningLeaderFosteringTitle']}
            {checkChanges([messages['common.traningLeaderFostering']]) && (
              <span style={{ color: 'red' }}>{` *`}</span>
            )}
          </span>
        ),
        children: (
          <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
            <FormTraning
              name={messages['common.traningLeaderFostering']}
              compare={compareValue}
              form={form}
            />
          </LayoutCompare>
        ),
      },
      {
        key: messages['common.workingCycleLeader'],
        label: (
          <span>
            {messages['common.workingCycleLeaderTitle']}
            {checkChanges([messages['common.workingCycleLeader']]) && (
              <span style={{ color: 'red' }}>{` *`}</span>
            )}
          </span>
        ),
        children: (
          <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
            <FormTraning
              name={messages['common.workingCycleLeader']}
              compare={compareValue}
            />
          </LayoutCompare>
        ),
      },
      {
        key: messages['common.historyLeader'],
        label: (
          <span>
            {messages['common.historyLeader']}
            {checkChanges([messages['common.historyLeader']]) && (
              <span style={{ color: 'red' }}>{` *`}</span>
            )}
          </span>
        ),
        children: (
          <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
            <FormTraning
              name={messages['common.historyLeader']}
              compare={compareValue}
            />
          </LayoutCompare>
        ),
      },
      {
        key: messages['common.foreignerRelationshipLeader'],
        label: (
          <span>
            {messages['common.foreignerRelationshipLeader']}
            {checkChanges([messages['common.foreignerRelationshipLeader']]) && (
              <span style={{ color: 'red' }}>{` *`}</span>
            )}
          </span>
        ),
        children: (
          <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
            <FormTraning
              name={messages['common.foreignerRelationshipLeader']}
              compare={compareValue}
            />
          </LayoutCompare>
        ),
      },
      {
        key: messages['common.familyRelationshipLeader'],
        label: (
          <span>
            {messages['common.familyRelationshipLeader']}
            {checkChanges([messages['common.familyRelationshipLeader']]) && (
              <span style={{ color: 'red' }}>{` *`}</span>
            )}
          </span>
        ),
        children: (
          <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
            <FormTraning
              name={messages['common.familyRelationshipLeader']}
              compare={compareValue}
            />
          </LayoutCompare>
        ),
      },
      {
        key: messages['common.economicStatusLeader'],
        label: (
          <span>
            {messages['common.economicStatusLeader']}
            {checkChanges([messages['common.economicStatusLeader']]) && (
              <span style={{ color: 'red' }}>{` *`}</span>
            )}
          </span>
        ),
        children: (
          <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
            <FormTraning
              name={messages['common.economicStatusLeader']}
              compare={compareValue}
            />
          </LayoutCompare>
        ),
      },
      {
        key: messages['common.rewardDisciplineLeader'],
        label: (
          <span>
            {messages['common.rewardDisciplineLeader']}
            {checkChanges([messages['common.rewardDisciplineLeader']]) && (
              <span style={{ color: 'red' }}>{` *`}</span>
            )}
          </span>
        ),
        children: (
          <LayoutCompare isLoading={isLoading} isEmtpy={emtpyData}>
            <FormTraning
              name={messages['common.rewardDisciplineLeader']}
              compare={compareValue}
            />
          </LayoutCompare>
        ),
      },
    ];
    return (
      <>
        <Tabs items={items}></Tabs>
      </>
    );
  };
  return (
    <>
      <Modal
        visible={true}
        width={1900}
        footer={
          !emtpyData ? (
            <>
              <AntButton onClick={() => onClose()}>
                {messages['dialog.button.cancel']}
              </AntButton>
              <AntButton
                type={'danger'}
                loading={loadingReject}
                onClick={() => {
                  sendReject({ status: 'reject', id: rowData.id });
                }}>
                {messages['dialog.button.reject']}
              </AntButton>
              <AntButton
                type={'primary'}
                loading={loadingAppove}
                onClick={() =>
                  sendAppove({ status: 'approve', id: rowData.id })
                }>
                {messages['table.action.approve']}
              </AntButton>
            </>
          ) : (
            <>
              <AntButton
                type={'danger'}
                loading={loadingReject}
                onClick={() => {
                  sendReject({ status: 'reject', id: rowData.id });
                }}>
                {messages['dialog.button.reject']}
              </AntButton>
              <AntButton onClick={() => onClose()}>
                {messages['dialog.button.cancel']}
              </AntButton>
            </>
          )
        }
        onCancel={() => onClose()}
        title={messages['sidebar.ambassador.update_profile']}>
        <Row style={{ color: 'red', fontSize: 16 }}>
          <Col span={12} style={{ paddingLeft: 20 }}>
            Trước
          </Col>
          <Col span={12} style={{ paddingLeft: 20 }}>
            Sau
          </Col>
        </Row>
        <Form
          disabled
          form={form}
          initialValues={initialValues ? initialValues : {}}
          layout='vertical'
          style={{
            border: '1px solid #00000040 ',
            padding: 15,
            borderRadius: 10,
          }}>
          {category === CATEGORY_ADDITIAL_DATA.INFOR &&
            formCompareCategoryInfor()}
          {category === CATEGORY_ADDITIAL_DATA.ACHIEVES &&
            formCompareCategoryAchieve()}
          {category === CATEGORY_ADDITIAL_DATA.LEADERS && formTabs()}
          {category === CATEGORY_ADDITIAL_DATA.TEACHERS && formTabs()}
        </Form>
      </Modal>
    </>
  );
};
export default FormCompare;
