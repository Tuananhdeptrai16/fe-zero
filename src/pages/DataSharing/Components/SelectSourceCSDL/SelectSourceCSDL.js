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

SelectSourceCSDL.propTypes = {};

function SelectSourceCSDL() {
  const { dataStep, isConfigPermission } = useGetDataConfig();
  const { sourceCSDL } = dataStep;
  const { messages } = useIntl();

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.select_source_csdl']} />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <h4 className='mb-1'>{messages['sidebar.select_source_csdl']}</h4>
            </Col>
            <Col span={24}>
              <DataTable
                url={
                  isConfigPermission
                    ? API.SEARCH_DATA_WAREHOUSE
                    : API.SEARCH_DATA_WAREHOUSE_BY_RETRY
                }
                itemSelected={{
                  type: 'radio',
                  action: 'table.continue',
                  clickAction: () => {},
                  preItemSelect: (items) => {
                    return items;
                  },
                  prevData: sourceCSDL ? [sourceCSDL] : null,
                }}
                columns={[
                  {
                    title: (
                      <IntlMessages id='sidebar.select_source_name_csdl' />
                    ),
                    dataIndex: 'name',
                    width: 200,
                    fixed: 'left',
                    key: 'name',
                  },
                ]}>
                <ActionConfig type={TYPES_DATA_SHARING.select_source} />
              </DataTable>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SelectSourceCSDL;
