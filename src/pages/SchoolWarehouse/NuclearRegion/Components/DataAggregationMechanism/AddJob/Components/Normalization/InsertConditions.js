import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Col, Row, Input, Tree, List } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { isEmpty } from 'lodash';
import { handleRedundantData } from 'src/shared/utils/Object';
import style from './Normalization.module.scss';
import clsx from 'clsx';
import AntButton from 'src/@crema/component/AntButton';
import { PlusOutlined } from '@ant-design/icons';
import { getDataContextAddJob } from '../..';

const { Search } = Input;

function InsertConditions({
  codeConditionSetValue,
  setConditionSetValue,
  dataDetailJob,
  isFormula = false,
}) {
  const { dataCreateJob } = getDataContextAddJob();

  const editorRef = useRef(null);
  const { new_config_fields } = dataCreateJob || {};
  const dataRenderColumn = !isEmpty(new_config_fields)
    ? new_config_fields?.map((item) => {
        return {
          nameColumn: item?.new_field_name,
          ...item,
        };
      })
    : !isEmpty(dataDetailJob)
    ? dataDetailJob?.scheduler_response?.config_fields?.map((item) => {
        return {
          nameColumn: item?.new_field_name,
          ...item,
        };
      })
    : [];

  const listColumnRulesDetail =
    dataDetailJob?.scheduler_response?.rules
      ?.filter((data) => data?.type === 'add_column')
      ?.map((item) => {
        return {
          ...item,
          nameColumn: item?.new_column,
        };
      }) || [];

  const listSelectColumns = [...dataRenderColumn, ...listColumnRulesDetail];

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(false);

  const handleChange = (newValue) => {
    setConditionSetValue(newValue);
  };

  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e) => {
    const value = handleRedundantData(e?.target?.value);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeDataFormula = [
    {
      title: 'Toán tử so sánh',
      key: 'COMPARE',
      selectable: false,
      children: [
        { title: '>', key: '>' },
        { title: '>=', key: '>=' },
        { title: '<', key: '<' },
        { title: '<=', key: '<=' },
        { title: '=', key: '=' },
        { title: '!=', key: '!=' },
      ],
    },
    {
      title: 'Toán tử điều kiện',
      key: 'LOGICAL',
      selectable: false,
      children: [
        { title: 'and', key: 'and' },
        { title: 'or', key: 'or' },
        { title: 'not', key: 'not' },
        { title: 'in', key: 'in' },
        { title: 'like', key: 'like' },
        { title: 'is', key: 'is' },
        { title: 'null', key: 'null' },
      ],
    },
    {
      title: 'Các phép tính',
      key: 'CALCULATION',
      selectable: false,
      children: [
        { title: '+', key: '+' },
        { title: '-', key: '-' },
        { title: '*', key: '*' },
        { title: '/', key: '/' },
        { title: '%', key: '%' },
      ],
    },
  ];

  const treeData = isFormula
    ? treeDataFormula
    : [
        {
          title: 'Toán tử so sánh',
          key: 'COMPARE',
          selectable: false,
          children: [
            { title: '>', key: '>' },
            { title: '>=', key: '>=' },
            { title: '<', key: '<' },
            { title: '<=', key: '<=' },
            { title: '==', key: '==' },
            { title: '!=', key: '!=' },
          ],
        },
        {
          title: 'Toán tử điều kiện',
          key: 'LOGICAL',
          selectable: false,
          children: [
            { title: 'and', key: 'and' },
            { title: 'or', key: 'or' },
            { title: 'not', key: 'not' },
          ],
        },
        {
          title: 'Các phép tính',
          key: 'CALCULATION',
          selectable: false,
          children: [
            { title: '+', key: '+' },
            { title: '-', key: '-' },
            { title: '*', key: '*' },
            { title: '/', key: '/' },
          ],
        },
        {
          title: 'Các hàm hỗ trợ chuỗi',
          key: 'STRING',
          selectable: false,
          children: [
            { title: 'startswith', key: 'str.startswith' },
            { title: 'endswith', key: 'str.endswith' },
            { title: 'contains', key: 'str.contains' },
          ],
        },
        {
          title: 'Các hàm hỗ trợ ngày tháng',
          key: 'DATE',
          selectable: false,
          children: [
            { title: 'year', key: 'dt.year' },
            { title: 'month', key: 'dt.month' },
            { title: 'day', key: 'dt.day' },
          ],
        },
        {
          title: 'Hàm toán học hỗ trợ',
          key: 'MATH',
          selectable: false,
          children: [{ title: 'sqrt', key: 'sqrt' }],
        },
      ];

  const generateList = (data, parentKey = null) => {
    let list = [];
    data?.forEach((node) => {
      const newNode = { ...node, parentKey };
      list?.push(newNode);
      if (!isEmpty(node?.children)) {
        list = list?.concat(generateList(node?.children, node?.key));
      }
    });
    return list;
  };
  const dataList = generateList(treeData);

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const highlightedTreeData = useMemo(() => {
    const loop = (data) => {
      return data?.map((item) => {
        if (!isEmpty(item?.children)) {
          return {
            ...item,
            title: <span>{item?.title}</span>,
            children: loop(item?.children),
          };
        }

        const strTitle = item?.title;
        const index = strTitle
          ?.toLowerCase()
          ?.indexOf(searchValue?.toLowerCase());

        const beforeStr = strTitle?.substring(0, index);
        const afterStr = strTitle?.slice(index + searchValue?.length);

        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#416ef0', fontWeight: 500 }}>
                {searchValue}
              </span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );

        return { ...item, title };
      });
    };

    const expandedKeys = dataList
      .map((item) => {
        if (
          item?.title?.toLowerCase()?.indexOf(searchValue?.toLowerCase()) > -1
        ) {
          return getParentKey(item?.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(expandedKeys);

    return loop(treeData);
  }, [searchValue]);

  useEffect(() => {
    const editor = editorRef?.current?.editor;

    editor.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });

    return () => {
      editor.container.removeEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });
    };
  }, []);
  return (
    <Row gutter={[12, 12]} className={clsx(style.wrapAddCondition)}>
      <Col span={24} className={clsx(style.wrapAceEditor)}>
        <AceEditor
          ref={editorRef}
          placeholder='Nhập câu lệnh'
          mode='sql'
          theme='github'
          name='code_query'
          onChange={handleChange}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          style={{ width: '100%', height: 200 }}
          value={codeConditionSetValue}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 1,
          }}
        />
      </Col>
      <Col span={24} className={clsx(style.contentAddSelect)}>
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <h5>Chọn cột</h5>
            <List
              itemLayout='horizontal'
              dataSource={listSelectColumns || []}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <AntButton
                      onClick={() => {
                        setConditionSetValue((prev) => {
                          return `${prev} ${item?.nameColumn}`;
                        });
                      }}
                      key='select_column'
                      icon={<PlusOutlined />}
                    />,
                  ]}>
                  <List.Item.Meta title={<span>{item.nameColumn}</span>} />
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <h5>Chọn biểu thức</h5>
            <Search
              style={{ marginBottom: 8 }}
              placeholder='Nhập tìm kiếm'
              onChange={onChange}
            />
            <Tree
              onSelect={(data) => {
                setConditionSetValue((prev) => {
                  return `${prev} ${data[0] || ''}`;
                });
              }}
              showLine
              blockNode
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              treeData={highlightedTreeData}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default InsertConditions;
