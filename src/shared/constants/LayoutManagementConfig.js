import { isObject } from 'src/shared/utils/Typeof';
import { UNIT_HTML_REGEX } from './Regex';

export const LAYOUT_NAME = {
  name: 'name',
  layout_type: 'layout_type',
  title_font: 'title_font',
  layout_border: 'layout_border',
  layout_padding: 'layout_padding',
  layout_background: 'layout_background',
  title_padding: 'title_padding',
  title_font_family: 'title_font_family',
  title_font_style: 'title_font_style',
  description_padding: 'description_padding',
  description_font_family: 'description_font_family',
  description_font_style: 'description_font_style',
  image_align: 'image_float',
  image_padding: 'image_padding',
  image_width: 'image_width',
  image_ratio: 'image_ratio',
};

export const titleStyleDefault = {
  'padding-bottom': 10,
  'padding-left': 10,
  'padding-right': 10,
  'padding-top': 10,
  'text-align': 'left',
  'font-weight': 'bold',
  'font-style': 'normal',
  'font-family': 'Roboto',
  'font-size': '14',
  color: '#000',
};

export const descriptionStyleDefault = {
  'padding-bottom': 10,
  'padding-left': 10,
  'padding-right': 10,
  'padding-top': null,
  'text-align': 'left',
  'font-weight': 'normal',
  'font-style': 'normal',
  'font-family': 'Roboto',
  'font-size': '14',
  color: '#000',
};

export const imageStyleDefault = {
  'padding-bottom': null,
  'padding-left': null,
  'padding-right': null,
  'padding-top': null,
  aspect_ratio: '1.91:1',
  float: 'left',
  width_unit: null,
  width_value: null,
};

export const styleComponentDefault = {
  'background-color': '#FFFFFFFF',
  'border-color': '#00000000',
  'border-width': null,
  'padding-bottom': null,
  'padding-left': null,
  'padding-right': null,
  'padding-top': null,
};

export const convertObjectToStyle = (object, prefix = '') => {
  return Object.keys(object).reduce((currentValue, styleKey) => {
    const value = object[styleKey];
    const key = prefix ? `${prefix}-${styleKey}` : styleKey;
    if (value) {
      if (isObject(value)) {
        currentValue = {
          ...currentValue,
          ...convertObjectToStyle(value, key),
        };
      } else {
        currentValue[key] = object[styleKey];
      }
    }
    return currentValue;
  }, {});
};

export const buildStylePadding = (item, paddingObj) => {
  for (const key in paddingObj) {
    item[`padding-${key}`] = paddingObj[key] || null;
  }
};

export const buildFontStyle = (item, fontStyleObj) => {
  const { align, color, ...rest } = fontStyleObj || {};
  item['text-align'] = align || 'left';
  item['color'] = color || '#000000';
  for (const key in rest) {
    item[`font-${key}`] = rest[key];
  }
};

export const buildDataSaveOnServer = (
  componentObj,
  imageObj,
  titleObj,
  descriptionObj,
  dataConver,
) => {
  for (let key in dataConver) {
    if (key.includes('layout')) {
      if (key.includes('padding')) {
        buildStylePadding(componentObj, dataConver?.[key]);
      }
      if (key.includes('background')) {
        componentObj['background-color'] = dataConver?.[key];
      }
      if (key.includes('border')) {
        componentObj['border-color'] = dataConver?.[key]?.['color'] || null;
        componentObj['border-width'] = dataConver?.[key]?.['width'] || null;
      }
    } else if (key.includes('image')) {
      if (key.includes('padding')) {
        buildStylePadding(imageObj, dataConver?.[key]);
      }
      if (key.includes('ratio')) {
        imageObj['aspect_ratio'] = dataConver?.[key];
      }
      if (key.includes('width')) {
        const [, unit, value] = UNIT_HTML_REGEX.exec(dataConver?.[key]) || [];
        imageObj['width_value'] = unit || null;
        imageObj['width_unit'] = value || null;
      }
      if (key.includes('float')) {
        imageObj['float'] = dataConver?.[key] || 'left';
      }
    } else if (key.includes('description')) {
      if (key.includes('padding')) {
        buildStylePadding(descriptionObj, dataConver?.[key]);
      }
      if (key.includes('description_font_style')) {
        buildFontStyle(descriptionObj, dataConver?.[key]);
      }
      if (key.includes('description_font_family')) {
        descriptionObj['font-family'] = dataConver?.[key];
      }
    } else if (key.includes('title')) {
      if (key.includes('padding')) {
        buildStylePadding(titleObj, dataConver?.[key]);
      }
      if (key.includes('title_font_style')) {
        buildFontStyle(titleObj, dataConver?.[key]);
      }
      if (key.includes('title_font_family')) {
        titleObj['font-family'] = dataConver?.[key];
      }
    }
  }
};

export const getInitialFormValues = (rowData) => {
  if (rowData) {
    const {
      name,
      layout_type,
      style_title,
      style_description,
      style_image,
      style_component,
    } = rowData;
    const data = {};
    const buildObjPadding = (size, component, objInput) => {
      const pos = size?.split('-')[1];
      objInput[pos] = component[size];
    };

    const buildTextStyle = (textObject, prefix) => {
      const fontStyleArr = ['color', 'size', 'style', 'weight', 'align'];
      const result = {};
      const textPad = {};
      const fontStyle = {};
      for (const key in textObject) {
        if (key.includes('padding')) {
          buildObjPadding(key, textObject, textPad);
        }
        if (key.includes('family')) {
          result[`${prefix}_font_family`] = textObject[key];
        }
        fontStyleArr.forEach((style) => {
          if (key.includes(style)) {
            fontStyle[style] = textObject[key];
          }
        });
      }
      result[`${prefix}_padding`] = textPad;
      result[`${prefix}_font_style`] = fontStyle;
      return {
        ...result,
      };
    };

    const padObj = {};
    const lborderObj = {};
    for (const key in style_component) {
      if (key.includes('padding')) {
        buildObjPadding(key, style_component, padObj);
      }
      if (key.includes('border-color')) {
        lborderObj['color'] = style_component[key];
      }
      if (key.includes('border-width')) {
        lborderObj['width'] = +style_component[key];
      }
      if (key.includes('background')) {
        data['layout_background'] = style_component[key];
      }
    }
    const imagePad = {};
    const imageWidth = {};
    for (const key in style_image) {
      if (key.includes('padding')) {
        buildObjPadding(key, style_image, imagePad);
      }
      if (key.includes('ratio')) {
        data['image_ratio'] = style_image[key];
      }
      if (key.includes('float')) {
        data['image_float'] = style_image[key];
      }
      if (key.includes('value')) {
        imageWidth['value'] = style_image[key];
      }
      if (key.includes('unit')) {
        imageWidth['unit'] = style_image[key];
      }
    }
    const descriptionStyleObj = buildTextStyle(
      style_description,
      'description',
    );
    const titleStyleObj = buildTextStyle(style_title, 'title');
    data['layout_padding'] = padObj;
    data['layout_border'] = lborderObj;
    data['image_width'] = `${imageWidth['value']}${imageWidth['unit']}`;
    data['image_padding'] = imagePad;

    return {
      name,
      layout_type,
      ...data,
      ...descriptionStyleObj,
      ...titleStyleObj,
    };
  }
};
