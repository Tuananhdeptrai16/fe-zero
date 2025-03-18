import { Row, Col } from 'antd';
import React from 'react';
import './user_info.styles.less';
import PropTypes from 'prop-types';
import IntlMessages from 'src/@crema/utility/IntlMessages';
const UserInfo = ({ data }) => {
  return (
    <>
      <div>
        <IntlMessages id='confirm.resendVerifiedSure' />{' '}
        <span className='warning-text-color'>{data?.username}</span> ?
      </div>
      <Row>
        <Col>
          <div>
            <IntlMessages id='common.email' /> :
          </div>
          <div>
            <IntlMessages id='common.companyName' />
          </div>
          <div>
            <IntlMessages id='common.phone' /> :
          </div>
          <div>
            <IntlMessages id='common.groupUsers' /> :
          </div>
          <div>
            <IntlMessages id='common.address' /> :
          </div>
          <div>
            <IntlMessages id='common.representativePerson' /> :
          </div>
          <div>
            <IntlMessages id='common.taxCode' /> :
          </div>
          <div>
            <IntlMessages id='common.cooperationProposalDocument' /> :
          </div>
          <div>
            <IntlMessages id='common.businessRegistrationDocument' /> :
          </div>
          <div>
            <IntlMessages id='common.capacityStatementDocument' /> :
          </div>
        </Col>
        <Col>
          <div className='user_info-highLight'>{data?.email}</div>
          <div className='user_info-highLight'>{data?.full_name}</div>
          <div className='user_info-highLight'>{data?.phone_number}</div>
          <div className='user_info-highLight'>
            {data?.roles?.[0]?.display_name}
          </div>

          <div className='user_info-highLight'>{data?.user_info?.address}</div>
          <div className='user_info-highLight'>
            {data?.user_info?.representative}
          </div>
          <div className='user_info-highLight'>{data?.user_info?.tax_no}</div>
          <div className='user_info-highLight'>
            {data?.user_info.cooperation_proposal_document}
          </div>
          <div className='user_info-highLight'>
            {data?.user_info?.business_registration_document}
          </div>
          <div className='user_info-highLight'>
            {data?.user_info?.capacity_statement_document}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  data: PropTypes.object,
};
UserInfo.defaultProps = {
  data: {},
};
