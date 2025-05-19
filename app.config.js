export default {
  name: "MaskanhApp",
  slug: "maskanh-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/logo.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/logo.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.maskanh.app"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.maskanh.app"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    supabaseUrl: "https://efyqjrpxkrmmmydtoxwj.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeXFqcnB4a3JtbW15ZHRveHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTk1NTIsImV4cCI6MjA2MjA5NTU1Mn0.gMBi9n0zawvSbAQ2AbqulPVwSm7yYUN6cFJ1bW3os30"
  }
}; 