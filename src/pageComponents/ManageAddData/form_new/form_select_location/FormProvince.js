import { Col } from 'antd';
import { useIntl } from 'react-intl';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import setColor from 'src/shared/constants/setColorCompare';
import DATA_PROVINCE from 'src/shared/constants/tinh_tp.json';

function FormSelectProvince({
  label,
  name,
  placeholder,
  colSpan,
  isRequired = false,
  compare,
  onChange,
}) {
  const { messages } = useIntl();
  return (
    <Col span={colSpan} className={'custom-select'}>
      <FormSelect
        label={messages[label]}
        placeholder={messages[placeholder]}
        name={name}
        options={Object.values(DATA_PROVINCE)}
        required={isRequired}
        fieldNames={{ value: 'name', label: 'name' }}
        style={setColor(name.at(-1), compare)}
        onChange={onChange}
      />
    </Col>
  );
}

export default FormSelectProvince;
