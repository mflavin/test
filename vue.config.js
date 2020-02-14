// vue.config.js
module.exports = {
    publicPath: '/test/',
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            skipWaiting: true,
            swSrc: 'src/service-worker.js',
            exclude: [
                /\.map$/,
                /manifest\.json$/
            ],
        },
        themeColor: '#1da025'
    },
}
