import API from './apis';
import { instanceCoreApi } from './setupAxios';

export const postSaveDraftJudicialRecord = ({ data }) => {
  return instanceCoreApi.post(API.SAVE_DRAFT_JUDICIAL_RECORD, data);
};

export const postCreateJudicialRecord = ({ data }) => {
  return instanceCoreApi.post(API.CREATE_JUDICIAL_RECORD, data);
};

export const deleteJudicialRecord = (id) => {
  return instanceCoreApi.delete(API.DELETE_JUDICIAL_RECORD(id));
};

export const massDeleteJudicialRecord = (ids) => {
  return instanceCoreApi.delete(API.MASS_DELETE_JUDICIAL_RECORD, {
    data: {
      ids,
    },
  });
};

export const unlockJudicialRecord = (id) => {
  return instanceCoreApi.put(API.UNLOCK_JUDICIAL_RECORD(id));
};

export const lockJudicialRecord = (id) => {
  return instanceCoreApi.put(API.LOCK_JUDICIAL_RECORD(id));
};

export const searchRelateDocumentByCitizen = ({
  verdictSuggestionRequest,
  case_number,
}) => {
  return instanceCoreApi.post(API.SEARCH_RELATE_DOCUMENT_BY_CITIZEN, {
    ...(verdictSuggestionRequest || {}),
    case_number,
    pageable: {
      page: 1,
      page_size: 100,
    },
  });
};

export const editVerifyJudicialRecord = ({ data, id }) => {
  return instanceCoreApi.post(API.EDiT_VERIFY_JUDICIAL_RECORD(id), data);
};

export const autoSyncMinistry = () =>
  instanceCoreApi.post(API.AUTO_SYNC_JUDICIAL_RECORD);

export const syncMinistry = (id, clientID) =>
  instanceCoreApi.post(API.SYNC_DATA_JUDICIAL_RECORD(id, clientID));

export const putUploadToMinistry = ({ data, id }) => {
  return instanceCoreApi.put(API.CHANGE_STATUS_JUDICIAL_RECORD(id), data);
};

export const exportJudicialRecord = (id) => {
  return instanceCoreApi.get(API.EXPORT_PDF_JUDICIAL_RECORD(id));
};
