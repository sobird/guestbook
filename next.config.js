/**
 * next.config.js
 * 
 * @see https://nextjs.org/docs/pages/api-reference/next-config-js
 * 
 * sobird<i@sobird.me> at 2021/11/15 15:11:17 created.
 */

const { resolve } = require('path');

module.exports = {
  output: 'standalone',

  // Use the CDN in production and localhost for development.
  // assetPrefix: isProd ? 'https://cdn.mydomain.com' : undefined,
  // an empty string, the default
  // basePath: '/docs',
  // 默认值 .next
  // distDir: '.next',

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@'] = resolve(__dirname, 'src');
    // Important: return the modified config
    // config.resolve.fallback = { fs: false };
    return config
  },
  images: {
    // loaderFile: './ImageLoader.ts'
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
