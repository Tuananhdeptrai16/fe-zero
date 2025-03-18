import PropTypes from 'prop-types';
import React from 'react';
import { Select } from 'antd';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import useSelectWrapperValue from 'src/@crema/hook/useSelectWraperValue';
import { matchText } from 'src/shared/utils/String';

/**
 *
 * @param valueProp
 * @param onChangeProp
 * @param fieldNames
 * @param configFetch
 * @param options
 * @param deps
 * @param showSearch
 * @param returnObject
 * @param renderItem
 * @param pagination
 * @param {{
 * configFetch:
 * {instance,
 * url,
 * method:string,
 * body,
 * params,
 * loadInit:boolean,
 * useCache:boolean,
 * timeCache:number,};
 * }} props Props for the component
 *
 */

const AntSelect = ({
  value: valueProp,
  onChange: onChangeProp,
  fieldNames,
  configFetch,
  options,
  deps = [],
  showSearch = true,
  allowClear = true,
  returnObject,
  renderItem,
  ...props
}) => {
  const dataFetch = useFetch(configFetch, deps);
  const isLoading = dataFetch.isLoading;
  const data =
    options ||
    dataFetch?.data?.result?.items ||
    dataFetch?.data?.result?.tables ||
    dataFetch?.data?.result ||
    [];
  const {
    value,
    options: optionsShow,

    renderOptions,
    onChange,
  } = useSelectWrapperValue({
    ...props,
    returnObject: returnObject,
    renderItem: renderItem,
    options: data,
    value: valueProp,
    onChange: onChangeProp,
    fieldNames,
  });
  return (
    <Select
      {...props}
      value={value}
      onChange={onChange}
      showSearch={showSearch}
      filterOption={(input, option) => {
        try {
          return matchText(
            option?.[fieldNames?.label || 'label'] || option?.label,
            input,
          );
        } catch (err) {
          console.log('filter', err);
          return false;
        }
      }}
      allowClear={allowClear}
      {...(renderItem ? {} : { options: optionsShow, fieldNames: fieldNames })}
      loading={isLoading}>
      {renderOptions()}
    </Select>
  );
};

AntSelect.propTypes = {
  configFetch: PropTypes.object,
  deps: PropTypes.array,
  showSearch: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  fieldNames: PropTypes.object,
  renderItem: PropTypes.func,
  returnObject: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

AntSelect.defaultProps = {};

export default AntSelect;
