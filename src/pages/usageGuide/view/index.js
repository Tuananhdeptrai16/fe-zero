import { useRef, useState } from 'react';
import { Col, List, Row } from 'antd';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import '../../help/index.style.less';
import AppCard from 'src/@crema/core/AppCard';
import { CATEGORY_TOPIC } from 'src/shared/constants/help.constant';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import { ListUsageGuide } from 'src/pageComponents/usageGuide/ListUsageGuide';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { DEFAULT_PERMISSION_SELECT } from 'src/shared/constants/DataSelect';
import AppScrollbar from 'src/@crema/core/AppScrollbar';
import { useReactToPrint } from 'react-to-print';

export const UsageGuideViewPage = () => {
  const { messages } = useIntl();
  const componentRef = useRef();
  const [activePage, setActivePage] = useState(CATEGORY_TOPIC.ALL);
  const { isLoading, data } = useFetch({
    url: API.GET_ALL_PERMISSIONS,
    method: METHOD_FETCH.GET,
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const listPagePermission = DEFAULT_PERMISSION_SELECT(data?.result?.items);

  return (
    <>
      <AppPageMetadata title={messages['usage.title']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate title={messages['usage.title']} />
      </SubHeaderApp>
      <Row gutter={20} ref={componentRef}>
        <Col md={8}>
          <AppScrollbar style={{ maxHeight: '80vh' }}>
            <List
              className={'usageListItem'}
              loading={isLoading}
              style={{ background: '#FFFFFF' }}
              header={<h4>{messages['usage.page']}</h4>}
              bordered
              dataSource={[
                {
                  id: CATEGORY_TOPIC.ALL,
                  label: 'Tất cả',
                },
                ...listPagePermission,
              ]}
              renderItem={(item) => (
                <List.Item
                  onClick={() => setActivePage(item)}
                  className={clsx(
                    'itemTopicCategory pointer',
                    item?.id === activePage?.id && 'active',
                  )}>
                  {item?.label}
                </List.Item>
              )}
            />
          </AppScrollbar>
        </Col>
        <Col md={16}>
          <AppCard bodyStyle={{ paddingTop: 12 }}>
            <ListUsageGuide activePage={activePage} handlePrint={handlePrint} />
          </AppCard>
        </Col>
      </Row>
    </>
  );
};
