import { Col, Radio, Row, Form, Divider } from 'antd';
import { useIntl } from 'react-intl';
import FormInput from 'src/@crema/core/Form/FormInput';
import setColor from 'src/shared/constants/setColorCompare';
import CollapseDetail from './CollapseDetail';
import CollapseTraning from './CollapseTraning';
import CollapseOtherInfor from './CollapseOtherInfor';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  PARTY_ROLE_OPTIONS,
  PROVINCIAL_MINISTRY_OPTIONS,
  ROLE_OPTIONS,
} from 'src/shared/constants/DataFixed';

function FormInforCommonLeader({ compare, form }) {
  const { messages } = useIntl();
  const informationCommonLeader = messages['common.informationCommonLeader'];

  const renderFormInput = (
    labelKey,
    compareKey,
    colSpan = 12,
    isRequired = false,
    rules,
    // isNested = true,
  ) => (
    <Col span={colSpan}>
      <FormInput
        label={messages[labelKey]}
        name={[informationCommonLeader, messages[compareKey]]}
        required={isRequired}
        style={setColor(messages[compareKey], compare)}
        rules={rules}
      />
    </Col>
  );
  const renderFormSelect = (
    labelKey,
    compareKey,
    options,
    colSpan = 12,
    isRequired = false,
  ) => (
    <Col span={colSpan} className={'custom-select'}>
      <FormSelect
        label={messages[labelKey]}
        name={[informationCommonLeader, messages[compareKey]]}
        options={options}
        required={isRequired}
        fieldNames={{ value: 'ten', label: 'ten' }}
        style={setColor(messages[compareKey], compare)}
      />
    </Col>
  );

  return (
    <>
      <Row gutter={50}>
        {renderFormSelect(
          'common.provincialMinistry',
          'common.provincialMinistry',
          PROVINCIAL_MINISTRY_OPTIONS,
          12,
        )}
        {renderFormInput(
          'common.affiliatedUnits',
          'common.affiliatedUnits',
          12,
          false,
          {
            maxLength: [{ value: 128 }],
          },
        )}
        {renderFormInput('common.baseunit', 'common.baseunit', 12, false, {
          maxLength: [{ value: 128 }],
        })}
        {renderFormInput(
          'common.numberOfCivilServantsTitle',
          'common.numberOfCivilServants',
          12,
          false,
          { maxLength: [{ value: 32 }] },
          false,
        )}
        {renderFormInput(
          'common.firstNameAndMiddle',
          'common.firstNameAndMiddle',
          12,
          true,
          { maxLength: [{ value: 128 }] },
          false,
        )}
        {renderFormInput(
          'common.lastName',
          'common.lastName',
          12,
          true,
          {
            maxLength: [{ value: 128 }],
          },
          false,
        )}
        <Col span={12}>
          <Form.Item
            label={messages['common.gender']}
            name={[
              messages['common.informationCommonLeader'],
              messages['common.gender'],
            ]}
            rules={[
              {
                required: true,
                message: `${messages['common.gender']} là bắt buộc`,
              },
            ]}>
            <Radio.Group
              className='ant-radio-disabled-custom'
              style={setColor(messages['common.gender'], compare)}>
              <Radio value='nam'>Nam</Radio>
              <Radio value='nữ'>Nữ</Radio>
              <Radio value='khác'>Không xác định</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        {renderFormInput('common.namesOther', 'common.namesOther', 12, false, {
          maxLength: [{ value: 128 }],
        })}
        {renderFormSelect(
          'common.currentPartyCommittee',
          'common.currentPartyCommittee',
          PARTY_ROLE_OPTIONS,
        )}
        {renderFormSelect(
          'common.partyCommitteeCum',
          'common.partyCommitteeCum',
          PARTY_ROLE_OPTIONS,
        )}
        {renderFormSelect('common.role', 'common.role', ROLE_OPTIONS, 12, true)}
        {renderFormSelect('common.roleCum', 'common.roleCum', ROLE_OPTIONS)}
        {renderFormInput(
          'common.positionAllowances',
          'common.positionAllowances',
          24,
          false,
          { maxLength: [{ value: 128 }] },
        )}
      </Row>

      <CollapseDetail compare={compare} form={form} />
      <Divider />
      <CollapseTraning compare={compare} />
      <Divider />
      <CollapseOtherInfor compare={compare} />
    </>
  );
}

export default FormInforCommonLeader;
