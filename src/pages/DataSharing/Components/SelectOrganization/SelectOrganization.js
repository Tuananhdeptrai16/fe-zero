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

SelectOrganization.propTypes = {};

function SelectOrganization() {
  const { dataStep } = useGetDataConfig();
  const { organization } = dataStep;
  const { messages } = useIntl();

  return (
    <div>
      <AppPageMetadata
        title={messages['sidebar.select_organization_permission']}
      />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <h4 className='mb-1'>
                {messages['sidebar.select_organization_permission']}
              </h4>
            </Col>
            <Col span={24}>
              <DataTable
                url={API.SEARCH_ORGANIZATION}
                itemSelected={{
                  type: 'radio',
                  action: 'table.continue',
                  clickAction: () => {},
                  preItemSelect: (items) => {
                    return items;
                  },
                  prevData: organization ? [organization] : null,
                }}
                columns={[
                  {
                    title: <IntlMessages id='table.organizationCode' />,
                    dataIndex: 'name',
                    width: 180,
                    fixed: 'left',
                    key: 'name',
                    sorter: true,
                  },
                  {
                    title: <IntlMessages id='table.organizationName' />,
                    dataIndex: 'display_name',
                    width: 200,
                    key: 'display_name',
                  },
                ]}>
                <ActionConfig type={TYPES_DATA_SHARING.select_organization} />
              </DataTable>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SelectOrganization;
