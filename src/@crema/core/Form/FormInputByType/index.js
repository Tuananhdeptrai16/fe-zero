import { Form } from 'antd';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import InputByType from 'src/@crema/component/InputByType';
import { TYPE_SETTING_SYSTEM } from 'src/shared/constants/SettingSystem';
import ListInputByType from 'src/@crema/component/ListInputByType';

const FormInputByType = (props) => {
  const { required, name, label, type, placeholder, rules, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  const isListItem = useMemo(() => {
    return TYPE_SETTING_SYSTEM.find((item) => item?.value === type)?.isListItem;
  }, [type]);

  // if (type === INPUT_TYPE.LIST_VIDEO) {
  //   const form = Form.useFormInstance();
  //   const dataVideo = Form.useWatch(name, form);
  //
  //   return (
  //     <>
  //       <Form.List name={name}>
  //         {(fields, { add, remove }, { errors }) => (
  //           <>
  //             {fields?.map((field, index) => {
  //               return (
  //                 <Form.Item
  //                   label={index === 0 ? labelShow : ''}
  //                   key={field?.key}>
  //                   <Form.Item
  //                     {...field}
  //                     validateTrigger={['onChange', 'onBlur']}
  //                     rules={injectRules({
  //                       required,
  //                       labelShow,
  //                       rules,
  //                       formatMessage,
  //                     })}
  //                     noStyle>
  //                     <AntInput
  //                       style={{ width: fields?.length > 1 ? '90%' : '100%' }}
  //                       {...attrs}
  //                     />
  //                   </Form.Item>
  //                   {fields.length > 1 ? (
  //                     <MinusCircleOutlined
  //                       className='dynamic-delete-button'
  //                       onClick={() => {
  //                         remove(field.name);
  //                       }}
  //                     />
  //                   ) : null}
  //                   <br />
  //                   <br />
  //
  //                   <Media
  //                     width={props?.preview?.width}
  //                     height={props?.preview?.height}
  //                     src={dataVideo?.[field?.name]}
  //                   />
  //                 </Form.Item>
  //               );
  //             })}
  //
  //             <Form.Item>
  //               <Button
  //                 type={'dashed'}
  //                 onClick={() => {
  //                   add();
  //                 }}
  //                 icon={<PlusOutlined />}>
  //                 Thêm link
  //               </Button>
  //               <Form.ErrorList errors={errors} />
  //             </Form.Item>
  //           </>
  //         )}
  //       </Form.List>
  //     </>
  //   );
  // }

  if (isListItem) {
    return (
      <Form.List
        name={name}
        label={labelShow}
        rules={injectRules({ required, labelShow, rules, formatMessage })}>
        {(fields, operation, meta) => (
          <ListInputByType
            name={name}
            fields={fields}
            operation={operation}
            meta={meta}
            type={type}
            label={labelShow}
          />
        )}
      </Form.List>
    );
  }

  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <InputByType
        placeholder={messages[placeholder] || placeholder}
        style={{ width: '100%' }}
        type={type}
        {...attrs}
      />
    </Form.Item>
  );
};

FormInputByType.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
};

export default FormInputByType;
