import { Col } from 'antd';
import { useIntl } from 'react-intl';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import setColor from 'src/shared/constants/setColorCompare';
import DATA_PROVINCE from 'src/shared/constants/xa_phuong.json';
import PARENT_PROVINCE from 'src/shared/constants/quan_huyen.json';
function FormSelectWard({
  label,
  name,
  placeholder,
  colSpan,
  parent_name,
  isRequired = false,
  compare,
}) {
  const { messages } = useIntl();
  let options;
  const parent = Object.values(PARENT_PROVINCE).find(
    (item) => item.name === parent_name,
  );
  if (parent_name) {
    options = Object.values(DATA_PROVINCE).filter(
      (item) => item.parent_code === parent.code,
    );
  }
  if (compare) {
    options = Object.values(DATA_PROVINCE);
  }
  return (
    <Col span={colSpan} className={'custom-select'}>
      <FormSelect
        label={messages[label]}
        placeholder={messages[placeholder]}
        name={name}
        options={options || []}
        required={isRequired}
        fieldNames={{ value: 'name', label: 'name' }}
        style={setColor(name.at(-1), compare)}
      />
    </Col>
  );
}

export default FormSelectWard;
