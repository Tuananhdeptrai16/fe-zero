import { Tooltip } from 'antd';

function ItemValueColumn({ value }) {
  console.log('first: ', value);
  return (
    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
      <Tooltip
        title={value?.length > 20 ? value : ''}
        placement={'bottom'}
        style={{ display: 'none' }}>
        {value && value?.length > 20 ? value.slice(0, 20) + '...' : value}
      </Tooltip>
    </div>
  );
}
export default ItemValueColumn;
