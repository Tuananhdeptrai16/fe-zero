import { Spin, Tree } from 'antd';
import { isArray, map, uniq, isEqual } from 'lodash';
import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { classList } from 'src/shared/utils/ui';
import useFetch from '../../hook/fetchData/useFetch';
import styles from './styles.module.scss';

const TreeSubInventory = (props) => {
  const {
    configFetch,
    deps,
    keyChildren,
    fieldNames,
    returnObject,
    as: Component = 'div',
    className,
    value,
    onChange,
    ...restProps
  } = props;
  const { isLoading, data } = useFetch(configFetch, deps);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(['40-77', '40']);

  const keyId = fieldNames?.value || 'id';
  const keyLabel = fieldNames?.label || 'label';
  const payload = data?.data || [];

  const treeData = useMemo(() => {
    return map(payload, (item) => {
      const id = item[keyId];
      return {
        title: item[keyLabel],
        key: `${id}`,
        item: item,
        children: map(item[keyChildren || 'children'] || [], (node) => {
          const idChild = node[keyId];
          return {
            title: node[keyLabel],
            key: `${id}-${idChild}`,
            item: node,
          };
        }),
      };
    });
  }, [payload]);

  useEffect(() => {
    const checkedKeysNew = [];
    const valuePropSelect = value || [];
    if (returnObject) {
      const idSelectProp = valuePropSelect.map((item) => item[keyId]);
      treeData.forEach((item) => {
        (item?.children || []).forEach((node) => {
          if (idSelectProp.includes(node?.item?.[keyId])) {
            checkedKeysNew.push(node?.key);
            checkedKeysNew.push(item?.key);
          }
        });
      });
    } else {
      treeData.forEach((item) => {
        (item?.children || []).forEach((node) => {
          if (valuePropSelect.includes(node?.item?.[keyId])) {
            checkedKeysNew.push(node?.key);
            checkedKeysNew.push(item?.key);
          }
        });
      });
    }

    const checkedKeysNewUni = uniq(checkedKeysNew);
    const isNew = !isEqual(checkedKeys.sort(), checkedKeysNewUni.sort());
    if (isNew) {
      setCheckedKeys(checkedKeysNewUni);
      setExpandedKeys(checkedKeysNewUni);
    }
  }, [value, treeData]);

  const onHandleCheck = (keys, event) => {
    setCheckedKeys(keys);

    if (returnObject) {
      const listItemSelect = (event?.checkedNodes || [])
        .filter((node) => !node?.children)
        .map((node) => node?.item);
      onChange(listItemSelect);
    } else {
      const listItemIdSelect = (event?.checkedNodes || [])
        .filter((node) => !node?.children)
        .map((node) => node?.item?.[keyId]);
      onChange(listItemIdSelect);
    }
  };

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
  };

  return (
    <Component
      className={classList(
        styles.container,
        !isLoading && styles.tags,
        className,
      )}>
      {isLoading && <Spin />}
      {!isLoading && data && isArray(data?.data) && (
        <div>
          <Tree
            {...restProps}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            onCheck={onHandleCheck}
            checkedKeys={checkedKeys}
            checkable
            treeData={treeData}
          />
        </div>
      )}
    </Component>
  );
};

TreeSubInventory.defaultProps = {
  configFetch: {},
  deps: [],
  as: 'div',
  value: [],
  fieldNames: {},
  keyChildren: 'children',
  returnObject: false,
  className: '',
  onChange: undefined,
};

TreeSubInventory.propTypes = {
  configFetch: PropTypes.object,
  deps: PropTypes.array,
  as: PropTypes.elementType,
  fieldNames: PropTypes.object,
  keyChildren: PropTypes.string,
  returnObject: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default TreeSubInventory;
