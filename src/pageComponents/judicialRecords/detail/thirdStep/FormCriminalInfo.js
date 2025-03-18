import React, { useRef, useState } from 'react';
import { FormVerdict } from './FormVerdict';
import { Form, Tabs } from 'antd';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import FormAddVerdict from 'src/pageComponents/judicialRecords/detail/thirdStep/FormAddVerdict';
import { BYPASS_SAVE_SERVER } from 'src/shared/constants/Default';
import { KEY_DOCUMENT_NUMBER } from 'src/shared/constants/SettingSystem';
import { parse } from 'src/shared/utils/String';

export const FormCriminalInfo = ({ disabled, name, data = [] }) => {
  const form = Form.useFormInstance();
  const verdicts = Form.useWatch(name, form) || form.getFieldValue(name) || [];
  const [openPopupConfirm, setOpenPopupConfirm] = useState(false);
  const [activeKey, setActiveKey] = useState('0');
  const newTabIndex = useRef(data.length + 1);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  return (
    <Form.List name={name}>
      {(fields, operation) => {
        const { add, remove } = operation;
        return (
          <>
            <DialogConfirm
              visible={openPopupConfirm}
              onClose={() => setOpenPopupConfirm(false)}
              textTitle={'judicial.addVerdict'}
              onSaveToServer={(data) => {
                setActiveKey(`${fields.length}`);
                add({
                  label: `Bản án ${newTabIndex.current}`,
                  ...parse(data?.verdict?.content),
                  ...(data.verdict || {}),
                });
                newTabIndex.current = newTabIndex.current + 1;
                return BYPASS_SAVE_SERVER();
              }}>
              <FormAddVerdict ignoreIds={verdicts.map((item) => item.id)} />
            </DialogConfirm>
            {fields.length === 0 && (
              <div className='text-center'>Không có bản án nào!</div>
            )}
            <Tabs
              type={!disabled ? 'editable-card' : 'card'}
              onChange={onChange}
              activeKey={activeKey}
              onEdit={(targetKey, action) => {
                if (action === 'add') {
                  setOpenPopupConfirm(true);
                } else {
                  let newActiveKey = activeKey;
                  let lastIndex = -1;
                  fields.forEach((item, i) => {
                    if (item.key === targetKey) {
                      lastIndex = i - 1;
                    }
                  });

                  const newPanes = fields.filter(
                    (item) => item.key !== targetKey,
                  );
                  if (newPanes.length && newActiveKey === targetKey) {
                    if (lastIndex >= 0) {
                      newActiveKey = lastIndex;
                    } else {
                      newActiveKey = 0;
                    }
                  }
                  setActiveKey(`${newActiveKey}`);
                  remove(Number.parseInt(targetKey));
                }
              }}>
              {fields.map((field, index) => {
                const itemData = verdicts[index] || {};
                const tabName = itemData?.[KEY_DOCUMENT_NUMBER]
                  ? `Bản án ${itemData?.[KEY_DOCUMENT_NUMBER]}`
                  : `Bản án ${index + 1}`;
                return (
                  <Tabs.TabPane tab={tabName} key={index}>
                    <FormVerdict
                      nameField={field.name}
                      name={[name, field.name]}
                      disabled={disabled}
                    />
                  </Tabs.TabPane>
                );
              })}
            </Tabs>
          </>
        );
      }}
    </Form.List>
  );
};
