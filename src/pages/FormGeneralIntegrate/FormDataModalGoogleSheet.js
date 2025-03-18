import React, { useEffect, useState } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import { Button, Col, Form, Row, Tabs } from 'antd';
import {
  CONNECTION_CONFIGURATION,
  DESTINATION_GOOGLE_SHEET_NAME,
} from 'src/shared/constants/DataFixed';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import FormInputSecret from 'src/@crema/component/FormInputSecret';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import { getNameAirbyte } from 'src/shared/utils/Object';
import { parse } from 'src/shared/utils/String';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { MODAL_SIZE } from 'src/shared/constants/Modal';

export const FormDataModalGoogleSheet = () => {
  const form = Form.useFormInstance();
  const account = Form.useWatch('account');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (account) {
      const connectionConfiguration = parse(account?.connection_configuration);
      if (connectionConfiguration?.credentials) {
        console.log(
          'connectionConfiguration?.credentials?.client_id',
          connectionConfiguration?.credentials?.client_id,
        );
        form.setFieldValue(
          [CONNECTION_CONFIGURATION, 'credentials', 'client_id'],
          connectionConfiguration?.credentials?.client_id,
        );
        form.setFieldValue(
          [CONNECTION_CONFIGURATION, 'credentials', 'client_secret'],
          connectionConfiguration?.credentials?.client_secret,
        );
        form.setFieldValue(
          [CONNECTION_CONFIGURATION, 'credentials', 'refresh_token'],
          connectionConfiguration?.credentials?.refresh_token,
        );
      }
    }
  }, [account]);

  return (
    <div>
      <Row gutter={20}>
        <Col span={24}>
          <FormInput label='Tên dữ liệu đích' name='name' required />
          <FormHidden
            name={[CONNECTION_CONFIGURATION, 'credentials', 'client_id']}
          />
          <FormHidden
            name={[CONNECTION_CONFIGURATION, 'credentials', 'client_secret']}
          />
          <FormHidden
            name={[CONNECTION_CONFIGURATION, 'credentials', 'refresh_token']}
          />
        </Col>
        <Col span={24}>
          <Tabs
            className={'w-full'}
            tabBarExtraContent={
              <Button onClick={() => setIsModalOpen(true)}>
                Cấp quyền truy cập
              </Button>
            }>
            <Tabs.TabPane tab='Tạo mới tài khoản' key='create-account'>
              <Row gutter={20}>
                <Col span={24}>
                  <FormInputSecret
                    label='ID khóa'
                    name={[
                      CONNECTION_CONFIGURATION,
                      'credentials',
                      'client_id',
                    ]}
                    required
                  />
                </Col>
                <Col span={12}>
                  <FormInputSecret
                    label='Khóa truy cập'
                    name={[
                      CONNECTION_CONFIGURATION,
                      'credentials',
                      'client_secret',
                    ]}
                    required
                  />
                </Col>
                <Col span={12}>
                  <FormInputSecret
                    label='Khóa làm mới'
                    name={[
                      CONNECTION_CONFIGURATION,
                      'credentials',
                      'refresh_token',
                    ]}
                    required
                  />
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Tài khoản sẵn có' key='list-account'>
              <FormSelectAsync
                required
                name={'account'}
                label={'Tài khoản'}
                fieldNames={{ label: 'source_name', value: 'id' }}
                returnObject
                configFetch={{
                  url: API.SEARCH_LIST_DATABASE_SOURCE,
                  method: METHOD_FETCH.POST,
                  body: {
                    types: [DESTINATION_GOOGLE_SHEET_NAME],
                    pageable: { page_size: 10 },
                    filters: [
                      {
                        name: 'destination_type',
                        operation: FILTER_OPERATION.EQ,
                        value: DESTINATION_GOOGLE_SHEET_NAME,
                      },
                    ],
                  },
                }}
                renderItem={(option, index) => {
                  return (
                    <div key={`item-${index}`}>
                      <div>{getNameAirbyte(option.source_name)}</div>
                    </div>
                  );
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
        <Col span={24}>
          <FormInput
            label='Liên kết bảng tính'
            name={[CONNECTION_CONFIGURATION, 'spreadsheet_id']}
            required
          />
        </Col>
      </Row>
      <FormRowDataTable
        size={MODAL_SIZE.MEDIUM}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType={FORM_TYPES.GRANTING_ACCESS}>
        <div>
          <h1>Bước 1: Thiết lập Google Sheets</h1>
          <h2>Google Account</h2>
          <p>
            Để tạo một tài khoản Google, hãy truy cập trang web của Google và
            tạo một tài khoản Google.
          </p>
          <h2>Google Sheets (Google Bảng tính)</h2>
          <ol>
            <li>
              Sau khi bạn đã đăng nhập vào tài khoản Google của mình, tạo một
              Bảng tính Google mới. Hãy tuân theo hướng dẫn này để tạo một bảng
              tính mới. Bạn cũng có thể sử dụng một Bảng tính Google đã tồn tại.
            </li>
            <li>
              Bạn sẽ cần liên kết của Bảng tính Google mà bạn muốn đồng bộ. Để
              lấy nó, nhấp vào Chia sẻ ở góc phải trên của giao diện Google
              Sheets, sau đó nhấp vào Sao chép liên kết trong hộp thoại hiển
              thị.
            </li>
          </ol>
          <h1>Bước 2: Thiết lập kết nối đích Google Sheets</h1>
          <p>
            Xác thực vào Google Sheets chỉ có sẵn bằng cách sử dụng OAuth để xác
            thực.
          </p>
          <ol>
            <li>Tạo một dự án mới trên Google Cloud.</li>
            <li>Bật Google Sheets API.</li>
            <li>
              Tạo một ID khách hàng OAuth mới. Chọn Loại ứng dụng Web, đặt tên
              cho nó và thêm{' '}
              <a href={'https://developers.google.com/oauthplayground'}>
                https://developers.google.com/oauthplayground
              </a>{' '}
              làm URI chuyển hướng được ủy quyền.
            </li>
            <li>
              Thêm thông tin bảo mật khách hàng (Thêm mã bảo mật), và ghi nhớ cả
              Mã bảo mật khách hàng và ID khách hàng.
            </li>
            <li>Điều hướng đến Google OAuth Playground</li>
            <li>
              Nhấp vào biểu tượng bánh răng ở góc phải trên cùng, chọn Sử dụng
              thông tin xác thực OAuth của bạn và nhập OAuth Client ID và OAuth
              Client secret từ bước trước.
            </li>
            <li>
              Trong thanh bên trái, tìm và chọn Google Sheets API v4, sau đó
              chọn phạm vi{' '}
              <a href={'https://www.googleapis.com/auth/spreadsheets'}>
                https://www.googleapis.com/auth/spreadsheets
              </a>{' '}
              . Nhấp vào Authorize APIs.
            </li>
            <li>
              Ở bước 2, nhấp vào Trao đổi mã xác thực để nhận token. Ghi nhớ
              Refresh token.
            </li>
            <li>
              Thiết lập một đích mới nhập Client ID, Client Secret, Refresh
              Token và Liên kết Bảng tính từ các bước trước.
            </li>
          </ol>
        </div>
      </FormRowDataTable>
    </div>
  );
};
