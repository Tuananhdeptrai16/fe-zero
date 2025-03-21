const CracoLessPlugin = require('craco-less');
// const {getThemeVariables} = require('antd/dist/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: getThemeVariables({
            //   '@primary-color': '#0A8FDC',
            //   dark: true,
            // }),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
