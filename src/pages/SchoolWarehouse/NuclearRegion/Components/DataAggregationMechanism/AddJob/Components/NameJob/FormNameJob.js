import { Col, Form, Popconfirm, Row } from 'antd';
import React, { useEffect } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { SCHEDULE_DATA_AGGREGATION_AUTO } from 'src/shared/constants/DataSelect';
import style from './NameJob.module.scss';
import clsx from 'clsx';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import FormSelectDataRegion from './FormSelectDataRegion';
import { getDataContextAddJob } from '../..';
import { MODE_QUERY_JOB } from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

FormNameJob.propTypes = {};

function FormNameJob({
  isDetail = false,
  isUpdate = false,
  isSchedule = false,
}) {
  const form = Form.useFormInstance();
  const watchModeSchedule = Form.useWatch('mode_scheduler', form) || '';

  useEffect(() => {
    form.setFieldValue('is_auto_update', true);
  }, [watchModeSchedule, form]);
  const { dataCreateJob } = getDataContextAddJob();
  const { keyModeQuey } = dataCreateJob || {};

  return (
    <Row>
      {!isSchedule && (
        <Col span={24}>
          <FormInput
            name={'job_name'}
            label={'Tên job'}
            disabled={isDetail}
            required
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
      )}
      <Col span={24}>
        <FormSelect
          name='mode_scheduler'
          required
          disabled={isDetail}
          label='Chế độ lập lịch'
          options={[
            {
              label: 'Tự động cập nhật',
              value: 'mode_auto',
            },
            {
              label: 'Lập lịch',
              value: 'mode_schedule',
            },
            {
              label: 'Biểu thức cron',
              value: 'mode_cron',
            },
          ]}
        />
      </Col>

      {watchModeSchedule === 'mode_auto' && (
        <FormHidden name={'is_auto_update'} />
      )}
      {watchModeSchedule === 'mode_schedule' && (
        <Col span={24}>
          <Row>
            <Col span={isUpdate ? 24 : 6}>
              <label className={clsx(style.label_select_table)}>
                Lịch trình
              </label>
            </Col>
            <Col span={isUpdate ? 24 : 18}>
              <Row gutter={[18, 18]} className='d-flex items-baseline'>
                <Col span={8}>
                  <FormInput
                    labelHidden='Tần suất chạy job'
                    placeholder='Tần suất chạy job'
                    name={'quantity'}
                    required
                    rules={{
                      numeric_positive: [],
                      maxLength: [{ value: 3 }],
                    }}
                    disabled={isDetail}
                  />
                </Col>
                <Col span={16}>
                  <FormSelect
                    labelHidden='Lịch trình'
                    name={'unit'}
                    options={SCHEDULE_DATA_AGGREGATION_AUTO}
                    required
                    disabled={isDetail}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      )}

      {watchModeSchedule === 'mode_cron' && (
        <Col span={24} className={clsx(style.wrapFormExpCron)}>
          <FormInput
            name={'cron_expression'}
            label={'Biểu thức cron'}
            disabled={isDetail}
            required
            rules={{ maxLength: [{ value: 64 }], cron: [] }}
          />

          <Popconfirm
            title={
              <div className={clsx(style.wrapContentHelpCron)}>
                <h5 className={clsx(style.content_title)}>Biểu thức cron ?</h5>
                <ul>
                  <li className='mb-8'>
                    <h6 className='mb-8'>
                      Dưới đây là định dạng cơ bản của một biểu thức cron:
                    </h6>
                    <p className='mb-6'>* * * * * command-to-be-executed</p>
                    <p className='mb-6'>- - - - -</p>
                    <p className='mb-6'>| | | | |</p>
                    <p className='mb-6'>
                      | | | | +----- ngày trong tuần (0 - 7) (Chủ nhật = 0 hoặc
                      7)
                    </p>
                    <p className='mb-6'>| | | +------- tháng (1 - 12)</p>
                    <p className='mb-6'>
                      | | +--------- ngày trong tháng (1 - 31)
                    </p>
                    <p className='mb-6'>| +----------- giờ (0 - 23)</p>
                    <p className='mb-6'>+------------- phút (0 - 59)</p>
                  </li>
                  <li className='mb-8'>
                    <h6 className='mb-8'>Một số ví dụ về biểu thức cron:</h6>
                    <p className='mb-6'>
                      {`1. '0 5 * * *' - Chạy tác vụ vào lúc 5:00 AM mỗi ngày`}
                    </p>
                    <p className='mb-6'>
                      {`2. '*/10 * * * *' - Chạy tác vụ mỗi 10 phút.`}
                    </p>
                    <p className='mb-6'>
                      {`3. '0 0 1 * *' - Chạy tác vụ vào lúc nửa đêm ngày đầu tiên
                      của mỗi tháng`}
                    </p>
                    <p className='mb-6'>
                      {`4. '0 12 * * 1-5' - Chạy tác vụ vào lúc 12:00 PM mỗi ngày
                      từ Thứ Hai đến Thứ Sáu.`}
                    </p>
                  </li>
                  <li>
                    <h6 className='mb-8'>
                      Ngoài ra, có một số ký tự đặc biệt được sử dụng trong các
                      biểu thức cron để tạo ra các lịch trình phức tạp hơn:
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

      {keyModeQuey === MODE_QUERY_JOB.QUERY_CODE && (
        <FormSelectDataRegion isReturnObject={true} />
      )}
    </Row>
  );
}

export default FormNameJob;
