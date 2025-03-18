import axios from 'axios';
import API from 'src/@crema/services/apis';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { flatColumnsTable } from 'src/shared/utils/filter';
import { isEmpty } from 'src/shared/utils/Typeof';

const renderUrlGetTableOld = (type, data) => {
  if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
    return data?.select_table_waiting
      ? API.GET_LIST_TABLE_WAITING_DESTINATION(data?.destination_id)
      : API.GET_LIST_TABLE_DESTINATION(data?.destination_id);
  }
  if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
    return data?.select_table_waiting
      ? API.GET_LIST_TABLE_WAITING_NUCLEAR_REGION(data?.nuclear_region_id)
      : API.GET_LIST_TABLE_NUCLEAR_REGION(data?.nuclear_region_id);
  }
  if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
    return data?.select_table_waiting
      ? API.GET_LIST_TABLE_WAITING_DATA_MARK(data?.dtm_region_id)
      : API.GET_LIST_TABLE_DATA_MARK(data?.dtm_region_id);
  }
};

export const fetchDataItemTableOld = async (tableConfigOld, typeDataMark) => {
  try {
    if (!isEmpty(tableConfigOld)) {
      const results = await Promise.all(
        (tableConfigOld || [])?.map(async (item) => {
          try {
            const { data } = await axios({
              method: METHOD_FETCH.GET,
              url: renderUrlGetTableOld(typeDataMark, item),
              params: item?.table_name
                ? {
                    tableName: item?.table_name,
                  }
                : {},
            });
            const schemaName = data?.result?.schema;
            const listTable = data?.result?.tables || [];
            const listTableFilter = listTable?.find((table) => {
              return table?.table_name === item?.table_name;
            });

            const dataColumns = flatColumnsTable(
              [listTableFilter],
              schemaName,
              item?.order,
            );

            return dataColumns || [];
          } catch (err) {
            console.log('lay data that bai:', err);
          }
        }),
      );

      return results || [];
    }
    return [];
  } catch (err) {
    console.log('lay data that bai:', err);
    return [];
  }
};
