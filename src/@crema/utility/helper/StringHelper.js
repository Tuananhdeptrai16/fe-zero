export const getStringFromHtml = (htmlContent) => {
  return htmlContent.replace(/(<([^>]+)>)/gi, '');
};

export const firstCharToUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
