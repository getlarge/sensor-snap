const path = require('path')

module.exports = {
  // publicPath: undefined,
  // outputDir: undefined,
  // assetsDir: "public",
  // runtimeCompiler: true,
  // productionSourceMap: undefined,
  // parallel: undefined,
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./demo/main.js')
    // config
    // 	.output('chunkFilename')
    // 	.add('[name].bundle.js')

    // Modify the export of every .vue file so that the
    // component is automatically installed if a global
    // Vue is available (e.g. from dropping Vue in as a
    // script tag).
    config.module
      .rule('vue')
      .use('global-vue-loader')
      .loader(path.resolve(__dirname, 'build-utils/global-vue-loader'))
      .before('vue-loader')

    config.module
      .rule('info')
      .resourceQuery(/blockType=info/)
      .use('null-loader')
      .loader('null-loader')

    config.module
      .rule('example')
      .resourceQuery(/blockType=example/)
      .use('null-loader')
      .loader('null-loader')
  },
  devServer: {
    contentBase: path.join(__dirname, 'tests/e2e/fixtures/public')
  },
  css: {
    // Optionally set this to true if you want CSS
    // to be extracted into separate CSS files.
    extract: false
  }
}
