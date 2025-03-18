import { isArray } from 'src/shared/utils/Typeof';
import { getValueByKey, parse } from 'src/shared/utils/String';

export const RenderListFieldRawContent = ({
  data,
  rawKey,
  fieldName,
  transformFn,
}) => {
  if (!isArray(data) || !rawKey || !fieldName) return '';
  const listValue = data
    .map((item) => {
      const objValue = parse(item[rawKey]);
      return transformFn
        ? transformFn(getValueByKey(objValue, fieldName) || '')
        : getValueByKey(objValue, fieldName);
    })
    .filter(Boolean);
  return listValue?.join(', ');
};
