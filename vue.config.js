module.exports = {
  // publicPath: undefined,
  // outputDir: undefined,
  // assetsDir: "static",
  // runtimeCompiler: true,
  // productionSourceMap: undefined,
  // parallel: undefined,
  configureWebpack: {
    // trick to avoid compile error
    externals: {canvas: {}},
    // output: {
    //   libraryExport: 'default',
    // },
  },
  css: {
    extract: false,
  },
};
