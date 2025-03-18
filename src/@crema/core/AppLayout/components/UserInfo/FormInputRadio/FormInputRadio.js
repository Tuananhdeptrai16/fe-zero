import React, { useContext, useEffect } from 'react';
import './FormInputRadio.style.less';
import { Collapse, Radio } from 'antd';
import { Form } from 'antd';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { ConTextOrganization } from '..';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { Panel } from 'src/@crema/component/AntCollapse';

const FormInputRadio = ({ currentRoleId }) => {
  const { user } = useAuthUser();

  const { data: dataOrganization } = useFetch({
    url: API.GET_ALL_ORGANIZATION_BY_USER,
    method: METHOD_FETCH.GET,
  });

  const changeRole = useContext(ConTextOrganization);

  useEffect(() => {
    changeRole?.setRole(currentRoleId);
    changeRole?.setOrganization(user?.organization_id);
    changeRole?.setCountOrganization(dataOrganization?.result?.length);
  }, [user?.organization_id, dataOrganization]);

  const handleOnChange = (value) => {
    changeRole?.setRole(value);
  };

  return (
    <Form.Item name='organization_id'>
      <Radio.Group
        defaultValue={currentRoleId}
        size='large'
        onChange={(e) => handleOnChange(e.target.value)}>
        <div className='display'>
          <Collapse
            accordion
            expandIconPosition='end'
            onChange={(e) => changeRole?.setOrganization(e)}
            defaultActiveKey={user?.organization_id}>
            {dataOrganization?.result?.map((item) => (
              <Panel header={item?.display_name} key={item?.id}>
                {item?.role_info?.map((it) => (
                  <Radio.Button value={+it?.id} key={it?.id}>
                    <div className='title'>{it?.name}</div>
                    <div className='subtitle'>{it?.description}</div>
                  </Radio.Button>
                ))}
              </Panel>
            ))}
          </Collapse>
        </div>
      </Radio.Group>
    </Form.Item>
  );
};

export default FormInputRadio;
