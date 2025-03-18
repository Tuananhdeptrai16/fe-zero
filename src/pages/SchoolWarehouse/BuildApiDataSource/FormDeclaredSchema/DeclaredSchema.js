import React, { useEffect } from 'react';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-github';
import { Form, Typography } from 'antd';
import FormSwitch from 'src/@crema/component/FormSwitch';
import FormEditorJS from 'src/@crema/component/FormEditorJS';
import { stringify, parse } from 'src/shared/utils/String';
import { isEqual } from 'lodash';

DeclaredSchema.propTypes = {};

function DeclaredSchema({ stream }) {
  const form = Form.useFormInstance();
  const nameSchemaStr = ['definitions', 'streams', stream.name, 'schema'];
  const nameSchema = ['schemas', stream.name];
  const nameAutoImportSchema = ['metadata', 'autoImportSchema', stream.name];
  const schemaStr = Form.useWatch([
    'definitions',
    'streams',
    stream.name,
    'schema',
  ]);
  const schemaObj = Form.useWatch(['schemas', stream.name]);
  const autoImportSchema = Form.useWatch(nameAutoImportSchema);
  useEffect(() => {
    const schemaStrNew = stringify(schemaObj, null, '\t');
    if (schemaStrNew !== schemaStr) {
      form.setFieldValue(nameSchemaStr, schemaStrNew);
    }
  }, [schemaObj]);

  useEffect(() => {
    const schemaObjNew = parse(schemaStr);
    if (!isEqual(schemaObjNew, schemaObj)) {
      form.setFieldValue(nameSchema, schemaObjNew);
    }
  }, [schemaStr]);

  return (
    <>
      <div className={'d-flex custom-select-hidden-margin'}>
        <Typography.Title className={'mr-auto'} level={4}>
          Lược đồ
        </Typography.Title>
        <FormSwitch
          label='Tự động nhập lược đồ đã phát hiện'
          name={nameAutoImportSchema}
        />
      </div>
      <FormEditorJS
        name={['definitions', 'streams', stream.name, 'schema']}
        readOnly={autoImportSchema}
      />
    </>
  );
}

export default DeclaredSchema;
