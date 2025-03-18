import { Col, Form, Row } from 'antd';
import FormSelectProvince from './FormProvince';
import FormSelectDictrict from './FormDictrict';
import FormSelectWard from './FormWard';

function FormGroupSelectLocation({
  form,
  nameProvince,
  nameDistrict,
  nameWard,
  label,
  compare,
}) {
  const nameProvinceSelect = nameProvince;
  const nameDictrictSelect = nameDistrict;
  const nameWardSelect = nameWard;
  let provinceSelect = Form.useWatch(nameProvinceSelect, form);
  let dictrictSelect = Form.useWatch(nameDictrictSelect, form);

  const onChangeProvince = () => {
    form.setFieldValue(nameDictrictSelect, undefined);
    form.setFieldValue(nameWardSelect, undefined);
  };
  const onChangeDictrict = () => {
    form.setFieldValue(nameWardSelect, undefined);
  };

  return (
    <>
      <Col span={24} style={{ marginBottom: 8 }}>
        <label>{label}</label>
      </Col>
      <Col span={24}>
        <Row gutter={50}>
          <FormSelectProvince
            name={nameProvince}
            placeholder={'table.filterProvince'}
            colSpan={8}
            compare={compare}
            onChange={onChangeProvince}
          />
          <FormSelectDictrict
            name={nameDistrict}
            parent_name={provinceSelect}
            placeholder={'table.district'}
            colSpan={8}
            compare={compare}
            onChange={onChangeDictrict}
          />
          <FormSelectWard
            name={nameWard}
            parent_name={dictrictSelect}
            placeholder={'common.ward'}
            colSpan={8}
            compare={compare}
          />
        </Row>
      </Col>
    </>
  );
}

export default FormGroupSelectLocation;
