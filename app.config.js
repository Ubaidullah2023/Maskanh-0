export default {
  name: "Maskanh",
  slug: "maskanh-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.maskanh.app"
  },
  plugins: [
    "expo-location",
    "expo-image-picker",
    "expo-file-system",
    "expo-av"
  ],
  extra: {
    eas: {
      projectId: "670e08fe-7cc8-4854-809a-5eaf22b54632"
    }
  }
}; 