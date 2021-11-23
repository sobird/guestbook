/**
 * next.config.js
 * 
 * sobird<i@sobird.me> at 2021/11/15 15:11:17 created.
 */

const { resolve } = require('path');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@'] = resolve(__dirname, 'src');
    // Important: return the modified config
    return config
  },
}
