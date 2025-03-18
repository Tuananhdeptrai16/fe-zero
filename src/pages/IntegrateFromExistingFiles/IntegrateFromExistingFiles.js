import React, { useState } from 'react';
import { Table, Tooltip, Row, Col, Space, Image } from 'antd';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import FormUploadFile from './FormUploadFile/FormUploadFile';
import { convertSize } from 'src/shared/utils/convertSize';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import {
  DeleteOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  ArrowLeftOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileJpgOutlined,
  FileGifOutlined,
  FileExcelOutlined,
  FileZipOutlined,
} from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import AntModal from 'src/@crema/component/AntModal';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { useSearchParams } from 'react-router-dom';
import RenderFileLoadWrapper from 'src/@crema/component/RenderFileLoad';
import PreviewPDF from 'src/@crema/core/DataDisplay/PreviewPDF';
import { convertURLToFileType, getFileTypeUrl } from 'src/shared/utils/filter';
import CustomComponentFileLoad from 'src/@crema/component/CustomComponentFileLoad';
import { KEY_SEARCH_PARAM_DT } from 'src/shared/constants/DataTable';
import { reduceTask } from 'src/shared/utils/Object';
import { MAP_MIME_TYPE_2_EXTENSION } from 'src/shared/constants/MediaTypes';
import style from './IntegrateFromExistingFiles.module.scss';
import clsx from 'clsx';

IntegrateFromExistingFiles.propTypes = {};

