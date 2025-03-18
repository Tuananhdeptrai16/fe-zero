import { Col, Row } from 'antd';
import { useIntl } from 'react-intl';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormDateRangePicker from 'src/@crema/core/Form/FormDateRangePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormGroupSelectLocation from 'src/pageComponents/ManageAddData/form_new/form_select_location';
import setColor from 'src/shared/constants/setColorCompare';

function FormInformationAcademy({ compare, isEmtpy, form }) {
  const { messages } = useIntl();
  return (
    <>
      <Row gutter={24}>
        <Col span={24}>
          <FormInput
            label={messages['common.unitType']}
            name={messages['common.unitType']}
            style={setColor(messages['common.unitType'], compare, isEmtpy)}
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label={messages['common.unitCode']}
            name={messages['common.unitCode']}
            rules={{ maxLength: [{ value: 32 }] }}
            style={setColor(messages['common.unitCode'], compare, isEmtpy)}
            required
          />
        </Col>
        <Col span={12}>
          <FormInput
            label={messages['common.upperUnit']}
            name={messages['common.upperUnit']}
            rules={{ maxLength: [{ value: 32 }] }}
            style={setColor(messages['common.upperUnit'], compare, isEmtpy)}
            required
          />
        </Col>
        <Col span={24}>
          <FormInput
            label={messages['common.unitName']}
            name={messages['common.unitName']}
            rules={{ maxLength: [{ value: 128 }] }}
            style={setColor(messages['common.unitName'], compare, isEmtpy)}
            required
          />
        </Col>
        <Col span={24}>
          <FormInput
            label={messages['common.addressUnit']}
            name={messages['common.addressUnit']}
            rules={{ maxLength: [{ value: 128 }] }}
            style={setColor(messages['common.addressUnit'], compare, isEmtpy)}
            required
          />
        </Col>
        <FormGroupSelectLocation
          compare={compare}
          form={form}
          nameProvince={[messages['common.province']]}
          nameDistrict={[messages['common.district']]}
          nameWard={[messages['common.ward']]}
        />
        <Col span={12}>
          <FormInput
            label={messages['common.phone']}
            name={messages['common.phone']}
            rules={{ phone: [] }}
            style={setColor(messages['common.phone'], compare, isEmtpy)}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label={messages['common.email']}
            name={messages['common.email']}
            rules={{ email: [] }}
            style={setColor(messages['common.email'], compare, isEmtpy)}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label={messages['common.taxCodeUnit']}
            name={messages['common.taxCodeUnit']}
            rules={{ betweenLength: [{ value: 8 }, { value: 13 }] }}
            style={setColor(messages['common.taxCodeUnit'], compare, isEmtpy)}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label={messages['common.budgetUnitCode']}
            name={messages['common.budgetUnitCode']}
            rules={{ maxLength: [{ value: 32 }] }}
            style={setColor(
              messages['common.budgetUnitCode'],
              compare,
              isEmtpy,
            )}
          />
        </Col>
        <Col span={12}>
          <FormInput
            style={setColor(messages['common.issueVB'], compare, isEmtpy)}
            label={messages['common.issueVBTitle']}
            name={messages['common.issueVB']}
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
        <Col span={12}>
          <FormDatePicker
            label={messages['common.issueDate']}
            name={messages['common.issueDate']}
            style={setColor(messages['common.issueDate'], compare, isEmtpy)}
          />
        </Col>
        <Col span={24}>
          <FormInput
            layout='vertical'
            style={setColor(messages['common.issuingAgency'], compare, isEmtpy)}
            label={messages['common.issuingAgency']}
            name={messages['common.issuingAgency']}
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
        <Col span={12}>
          <FormDateRangePicker
            label={messages['common.effectiveFrom']}
            name={messages['common.effectiveFrom']}
            style={setColor(messages['common.effectiveFrom'], compare, isEmtpy)}
          />
        </Col>
        <Col span={12}>
          <FormInput
            layout='vertical'
            style={setColor(messages['common.statusUnit'], compare, isEmtpy)}
            label={messages['common.statusUnit']}
            name={messages['common.statusUnit']}
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
        <Col span={12}>
          <FormInput
            layout='vertical'
            style={setColor(
              messages['common.rejectionReason'],
              compare,
              isEmtpy,
            )}
            label={messages['common.rejectionReason']}
            name={messages['common.rejectionReason']}
            rules={{ maxLength: [{ value: 255 }] }}
          />
        </Col>
        <Col span={12}>
          <FormDatePicker
            layout='vertical'
            style={setColor(
              messages['common.confirmationDate'],
              compare,
              isEmtpy,
            )}
            label={messages['common.confirmationDate']}
            name={messages['common.confirmationDate']}
          />
        </Col>
        <Col span={12}>
          <FormInput
            layout='vertical'
            style={setColor(messages['common.confirmedBy'], compare, isEmtpy)}
            label={messages['common.confirmedBy']}
            name={messages['common.confirmedBy']}
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
      </Row>
    </>
  );
}

export default FormInformationAcademy;
