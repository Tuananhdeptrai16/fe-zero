import { useState } from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import {
  isErrorResponse,
  getMessageResponse,
  getResultResponse,
  getCodeResponse,
  getErrorsResponse,
} from 'src/shared/utils/Service';
import { isEmpty, isPromise } from 'src/shared/utils/Typeof';
import notification from 'src/shared/utils/notification';

const useCallApi = ({
  success,
  callApi,
  error = undefined,
  useToastShowError = true,
}) => {
  const { messages } = useIntl();
  const [loading, setLoading] = useState(false);

  const send = (params) => {
    return new Promise((resolve, reject) => {
      let rs = callApi(params);
      if (!isPromise(rs)) {
        reject({});
        return;
      }
      setLoading(true);
      rs.then((dataFromServer = {}) => {
        setLoading(false);
        if (
          isErrorResponse(dataFromServer) ||
          isErrorResponse(dataFromServer.data) ||
          dataFromServer.status >= 400
        ) {
          const errorMessage = getMessageResponse(dataFromServer.data);
          const errors = getErrorsResponse(dataFromServer);

          if (useToastShowError) {
            if (isEmpty(errors)) {
              notification.error(errorMessage);
            } else {
              const textError = Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ));
              notification.error(textError);
            }
          }
          // reject({
          //   code: getCodeResponse(dataFromServer),
          //   message: errorMessage,
          //   raw: dataFromServer,
          // });
          if (error) {
            error({
              code: getCodeResponse(dataFromServer),
              message: errorMessage,
              raw: dataFromServer,
            });
          }
        } else {
          resolve(getResultResponse(dataFromServer?.data), params);
          if (success) {
            success(getResultResponse(dataFromServer?.data), params);
          }
        }
      }).catch(function (thrown) {
        setLoading(false);

        const messageError = getMessageResponse(thrown);
        const errors = getErrorsResponse(thrown?.raw);
        if (isEmpty(errors)) {
          const messageShow = messages?.[messageError] || messageError;
          notification.error(messageShow);
          reject({
            code: getCodeResponse(thrown),
            message: messageShow,
            raw: thrown,
          });
          if (error) {
            error({
              code: getCodeResponse(thrown),
              message: messageShow,
              raw: thrown,
            });
          }
        } else {
          const textError = Object.values(errors).map((error, index) => (
            <div key={index}>{error}</div>
          ));
          notification.error(textError);
          reject({
            code: getCodeResponse(thrown),
            message: Object.values(errors).join('\n'),
            raw: thrown,
          });
          if (error) {
            error({
              code: getCodeResponse(thrown),
              message: Object.values(errors).join('\n'),
              raw: thrown,
            });
          }
        }
      });
    });
  };

  return {
    loading,
    send,
  };
};

export default useCallApi;
