var path = require('path')

module.exports = {
  type: 'react-app',
  webpack: {
    aliases: {
      containers: path.resolve('src/containers'),
      components: path.resolve('src/components'),
      reducers: path.resolve('src/reducers'),
      routes: path.resolve('src/routes'),
      actions: path.resolve('src/actions'),
      utils: path.resolve('src/utils'),
      images: path.resolve('src/images'),
    },
  },
  devServer: {
    proxy: {
      "*": {
        target: "http://52.196.185.136",
        changeOrigin: true,
      }
    }
  }
}
