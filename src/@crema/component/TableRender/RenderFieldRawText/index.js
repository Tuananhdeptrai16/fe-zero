import { parse } from 'src/shared/utils/String';
import { isArray, isEmpty } from 'src/shared/utils/Typeof';

const RenderFieldRawText = ({ rawText, field }) => {
  const data = parse(rawText);

  if (data && field && isArray(data)) {
    const citizen = data.find((item) => !isEmpty(item[field]));
    if (citizen) return citizen[field];
  }

  return '';
};
RenderFieldRawText.propTypes = {};

RenderFieldRawText.defaultProps = {};

export default RenderFieldRawText;
