import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { theme } from '../theme/theme';
import { AuthTab } from '../types/auth';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import TabSelector from '../components/TabSelector';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>('register');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const paperTheme = useTheme();

  const handleTabChange = (tab: AuthTab) => {
    setActiveTab(tab);
  };

  const handleAuthSuccess = (userData: any, tokens: any) => {
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: activeTab === 'register' ? 'Account created successfully!' : 'Welcome back!',
    });
    
    // Navigate to profile screen
    navigation.navigate('Profile' as never, { user: userData, tokens } as never);
  };

  const handleAuthError = (error: string) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.background}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Header />

          {/* Tab Selector */}
          <TabSelector
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Form Container */}
          <View style={styles.formContainer}>
            {activeTab === 'register' ? (
              <RegisterForm
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onSuccess={handleAuthSuccess}
                onError={handleAuthError}
              />
            ) : (
              <LoginForm
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onSuccess={handleAuthSuccess}
                onError={handleAuthError}
              />
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              🔐 Ecommerce Authentication Testing
            </Text>
            <Text style={styles.footerSubtext}>
              Built with React Native & TypeScript
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  formContainer: {
    flex: 1,
    marginTop: theme.spacing.xl,
  },
  footer: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
    paddingVertical: theme.spacing.lg,
  },
  footerText: {
    color: theme.colors.surface,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerSubtext: {
    color: theme.colors.surface,
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs,
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default AuthScreen;
