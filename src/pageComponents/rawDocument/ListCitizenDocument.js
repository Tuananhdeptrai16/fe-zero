import React, { useRef, useState } from 'react';
import { Form, Tabs } from 'antd';
import FormCitizenShortInformation from 'src/pageComponents/rawDocument/FormCitizenShortInformation';
import FormDocumentInformation from 'src/pageComponents/rawDocument/FormDocumentInformation';

import './ListCitizenDocument.scss';
import { isEmpty } from 'src/shared/utils/Typeof';

const ListCitizenDocument = ({
  name,
  configTemplate,
  numCitizenInit = 0,
  disabled,
}) => {
  const citizens = Form.useWatch('citizens') || [];
  const [activeKey, setActiveKey] = useState('0');
  const newTabIndex = useRef(numCitizenInit + 1);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  return (
    <Form.List name={name}>
      {(fields, operation, meta) => {
        const { errors } = meta;
        const { add, remove } = operation;
        return (
          <>
            <Tabs
              className='list-citizen-document'
              type={disabled ? 'card' : 'editable-card'}
              onChange={onChange}
              activeKey={activeKey}
              onEdit={(targetKey, action) => {
                if (action === 'add') {
                  setActiveKey(`${fields.length}`);
                  add({
                    label: `Đối tượng ${newTabIndex.current}`,
                  });
                  newTabIndex.current = newTabIndex.current + 1;
                } else {
                  let newActiveKey = activeKey;
                  let lastIndex = -1;
                  fields.forEach((item, i) => {
                    if (item.key === Number(targetKey)) {
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
                  } else if (Number(activeKey) === newPanes.length - 1) {
                    newActiveKey = newPanes.length - 2;
                  }

                  setActiveKey(`${newActiveKey}`);
                  remove(Number.parseInt(targetKey));
                }
              }}>
              {fields.map((field, index) => {
                const itemData = citizens[index] || {};
                return (
                  <Tabs.TabPane
                    tab={
                      itemData.name ||
                      itemData.label ||
                      `Đối tượng ${index + 1}`
                    }
                    key={index}>
                    <div className='block-citizen'>
                      <div className='block-content'>
                        <p className='block-title'>Thông tin nhân thân</p>
                        <FormCitizenShortInformation field={field} />
                      </div>
                    </div>
                    {!isEmpty(configTemplate) && (
                      <div className='block-citizen'>
                        <div className='block-content'>
                          <p className='block-title'>Thông tin riêng</p>
                          <FormDocumentInformation
                            field={field}
                            configTemplate={configTemplate}
                          />
                        </div>
                      </div>
                    )}
                  </Tabs.TabPane>
                );
              })}
            </Tabs>
            <Form.Item>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        );
      }}
    </Form.List>
  );
};

ListCitizenDocument.propTypes = {};

ListCitizenDocument.defaultProps = {};

export default ListCitizenDocument;
