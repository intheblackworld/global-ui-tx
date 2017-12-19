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
      images: path.resolve('src/images'),
    }
  }
}
