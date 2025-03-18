import { Col, Row, Table, Checkbox, Spin } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import style from './CreateFilter.module.scss';
import clsx from 'clsx';
import AntModal from 'src/@crema/component/AntModal';
import AntInput from 'src/@crema/component/AntInput';
import notification from 'src/shared/utils/notification';
import { useDispatch, useSelector } from 'react-redux';
import { DoubleRightOutlined } from '@ant-design/icons';
import { CLEAR_ADD_INDEX, NEW_COLUMNS } from 'src/shared/constants/ActionTypes';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import API from 'src/@crema/services/apis';
import { useNavigate } from 'react-router-dom';
import routes from 'src/config/routes.config';
import { LIST_ID_ORGANIZATION_SEARCH_ENGINE } from 'src/shared/constants/DataFixed';

function CreateFilter({ prevStep }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useCallAPI server

  const onSaveToServer = (data) => {
    return instanceCoreApi.post(API.ADD_INDEX, data);
  };
  const sourceActiveEngine = useSelector(
    (state) => state?.common?.sourceEngineActive,
  );

  const renderLinkAfterAddIndex = () => {
    switch (sourceActiveEngine) {
      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.medicalIndustry:
        return routes.search_index_list_medical;

      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.education:
        return routes.search_index_list_education;

      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.judicialBranch:
        return routes.search_index_list_judicial;

      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.socialInsurance:
        return routes.search_index_list_social_insurance;

      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.transportation:
        return routes.search_index_list_transportation;

      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.invalidsSocialAffairs:
        return routes.search_index_list_invalids_social_affairs;

      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.informationCommunication:
        return routes.search_index_list_information_communication;

      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.cultureSportsTourism:
        return routes.search_index_list_culture_sports_tourism;

      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.investmentPlan:
        return routes.search_index_list_investment_plan;
      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.financeTreasury:
        return routes.search_index_list_finance_treasury;
      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.construction:
        return routes.search_index_list_construction_industry;
      case LIST_ID_ORGANIZATION_SEARCH_ENGINE.internalAffairs:
        return routes.search_index_list_internal_affairs;
      default:
        return routes.search_index_list_medical;
    }
  };

  const { loading, send } = useCallApi({
    success: () => {
      notification.success('Tạo mới chỉ mục tìm kiếm thành công');
      setIsModalOpen(false);

      dispatch({ type: CLEAR_ADD_INDEX });

      setTimeout(() => {
        navigate(renderLinkAfterAddIndex());
      }, 300);
    },
    callApi: onSaveToServer,
  });

  const oldRenameColumns = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.newColumns,
  );
  const oldFilterColumns = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.newColumns,
  );
  const dataAddIndexServer = useSelector(
    (state) => state?.common?.dataSourceAddIndex,
  );
  const createFilterColumns = oldRenameColumns?.map((item) => {
    return {
      ...item,
      filter: false,
    };
  });

  const [lisColumnFilter, setListColumnFilter] = useState(
    oldFilterColumns?.length > 0 ? oldFilterColumns : createFilterColumns,
  );

  // const navigate = useNavigate();
  const showModal = () => {
    dispatch({ type: NEW_COLUMNS, payload: lisColumnFilter });
    setIsModalOpen(true);
  };

  // call api server
  const handleAddIndexServer = () => {
    const configColumns = dataAddIndexServer?.newColumns?.map((item) => {
      return {
        old_field_name: item?.id,
        new_field_name: item?.newColumn,
        data_type: item?.type,
        filter_config: item?.filter ? item?.filter : false,
      };
    });

    const newDataSaveServer = {
      config: configColumns,
      table_name: dataAddIndexServer?.nameTable,
      index_name: dataAddIndexServer?.renameIndex,
      source_name: dataAddIndexServer?.idSource,
    };
    send(newDataSaveServer);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // columns table
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 60,
      align: 'center',
    },
    {
      title: 'Tên cột gốc',
      dataIndex: 'name',
      render: (data) => {
        return (
          <div className={clsx(style.wrapColumnOld)}>
            <span>{data}</span>
            <div>
              <DoubleRightOutlined />
              <DoubleRightOutlined />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Tên cột thay thế',
      dataIndex: 'newColumn',
    },
    {
      title: 'Thêm bộ lọc',
      dataIndex: 'filter',
      align: 'center',
      width: 200,
      render: (_, record) => {
        return !isModalOpen ? (
          <Checkbox
            checked={record?.filter}
            onChange={(e) => {
              const valueChecked = e?.target?.checked;
              const newRecord = {
                ...record,
                filter: valueChecked,
              };
              setListColumnFilter((prev) => {
                const index = prev?.findIndex((item) => {
                  return item?.key === record?.key;
                });
                if (index === -1) {
                  return [...prev, newRecord];
                } else {
                  const newColumnCopy = [...prev];
                  newColumnCopy[index].filter = valueChecked;
                  return newColumnCopy;
                }
              });
            }}
          />
        ) : (
          <Checkbox checked={record?.filter} disabled />
        );
      },
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <h4
              style={{
                marginTop: '10px',
              }}>
              Lựa chọn trường để tạo bộ lọc khi tìm kiếm
            </h4>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={lisColumnFilter}
        />
        <div className={clsx(style.actions)}>
          <AntButton onClick={prevStep}>Quay lại</AntButton>
          {
            <AntButton type='primary' onClick={showModal}>
              Xác nhận
            </AntButton>
          }
        </div>
      </Col>
      <Col span={24}>
        <AntModal
          centered
          title='Thông tin yêu cầu'
          size='large'
          open={isModalOpen}
          onOk={handleAddIndexServer}
          okText='Xác nhận'
          onCancel={handleCancel}>
          <SimpleBarReact className={clsx(style.simpleBarReact)}>
            {loading ? (
              <Spin>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <p>Tên chỉ mục </p>
                    <AntInput
                      defaultValue={dataAddIndexServer?.renameIndex}
                      disabled
                    />
                  </Col>
                  <Col span={24}>
                    <Table
                      pagination={false}
                      columns={columns}
                      dataSource={lisColumnFilter}
                    />
                  </Col>
                </Row>
              </Spin>
            ) : (
              <>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <p>Tên chỉ mục </p>
                    <AntInput
                      defaultValue={dataAddIndexServer?.renameIndex}
                      disabled
                    />
                  </Col>
                  <Col span={24}>
                    <Table
                      pagination={false}
                      columns={columns}
                      dataSource={lisColumnFilter}
                    />
                  </Col>
                </Row>
              </>
            )}
          </SimpleBarReact>
        </AntModal>
      </Col>
    </Row>
  );
}

export default CreateFilter;
