const merge = require('webpack-merge');
const commonOptions = require('./webpack.common');

module.exports = merge.merge(commonOptions, {
    mode: 'production',
    devtool: 'false',
});
