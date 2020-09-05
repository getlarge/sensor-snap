module.exports = {
  configureWebpack: {},
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
  },

  css: {
    extract: false,
  },
};
