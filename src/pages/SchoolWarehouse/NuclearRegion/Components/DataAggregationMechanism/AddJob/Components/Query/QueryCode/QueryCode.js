import React from 'react';
import AceEditor from 'react-ace';
import style from './QueryCode.module.scss';
import clsx from 'clsx';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { handleRedundantData } from 'src/shared/utils/Object';

function QueryCode({ isDetail, isUpdate, setDataCodeQuery, dataCodeQuery }) {
  const handleChange = (newValue) => {
    setDataCodeQuery(handleRedundantData(newValue));
  };

  return (
    <AceEditor
      placeholder='Nhập câu lệnh truy vấn'
      mode='sql'
      theme='github'
      name='code_query'
      onChange={handleChange}
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      readOnly={isDetail || isUpdate}
      highlightActiveLine={true}
      className={clsx(style.aceEditor)}
      value={dataCodeQuery}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
export default QueryCode;
