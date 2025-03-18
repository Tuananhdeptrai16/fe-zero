import { Form, Radio, Space } from 'antd';
import React from 'react';
import './index.style.less';
import { CITIZEN_PROFILE_REQUEST_NAME } from 'src/pages/judicialRecords/createRecordInformation/utils';

export const SampleFormRadio = () => {
  return (
    <div className='d-flex items-center justify-center'>
      <Form.Item name={[CITIZEN_PROFILE_REQUEST_NAME, 'profile_type']}>
        <Radio.Group>
          <Space align='start' className='sampleForm_group_space'>
            <Radio value={1} className={'sampleForm__radio-item'}>
              <div>
                <h2>Mẫu phiếu LLTP 1</h2>
                <p>
                  Phiếu ghi các án tích chưa được xóa và không ghi các án tích
                  đã được xóa. Chỉ ghi thông tin về cấm đảm nhiệm chức vụ, thành
                  lập, quản lý doanh nghiệp, hợp tác xã vào phiếu khi cá nhân,
                  cơ quan, tổ chức có yêu cầu.
                </p>
              </div>
            </Radio>
            <Radio value={2} className='sampleForm__radio-item'>
              <div>
                <h2>Mẫu phiếu LLTP 2</h2>
                <p>
                  Phiếu ghi đầy đủ các án tích, bao gồm án tích đã được xóa và
                  án tích chưa được xóa và thông tin về cấm đảm nhiệm chức vụ,
                  thành lập, quản lý doanh nghiệp, hợp tác xã.
                </p>
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};