function IntegrateFromExistingFiles() {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleteFileMany, setIsDeleteFileMany] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDemoFile, setIsViewDemoFile] = useState(false);
  const [nameFile, setNameFile] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [override, setOverride] = useState(false);

  const valueNameFolder =
    searchParams.get(KEY_SEARCH_PARAM_DT.PATH) || 'destination/';
  // get all file
  const {
    data,
    isLoading: loadingGetFile,
    fetchData,
  } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_ALL_FILE_MIN_IO,
      body: {
        prefix: valueNameFolder,
      },
    },
    [valueNameFolder],
  );
  const dataGetAllFiles = data?.result?.objects || [];
  const dataRenderTable = dataGetAllFiles?.map((item, index) => {
    return {
      ...item,
      key: item?.object_name || index,
    };
  });

  const dataSortByDate = dataRenderTable?.sort((a, b) => {
    return new Date(b?.last_modified) - new Date(a?.last_modified);
  });

  // delete one file
  const deleteOneFile = () => {
    return instanceCoreApi.post(API.DELETE_FILE_MIN_IO, {
      object_name: rowData?.object_name,
    });
  };

  // delete many file
  const deleteManyFile = () => {
    return instanceCoreApi.post(API.DELETE_MANY_FILE_MIN_IO, {
      object_names: selectedRowKeys,
    });
  };

  const renderIconByType = (type) => {
    switch (MAP_MIME_TYPE_2_EXTENSION[type]) {
      case MAP_MIME_TYPE_2_EXTENSION['.pdf']:
        return <FilePdfOutlined />;
      case MAP_MIME_TYPE_2_EXTENSION['.png']:
        return <FileImageOutlined />;
      case MAP_MIME_TYPE_2_EXTENSION['.jpeg']:
        return <FileJpgOutlined />;
      case MAP_MIME_TYPE_2_EXTENSION['.jpg']:
        return <FileJpgOutlined />;
      case MAP_MIME_TYPE_2_EXTENSION['.gif']:
        return <FileGifOutlined />;
      case MAP_MIME_TYPE_2_EXTENSION['.mpeg']:
        return <FileImageOutlined />;
      case MAP_MIME_TYPE_2_EXTENSION['.csv']:
        return <FileExcelOutlined />;
      case MAP_MIME_TYPE_2_EXTENSION['.jar']:
        return <FileZipOutlined />;
      case MAP_MIME_TYPE_2_EXTENSION['.zip']:
        return <FileZipOutlined />;
      default:
        return <FileDoneOutlined />;
    }
  };

  const columns = [
    {
      title: <IntlMessages id='sidebar.file_name' />,
      dataIndex: 'object_name',
      width: 160,
      fixed: 'left',
      key: 'object_name',
      sorter: true,
      render: (data, record) => {
        if (record?.dir) {
          return (
            <div
              onClick={() => {
                setSearchParams((params) => {
                  params.set(KEY_SEARCH_PARAM_DT.PATH, data);
                  return params;
                });
              }}
              className='d-flex gap-1 color_primary text_hover'>
              <span>{data}</span>
            </div>
          );
        } else {
          return (
            <div
              className='color_primary text_hover'
              onClick={() => {
                setIsViewDemoFile(true);
                setNameFile(data);
              }}>
              <div className='d-flex gap-1 '>
                <span>{data}</span>
              </div>
            </div>
          );
        }
      },
    },
    {
      title: <IntlMessages id='sidebar.type_file' />,
      dataIndex: 'dir',
      width: 140,
      key: 'type_file',
      render: (data, record) => {
        const typeFile = getFileTypeUrl(record?.object_name);
        const keyTypeFile = Object.keys(MAP_MIME_TYPE_2_EXTENSION);
        const typeIconFile = keyTypeFile?.find((item) => {
          return MAP_MIME_TYPE_2_EXTENSION[item] === typeFile;
        });

        if (data) {
          return (
            <div className='d-flex gap-1'>
              <FolderOpenOutlined />
              <span>Thư mục</span>
            </div>
          );
        } else {
          return (
            <div className='d-flex gap-1'>
              {renderIconByType(typeIconFile)}
              <span>{typeFile ? typeFile : 'File'}</span>
            </div>
          );
        }
      },
    },
    {
      title: <IntlMessages id='sidebar.file_size' />,
      dataIndex: 'size',
      width: 160,
      key: 'size',
      render: (data) => {
        return <span>{convertSize(data)}</span>;
      },
    },
    {
      title: <IntlMessages id='sidebar.date_update_file' />,
      dataIndex: 'last_modified',
      width: 180,
      key: 'last_modified',
      render: (data) => {
        return <span>{RenderDateTime({ value: data })}</span>;
      },
    },
    {
      title: 'Hành động',
      width: 100,
      dataIndex: 'last_modified',
      key: 'actions',
      fixed: 'right',
      align: 'center',
      render: (_, data) => {
        return (
          <div className='d-flex justify-center items-center'>
            <Tooltip title='Xóa tập tin'>
              <AntButton
                onClick={() => {
                  setRowData(data);
                  setIsDeleteFileMany(false);
                  setIsDialogOpen(true);
                }}
                shape='circle'
                className='icon-btn'
                icon={
                  <DeleteOutlined
                    style={{
                      color: '#416ef0',
                    }}
                  />
                }></AntButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const fileType = convertURLToFileType(nameFile);
  const pathArr = valueNameFolder?.split('/') || [];
  return (
    <Row
      className={clsx(style.wrapIntegrateFromExistingFiles)}
      gutter={[12, 12]}
      style={{
        backgroundColor: 'white',
        borderRadius: '4px',
        padding: '16px',
      }}>
      <Col span={24}>
        <AppPageMetadata title={messages['sidebar.list_integrated_data']} />
        <Space className='d-flex justify-between items-center'>
          <div>
            {pathArr.length > 2 && (
              <AntButton
                className='mr-4'
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                  const newPath =
                    [...pathArr.splice(0, pathArr.length - 2)].join('/') + '/';
                  setSearchParams((params) => {
                    params.set(KEY_SEARCH_PARAM_DT.PATH, newPath);
                    return params;
                  });
                }}>
                Quay lại
              </AntButton>
            )}
            {selectedRowKeys.length > 0 ? (
              <AntButton
                type='primary'
                onClick={() => {
                  setIsDeleteFileMany(true);
                  setIsDialogOpen(true);
                }}>
                Xóa {selectedRowKeys.length} tập tin
              </AntButton>
            ) : (
              <span></span>
            )}
          </div>
          <AntButton
            type='primary'
            onClick={() => {
              setIsModalOpen(true);
            }}>
            Chọn nguồn dữ liệu tập tin
          </AntButton>
        </Space>
      </Col>
      <Col span={24}>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          loading={loadingGetFile}
          dataSource={dataSortByDate}
          columns={columns}
          scroll={{
            x: 1200,
          }}
        />
        <DialogConfirm
          key={rowData?.id}
          visible={isModalOpen}
          onSuccess={() => {
            fetchData();
            setSelectedRowKeys([]);
          }}
          onClose={() => {
            setIsModalOpen(false);
          }}
          textTitle={'Tải lên tập tin'}
          textSuccess={'Tải lên tập tin thành công'}
          textButtonConfirm={'Tải lên'}
          onSaveToServer={(data) => {
            return new Promise((resolve) => {
              reduceTask(data?.upload_file, (file) => {
                const bodyFormData = new FormData();
                bodyFormData.append('file', file?.originFileObj);
                bodyFormData.append('folder', valueNameFolder);
                bodyFormData.append('override', override);

                return instanceCoreApi.post(
                  API.UPLOAD_FILE_MIN_IO,
                  bodyFormData,
                  {
                    headers: { 'Content-Type': 'multipart/form-data' },
                  },
                );
              }).then((rs) => {
                resolve({
                  status: 200,
                  data: {
                    code: 0,
                    message: 'OK',
                    result: rs,
                  },
                });
              });
            });
          }}>
          <FormUploadFile setOverride={setOverride} folder={valueNameFolder} />
        </DialogConfirm>
        <AntModal
          footer={null}
          size={MODAL_SIZE.LARGE}
          title={'Xem trước tập tin'}
          open={isViewDemoFile}
          centered
          onCancel={() => setIsViewDemoFile(false)}>
          <div
            style={{
              maxHeight: '80vh',
              overflow: 'auto',
            }}>
            {nameFile &&
              (fileType === 'image/png' || fileType === 'image/jpeg' ? (
                <RenderFileLoadWrapper src={nameFile} component={Image} />
              ) : fileType === 'application/pdf' ? (
                <PreviewPDF src={nameFile} height={600} />
              ) : (
                <RenderFileLoadWrapper
                  src={nameFile}
                  component={CustomComponentFileLoad}
                  fileName={nameFile}
                />
              ))}
          </div>
        </AntModal>

        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onSuccess={() => {
            fetchData();
            setSelectedRowKeys([]);
          }}
          onClose={() => {
            setRowData(null);
            setIsDialogOpen(false);
          }}
          textTitle={'confirm.deleteFile'}
          textSuccess={'confirm.deleteFileSuccess'}
          onSaveToServer={isDeleteFileMany ? deleteManyFile : deleteOneFile}>
          <p>
            <IntlMessages id='confirm.deleteFileSure' />
            <span className='warning-text-color'>
              {isDeleteFileMany
                ? selectedRowKeys?.map((item, index) => {
                    return <span key={index}>{item}, </span>;
                  })
                : rowData?.object_name}
            </span>
          </p>
        </DialogConfirm>
      </Col>
    </Row>
  );
}

export default IntegrateFromExistingFiles;
