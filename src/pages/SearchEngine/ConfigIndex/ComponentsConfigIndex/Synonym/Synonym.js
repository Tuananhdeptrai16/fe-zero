import {
  ArrowRightOutlined,
  DeleteOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Table, Radio, Space, Skeleton, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import style from './Synonym.module.scss';
import clsx from 'clsx';
import AntModal from 'src/@crema/component/AntModal';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import { useSelector } from 'react-redux';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormAddListSynonym from './FormAddListSynoym';
import TextArea from 'antd/lib/input/TextArea';
import useCallApi from 'src/@crema/hook/useCallApi';
import { getMessageResponse } from 'src/shared/utils/Service';
import useIntl from 'react-intl/lib/src/components/useIntl';
import notification from 'src/shared/utils/notification';
import RenderTagUI from 'src/@crema/component/TableRender/RenderTagUI';
import { handleRedundantData } from 'src/shared/utils/Object';

function Synonym() {
  const configIndexAll = useSelector((state) => state?.common?.configIndex);
  const { messages } = useIntl();
  const [valueNameSearchWord, setValueNameSearchWord] = useState('');
  const [tags, setTags] = useState([]);
  const [valueSynonym, setValueSynonym] = useState('synonym');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isErrorTypeSynonym, setIsErrorTypeSynonym] = useState(false);

  useEffect(() => {
    if (rowData) {
      setValueSynonym(rowData?.type);
      setTags(rowData?.synonym);
      setValueNameSearchWord(rowData?.name);
    } else {
      setValueSynonym('synonym');
      setTags([]);
      setValueNameSearchWord('');
    }
  }, [rowData]);

  const showModal = () => {
    setIsModalOpen(true);
    setRowData(null);
  };

  useEffect(() => {
    if (valueSynonym === 'synonym') {
      if (tags?.length < 2) {
        setIsErrorTypeSynonym(true);
      } else {
        setIsErrorTypeSynonym(false);
      }
    } else {
      setIsErrorTypeSynonym(false);
    }
  }, [tags, valueSynonym]);
  // call list all synonym
  const {
    data: dataSynonym,
    isLoading,
    fetchData,
  } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_ALL_SYNONYM,
      body: {
        filters: [
          {
            name: 'index_name',
            operation: 'eq',
            value: configIndexAll?.index_name,
          },
        ],
        pageable: {
          page: 1,
          page_size: 1000,
        },
      },
    },
    [configIndexAll?.index_name],
  );
  // useCallAPI server
  const onSaveToServer = (data) => {
    return instanceCoreApi.post(data?.api, data?.payload);
  };

  const { loading: loadingCreateSynonym, send } = useCallApi({
    success: (res) => {
      notification.success(
        res?.result
          ? res?.result
          : rowData
          ? 'Cập nhật từ đồng nghĩa thành công'
          : 'Tạo mới từ đồng nghĩa thành công',
      );
      setIsModalOpen(false);
      setRowData(undefined);
      fetchData();
    },
    callApi: onSaveToServer,
    error: (err) => {
      const messageError =
        getMessageResponse(err) || 'Thêm từ đồng nghĩa thất bại';
      notification.error(messages[messageError] || messageError);
      setRowData(null);
    },
  });
  const handleOk = () => {
    const dataUpdateServer = {
      type: valueSynonym,
      name:
        valueSynonym === 'synonym'
          ? ''
          : handleRedundantData(valueNameSearchWord),
      index_name: configIndexAll?.index_name,
      synonym: tags,
    };
    if (!rowData) {
      const requestCreate = {
        api: API.CREATE_SYNONYM,
        payload: dataUpdateServer,
      };
      send(requestCreate);
    } else {
      const requestUpdate = {
        api: API.UPDATE_SYNONYM(rowData?.id),
        payload: dataUpdateServer,
      };
      send(requestUpdate);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataListSynonyms =
    dataSynonym?.result?.items
      ?.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
      })
      .sort((a, b) => b?.id - a?.id) || [];

  const dataRenderTable = dataListSynonyms?.map((item, index) => {
    return {
      ...item,
      index: index + 1,
    };
  });

  // onchange radio
  const onChange = (e) => {
    setValueSynonym(e?.target?.value);
  };
  const deleteToServer = () => {
    return instanceCoreApi.post(API.DELETE_SYNONYM(rowData?.id));
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 60,
    },
    {
      title: messages['common.type'],
      dataIndex: 'type',
      key: 'type',
      width: 200,
      render: (data) => {
        return (
          <span>
            {data === 'synonym'
              ? messages['common.synonym']
              : messages['common.onewaySynonyms']}
          </span>
        );
      },
    },
    {
      title: messages['table.synonymDetails'],
      dataIndex: 'synonym',
      key: 'synonym',
      render: (_, record) => {
        return (
          <div className={clsx(style.renderTextSynonym)}>
            {record?.name && (
              <span className={clsx(style.text)}>{record?.name}</span>
            )}
            {record?.type === 'synonym' ? (
              <></>
            ) : (
              <>
                <ArrowRightOutlined
                  style={{
                    padding: '0 4px',
                  }}
                />
              </>
            )}
            {<RenderTagUI value={record?.synonym} />}
          </div>
        );
      },
    },
    {
      title: messages['table.action'],
      key: 'action',
      align: 'center',
      width: 180,
      render: (_, record) => {
        return (
          <div className={clsx(style.wrapActionEdit)}>
            <Tooltip
              title={messages['confirm.updateFormSynonym']}
              key={messages['confirm.updateFormSynonym']}>
              <FormOutlined
                onClick={() => {
                  setRowData(record);
                  setIsModalOpen(true);
                }}
                className={clsx(style.iconEdit)}
              />
            </Tooltip>

            <Tooltip
              title={messages['confirm.deleteFormSynonym']}
              key={messages['confirm.deleteFormSynonym']}>
              <DeleteOutlined
                onClick={() => {
                  setIsDialogOpen(true);
                  setRowData(record);
                }}
                className={clsx(style.iconDel)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <div className={clsx(style.wrapActionAddSynonym)}>
            <AntButton type='primary' onClick={showModal}>
              {messages['common.addSynonyms']}
            </AntButton>
          </div>
          <Table
            columns={columns}
            dataSource={dataRenderTable}
            scroll={{
              y: 'calc(100vh - 400px)',
            }}
          />
          <AntModal
            title={
              !rowData
                ? messages['common.addSynonyms']
                : messages['common.updateSynonyms']
            }
            centered
            open={isModalOpen}
            onOk={handleOk}
            footer={
              <div>
                <AntButton onClick={handleCancel}>Hủy</AntButton>
                <AntButton
                  disabled={
                    valueSynonym === 'synonym_1'
                      ? Boolean(valueNameSearchWord) === false ||
                        tags.length === 0
                        ? true
                        : false
                      : tags.length < 2
                      ? true
                      : false
                  }
                  onClick={handleOk}
                  loading={loadingCreateSynonym}
                  type='primary'>
                  {!rowData
                    ? messages['common.addSynonyms']
                    : messages['common.updateSynonyms']}
                </AntButton>
              </div>
            }
            className={clsx(style.formAddSynonym)}
            onCancel={handleCancel}>
            <div className={clsx(style.formAddSynonym_content)}>
              <div className={clsx(style.formAddSynonym_content_header)}>
                <h4 className={clsx(style.title)}>Loại</h4>
                <Radio.Group
                  onChange={onChange}
                  value={valueSynonym}
                  className={clsx(style.radio_types)}>
                  <Space direction='vertical'>
                    <Radio value={'synonym'}>
                      {messages['common.synonym']}
                    </Radio>
                    <Radio value={'synonym_1'}>
                      {messages['common.onewaySynonyms']}
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div className={clsx(style.formAddSynonym_content_main)}>
                {valueSynonym === 'synonym_1' && (
                  <>
                    <h4 className={clsx(style.title_main)}>
                      {messages['common.searchWords']}
                    </h4>
                    <TextArea
                      rows={4}
                      value={valueNameSearchWord}
                      onChange={(e) => {
                        setValueNameSearchWord(e?.target?.value);
                      }}
                    />
                  </>
                )}

                <div className={clsx(style.formAddSynonym_content_main)}>
                  <h4 className={clsx(style.title_main)}>
                    {valueSynonym === 'synonym'
                      ? messages['common.synonym']
                      : messages['common.onewaySynonyms']}
                  </h4>
                  <FormAddListSynonym tags={tags} setTags={setTags} />
                  {isErrorTypeSynonym && (
                    <p
                      style={{
                        color: 'red',
                        marginTop: '6px',
                      }}>
                      Nhập tối thiểu 2 từ đồng nghĩa !
                    </p>
                  )}
                </div>
              </div>
            </div>
          </AntModal>
          {/* delete */}
          <DialogConfirm
            key={'delete'}
            visible={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            textTitle={'confirm.deleteFormSynonym'}
            textSuccess={'confirm.deleteFormSynonymSuccess'}
            onSuccess={() => {
              fetchData();
            }}
            onSaveToServer={deleteToServer}>
            <div className={clsx(style.wrapConfirmDelete)}>
              <IntlMessages id='confirm.deleteFormSynonymSure' />
              <span className='warning-text-color'>
                <div className={clsx(style.renderTextSynonym)}>
                  {rowData?.name && <span> {rowData?.name}</span>}
                  {rowData?.type === 'synonym' ? (
                    <></>
                  ) : (
                    <>
                      <ArrowRightOutlined
                        style={{
                          padding: '0 4px',
                        }}
                      />
                    </>
                  )}{' '}
                  {''} {<RenderTagUI value={rowData?.synonym} />}
                </div>
              </span>
            </div>
          </DialogConfirm>
        </>
      )}
    </div>
  );
}

export default Synonym;
