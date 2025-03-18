import API from './apis/index';
import { instanceCoreApi } from './setupAxios';

// export const deleteDetailOrganization = (id) => {
//   return instanceCoreApi.delete(API.DELETE_MEMBER_LIST_ORGANIZATION(id));
// };

export const deleteMembersOrganization = (rowData) => {
  return instanceCoreApi.put(API.DELETE_MEMBER_LIST_ORGANIZATION, {
    user_ids: [rowData?.id],
    organization_id: rowData?.organization?.id,
  });
};
