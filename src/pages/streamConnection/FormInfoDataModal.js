import React from 'react';
import { Col, Form, Popconfirm, Row, Typography } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  DETECT_PROPAGATE_SCHEMA,
  REPLICATION_FREQUENCY,
  SCHEDULE_TYPES,
} from 'src/shared/constants/DataSelect';
import clsx from 'clsx';
// import style from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism/AddJob/Components/NameJob/NameJob.module.scss';
import style from './index.module.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const FormInfoDataModal = ({ category, isUpdate = false }) => {
  const scheduleType = Form.useWatch('schedule_type');
  return (
    <Row gutter={24}>
      <Col span={24}>
        <FormInput
          label='Tên tiến trình'
          name={'name'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={24}>
        <FormSelect
          label='Nguồn dữ liệu'
          disabled={isUpdate}
          name={'source'}
          fieldNames={{ label: 'display_name', value: 'airbyte_source_id' }}
          configFetch={{
            url: API.SEARCH_SOURCE_AIR_BYTE,
            method: METHOD_FETCH.POST,
            body: {
              keyword: null,
              pageable: {
                page: 1,
                page_size: 999,
              },
              filters: [
                {
                  name: 'category',
                  value: category,
                  operation: 'eq',
                },
              ],
            },
          }}
          required
          returnObject
          renderItem={(option, index) => {
            return (
              <div key={`item-${index}`}>
                <div>{option?.display_name}</div>
                <Typography.Text type='secondary'>
                  {option?.properties?.database}
                </Typography.Text>
              </div>
            );
          }}
        />
      </Col>
      <Col span={24}>
        <FormSelect
          label='Vùng trung gian'
          disabled={isUpdate}
          name={'destination'}
          fieldNames={{ label: 'display_name', value: 'id' }}
          configFetch={{
            url: API.GET_LIST_DESTINATION_AIR_BYTE,
            method: METHOD_FETCH.POST,
            body: {
              keyword: null,
              pageable: {
                page: 1,
                page_size: 999,
              },
              filters: [
                {
                  name: 'category',
                  value: category,
                  operation: 'eq',
                },
              ],
            },
          }}
          required
          returnObject
          renderItem={(option, index) => {
            return (
              <div key={`item-${index}`}>
                <div>{option?.display_name}</div>
                <Typography.Text type='secondary'>
                  {option.destination_type}
                </Typography.Text>
              </div>
            );
          }}
        />
      </Col>
      <Col span={24}>
        <FormSelect
          label='Loại lập lịch'
          name={'schedule_type'}
          options={SCHEDULE_TYPES}
          required
        />
      </Col>
      {scheduleType === 'basic' && (
        <Col span={24}>
          <FormSelect
            label='Tần số sao chép'
            name={'replication_frequency'}
            options={REPLICATION_FREQUENCY}
            required
          />
        </Col>
      )}
      {scheduleType === 'cron' && (
        <Col span={24} className={clsx(style.wrapFormExpCron)}>
          <FormInput
            label='Biểu thức cron'
            name={'cron_expression'}
            required
            rules={{ maxLength: [{ value: 64 }], cron: [] }}
          />
          <Popconfirm
            title={
              <div className={clsx(style.wrapContentHelpCron)}>
                <h5 className={clsx(style.content_title)}>
                  Biểu thức cron Quartz ?
                </h5>
                <ul>
                  <li className='mb-8'>
                    <h6 className='mb-8'>
                      Dưới đây là định dạng cơ bản của một biểu thức cron
                      Quartz:
                    </h6>
                    <p className='mb-6'>s m h d M w y command-to-be-executed</p>
                    <p className='mb-6'>| | | | | | | |</p>
                    <p className='mb-6'>
                      | | | | | | +----- năm (tùy chọn) (1970 - 2099)
                    </p>
                    <p className='mb-6'>
                      | | | | | +------- ngày trong tuần (1 - 7) (Chủ nhật = 1
                      hoặc 7)
                    </p>
                    <p className='mb-6'>| | | | +--------- tháng (1 - 12)</p>
                    <p className='mb-6'>
                      | | | +----------- ngày trong tháng (1 - 31)
                    </p>
                    <p className='mb-6'>| | +------------- giờ (0 - 23)</p>
                    <p className='mb-6'>| +--------------- phút (0 - 59)</p>
                    <p className='mb-6'>+----------------- giây (0 - 59)</p>
                  </li>
                  <li className='mb-8'>
                    <h6 className='mb-8'>
                      Một số ví dụ về biểu thức cron Quartz:
                    </h6>
                    <p className='mb-6'>
                      {`1. '0 0 5 * * ?' - Chạy tác vụ vào lúc 5:00 AM mỗi ngày.`}
                    </p>
                    <p className='mb-6'>
                      {`2. '0 */10 * * * ?' - Chạy tác vụ mỗi 10 phút.`}
                    </p>
                    <p className='mb-6'>
                      {`3. '0 0 0 1 * ?' - Chạy tác vụ vào lúc nửa đêm ngày đầu tiên của mỗi tháng.`}
                    </p>
                    <p className='mb-6'>
                      {`4. '0 0 12 ? * MON-FRI' - Chạy tác vụ vào lúc 12:00 PM từ Thứ Hai đến Thứ Sáu.`}
                    </p>
                  </li>
                  <li>
                    <h6 className='mb-8'>
                      Ngoài ra, có một số ký tự đặc biệt được sử dụng trong các
                      biểu thức cron Quartz để tạo ra các lịch trình phức tạp
                      hơn:
                    </h6>
                    <p className='mb-6'>
                      {`1. '*' - Đại diện cho tất cả các giá trị hợp lệ`}
                    </p>
                    <p className='mb-6'>
                      {`2. '/' - Được dùng để chỉ các bước giá trị. Ví dụ: */5 có nghĩa là mỗi 5 phút`}
                    </p>
                    <p className='mb-6'>
                      {`3. ',' - Được dùng để liệt kê nhiều giá trị. Ví dụ: 1,2,3 
                      có nghĩa là ngày 1, 2 và 3 của tháng.`}
                    </p>
                    <p className='mb-6'>
                      {`4. '-' - Được dùng để chỉ khoảng giá trị. Ví dụ: 1-5 có nghĩa là từ ngày 1 đến ngày 5 của tháng.`}
                    </p>
                    <p className='mb-6'>
                      {`5. '?' - Đại diện cho "không có giá trị cụ thể nào", được dùng khi không muốn xác định ngày trong tuần và ngày trong tháng cùng lúc.`}
                    </p>
                    <p className='mb-6'>
                      {`6. 'L' - Đại diện cho "cuối cùng", ví dụ: L ở trường ngày trong tháng là ngày cuối cùng của tháng.`}
                    </p>
                    <p className='mb-6'>
                      {`7. 'W' - Chỉ ngày làm việc gần nhất, ví dụ: 15W là ngày làm việc gần nhất với ngày 15 trong tháng.`}
                    </p>
                  </li>
                </ul>
              </div>
            }
            onConfirm={() => {}}
            icon={<ExclamationCircleOutlined />}
            okText=''
            cancelText=''>
            <ExclamationCircleOutlined
              style={{ cursor: 'pointer', top: isUpdate ? '4px' : '9x' }}
              className={clsx(style.iconHelpCron)}
            />
          </Popconfirm>
        </Col>
      )}
      <Col span={24}>
        <FormSelect
          disabled={isUpdate}
          label='Phát hiện và tuyên truyền các thay đổi lược đồ'
          name={'non_breaking_changes_preference'}
          options={DETECT_PROPAGATE_SCHEMA}
          required
        />
      </Col>
    </Row>
  );
};
