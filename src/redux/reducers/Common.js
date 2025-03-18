import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
  RESIZE_APP_CONTENT,
  ADD_ID_DATA_SOURCE,
  CHOOSE_NAME_TABLE,
  CHOOSE_COLUMNS,
  RENAME_INDEX,
  LIST_COLUMNS,
  NEW_COLUMNS,
  CLEAR_ADD_INDEX,
  CONFIG_INDEX,
  SOURCE_ENGINE_ACTIVE,
  ADD_ID_ORGANIZATION,
  ADD_SOURCE_ID,
  ADD_ID_CONNECTION,
  ADD_NAME_TABLE,
  ADD_KEY_RECORD,
  RESET_DATA_VERSION,
  ADD_DESTINATION_ID,
  ADD_ID_ORGANIZATION_AUTO_DATA,
  ADD_SOURCE_ID_AUTO_DATA,
  ADD_ID_CONNECTION_AUTO_DATA,
  ADD_DATA_TYPES,
  CLEAR_AUTO_DATA,
} from 'src/shared/constants/ActionTypes';

const INIT_STATE = {
  error: '',
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
  displayMessage: '',
  appContentWidth: window.innerWidth,
  appContentHeight: window.innerHeight,
  dataSourceAddIndex: {
    idSource: '',
    nameTable: '',
    listColumns: [],
    chooseColumns: [],
    renameIndex: '',
    newColumns: [],
  },
  configIndex: {},
  sourceEngineActive: '',
  manageDataVersions: {
    organizationId: '',
    sourceId: '',
    idConnection: '',
    nameTable: '',
    keyRecord: '',
    destinationId: '',
  },
  automaticDataEnrichment: {
    organizationId: '',
    dataType: '',
    sourceId: '',
    idConnection: '',
  },
};

const commonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESIZE_APP_CONTENT:
      return {
        ...state,
        appContentWidth: action.payload?.width,
        appContentHeight: action.payload?.height,
      };
    case FETCH_START: {
      return { ...state, error: '', displayMessage: '', loading: true };
    }
    case UPDATING_CONTENT: {
      return { ...state, error: '', displayMessage: '', updatingContent: true };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        error: '',
        displayMessage: '',
        loading: false,
        updatingContent: false,
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        error: '',
        displayMessage: action.payload,
        loading: false,
        updatingContent: false,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        displayMessage: '',
        updatingContent: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        loading: false,
        error: '',
        displayMessage: '',
        updatingContent: false,
      };
    }
    case TOGGLE_APP_DRAWER: {
      return {
        ...state,
        isAppDrawerOpen: !state.isAppDrawerOpen,
      };
    }
    case ADD_ID_DATA_SOURCE: {
      const newDataIdSourceData = {
        idSource: action.payload,
      };
      return {
        ...state,
        dataSourceAddIndex: {
          ...state.dataSourceAddIndex,
          ...newDataIdSourceData,
        },
      };
    }
    case CHOOSE_NAME_TABLE: {
      const dataChooseTable = {
        nameTable: action.payload,
      };

      return {
        ...state,
        dataSourceAddIndex: { ...state.dataSourceAddIndex, ...dataChooseTable },
      };
    }
    case CHOOSE_COLUMNS: {
      const dataChooseColumns = {
        chooseColumns: action.payload,
      };

      return {
        ...state,
        dataSourceAddIndex: {
          ...state.dataSourceAddIndex,
          ...dataChooseColumns,
        },
      };
    }
    case LIST_COLUMNS: {
      const listColumns = {
        listColumns: action.payload,
      };

      return {
        ...state,
        dataSourceAddIndex: {
          ...state.dataSourceAddIndex,
          ...listColumns,
        },
      };
    }
    case RENAME_INDEX: {
      const renameIndex = {
        renameIndex: action.payload,
      };

      return {
        ...state,
        dataSourceAddIndex: {
          ...state.dataSourceAddIndex,
          ...renameIndex,
        },
      };
    }
    case NEW_COLUMNS: {
      const newColumns = {
        newColumns: action.payload,
      };

      return {
        ...state,
        dataSourceAddIndex: {
          ...state.dataSourceAddIndex,
          ...newColumns,
        },
      };
    }
    case CLEAR_ADD_INDEX: {
      const clearValue = {
        idSource: '',
        nameTable: '',
        listColumns: [],
        chooseColumns: [],
        renameIndex: '',
        newColumns: [],
      };

      return {
        ...state,
        dataSourceAddIndex: {
          ...state.dataSourceAddIndex,
          ...clearValue,
        },
      };
    }
    case CONFIG_INDEX: {
      const valueConfigIndex = {
        configIndex: action.payload,
      };

      return {
        ...state,
        ...valueConfigIndex,
      };
    }
    case SOURCE_ENGINE_ACTIVE: {
      const sourceActive = {
        sourceEngineActive: action.payload,
      };

      return {
        ...state,
        ...sourceActive,
      };
    }
    case ADD_ID_ORGANIZATION: {
      const addIdOrganization = {
        organizationId: action.payload,
      };

      return {
        ...state,
        manageDataVersions: {
          ...state.manageDataVersions,
          ...addIdOrganization,
        },
      };
    }
    case ADD_SOURCE_ID: {
      const addSourceId = {
        sourceId: action.payload,
      };

      return {
        ...state,
        manageDataVersions: {
          ...state.manageDataVersions,
          ...addSourceId,
        },
      };
    }
    case ADD_ID_CONNECTION: {
      const idConnection = {
        idConnection: action.payload,
      };

      return {
        ...state,
        manageDataVersions: {
          ...state.manageDataVersions,
          ...idConnection,
        },
      };
    }
    case ADD_NAME_TABLE: {
      const nameTable = {
        nameTable: action.payload,
      };

      return {
        ...state,
        manageDataVersions: {
          ...state.manageDataVersions,
          ...nameTable,
        },
      };
    }
    case ADD_KEY_RECORD: {
      const keyRecord = {
        keyRecord: action.payload,
      };

      return {
        ...state,
        manageDataVersions: {
          ...state.manageDataVersions,
          ...keyRecord,
        },
      };
    }
    case ADD_DESTINATION_ID: {
      const destination_id = {
        destinationId: action.payload,
      };

      return {
        ...state,
        manageDataVersions: {
          ...state.manageDataVersions,
          ...destination_id,
        },
      };
    }
    case RESET_DATA_VERSION: {
      const resetData = {
        organizationId: '',
        sourceId: '',
        idConnection: '',
        nameTable: '',
        keyRecord: '',
        destinationId: '',
      };

      return {
        ...state,
        manageDataVersions: {
          ...state.manageDataVersions,
          ...resetData,
        },
      };
    }

    case ADD_ID_ORGANIZATION_AUTO_DATA: {
      const addIdOrganizationAutoData = {
        organizationId: action.payload,
      };

      return {
        ...state,
        automaticDataEnrichment: {
          ...state.automaticDataEnrichment,
          ...addIdOrganizationAutoData,
        },
      };
    }
    case ADD_SOURCE_ID_AUTO_DATA: {
      const addSourceIdAutoData = {
        sourceId: action.payload,
      };

      return {
        ...state,
        automaticDataEnrichment: {
          ...state.automaticDataEnrichment,
          ...addSourceIdAutoData,
        },
      };
    }
    case ADD_ID_CONNECTION_AUTO_DATA: {
      const idConnectionAutoData = {
        idConnection: action.payload,
      };

      return {
        ...state,
        automaticDataEnrichment: {
          ...state.automaticDataEnrichment,
          ...idConnectionAutoData,
        },
      };
    }
    case ADD_DATA_TYPES: {
      const dataType = {
        dataType: action.payload,
      };

      return {
        ...state,
        automaticDataEnrichment: {
          ...state.automaticDataEnrichment,
          ...dataType,
        },
      };
    }
    case CLEAR_AUTO_DATA: {
      const clearData = {
        organizationId: '',
        dataType: '',
        sourceId: '',
        idConnection: '',
      };

      return {
        ...state,
        automaticDataEnrichment: {
          ...state.automaticDataEnrichment,
          ...clearData,
        },
      };
    }
    default:
      return state;
  }
};
export default commonReducer;
