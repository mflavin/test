const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { GenerateSW } = require('workbox-webpack-plugin');

// NOTE: True when testing, should be false when not in dev or not needed
const enableAnalyze = false;
const isBundleAnalyze = enableAnalyze;

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
  // pwa: {
  //   // configure the workbox plugin
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     // swSrc is required in InjectManifest mode.
  //     swSrc: 'src/sw.js',
  //     // ...other Workbox options...
  //   },
  // },

  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // cleanupOutdatedCaches: true,
      navigationPreload: true,
      skipWaiting: true
    },
  },
};

// Other plugins...
new GenerateSW({
  cleanupOutdatedCaches: true,
  navigationPreload: true,
  skipWaiting: true,
})
