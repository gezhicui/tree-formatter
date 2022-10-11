const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    // 'tree-formatter': './src/treeFormatter.js',
    'tree-formatter.min': '/src/treeFormatter.js',
  },
  output: {
    filename: '[name].js',
    globalObject: 'this',
    libraryTarget: 'umd', //支持库的引入方式
    libraryExport: 'default', //默认导出
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        //此插件在webpack4之后，当mode 设置为production时，默认开启压缩
        include: /\.min\.js$/, //匹配min.js结尾的文件进行压缩
      }),
    ],
  },
};
