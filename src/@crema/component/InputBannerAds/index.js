import React from 'react';
import AntUploadMedia from 'src/@crema/component/AntUploadMedia';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import { Space } from 'antd';
import AntInput from 'src/@crema/component/AntInput';

const InputBannerAds = ({ value, onChange }) => {
  const media = value?.media;
  const url = value?.url;
  const show = Boolean(value?.show);

  const onChangMedia = (newMedia) => {
    onChange({
      media: newMedia,
      show,
      url,
    });
  };

  const onChangShow = (e) => {
    onChange({
      media,
      url,
      show: e.target.checked,
    });
  };

  const onChangeUrl = (e) => {
    onChange({
      media,
      url: e.target.value,
      show,
    });
  };

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <div className='d-flex gap'>
        <Space>
          <label htmlFor={'checked'}>Hiển thị:</label>
          <AntCheckbox id={'checked'} checked={show} onChange={onChangShow} />
        </Space>
      </div>
      <AntInput placeholder={'Nhập url'} value={url} onChange={onChangeUrl} />
      <label>Ảnh banner:</label>
      <AntUploadMedia
        value={media}
        onChange={onChangMedia}
        multiple={false}
        maxCount={1}
      />
    </Space>
  );
};

export default InputBannerAds;
