import { getValueByKey, parse } from 'src/shared/utils/String';
import { isArray, isObject } from 'src/shared/utils/Typeof';

export const RenderFieldRawContent = ({
  rawText,
  field,
  secondField,
  fieldMap,
}) => {
  const data = parse(rawText);
  if (!data || !field) return '';
  if (isObject(data)) {
    if (!fieldMap) {
      return getValueByKey(data, field) || getValueByKey(data?.document, field);
    }
    const result = (data?.[fieldMap] || [])
      ?.map((obj) => obj?.[field] || obj?.[secondField])
      ?.filter(Boolean)
      ?.join(', ');
    return result;
  }
  if (isArray(data)) {
    return data
      .map((obj) => obj[field])
      .filter(Boolean)
      .join(', ');
  }
};
RenderFieldRawContent.propTypes = {};

RenderFieldRawContent.defaultProps = {};
