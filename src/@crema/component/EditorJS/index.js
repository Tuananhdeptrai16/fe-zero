import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-textmate';

const EditorJS = ({ value, onChange, ...attrs }) => {
  return (
    <AceEditor
      mode='json'
      theme='textmate'
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      wrapEnabled={true}
      highlightActiveLine={true}
      value={value}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
      onChange={onChange}
      {...attrs}
    />
  );
};

EditorJS.propTypes = {};

EditorJS.defaultProps = {};

export default EditorJS;
