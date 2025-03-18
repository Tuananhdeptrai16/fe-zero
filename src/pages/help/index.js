import React from 'react';
import { Col, List, Row, Space } from 'antd';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import './index.style.less';
import AppCard from 'src/@crema/core/AppCard';
import { IconCall, MessengerIcon, ZaloIcon } from 'src/@crema/component/icon';
import { ListQA } from 'src/pageComponents/help/ListQA';
import { CATEGORY_TOPIC } from 'src/shared/constants/help.constant';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import routesConfig from 'src/pages/routeConfig';
import IntlMessages from 'src/@crema/utility/IntlMessages';

export const HelpCenterPage = () => {
  const { messages } = useIntl();
  const [activeTopic, setActiveTopic] = React.useState(CATEGORY_TOPIC.ALL);

  const getLowestLevelItems = (menu) => {
    let lowestLevelItems = [];

    menu.forEach((item) => {
      if (item.children && item.type === 'group') {
        lowestLevelItems = lowestLevelItems.concat(
          getLowestLevelItems(item.children),
        );
      } else {
        lowestLevelItems.push(item);
      }
    });

    return lowestLevelItems;
  };

  const lowestLevelItems = getLowestLevelItems(routesConfig);

  const handleRunButtonClick = () => {
    if (activeTopic !== null) {
      const selectedItem = lowestLevelItems.find(
        (item) => item.id === activeTopic,
      );
      if (selectedItem) {
        window.location.href = selectedItem.path;
      }
    }
  };
  return (
    <>
      <AppPageMetadata title={messages['common.helpCenter']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate title={messages['common.helpCenter']} />
      </SubHeaderApp>
      <Row gutter={20}>
        <Col md={8}>
          <List
            style={{
              background: '#FFFFFF',
              overflowX: 'hidden',
              overflowY: 'auto',
              height: '500px',
            }}
            header={<h4>{messages['common.topicCategory']}</h4>}
            bordered
            dataSource={lowestLevelItems}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                onClick={() => setActiveTopic(item?.id)}
                className={clsx(
                  'itemTopicCategory pointer',
                  item?.id === activeTopic && 'active',
                )}>
                <IntlMessages id={item?.messageId} />
              </List.Item>
            )}
          />
          <AppCard
            className={
              'mt-4 d-flex flex-col justify-center items-center text-center'
            }>
            <h4>Bạn vẫn cần trợ giúp?</h4>
            <p>
              Chúng tôi sẽ hỗ trợ bạn trong khung giờ hành chính (7am-5pm). Bạn
              có thể liên hệ với chúng tôi qua các phương thức dưới đây.
            </p>
            <Space>
              <IconCall className={'pointer'} />
              <ZaloIcon className={'pointer'} />
              <MessengerIcon className={'pointer'} />
            </Space>
          </AppCard>
        </Col>
        <Col md={16}>
          <AppCard bodyStyle={{ paddingTop: 12 }}>
            <ListQA
              activeTopic={activeTopic}
              handleRunButtonClick={handleRunButtonClick}
            />
          </AppCard>
        </Col>
      </Row>
    </>
  );
};
