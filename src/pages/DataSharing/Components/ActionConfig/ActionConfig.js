import React, { useState } from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import { TYPES_DATA_SHARING } from 'src/shared/constants/DataFixed';
import useGetDataConfig from '../../Hook/useGetDataConfig';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import { useSearchParams } from 'react-router-dom';
import { KEY_SEARCH_PARAM_DT } from 'src/shared/constants/DataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import AntModal from 'src/@crema/component/AntModal';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import API from 'src/@crema/services/apis';
import notification from 'src/shared/utils/notification';
// import routes from 'src/config/routes.config';

ActionConfig.propTypes = {
  type: PropTypes.string.isRequired,
};

function ActionConfig({ type }) {
  const { messages } = useIntl();
  // const navigate = useNavigate();
  const {
    prevStepPage,
    nextStepPage,
    setDataStep,
    isConfigPermission,
    dataStep,
  } = useGetDataConfig();
  const [, setSearchParams] = useSearchParams();
  const { rowSelection } = useDataTableContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorGrantPermission, setIsErrorGrantPermission] = useState(false);
  const [listErrorGrantPermission, setErrorGrantPermission] = useState(null);

  const handelGoBack = () => {
    prevStepPage();
  };

  // useCallAPI server
  const { loading: loadingGrantPermissions, send: sendGrantPermissions } =
    useCallApi({
      success: () => {
        notification.success('Cấp quyền thành công');
        setIsErrorGrantPermission(false);
        // setTimeout(() => {
        //   navigate(routes.retrieve_data_api);
        // }, 1000);
      },
      callApi: (data) => {
        return instanceCoreApi.post(API.GRANT_PERMISSIONS, data);
      },
      error: (err) => {
        setIsErrorGrantPermission(true);
        const errors = getErrorsResponse(err?.raw);
        const listKeys = Object.keys(errors);
        const textError = listKeys?.map((item, index) => {
          return (
            <p key={index}>
              {item}: {errors[item]}
            </p>
          );
        });
        setErrorGrantPermission(textError);
        const messageError = getMessageResponse(err) || 'Cấp quyền thất bại';
        notification.error(messages[messageError] || messageError);
      },
    });

  const handleContinue = () => {
    // select organization
    if (type === TYPES_DATA_SHARING.select_organization) {
      const idOrganization = rowSelection.selectedRowKeys[0];
      setDataStep((prev) => {
        return {
          ...prev,
          organization: idOrganization,
        };
      });
      setSearchParams({
        [KEY_SEARCH_PARAM_DT.SEARCH]: '',
      });
      nextStepPage();
    }
    // select subset organization
    else if (type === TYPES_DATA_SHARING.select_subset_organization) {
      const listSubSetOrganizations = rowSelection?.selectedRowKeys || [];
      setDataStep((prev) => {
        return {
          ...prev,
          sub_organization: listSubSetOrganizations,
        };
      });
      setSearchParams({
        [KEY_SEARCH_PARAM_DT.SEARCH]: '',
      });
      nextStepPage();
    } // select source
    else if (type === TYPES_DATA_SHARING.select_source) {
      const idSource = rowSelection.selectedRowKeys[0];
      setDataStep((prev) => {
        return {
          ...prev,
          sourceCSDL: idSource,
        };
      });
      setSearchParams({
        [KEY_SEARCH_PARAM_DT.SEARCH]: '',
      });
      nextStepPage();
    } // select table
    else if (type === TYPES_DATA_SHARING.select_table) {
      const listTable = rowSelection.selectedRowKeys;
      const listIdTable = rowSelection?.selectedRows?.map(
        (item) => item?.table?.id,
      );
      setDataStep((prev) => {
        return {
          ...prev,
          table: isConfigPermission ? listTable : listIdTable,
        };
      });
      if (isConfigPermission) {
        const dataGrantPermissions = {
          data_warehouse_info_id: dataStep?.sourceCSDL,
          table_id: listTable[0],
          department_id: dataStep?.sub_organization[0],
        };
        sendGrantPermissions(dataGrantPermissions);
      } else {
        nextStepPage();
      }
    }
    // list api share
    else if (type === TYPES_DATA_SHARING.list_api_share) {
      console.log('danh sach api share');
    } else {
      nextStepPage();
      setSearchParams({
        [KEY_SEARCH_PARAM_DT.SEARCH]: '',
      });
    }
  };

  // handle disable btn continue
  const disableBtnContinue = () => {
    if (type !== TYPES_DATA_SHARING.connectionList) {
      if (rowSelection?.selectedRowKeys?.length > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <div className='d-flex justify-end items-center gap-2 mt-2'>
      {type !== TYPES_DATA_SHARING.connectionList &&
        type !== TYPES_DATA_SHARING.select_organization &&
        type !== TYPES_DATA_SHARING.select_source && (
          <AntButton onClick={handelGoBack}>
            {messages['dialog.button.goBack']}
          </AntButton>
        )}
      {type === TYPES_DATA_SHARING.select_source && isConfigPermission && (
        <AntButton onClick={handelGoBack}>
          {messages['dialog.button.goBack']}
        </AntButton>
      )}
      {type !== TYPES_DATA_SHARING.list_api_share && (
        <AntButton
          loading={loadingGrantPermissions}
          disabled={disableBtnContinue()}
          type='primary'
          onClick={handleContinue}>
          {type === TYPES_DATA_SHARING.select_table && isConfigPermission
            ? isErrorGrantPermission
              ? messages['form.formTitleGrantingRetry']
              : messages['form.formTitleGrantingAccess']
            : messages['common.continue']}
        </AntButton>
      )}

      {/* grant permissions err */}
      <AntModal
        title={
          <h4
            style={{
              color: 'red',
              margin: 0,
            }}>
            Có lỗi xảy ra khi cấp quyền !
          </h4>
        }
        bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        centered
        open={isModalOpen}
        footer={null}
        size={MODAL_SIZE.MEDIUM}>
        {listErrorGrantPermission}
      </AntModal>
      {rowSelection?.selectedRowKeys?.length > 0 &&
        type === TYPES_DATA_SHARING.select_table &&
        isConfigPermission &&
        isErrorGrantPermission && (
          <AntButton
            type='primary'
            danger
            onClick={() => {
              setIsModalOpen(true);
            }}>
            Kiểm tra lỗi
          </AntButton>
        )}
    </div>
  );
}

export default ActionConfig;
