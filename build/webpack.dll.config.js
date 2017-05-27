var utils               =	require('./utils');

module.exports = {
    output: {
        path: utils.assetsPath('js/vendor.js'),
        filename: '[name].js',
        library: '[name]'
    },
    entry: {
        vue_base_framework: [
            'vue', 'vuex', 'vue-router', 'vue-resource'
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: '[name].manifest.json',
            name: '[name]',
            context: __dirname
        })
    ]
}