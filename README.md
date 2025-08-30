# Ecommerce Mobile App

A beautiful React Native mobile application for testing authentication microservices, built with modern design principles and TypeScript.

## 🚀 Features

- **Authentication Testing**: Register new users and login with existing accounts
- **Modern UI/UX**: Beautiful gradient designs, smooth animations, and responsive layouts
- **Form Validation**: Comprehensive form validation with error handling
- **Profile Management**: View and refresh user profile information
- **Token Management**: Display and manage JWT access tokens and refresh tokens
- **Cross-Platform**: Works on both iOS and Android
- **TypeScript**: Full TypeScript support for better development experience

## 🛠 Tech Stack

- **React Native**: 0.72.6
- **TypeScript**: 4.8.4
- **React Navigation**: 6.x for navigation
- **React Native Paper**: Material Design components
- **React Hook Form**: Form handling and validation
- **Axios**: HTTP client for API calls
- **Linear Gradient**: Beautiful gradient backgrounds
- **React Native Toast**: User notifications

## 📱 Screens

### 1. Auth Screen
- **Tab Navigation**: Switch between Register and Login forms
- **Register Form**: Complete user registration with all fields
- **Login Form**: Simple email/password authentication
- **Beautiful Design**: Gradient backgrounds and modern UI elements

### 2. Profile Screen
- **User Information**: Display personal details, contact info, and address
- **Verification Status**: Show email and phone verification status
- **Authentication Tokens**: View JWT access token and refresh token
- **Actions**: Refresh profile data and logout functionality

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- MongoDB running locally or MongoDB Atlas

### Installation

1. **Clone the repository**
   ```bash
   cd ecommerce-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the backend service**
   ```bash
   # In another terminal, start the auth service
   cd ../ecommerce-backend/services/auth-service
   npm run dev
   ```

5. **Run the mobile app**

   **Android:**
   ```bash
   npm run android
   ```

   **iOS:**
   ```bash
   npm run ios
   ```

## 🔧 Configuration

### API Configuration

The app is configured to connect to the local auth service:

- **Android Emulator**: `http://10.0.2.2:3001`
- **iOS Simulator**: `http://localhost:3001`
- **Physical Device**: Update the IP address in `src/services/authService.ts`

### Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE_URL=http://localhost:3001
```

## 📱 Testing Flow

1. **Start the backend service** (auth-service on port 3001)
2. **Launch the mobile app** on your device/emulator
3. **Register a new user** with the registration form
4. **Login with credentials** to test authentication
5. **View profile information** and test token management
6. **Test logout functionality**

## 🎨 UI Components

### Design System
- **Colors**: Comprehensive color palette with primary, secondary, and semantic colors
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized spacing scale
- **Shadows**: Platform-specific shadow implementations
- **Border Radius**: Consistent border radius values

### Components
- **Header**: Beautiful gradient header with app branding
- **Tab Selector**: Animated tab switching with gradient backgrounds
- **Forms**: Material Design input fields with validation
- **Cards**: Information display with proper spacing and shadows
- **Buttons**: Gradient and outlined button variants

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Form Validation**: Client-side validation for all inputs
- **Secure Storage**: Tokens stored securely (implementation pending)
- **API Security**: HTTPS endpoints with proper error handling

## 📱 Platform-Specific Features

### Android
- Material Design components
- Native Android navigation patterns
- Optimized for Android performance

### iOS
- iOS-style components and animations
- Native iOS navigation patterns
- Optimized for iOS performance

## 🚧 Development

### Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── services/           # API services
├── theme/              # Design system and theme
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Adding New Features

1. **Create new components** in the `components/` directory
2. **Add new screens** in the `screens/` directory
3. **Extend the theme** in `theme/theme.ts`
4. **Add new types** in `types/` directory
5. **Create new services** in `services/` directory

### Code Style

- Use TypeScript for all new code
- Follow React Native best practices
- Use the established theme system
- Implement proper error handling
- Add loading states for async operations

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **API connection issues**
   - Verify backend service is running
   - Check IP address configuration
   - Ensure network permissions are set

### Debug Mode

Enable debug mode for development:

```bash
# Android
adb reverse tcp:8081 tcp:8081

# iOS
# Use React Native Debugger or Chrome DevTools
```

## 📚 API Documentation

The mobile app connects to the following endpoints:

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/auth/me` - Get user profile
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh-token` - Refresh access token

## 🔮 Next Steps

- [ ] Implement secure token storage
- [ ] Add biometric authentication
- [ ] Implement offline support
- [ ] Add push notifications
- [ ] Implement deep linking
- [ ] Add unit and integration tests
- [ ] Implement CI/CD pipeline
- [ ] Add analytics and crash reporting

## 📄 License

This project is part of the Ecommerce Microservices Architecture.

## 🤝 Contributing

1. Follow the established code style
2. Add proper TypeScript types
3. Test on both platforms
4. Update documentation as needed

---

**Built with ❤️ using React Native and TypeScript**
