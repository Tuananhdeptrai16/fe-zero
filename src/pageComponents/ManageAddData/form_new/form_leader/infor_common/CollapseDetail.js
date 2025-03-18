import { Col, Collapse, Row } from 'antd';
import { useIntl } from 'react-intl';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  BACKGROUND_OPTIONS,
  ETHNICITY_OPTIONS,
  JOB_OPTIONS,
  MILITARY_RANK,
  RELIGION_OPTIONS,
} from 'src/shared/constants/DataFixed';
import setColor from 'src/shared/constants/setColorCompare';
import FormGroupSelectLocation from '../../form_select_location';
import FormDateRangePicker from 'src/@crema/core/Form/FormDateRangePicker';
import FormSelectProvince from '../../form_select_location/FormProvince';
import { disabledDateGTTodayBefore } from 'src/shared/utils/ui';

function CollapseDetail({ compare, form }) {
  const { messages } = useIntl();
  const { Panel } = Collapse;

  const renderFormInput = ({
    labelKey,
    nameKey,
    colSpan = 8,
    isDatePicker = false,
    required = false,
    rules = {},
    ...props
  }) => (
    <Col span={colSpan}>
      {isDatePicker ? (
        <FormDatePicker
          {...props}
          label={messages[labelKey]}
          name={[
            'common.informationCommonLeader',
            'table.detail_info',
            messages[nameKey],
          ]}
          required={required}
          rules={rules}
          style={setColor(nameKey, compare)}
        />
      ) : (
        <FormInput
          {...props}
          label={messages[labelKey]}
          name={[
            'common.informationCommonLeader',
            'table.detail_info',
            messages[nameKey],
          ]}
          required={required}
          rules={rules}
          style={setColor(nameKey, compare)}
        />
      )}
    </Col>
  );

  const renderFormSelect = ({
    labelKey,
    nameKey,
    options,
    colSpan = 12,
    required = false,
    ...props
  }) => (
    <Col span={colSpan} className={'custom-select'}>
      <FormSelect
        {...props}
        label={messages[labelKey]}
        name={[
          'common.informationCommonLeader',
          'table.detail_info',
          messages[nameKey],
        ]}
        options={options}
        required={required}
        fieldNames={{ value: 'ten', label: 'ten' }}
        style={setColor(nameKey, compare)}
      />
    </Col>
  );

  const renderFormRangeDate = ({
    labelKey,
    nameKey,
    colSpan = 12,
    required = false,
    ...props
  }) => (
    <Col span={colSpan}>
      <FormDateRangePicker
        {...props}
        label={messages[labelKey]}
        name={['common.informationCommonLeader', 'table.detail_info', nameKey]}
        required={required}
        style={setColor(nameKey, compare)}
      />
    </Col>
  );

  return (
    <Collapse
      defaultActiveKey={'table.detail_info'}
      expandIconPosition={'right'}
      style={{ fontWeight: 'bold', backgroundColor: '#FFF1F0' }}>
      <Panel header={messages['table.detail_info']} key={'table.detail_info'}>
        <div style={{ fontWeight: 'normal' }}>
          <Row gutter={50}>
            {renderFormInput({
              labelKey: 'table.citizenDateOfBirth',
              nameKey: 'table.citizenDateOfBirth',
              colSpan: 12,
              isDatePicker: true,
              required: true,
              disabledDate: disabledDateGTTodayBefore,
            })}
            <FormSelectProvince
              name={[
                'common.informationCommonLeader',
                'table.detail_info',
                'table.citizenPlaceOfBirth',
              ]}
              style={setColor('table.citizenPlaceOfBirth', compare)}
              label={'table.citizenPlaceOfBirth'}
              placeholder={'table.filterProvince'}
              colSpan={12}
              isRequired={true}
            />
          </Row>
          <FormGroupSelectLocation
            compare={compare}
            label={messages['common.placeBorn']}
            form={form}
            nameProvince={[
              'common.informationCommonLeader',
              'table.detail_info',
              'table.filterProvincePlaceBorn',
            ]}
            nameDistrict={[
              'common.informationCommonLeader',
              'table.detail_info',
              'table.districtPlaceBorn',
            ]}
            nameWard={[
              'common.informationCommonLeader',
              'table.detail_info',
              'common.wardPlaceBorn',
            ]}
          />
          {renderFormInput({
            labelKey: 'common.addressNow',
            nameKey: 'common.addressNow',
            colSpan: 24,
            required: true,
            rules: { maxLength: [{ value: 255 }] },
          })}
          <FormGroupSelectLocation
            compare={compare}
            form={form}
            nameProvince={[
              'common.informationCommonLeader',
              'table.detail_info',
              'table.filterProvinceAddressDetail',
            ]}
            nameDistrict={[
              'common.informationCommonLeader',
              'table.detail_info',
              'table.districtAddressDetail',
            ]}
            nameWard={[
              'common.informationCommonLeader',
              'table.detail_info',
              'common.wardAddressDetail',
            ]}
          />
          <Row gutter={50}>
            {renderFormInput({
              labelKey: 'common.phone',
              nameKey: 'common.phone',
              colSpan: 8,
              required: true,
              rules: { phone: [] },
            })}
            {renderFormSelect({
              labelKey: 'table.ethnic_teacher',
              nameKey: 'table.ethnic_teacher',
              options: ETHNICITY_OPTIONS,
              colSpan: 8,
              required: true,
            })}
            {renderFormSelect({
              labelKey: 'common.religion',
              nameKey: 'common.religion',
              options: RELIGION_OPTIONS,
              colSpan: 8,
              required: true,
            })}
            {renderFormSelect({
              labelKey: 'common.familyExport',
              nameKey: 'common.familyExport',
              options: BACKGROUND_OPTIONS,
              colSpan: 8,
            })}
            {renderFormSelect({
              labelKey: 'common.jobBefore',
              nameKey: 'common.jobBefore',
              options: JOB_OPTIONS,
              colSpan: 8,
            })}
            {renderFormInput({
              labelKey: 'common.dayFirstOnSite',
              nameKey: 'common.dayFirstOnSite',
              colSpan: 8,
              isDatePicker: true,
              required: true,
            })}
            {renderFormInput({
              labelKey: 'common.companySeeking',
              nameKey: 'common.companySeeking',
              colSpan: 24,
              rules: { maxLength: [{ value: 128 }] },
            })}
          </Row>
          <Row gutter={50}>
            <FormGroupSelectLocation
              compare={compare}
              label={messages['common.addressCompamySeeking']}
              form={form}
              nameProvince={[
                'common.informationCommonLeader',
                'table.detail_info',
                'table.filterProvinceAddressCompamy',
              ]}
              nameDistrict={[
                'common.informationCommonLeader',
                'table.detail_info',
                'common.districtAddressCompamy',
              ]}
              nameWard={[
                'common.informationCommonLeader',
                'table.detail_info',
                'table.wardAddressCompamy',
              ]}
            />
          </Row>
          <Row gutter={50}>
            {renderFormInput({
              labelKey: 'common.dateOfJoiningCurrentOrganization',
              nameKey: 'common.dateOfJoiningCurrentOrganization',
              colSpan: 12,
              isDatePicker: true,
              required: true,
            })}
            {renderFormInput({
              labelKey: 'common.dateOfJoiningRevolution',
              nameKey: 'common.dateOfJoiningRevolution',
              colSpan: 12,
              isDatePicker: true,
              required: true,
            })}
            {renderFormInput({
              labelKey: 'common.dateOfJoiningCPV',
              nameKey: 'common.dateOfJoiningCPV',
              colSpan: 12,
              isDatePicker: true,
              required: true,
            })}
            {renderFormInput({
              labelKey: 'common.officialDate',
              nameKey: 'common.officialDate',
              colSpan: 12,
              isDatePicker: true,
              required: true,
            })}
            {renderFormInput({
              labelKey: 'common.dateOfJoiningSocioPoliticalOrganizations',
              nameKey: 'common.dateOfJoiningSocioPoliticalOrganizations',
              colSpan: 8,
              isDatePicker: true,
              required: true,
            })}
            {renderFormRangeDate({
              labelKey: 'common.enlistmentDate',
              nameKey: 'common.enlistmentDate',
              colSpan: 8,
            })}
            {renderFormInput({
              labelKey: 'common.reenlistmentDate',
              nameKey: 'common.reenlistmentDate',
              colSpan: 8,
              isDatePicker: true,
              required: true,
            })}
            {renderFormSelect({
              labelKey: 'common.highestMilitaryRank',
              nameKey: 'common.highestMilitaryRank',
              options: MILITARY_RANK,
              colSpan: 12,
            })}
            {renderFormInput({
              labelKey: 'common.highestPosition',
              nameKey: 'common.highestPosition',
              colSpan: 12,
              rules: { maxLength: [{ value: 128 }] },
            })}
          </Row>
        </div>
      </Panel>
    </Collapse>
  );
}

export default CollapseDetail;
