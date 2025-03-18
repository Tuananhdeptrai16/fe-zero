import { Col, Row } from 'antd';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import setColor from 'src/shared/constants/setColorCompare';

function FormAchive({ columns, compare, isEmtpy }) {
  const renderListInput = () => {
    columns = columns.filter(
      (item) =>
        item.key !== 'toolbar' &&
        item.key !== 'status' &&
        item.key !== 'typeAction' &&
        item.key !== 'action',
    );
    return columns.map((item) => {
      switch (item.title) {
        case 'Ngày quyết định':
          return (
            <FormDatePicker
              key={item.title}
              name={item.title}
              label={item.title}
              style={setColor(item.title, compare, isEmtpy)}
            />
          );
        default:
          return (
            <FormInput
              key={item.title}
              name={item.title}
              label={item.title}
              style={setColor(item.title, compare, isEmtpy)}
              required={item.required ? true : false}
              rules={
                item.maxLength ? { maxLength: [{ value: item.maxLength }] } : {}
              }
            />
          );
      }
    });
  };

  return (
    <div>
      <Row gutter={10}>
        <Col span={24}>{renderListInput()}</Col>
      </Row>
    </div>
  );
}

export default FormAchive;
