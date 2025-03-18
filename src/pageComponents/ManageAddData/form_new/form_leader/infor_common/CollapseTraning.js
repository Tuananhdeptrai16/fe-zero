import { Col, Collapse, Row } from 'antd';
import { useIntl } from 'react-intl';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  ACADEMIC_RANK_OPTIONS,
  COEFFICIENTS_SALARY_OPTIONS,
  DEGREE_OPTIONS,
  DM_DANHHIEU,
  DM_LYLUAN_CHINHTRI,
  FOREIGN_LANGUAGE_OPTIONS,
  LEVEL_STUDY,
  STAFF_RANK_OPTIONS,
  WAGE_OPTIONS,
} from 'src/shared/constants/DataFixed';
import setColor from 'src/shared/constants/setColorCompare';

function CollapseTraining({ compare }) {
  const { messages } = useIntl();
  const { Panel } = Collapse;

  // Helper function to generate FormInput components with proper style
  const renderFormInput = ({
    labelKey,
    nameKey,
    colSpan = 8,
    isDatePicker = false,
    required = false,
    rules,
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
            messages['common.traningLeader'],
            messages[nameKey],
          ]}
          required={required}
          rules={rules}
          style={setColor && setColor(messages[nameKey], compare)}
        />
      </Col>
    );
  };

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
          messages['common.traningLeader'],
          messages[compareKey],
        ]}
        options={options}
        required={isRequired}
        fieldNames={fieldNames}
        style={setColor(messages[compareKey], compare)}
      />
    </Col>
  );

  return (
    <Collapse
      defaultActiveKey={messages['common.traningLeader']}
      expandIconPosition={'right'}
      style={{ fontWeight: 'bold', backgroundColor: '#FFF1F0' }}>
      <Panel
        header={messages['common.traningLeader']}
        key={messages['common.traningLeader']}>
        <div style={{ fontWeight: 'normal' }}>
          <Row gutter={50}>
            {[
              {
                labelKey: 'common.levelStudy',
                compareKey: 'common.levelStudy',
                options: LEVEL_STUDY,
                colSpan: 8,
              },
              {
                labelKey: 'common.highestAcademicDegree',
                compareKey: 'common.highestAcademicDegree',
                options: ACADEMIC_RANK_OPTIONS,
                colSpan: 8,
                fieldNames: { value: 'code', label: 'name' },
                isRequired: true,
              },
              {
                labelKey: 'common.yearConferred',
                compareKey: 'common.yearConferred',
                colSpan: 8,
                isDatePicker: true,
              },
              {
                labelKey: 'common.highestAcademicTitle',
                compareKey: 'common.highestAcademicTitle',
                options: DEGREE_OPTIONS,
                colSpan: 8,
                isRequired: true,
              },
              {
                labelKey: 'common.yearAwarded',
                compareKey: 'common.yearAwarded',
                colSpan: 8,
                isDatePicker: true,
              },
              {
                labelKey: 'common.specialization',
                compareKey: 'common.specialization',
                colSpan: 8,
                rules: { maxLength: [{ value: 128 }] },
              },
              {
                labelKey: 'common.politicalTheory',
                compareKey: 'common.politicalTheory',
                options: DM_LYLUAN_CHINHTRI,
                colSpan: 12,
              },
              {
                labelKey: 'common.foreignLanguage',
                compareKey: 'common.foreignLanguage',
                options: FOREIGN_LANGUAGE_OPTIONS,
                colSpan: 12,
                fieldNames: { value: 'ten', label: 'ten' },
              },
              {
                labelKey: 'common.currentMainWork',
                compareKey: 'common.currentMainWork',
                colSpan: 24,
                rules: { maxLength: [{ value: 128 }] },
              },
              {
                labelKey: 'common.civilServantRankOrJobTitle',
                compareKey: 'common.civilServantRankOrJobTitle',
                options: STAFF_RANK_OPTIONS,
                colSpan: 6,
                fieldNames: { value: 'tenNgachCb', label: 'tenNgachCb' },
                isRequired: true,
              },
              {
                labelKey: 'common.salaryGrade',
                compareKey: 'common.salaryGrade',
                options: WAGE_OPTIONS,
                colSpan: 6,
                fieldNames: { value: 'ten', label: 'ten' },
              },
              {
                labelKey: 'common.salaryCoefficient',
                compareKey: 'common.salaryCoefficient',
                options: COEFFICIENTS_SALARY_OPTIONS,
                colSpan: 6,
                fieldNames: { value: 'ten', label: 'ten' },
                isRequired: true,
              },
              {
                labelKey: 'common.dateOfBenefit',
                compareKey: 'common.dateOfBenefit',
                colSpan: 6,
                isDatePicker: true,
              },
              {
                labelKey: 'common.conferredTitle',
                compareKey: 'common.conferredTitle',
                options: DM_DANHHIEU,
                colSpan: 16,
              },
              {
                labelKey: 'common.yearBeConferred',
                compareKey: 'common.yearBeConferred',
                colSpan: 8,
                isDatePicker: true,
              },
              {
                labelKey: 'common.workForte',
                compareKey: 'common.workForte',
                colSpan: 24,
                rules: { maxLength: [{ value: 128 }] },
              },
              {
                labelKey: 'common.longestHeldJob',
                compareKey: 'common.longestHeldJob',
                colSpan: 24,
                rules: { maxLength: [{ value: 128 }] },
              },
            ].map((field) =>
              field.options ? renderFormSelect(field) : renderFormInput(field),
            )}
          </Row>
        </div>
      </Panel>
    </Collapse>
  );
}

export default CollapseTraining;
