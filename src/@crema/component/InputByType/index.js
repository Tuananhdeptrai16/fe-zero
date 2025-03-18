import React from 'react';
import { INPUT_TYPE } from 'src/shared/constants/InputType';
import AntInput from 'src/@crema/component/AntInput';
import AntTextArea from 'src/@crema/component/AntTextArea';
import AntUploadFile from 'src/@crema/component/AntUploadFile';
import AntUploadMedia from 'src/@crema/component/AntUploadMedia';
import LinkSocial from 'src/@crema/component/LinkSocial';
import ListSocialLink from 'src/@crema/component/ListSocialLink';
import InputBannerAds from 'src/@crema/component/InputBannerAds';

const InputByType = ({ type, ...attrs }) => {
  switch (type) {
    case INPUT_TYPE.TEXT_AREA:
      return <AntTextArea {...attrs} />;
    case INPUT_TYPE.LINK_VIDEO:
      return <LinkSocial {...attrs} />;
    case INPUT_TYPE.LIST_VIDEO:
      return <ListSocialLink {...attrs} />;
    case INPUT_TYPE.IMAGE:
      return <AntUploadMedia {...attrs} multiple={false} maxCount={1} />;
    case INPUT_TYPE.LIST_IMAGE:
      return <AntUploadMedia {...attrs} />;
    case INPUT_TYPE.FILE:
      return <AntUploadFile {...attrs} multiple={false} maxCount={1} />;
    case INPUT_TYPE.BANNER_ADS:
      return <InputBannerAds {...attrs} />;
    case INPUT_TYPE.TEXT:
    default:
      return <AntInput {...attrs} />;
  }
};

InputByType.propTypes = {};

InputByType.defaultProps = {};

export default InputByType;
