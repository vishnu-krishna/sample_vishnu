module.exports = {
  staticFileGlobs: [
    // All service worker file caching disabled for now
    // 'dist/aot/js/**.js',
    // 'dist/aot/img/**.png',
    // 'dist/aot/img/**.jpg',
    // 'dist/aot/css/**.css',
    // 'dist/aot/config/**',
  ],
  cacheId: 'my-account',
  root: 'dist/aot/',
  navigateFallback: '/index.html',
  stripPrefix: 'dist/aot/',
  maximumFileSizeToCacheInBytes: 15728640
};
