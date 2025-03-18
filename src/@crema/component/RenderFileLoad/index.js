import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import {
  convertURLToFileType,
  getFileNameFromURL,
} from 'src/shared/utils/filter';

const RenderFileLoad = ({ src, component: Component, ...atrrs }) => {
  const [objectURL, setObjectURL] = useState();
  const { data } = useFetch(
    {
      url: `/api/v1/admin/minio/get-object`,
      responseType: 'blob',
      useCache: false,
      params: {
        name: src,
      },
    },
    [src],
  );

  useEffect(() => {
    let urlFile;
    if (data) {
      const fileType = convertURLToFileType(src) || 'application/pdf';
      const fileName = getFileNameFromURL(src) || Date.now();
      urlFile = URL.createObjectURL(
        new File([data], fileName, { type: fileType }),
      );
      setObjectURL(urlFile);
    } else {
      setObjectURL(undefined);
    }

    return () => {
      if (urlFile) {
        URL.revokeObjectURL(urlFile);
      }
    };
  }, [data, src]);
  return <Component {...atrrs} src={objectURL} />;
};

const RenderFileLoadWrapper = ({ src, component: Component, ...attrs }) => {
  if (src) {
    return <RenderFileLoad src={src} component={Component} {...attrs} />;
  }
  return <Component src={src} {...attrs} />;
};

RenderFileLoadWrapper.propTypes = {
  src: PropTypes.string,
};

RenderFileLoadWrapper.defaultProps = {};

export default RenderFileLoadWrapper;
