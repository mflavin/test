const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const workboxBuild = require('workbox-build');

// NOTE: True when testing, should be false when not in dev or not needed
const enableAnalyze = false;
const isBundleAnalyze = enableAnalyze;

process.env.VUE_APP_VERSION = require('./package.json').version
console.log('process.env.VUE_APP_VERSION: ', process.env.VUE_APP_VERSION);
console.log('process.env.VUE_APP_API_PATH: ', process.env.VUE_APP_API_PATH);

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options =>
        // modify the options...
        options);
  },
  configureWebpack: {
    plugins: [
      // ... rest webpack plugins here,
      ...isBundleAnalyze
        ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            statsOptions: { source: false },
          }),
        ]
        : [],
    ],
    // if you don't put the "/" here, you get this error:
    // "bundle.js:1 Uncaught SyntaxError: Unexpected token <"
  },
  publicPath: '/test/',
  // Used to configure serviceWorker
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/sw.js',
      // ...other Workbox options...
    },
  },
};
