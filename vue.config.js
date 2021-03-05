const webpack = require("webpack");
module.exports = {
  publicPath: "/OYO/",
  // INFO 实时渲染
  runtimeCompiler: true,
  devServer: {
    port: 8080,

    host: "localhost",

    https: false,

    // 自动启动浏览器

    open: false,
    proxy: {
      "/api": {
        target: "http://localhost:8888/api", //设置调用的接口域名和端口
        changeOrigin: true, //是否跨域
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  }
};
