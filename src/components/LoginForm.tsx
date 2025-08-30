import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../theme/theme';
import { LoginFormData } from '../types/auth';
import authService from '../services/authService';

interface LoginFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSuccess: (userData: any, tokens: any) => void;
  onError: (error: string) => void;
}

const LoginForm = ({ isLoading, setIsLoading, onSuccess, onError }: LoginFormProps) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      if (response.success) {
        reset();
        onSuccess(response.data.user, {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      }
    } catch (error: any) {
      onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Form Header */}
      <View style={styles.formHeader}>
        <LinearGradient
          colors={[theme.colors.gradientWarningStart, theme.colors.gradientWarningEnd]}
          style={styles.iconContainer}
        >
          <Text style={styles.icon}>🔑</Text>
        </LinearGradient>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account to continue</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          rules={{ 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Email"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              placeholder="your.email@example.com"
            />
          )}
        />
        {errors.email && (
          <HelperText type="error" visible={!!errors.email}>
            {errors.email.message}
          </HelperText>
        )}

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Password"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              secureTextEntry
              error={!!errors.password}
              placeholder="Enter your password"
            />
          )}
        />
        {errors.password && (
          <HelperText type="error" visible={!!errors.password}>
            {errors.password.message}
          </HelperText>
        )}

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}
          labelStyle={styles.submitButtonLabel}
        >
          {isLoading ? 'Signing In...' : '🚀 Sign In'}
        </Button>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Don't have an account? Switch to the Register tab to create one.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.surface,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.surface,
    textAlign: 'center',
    opacity: 0.9,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.large,
  },
  input: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.gradientWarningStart,
  },
  submitButtonContent: {
    paddingVertical: theme.spacing.md,
  },
  submitButtonLabel: {
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
  },
  infoContainer: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
  },
  infoText: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: theme.typography.body2.lineHeight,
  },
});

export default LoginForm;
