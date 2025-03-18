import React from 'react';
import { Col, Row } from 'antd';
import { useIntl } from 'react-intl';
import IntlMessages from 'src/@crema/utility/IntlMessages';

import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import ActionConfig from '../ActionConfig/ActionConfig';
import { TYPES_DATA_SHARING } from 'src/shared/constants/DataFixed';
import useGetDataConfig from '../../Hook/useGetDataConfig';

// import PropTypes from 'prop-types';

SelectSubOrganization.propTypes = {};

function SelectSubOrganization() {
  const { dataStep } = useGetDataConfig();
  const { organization, sub_organization } = dataStep;
  const { messages } = useIntl();
  const listSubSetOrganizations = sub_organization || [];

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.select_subset_organization']} />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <h4 className='mb-1'>
                {messages['sidebar.select_subset_organization']}
              </h4>
            </Col>
            <Col span={24}>
              <DataTable
                url={API.SEARCH_DEPARTMENT}
                itemSelected={{
                  type: 'radio',
                  action: 'table.continue',
                  clickAction: () => {},
                  preItemSelect: (items) => {
                    return items;
                  },
                  prevData: listSubSetOrganizations,
                }}
                initTable={{
                  filter: [
                    {
                      name: 'organization_id',
                      operation: 'eq',
                      value: organization,
                    },
                  ],
                }}
                columns={[
                  {
                    title: <IntlMessages id='table.subsetOrganization' />,
                    dataIndex: 'department_name',
                    width: 180,
                    fixed: 'left',
                    key: 'department_name',
                    sorter: true,
                  },
                  {
                    title: <IntlMessages id='table.parentOrganizationName' />,
                    dataIndex: 'organization',
                    width: 200,
                    key: 'organization',
                    render: (data) => {
                      return <span>{data?.display_name}</span>;
                    },
                  },
                ]}>
                <ActionConfig
                  type={TYPES_DATA_SHARING.select_subset_organization}
                />
              </DataTable>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SelectSubOrganization;
