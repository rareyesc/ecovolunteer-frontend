// vue.config.js
const webpack = require('webpack');

module.exports = {
  // Configuración de Webpack
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
  },
  // Configuración del servidor de desarrollo
  devServer: {
    port: 8079,
  },
  // Otras configuraciones
  transpileDependencies: true,
};
