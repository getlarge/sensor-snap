module.exports = {
  // publicPath: undefined,
  // outputDir: undefined,
  // assetsDir: "static",
  // runtimeCompiler: true,
  // productionSourceMap: undefined,
  // parallel: undefined,
  configureWebpack: {
    // externals: {canvas: {}},
    // externals: function(context, request, callback) {
    //   if (/xlsx|canvg|pdfmake/.test(request)) {
    //     return callback(null, 'commonjs ' + request);
    //   }
    //   callback();
    // },
    // output: {
    //   libraryExport: 'default',
    // },
  },
  chainWebpack: config => {
    config.module
      .rule('worker')
      .test(/\.worker\.js$/i)
      .use('worker-loader')
      .loader('worker-loader')
      .tap(options => {
        if (!options) options = {};
        // options.publicPath = '/workers/';
        // options.publicPath = 'src/workers';
        options.name = '[hash].worker.js';
        options.inline = true;
        options.fallback = false;
        return options;
      });
    //   if (config.plugins.store.get('prefetch')) {
    //     config.plugin('prefetch').tap(args => {
    //       args[0].fileBlacklist = [
    //         // /\.map$/,
    //         /pdfmake\.[^.]+\.js$/,
    //         /xlsx\.[^.]+\.js$/,
    //         /fabric[^.]*\.[^.]+\.js$/,
    //         /responsivedefaults\.[^.]+\.js$/,
    //       ];
    //       return args;
    //     });
    //   }
  },

  css: {
    extract: false,
  },
};
