# React Native Project Initialization Guide

## 🚀 Quick Setup Instructions

Since this is a pre-configured React Native project, you need to initialize the native project structure:

### Option 1: Use React Native CLI (Recommended)

1. **Navigate to parent directory:**
   ```bash
   cd ..
   ```

2. **Remove the current mobile folder:**
   ```bash
   rm -rf ecommerce-mobile
   ```

3. **Create new React Native project:**
   ```bash
   npx react-native@0.72.6 init ecommerce-mobile --template react-native-template-typescript
   ```

4. **Navigate to the new project:**
   ```bash
   cd ecommerce-mobile
   ```

5. **Install our custom dependencies:**
   ```bash
   npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-linear-gradient react-native-toast-message @react-native-async-storage/async-storage axios react-hook-form react-native-paper
   ```

6. **Install dev dependencies:**
   ```bash
   npm install --save-dev babel-plugin-module-resolver @tsconfig/react-native typescript @types/react @types/react-test-renderer
   ```

7. **Copy our source files:**
   - Copy the `src/` folder from the backup
   - Copy `App.tsx`, `babel.config.js`, `tsconfig.json`, `metro.config.js`
   - Copy `README.md` and `.gitignore`

### Option 2: Manual Native Setup

If you prefer to keep the current structure:

1. **Create Android folder structure:**
   ```bash
   mkdir -p android/app/src/main/java/com/ecommercemobile
   mkdir -p android/app/src/main/res
   ```

2. **Create iOS folder structure:**
   ```bash
   mkdir -p ios/ecommerceMobile
   ```

3. **Run pod install for iOS:**
   ```bash
   cd ios && pod install && cd ..
   ```

## 🔧 Current Status

✅ **Completed:**
- Package.json with correct dependencies
- TypeScript configuration
- Babel configuration with path aliases
- Metro configuration
- All source code (components, screens, services, theme, types)
- README documentation
- Gitignore configuration

⏳ **Pending:**
- Native Android/iOS project structure
- Native configuration files
- Build scripts

## 🚀 Next Steps After Initialization

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **Run on Android:**
   ```bash
   npm run android
   ```

3. **Run on iOS (macOS only):**
   ```bash
   npm run ios
   ```

## 📱 Testing the App

1. **Start the backend service** (in another terminal):
   ```bash
   cd ../ecommerce-backend/services/auth-service
   npm run dev
   ```

2. **Test the mobile app** on your device/emulator

## 🐛 Troubleshooting

- **Metro issues:** `npx react-native start --reset-cache`
- **Android build issues:** `cd android && ./gradlew clean && cd ..`
- **iOS build issues:** `cd ios && pod install && cd ..`

---

**Note:** The React Native CLI approach (Option 1) is recommended as it ensures all native configurations are properly set up.
