import { Tabs } from 'antd';
import FormInforCommonLeader from './infor_common';
import useIntl from 'react-intl/lib/src/components/useIntl';
import FormTraning from './traning';

function FormLeader({ keyTab, setKeyTab, form }) {
  const { messages } = useIntl();
  const items = [
    {
      key: messages['common.informationCommonLeader'],
      label: messages['common.informationCommonLeader'],
      children: <FormInforCommonLeader form={form} />,
      forceRender: true,
    },
    {
      key: messages['common.traningLeaderFostering'],
      label: messages['common.traningLeaderFosteringTitle'],
      children: (
        <FormTraning name={messages['common.traningLeaderFostering']} />
      ),
      forceRender: true,
    },
    {
      key: messages['common.workingCycleLeader'],
      label: messages['common.workingCycleLeaderTitle'],
      children: <FormTraning name={messages['common.workingCycleLeader']} />,
      forceRender: true,
    },
    {
      key: messages['common.historyLeader'],
      label: messages['common.historyLeader'],
      children: <FormTraning name={messages['common.historyLeader']} />,
      forceRender: true,
    },
    {
      key: messages['common.foreignerRelationshipLeader'],
      label: messages['common.foreignerRelationshipLeader'],
      children: (
        <FormTraning name={messages['common.foreignerRelationshipLeader']} />
      ),
      forceRender: true,
    },
    {
      key: messages['common.familyRelationshipLeader'],
      label: messages['common.familyRelationshipLeader'],
      children: (
        <FormTraning name={messages['common.familyRelationshipLeader']} />
      ),
      forceRender: true,
    },
    {
      key: messages['common.economicStatusLeader'],
      label: messages['common.economicStatusLeader'],
      children: (
        <FormTraning
          name={messages['common.economicStatusLeader']}
          form={form}
        />
      ),
      forceRender: true,
    },
    {
      key: messages['common.rewardDisciplineLeader'],
      label: messages['common.rewardDisciplineLeader'],
      children: (
        <FormTraning name={messages['common.rewardDisciplineLeader']} />
      ),
      forceRender: true,
    },
  ];
  return (
    <>
      <Tabs
        items={items}
        destroyInactiveTabPane={true}
        onTabClick={(key) => setKeyTab(key)}
        activeKey={keyTab}></Tabs>
    </>
  );
}

export default FormLeader;
