import { Tag } from 'antd';
import React from 'react';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import FormAntUploadFile from 'src/@crema/core/Form/FormAntUploadFile';
import FormAntUploadMedia from 'src/@crema/core/Form/FormAntUploadMedia';
import FormCheckbox from 'src/@crema/core/Form/FormCheckbox';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

IntegrateOrganizationTraining.propTypes = {};

function IntegrateOrganizationTraining() {
  return (
    <div>
      <h1>Demo Form AntUpload</h1>
      <FormAntUploadFile
        required
        name='upload'
        label='upload_file'
        rules={{ max: 2 }}
        layout={{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }}
        accept='.png,.jpg,.jpeg'
        multiple
      />
      <h1>Demo Form FormAntUploadMedia</h1>
      <FormAntUploadMedia
        maxCount={1}
        multiple={false}
        name={[name, 'image']}
      />
      <h1>Demo Form FormCheckbox</h1>
      <FormCheckbox
        name={[name, 'required']}
        layout={{
          className: 'ant-form-item-horizontal',
          wrapperCol: { span: 8 },
          labelCol: { span: 16 },
          style: {
            display: 'inline-block',
            width: 100,
            margin: 0,
          },
        }}
        label={'Bắt buộc'}
      />
      <h1>Demo Form FormSelectAsync</h1>
      <FormSelectAsync
        label='sidebar.listMember_organization'
        placeholder={'Tìm kiếm theo email của thành viên'}
        name='user_ids'
        showArrow
        mode='multiple'
        fieldNames={{ value: 'id' }}
        configFetch={{
          url: API.GET_LIST_USER_WITHOUT_ORGANIZATION(2),
          method: METHOD_FETCH.POST,
          body: {
            keyword: null,
            filters: [],
            pageable: {
              page: 1,
            },
          },
        }}
        required
        renderItem={(option, index) => {
          return (
            <div key={`item-${index}`}>
              {RenderNameUser({ user: option })}{' '}
              {option.email && <Tag>{option.email}</Tag>}
            </div>
          );
        }}
      />
      <h1>Demo Form DataTables</h1>
    </div>
  );
}

export default IntegrateOrganizationTraining;
