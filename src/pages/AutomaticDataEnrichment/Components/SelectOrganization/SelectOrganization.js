import { Col, Row, Skeleton, Table } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import style from './SelectOrganization.module.scss';
import clsx from 'clsx';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_ID_ORGANIZATION_AUTO_DATA,
  ADD_SOURCE_ID_AUTO_DATA,
} from 'src/shared/constants/ActionTypes';
import useIntl from 'react-intl/lib/src/components/useIntl';

SelectOrganization.propTypes = {
  next: PropTypes.func,
};

function SelectOrganization({ next }) {
  const { messages } = useIntl();
  const idOrganizationOld = useSelector(
    (state) => state?.common?.automaticDataEnrichment?.organizationId,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    idOrganizationOld ? [idOrganizationOld] : [],
  );
  const dispatch = useDispatch();

  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.SELECT_ORGANIZATION,
      body: {
        filters: [],
        pageable: {
          page: 1,
          page_size: 100000,
        },
      },
    },
    [],
  );
  const dataListOrganization = data?.result?.items || [];
  const dataResponseSort = dataListOrganization?.sort((a, b) => b?.id - a?.id);

  const dataRenderTable = dataResponseSort?.map((item) => {
    return {
      ...item,
      key: item?.id,
    };
  });

  const columns = [
    {
      title: messages['table.organizationName'],
      dataIndex: 'display_name',
      key: 'display_name',
      width: 500,
    },
    {
      title: messages['table.organizationCode'],
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: messages['table.nationCode'],
      dataIndex: 'country_code',
      key: 'country_code',
    },
    {
      title: messages['table.organizationTelephone'],
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleContinue = () => {
    dispatch({
      type: ADD_ID_ORGANIZATION_AUTO_DATA,
      payload: selectedRowKeys[0],
    });
    dispatch({ type: ADD_SOURCE_ID_AUTO_DATA, payload: '' });
    next();
  };
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <div className={clsx(style.wrapSelectOrganization)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <h4>{messages['sidebar.select_organization']}</h4>
              <Table
                rowSelection={rowSelection}
                scroll={{ y: 450 }}
                columns={columns}
                dataSource={dataRenderTable}
                // pagination={false}
              />
            </Col>
            <Col span={24}>
              <div className={clsx(style.organizationRight)}>
                <AntButton
                  type='primary'
                  onClick={handleContinue}
                  disabled={selectedRowKeys.length > 0 ? false : true}>
                  {messages['common.continue']}
                </AntButton>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default SelectOrganization;
