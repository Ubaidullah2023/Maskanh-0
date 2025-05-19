const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    minifierConfig: {
      keep_classnames: true,   // Preserve class names
      keep_fnames: true,       // Preserve function names
      mangle: {
        keep_classnames: true, // Don't mangle class names
        keep_fnames: true      // Don't mangle function names
      }
    }
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'cjs'],
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
    extraNodeModules: {
      '@': path.resolve(__dirname),
      // Add polyfills for problematic modules
      'url': path.resolve(__dirname, 'node_modules/react-native-url-polyfill'),
    },
    resolverMainFields: ['react-native', 'browser', 'main'],
  };

  return config;
})(); 