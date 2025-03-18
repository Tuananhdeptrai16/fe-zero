const setColor = (
  name,
  compare,
  isEmtpy,
  index,
  tabName,
  tableName,
  isUpload = false,
) => {
  if (index || index === 0) {
    const arrayCheck = compare?.[tabName]?.[tableName];
    const result = arrayCheck?.find(
      (item) => item.index === index && item.field === name,
    );

    if (result) {
      const a =
        result.status === 'update'
          ? { backgroundColor: '#FFEC3D33', color: '#333' }
          : result.status === 'delete'
          ? { backgroundColor: '#FF4D4F33', color: '#333' }
          : result.status === 'add'
          ? { backgroundColor: '#73D13D4D', color: '#333' }
          : !isUpload
          ? { backgroundColor: 'white', color: '#333' }
          : {};
      return a;
    } else {
      return !isUpload ? { backgroundColor: 'white', color: '#333' } : {};
    }
  } else {
    const statusCompare =
      compare?.[name?.at(-1)]?.status || compare?.[name]?.status;
    return compare && statusCompare && !isEmtpy
      ? statusCompare === 'update'
        ? { backgroundColor: '#FFEC3D33', color: '#333' }
        : statusCompare === 'delete'
        ? { backgroundColor: '#FF4D4F33', color: '#333' }
        : statusCompare === 'add'
        ? { backgroundColor: '#73D13D4D', color: '#333' }
        : !isUpload
        ? { backgroundColor: 'white', color: '#333' }
        : {}
      : !isUpload
      ? { backgroundColor: 'white', color: '#333' }
      : {};
  }
};

export default setColor;
